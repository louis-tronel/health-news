import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: Fetch recent reviews for a competitor
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const competitorId = searchParams.get("competitorId");
  const limit = parseInt(searchParams.get("limit") || "3");
  const days = parseInt(searchParams.get("days") || "7"); // Last 7 days by default

  const since = new Date();
  since.setDate(since.getDate() - days);

  const where: Record<string, unknown> = {
    date: { gte: since },
  };

  if (competitorId) {
    where.competitorId = competitorId;
  }

  const reviews = await prisma.competitorReview.findMany({
    where,
    orderBy: { date: "desc" },
    take: competitorId ? limit : undefined,
  });

  // Group by competitor if no specific competitor requested
  if (!competitorId) {
    const grouped: Record<string, typeof reviews> = {};
    for (const review of reviews) {
      if (!grouped[review.competitorId]) {
        grouped[review.competitorId] = [];
      }
      if (grouped[review.competitorId].length < limit) {
        grouped[review.competitorId].push(review);
      }
    }
    return NextResponse.json({ reviews: grouped });
  }

  return NextResponse.json({ reviews });
}

// POST: Add new reviews (for manual entry or automated scraping)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { reviews } = body;

  if (!reviews || !Array.isArray(reviews)) {
    return NextResponse.json(
      { error: "reviews array is required" },
      { status: 400 }
    );
  }

  const created = await prisma.competitorReview.createMany({
    data: reviews.map((r: {
      competitorId: string;
      text: string;
      rating: number;
      date: string;
      source: string;
      sentiment: string;
    }) => ({
      competitorId: r.competitorId,
      text: r.text,
      rating: r.rating,
      date: new Date(r.date),
      source: r.source,
      sentiment: r.sentiment,
    })),
    skipDuplicates: true,
  });

  return NextResponse.json({ created: created.count });
}
