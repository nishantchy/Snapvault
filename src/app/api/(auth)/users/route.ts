import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const generateToken = (user: { id: string; email: string; role: Role }) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

async function uploadImage(base64Image: string) {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "users",
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { action, password, image, ...userData } = body;

    // Login Handler
    if (action === "login") {
      const user = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid credentials" }),
          { status: 401 }
        );
      }

      // Optional admin login check
      if (body.isAdminLogin && user.role !== Role.ADMIN) {
        return new NextResponse(
          JSON.stringify({ message: "Unauthorized access" }),
          { status: 403 }
        );
      }

      const token = generateToken(user);

      return new NextResponse(
        JSON.stringify({
          message: "Login successful",
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
            phone: user.phone,
          },
          token,
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
          },
        }
      );
    }

    // Registration Handler
    if (action === "register") {
      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        return new NextResponse(
          JSON.stringify({ message: "Email already registered" }),
          { status: 409 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle image upload if provided
      let imageUrl;
      if (image) {
        try {
          imageUrl = await uploadImage(image);
        } catch (error) {
          return new NextResponse("Error uploading image: " + error, {
            status: 500,
          });
        }
      }

      // Determine role based on registration context
      const userRole =
        userData.role === "ADMIN" || body.isAdminRegistration
          ? Role.ADMIN
          : Role.USER;

      // Create new user with optional fields
      const newUser = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
          image: imageUrl,
          role: userRole as Role,
        },
      });

      const token = generateToken(newUser);

      return new NextResponse(
        JSON.stringify({
          message: `${
            userRole === Role.ADMIN ? "ADMIN" : "USER"
          } registered successfully`,
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            image: newUser.image,
          },
          token,
        }),
        {
          status: 201,
          headers: {
            "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
          },
        }
      );
    }

    return new NextResponse(JSON.stringify({ message: "Invalid action" }), {
      status: 400,
    });
  } catch (error: any) {
    // Comprehensive error logging
    console.error("FULL ERROR DETAILS:");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);

    return NextResponse.json(
      {
        message: "Unexpected server error",
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      },
      { status: 500 }
    );
  }
};
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
          role: true,
        },
      });

      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }

      return new NextResponse(JSON.stringify(user), { status: 200 });
    }

    // If no user ID, fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
      },
    });

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching user(s): " + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId || !updates) {
      return new NextResponse(
        JSON.stringify({ message: "User ID and updates are required" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const filteredUpdates: Record<string, any> = {};

    // Handle password update
    if (updates.password) {
      // Validate current password
      if (!updates.currentPassword) {
        return new NextResponse(
          JSON.stringify({ message: "Current password is required" }),
          { status: 400 }
        );
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        updates.currentPassword,
        user.password
      );

      if (!isCurrentPasswordValid) {
        return new NextResponse(
          JSON.stringify({ message: "Current password is incorrect" }),
          { status: 400 }
        );
      }

      const isSamePassword = await bcrypt.compare(
        updates.password,
        user.password
      );
      if (isSamePassword) {
        return new NextResponse(
          JSON.stringify({
            message: "New password cannot be the same as the current password",
          }),
          { status: 400 }
        );
      }
      filteredUpdates.password = await bcrypt.hash(updates.password, 10);
    }

    // Handle image update
    if (updates.image) {
      try {
        const imageUrl = await uploadImage(updates.image);
        filteredUpdates.image = imageUrl;
      } catch (error) {
        return new NextResponse("Error uploading image: " + error, {
          status: 500,
        });
      }
    }

    // Handle other fields
    const allowedFields = ["name", "email", "phone"];
    for (const key of Object.keys(updates)) {
      if (
        allowedFields.includes(key) &&
        key !== "password" &&
        key !== "image" &&
        key !== "currentPassword"
      ) {
        filteredUpdates[key] = updates[key];
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No valid fields to update" }),
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: filteredUpdates,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating user: " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "User ID required" }), {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Delete user's image from Cloudinary if it exists
    if (user.image) {
      try {
        const publicId = user.image.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`users/${publicId}`);
        }
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfully",
        user: deletedUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting user: " + error.message, {
      status: 500,
    });
  }
};
