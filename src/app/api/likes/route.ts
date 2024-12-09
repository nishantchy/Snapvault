import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, memoryId } = body;
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }
    if (!memoryId) {
      return NextResponse.json(
        { message: "Memory ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const memory = await prisma.memories.findUnique({
      where: { id: memoryId },
    });
    if (!memory) {
      return NextResponse.json(
        { message: "Memory not found" },
        { status: 404 }
      );
    }

    // Check if like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_memoryId: {
          userId,
          memoryId,
        },
      },
    });

    if (existingLike) {
      // If like exists, remove it
      await prisma.like.delete({
        where: {
          userId_memoryId: {
            userId,
            memoryId,
          },
        },
      });

      // Decrement likes count
      await prisma.memories.update({
        where: { id: memoryId },
        data: { likesCount: { decrement: 1 } },
      });

      return NextResponse.json(
        { message: "Like removed", liked: false },
        { status: 200 }
      );
    } else {
      // Create new like
      await prisma.like.create({
        data: {
          userId,
          memoryId,
        },
      });

      // Increment likes count
      await prisma.memories.update({
        where: { id: memoryId },
        data: { likesCount: { increment: 1 } },
      });

      return NextResponse.json(
        { message: "Like added", liked: true },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("Like Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const memoryId = searchParams.get("memoryId");

    if (!userId || !memoryId) {
      return NextResponse.json(
        { message: "User ID and Memory ID are required" },
        { status: 400 }
      );
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_memoryId: {
          userId,
          memoryId,
        },
      },
    });

    return NextResponse.json(
      {
        liked: !!like,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};
