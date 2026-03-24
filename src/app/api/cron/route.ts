import { NextRequest, NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/fetcher";

export async function GET(request: NextRequest) {
  // Verify cron secret for Vercel
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await fetchAllFeeds();

    return NextResponse.json({
      success: true,
      message: `Fetched ${result.total} articles, ${result.new} new`,
      ...result,
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggering
export async function POST(request: NextRequest) {
  return GET(request);
}
