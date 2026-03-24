"use client";

import { ArticleCard } from "./ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/types";

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
}

export function ArticleList({ articles, isLoading }: ArticleListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3 mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Aucun article trouvé</p>
        <p className="text-sm mt-1">
          Essayez de modifier vos filtres ou lancez une synchronisation
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
