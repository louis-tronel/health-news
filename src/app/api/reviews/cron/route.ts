import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// List of competitors to fetch reviews for
const COMPETITORS = [
  "alan", "ottonova", "oscar", "harmonie", "axa", "malakoff",
  "groupe-vyv", "klesia-generali", "groupama", "ag2r", "aesio",
  "pro-btp", "covea", "allianz-france"
];

// This endpoint would be called weekly by Vercel Cron
// In production, you would integrate with:
// - Trustpilot API (requires business account)
// - App Store Connect API
// - Google Play Developer API
export async function GET() {
  const results: Record<string, { success: boolean; count?: number; error?: string }> = {};

  for (const competitorId of COMPETITORS) {
    try {
      // Placeholder: In production, fetch from actual APIs
      // For now, this just shows the structure

      // Example of what the fetched data would look like:
      // const trustpilotReviews = await fetchTrustpilotReviews(competitorId);
      // const appStoreReviews = await fetchAppStoreReviews(competitorId);
      // const playStoreReviews = await fetchPlayStoreReviews(competitorId);

      // Clean up old reviews (older than 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      await prisma.competitorReview.deleteMany({
        where: {
          competitorId,
          date: { lt: thirtyDaysAgo },
        },
      });

      results[competitorId] = { success: true, count: 0 };
    } catch (error) {
      results[competitorId] = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }

  return NextResponse.json({
    message: "Weekly review update completed",
    timestamp: new Date().toISOString(),
    note: "To enable automatic review fetching, integrate with Trustpilot/App Store APIs",
    results,
  });
}
