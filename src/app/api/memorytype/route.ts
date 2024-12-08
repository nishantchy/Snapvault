import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const POST = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const { name } = await req.json();

    if (!name) {
      return new NextResponse(JSON.stringify({ message: "Name is required" }), {
        status: 400,
      });
    }
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const newMemoryType = await prisma.memory_types.create({
      data: {
        name: name,
        userId: user.id,
      },
    });

    return new NextResponse(JSON.stringify(newMemoryType), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

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

    const memoryTypes = await prisma.memory_types.findMany({
      where: {
        userId: user.id,
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
        _count: {
          select: { memories: true },
        },
      },
    });

    const formattedMemoryTypes = memoryTypes.map((type) => ({
      id: type.id,
      name: type.name,
      createdAt: type.createdAt,
      memoryCount: type._count.memories,
      user: {
        id: type.user.id,
        name: type.user.name,
      },
    }));

    return new NextResponse(JSON.stringify(formattedMemoryTypes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching memory types:", error);

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

export const PATCH = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const memoryTypeId = searchParams.get("memoryTypeId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!memoryTypeId) {
      return new NextResponse(
        JSON.stringify({ message: "Memory Type ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { name } = await req.json();

    if (!name) {
      return new NextResponse(JSON.stringify({ message: "Name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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

    const existingMemoryType = await prisma.memory_types.findUnique({
      where: {
        id: memoryTypeId,
        userId: userId,
      },
    });

    if (!existingMemoryType) {
      return new NextResponse(
        JSON.stringify({ message: "Memory Type not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedMemoryType = await prisma.memory_types.update({
      where: {
        id: memoryTypeId,
        userId: userId,
      },
      data: {
        name: name,
      },
    });

    return new NextResponse(JSON.stringify(updatedMemoryType), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error updating memory type:", error);

    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const memoryTypeId = searchParams.get("memoryTypeId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!memoryTypeId) {
      return new NextResponse(
        JSON.stringify({ message: "Memory Type ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
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

    const existingMemoryType = await prisma.memory_types.findUnique({
      where: {
        id: memoryTypeId,
        userId: userId,
      },
    });

    if (!existingMemoryType) {
      return new NextResponse(
        JSON.stringify({ message: "Memory Type not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const memoryCount = await prisma.memories.count({
      where: { memoryTypeId: memoryTypeId },
    });

    if (memoryCount > 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Cannot delete memory type with associated memories",
          memoryCount: memoryCount,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await prisma.memory_types.delete({
      where: {
        id: memoryTypeId,
        userId: userId,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Memory Type deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error deleting memory type:", error);

    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await prisma.$disconnect();
  }
};
