import Parser from "rss-parser";
import { prisma } from "./db";
import type { Category } from "./feeds";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; NewsFeed/1.0)",
  },
});

export interface ParsedArticle {
  title: string;
  description: string | null;
  url: string;
  source: string;
  category: string;
  imageUrl: string | null;
  publishedAt: Date;
}

function extractImageUrl(item: Parser.Item): string | null {
  // Try enclosure first (common for media)
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }

  // Try media:content
  const mediaContent = (item as Record<string, unknown>)["media:content"];
  if (mediaContent && typeof mediaContent === "object") {
    const media = mediaContent as { $?: { url?: string } };
    if (media.$?.url) {
      return media.$.url;
    }
  }

  // Try to extract from content
  const itemAny = item as Record<string, unknown>;
  const content = item.content || (itemAny["content:encoded"] as string);
  if (content) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
      return imgMatch[1];
    }
  }

  return null;
}

export async function fetchFeed(
  feedUrl: string,
  feedName: string,
  category: Category
): Promise<ParsedArticle[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    const articles: ParsedArticle[] = [];

    for (const item of feed.items) {
      if (!item.title || !item.link) continue;

      const publishedAt = item.pubDate
        ? new Date(item.pubDate)
        : item.isoDate
          ? new Date(item.isoDate)
          : new Date();

      articles.push({
        title: item.title.trim(),
        description: item.contentSnippet?.slice(0, 500) || item.summary || null,
        url: item.link,
        source: feedName,
        category,
        imageUrl: extractImageUrl(item),
        publishedAt,
      });
    }

    return articles;
  } catch (error) {
    console.error(`Error fetching feed ${feedName}:`, error);
    return [];
  }
}

export async function fetchAllFeeds(): Promise<{
  total: number;
  new: number;
  errors: string[];
}> {
  const feeds = await prisma.feed.findMany({
    where: { isActive: true },
  });

  let totalArticles = 0;
  let newArticles = 0;
  const errors: string[] = [];

  for (const feed of feeds) {
    try {
      const articles = await fetchFeed(
        feed.url,
        feed.name,
        feed.category as Category
      );
      totalArticles += articles.length;

      for (const article of articles) {
        try {
          await prisma.article.upsert({
            where: { url: article.url },
            update: {},
            create: article,
          });
          newArticles++;
        } catch {
          // Article already exists, skip
        }
      }

      // Update lastFetchedAt
      await prisma.feed.update({
        where: { id: feed.id },
        data: { lastFetchedAt: new Date() },
      });
    } catch (error) {
      const errorMsg = `Failed to fetch ${feed.name}: ${error instanceof Error ? error.message : "Unknown error"}`;
      errors.push(errorMsg);
      console.error(errorMsg);
    }
  }

  return { total: totalArticles, new: newArticles, errors };
}
