import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(base64Image: string) {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "memories",
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
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const memoryTypeId = searchParams.get("memoryTypeId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!memoryTypeId) {
      return new NextResponse(
        JSON.stringify({ message: "Memory Type ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const memoryType = await prisma.memory_types.findUnique({
      where: {
        id: memoryTypeId,
        userId: userId,
      },
    });

    if (!memoryType) {
      return new NextResponse(
        JSON.stringify({ message: "Memory Type not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.json();

    const requiredFields = ["title", "content"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(
          JSON.stringify({ message: `${field} is required` }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Ensure imageUrls is initialized as a string array
    let imageUrls: string[] = [];

    // Handle image uploads
    if (body.images && Array.isArray(body.images) && body.images.length > 0) {
      try {
        // Use map to process images as strings
        const uploadPromises = body.images.map((imageBase64: string) =>
          uploadImage(imageBase64)
        );
        // Wait for all uploads and assign the result to imageUrls
        imageUrls = await Promise.all(uploadPromises);
      } catch (error: any) {
        return new NextResponse(
          JSON.stringify({
            message: "Error uploading images: " + error.message,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    const newMemory = await prisma.memories.create({
      data: {
        title: body.title,
        content: body.content,
        images: imageUrls,
        userId: userId,
        memoryTypeId: memoryTypeId,
        isPublic: body.isPublic || false,
      },
    });

    return new NextResponse(JSON.stringify(newMemory), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error creating memory:", error);

    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const memoryTypeId = searchParams.get("memoryTypeId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!memoryTypeId) {
      return new NextResponse(
        JSON.stringify({ message: "Memory Type ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const memoryType = await prisma.memory_types.findUnique({
      where: {
        id: memoryTypeId,
        userId: userId,
      },
    });

    if (!memoryType) {
      return new NextResponse(
        JSON.stringify({ message: "Memory Type not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const memories = await prisma.memories.findMany({
      where: {
        memoryTypeId,
        userId, // Ensure memories belong to the user
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        memoryType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(memories), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const memoryId = searchParams.get("memoryId");
    const userId = searchParams.get("userId");

    if (!memoryId) {
      return new NextResponse(
        JSON.stringify({ message: "Memory ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const memory = await prisma.memories.findUnique({
      where: { id: memoryId, userId: userId },
    });

    if (!memory) {
      return new NextResponse(JSON.stringify({ message: "Memory not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    const updatedMemory = await prisma.memories.update({
      where: { id: memoryId },
      data: {
        title: body.title || memory.title,
        content: body.content || memory.content,
        isPublic: body.isPublic ?? memory.isPublic,
      },
    });

    return new NextResponse(JSON.stringify(updatedMemory), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error Updating Memory: " + error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const memoryId = searchParams.get("memoryId");
    const userId = searchParams.get("userId");

    if (!memoryId) {
      return new NextResponse(
        JSON.stringify({ message: "Memory ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const memory = await prisma.memories.findUnique({
      where: { id: memoryId, userId: userId },
    });

    if (!memory) {
      return new NextResponse(JSON.stringify({ message: "Memory not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deleteMemory = await prisma.memories.delete({
      where: { id: memoryId, userId: userId },
    });

    // Delete associated Cloudinary images
    try {
      if (
        Array.isArray(deleteMemory.images) &&
        deleteMemory.images.length > 0
      ) {
        const imagePublicIds = deleteMemory.images
          .map((url: string) => {
            const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
            return matches ? matches[1] : null;
          })
          .filter((id: string | null): id is string => id !== null);

        if (imagePublicIds.length > 0) {
          await cloudinary.api.delete_resources(imagePublicIds);
        }
      }
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
    }

    return new NextResponse(
      JSON.stringify({ message: "Memory deleted", deleteMemory }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error deleting memory: " + error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
