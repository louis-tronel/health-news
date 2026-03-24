import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  calculateRelevance,
  TIME_FILTERS,
  type TimeFilter,
  detectLanguage,
  needsTranslation,
  isSourceTrusted,
  isSourceLowQuality,
} from "@/lib/relevance";

// Alan's operating regions for priority
const ALAN_REGIONS = ["france", "belgium", "spain", "canada", "europe"];

// Company-specific sources to exclude from main feed (too anecdotal)
// These should only appear in the Competitors tab
const COMPANY_SPECIFIC_SOURCES = [
  "Google News - Alan",
  "Google News - Harmonie Mutuelle",
  "Google News - Malakoff Humanis",
  "Google News - AXA Santé France",
  "Google News - Groupe VYV MGEN",
  "Google News - AG2R La Mondiale",
  "Google News - Groupama Santé",
  "Google News - Oscar Health",
  "Google News - Doctolib",
  "Google News - Kry Livi",
  "Google News - Wefox",
  "Alan Blog",
];

// Low-relevance sources to exclude entirely
const EXCLUDED_SOURCES = [
  "Silicon Canals",
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const category = searchParams.get("category");
  const source = searchParams.get("source");
  const search = searchParams.get("search");
  const timeFilter = (searchParams.get("time") || "all") as TimeFilter;
  const minRelevanceParam = searchParams.get("minRelevance") || "0";
  const isTop5 = minRelevanceParam === "top5";
  const minRelevance = isTop5 ? 0 : parseInt(minRelevanceParam);
  const sortBy = searchParams.get("sortBy") || "date"; // "date" or "relevance"
  const competitor = searchParams.get("competitor"); // Filter by specific competitor
  const geography = searchParams.get("geography"); // Filter by geography
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (category && category !== "all") {
    where.category = category;
  } else {
    // By default, exclude competitor_news from the main feed
    // (too anecdotal - company-specific news should only appear in Competitors tab)
    where.category = { not: "competitor_news" };
  }

  if (source && source !== "all") {
    where.source = source;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Time filter
  const timeConfig = TIME_FILTERS[timeFilter];
  if (timeConfig.days) {
    const since = new Date();
    since.setDate(since.getDate() - timeConfig.days);
    where.publishedAt = { gte: since };
  }

  // Fetch all matching articles for relevance scoring
  const allArticles = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
  });

  // Calculate relevance for each article and detect language
  const articlesWithRelevance = allArticles.map((article) => {
    const text = `${article.title} ${article.description || ""}`;
    const relevance = calculateRelevance(article.title, article.description);
    const language = detectLanguage(text);
    const requiresTranslation = needsTranslation(text);

    // Boost score for articles in Alan's operating regions
    let adjustedScore = relevance.score;
    const isInAlanRegion = relevance.geography.some((g) =>
      ALAN_REGIONS.includes(g)
    );
    if (isInAlanRegion) {
      adjustedScore += 3;
    }

    // Penalize German articles heavily (user doesn't speak German)
    if (language === "de") {
      adjustedScore -= 10;
    }

    // Source quality scoring
    const sourceName = article.source || "";
    if (isSourceTrusted(sourceName)) {
      adjustedScore += 2; // Boost trusted sources
    }
    if (isSourceLowQuality(sourceName)) {
      adjustedScore -= 8; // Heavy penalty for low-quality sources
    }

    // Filter out low-quality sources unless they have very high relevance
    const isLowQualitySource = isSourceLowQuality(sourceName);
    const shouldFilter = relevance.isFiltered ||
      language === "de" ||
      (isLowQualitySource && relevance.score < 15);

    return {
      ...article,
      relevanceScore: adjustedScore,
      matchedKeywords: relevance.matchedKeywords,
      relevanceCategories: relevance.categories,
      geography: relevance.geography,
      competitors: relevance.competitors,
      competitorType: relevance.competitorType,
      isFiltered: shouldFilter,
      language,
      requiresTranslation,
    };
  });

  // Always filter out irrelevant articles (negative keyword matches)
  let filteredArticles = articlesWithRelevance.filter((a) => !a.isFiltered);

  // Filter out company-specific sources from main feed (unless explicitly requesting that source)
  // These sources return too anecdotal news - they should only appear in Competitors tab
  if (!source || source === "all") {
    filteredArticles = filteredArticles.filter((a) => {
      const articleSource = a.source || "";
      // Exclude company-specific Google News feeds
      if (COMPANY_SPECIFIC_SOURCES.includes(articleSource)) {
        return false;
      }
      // Exclude other low-relevance sources
      if (EXCLUDED_SOURCES.includes(articleSource)) {
        return false;
      }
      return true;
    });
  }

  // Filter by minimum relevance if specified
  if (minRelevance > 0) {
    filteredArticles = filteredArticles.filter(
      (a) => a.relevanceScore >= minRelevance
    );
  }

  // Filter by competitor if specified
  if (competitor && competitor !== "all") {
    filteredArticles = filteredArticles.filter((a) =>
      a.competitors.includes(competitor)
    );
  }

  // Filter by geography if specified
  if (geography && geography !== "all") {
    filteredArticles = filteredArticles.filter((a) =>
      a.geography.includes(geography as typeof a.geography[number])
    );
  }

  // Sort by relevance or date
  if (sortBy === "relevance" || isTop5) {
    filteredArticles.sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
  }

  // If Top 5, ensure diversity by limiting articles per source
  if (isTop5) {
    const diverseTop5: typeof filteredArticles = [];
    const sourceCount: Record<string, number> = {};
    const MAX_PER_SOURCE = 2; // Max 2 articles from same source

    // Also try to include different categories:
    // - At least 1 from Alan/direct competitors if available
    // - At least 1 from market/industry news
    // - Variety in geography

    for (const article of filteredArticles) {
      if (diverseTop5.length >= 5) break;

      const source = article.source;
      const currentCount = sourceCount[source] || 0;

      // Skip if we already have max from this source
      if (currentCount >= MAX_PER_SOURCE) continue;

      diverseTop5.push(article);
      sourceCount[source] = currentCount + 1;
    }

    // If we don't have 5 yet, fill with remaining highest scoring
    if (diverseTop5.length < 5) {
      for (const article of filteredArticles) {
        if (diverseTop5.length >= 5) break;
        if (!diverseTop5.includes(article)) {
          diverseTop5.push(article);
        }
      }
    }

    filteredArticles = diverseTop5;
  }

  const total = filteredArticles.length;
  const paginatedArticles = isTop5 ? filteredArticles : filteredArticles.slice(skip, skip + limit);

  return NextResponse.json({
    articles: paginatedArticles,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
