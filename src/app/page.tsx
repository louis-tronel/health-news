import { prisma } from "@/lib/db";
import { ArticleList } from "@/components/ArticleList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SyncButton } from "@/components/SyncButton";
import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  health_tech: "Health Tech",
  insurance: "Insurance",
  regulatory: "Regulatory",
  funding: "Funding",
  general: "General",
};

async function getStats() {
  const [totalArticles, totalFeeds, categoryCounts, recentArticles] =
    await Promise.all([
      prisma.article.count(),
      prisma.feed.count({ where: { isActive: true } }),
      prisma.article.groupBy({
        by: ["category"],
        _count: { category: true },
      }),
      prisma.article.findMany({
        orderBy: { publishedAt: "desc" },
        take: 9,
      }),
    ]);

  return {
    totalArticles,
    totalFeeds,
    categoryCounts: categoryCounts.reduce(
      (acc, item) => {
        acc[item.category] = item._count.category;
        return acc;
      },
      {} as Record<string, number>
    ),
    recentArticles,
  };
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            Vue d&apos;ensemble de votre veille santé
          </p>
        </div>
        <SyncButton />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalArticles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Sources Actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalFeeds}</div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.categoryCounts).map(([category, count]) => (
                <Badge key={category} variant="secondary" className="text-sm">
                  {CATEGORY_LABELS[category] || category}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Articles Récents
          </h2>
          <Link href="/articles">
            <Button variant="ghost" size="sm">
              Voir tout
            </Button>
          </Link>
        </div>

        <ArticleList articles={stats.recentArticles} />
      </div>
    </div>
  );
}
