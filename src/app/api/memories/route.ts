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
      folder: "products",
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

      let imageUrls: string[] = [];
      try {
        if (body.images && body.images.length > 0) {
          for (const imageBase64 of body.images) {
            const imageUrl = await uploadImage(imageBase64);
            imageUrls.push(imageUrl);
          }
        }
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

      const newMemory = await prisma.memories.create({
        data: {
          title: body.title,
          content: body.content,
          images: imageUrls.length > 0 ? imageUrls.join(",") : null,
          userId: userId,
          memoryTypeId: memoryTypeId,
        },
      });

      return new NextResponse(JSON.stringify(newMemory), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
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

export const GET = async (req: Request, res: Response) => {
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
      where: { memoryTypeId },
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
