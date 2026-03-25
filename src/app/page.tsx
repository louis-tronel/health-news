import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SyncButton } from "@/components/SyncButton";
import { Rss } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  health_tech: "Health Tech",
  insurance: "Insurance",
  regulatory: "Regulatory",
  funding: "Funding",
  general: "General",
};

async function getStats() {
  const [totalArticles, totalFeeds, categoryCounts, activeFeeds] =
    await Promise.all([
      prisma.article.count(),
      prisma.feed.count({ where: { isActive: true } }),
      prisma.article.groupBy({
        by: ["category"],
        _count: { category: true },
      }),
      prisma.feed.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
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
    activeFeeds,
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Sources Actives
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {stats.activeFeeds.map((feed) => (
            <Card key={feed.id} className="flex items-center p-4">
              <Rss className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">{feed.name}</p>
                <p className="text-sm text-gray-500 truncate">{feed.url}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
