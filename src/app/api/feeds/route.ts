import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const feeds = await prisma.feed.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ feeds });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, category } = body;

    if (!name || !url || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const feed = await prisma.feed.create({
      data: { name, url, category },
    });

    return NextResponse.json({ feed }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return NextResponse.json(
        { error: "Feed URL already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create feed" },
      { status: 500 }
    );
  }
}
