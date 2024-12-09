import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, memoryId, content, parentCommentId } = body;

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

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { message: "Comment content cannot be empty" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

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

    if (parentCommentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentCommentId },
      });

      if (!parentComment || parentComment.memoryId !== memoryId) {
        return NextResponse.json(
          { message: "Invalid parent comment" },
          { status: 400 }
        );
      }
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        userId,
        memoryId,
        parentCommentId: parentCommentId || undefined,
      },
      include: {
        user: true,
        parentComment: true,
      },
    });

    // Update comments count on memory
    await prisma.memories.update({
      where: { id: memoryId },
      data: { commentsCount: { increment: 1 } },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    console.error("Comment Creation Error:", error);
    return NextResponse.json(
      { message: "Error posting comment", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const memoryId = searchParams.get("memoryId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!memoryId) {
      return NextResponse.json(
        { message: "Memory ID is required" },
        { status: 400 }
      );
    }

    // Fetch top-level comments with pagination
    const comments = await prisma.comment.findMany({
      where: {
        memoryId: memoryId,
        parentCommentId: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalComments = await prisma.comment.count({
      where: {
        memoryId: memoryId,
        parentCommentId: null,
      },
    });

    return NextResponse.json({
      comments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalComments / limit),
        totalComments,
      },
    });
  } catch (error: any) {
    console.error("Fetch Comments Error:", error);
    return NextResponse.json(
      { message: "Error fetching comments", error: error.message },
      { status: 500 }
    );
  }
};
