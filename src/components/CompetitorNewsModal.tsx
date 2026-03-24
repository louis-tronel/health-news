"use client";

import { useEffect, useState, useCallback } from "react";
import { X, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Competitor } from "@/lib/competitors";

interface Article {
  id: string;
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl: string | null;
}

interface CompetitorNewsModalProps {
  competitor: Competitor;
  isOpen: boolean;
  onClose: () => void;
}

export function CompetitorNewsModal({
  competitor,
  isOpen,
  onClose,
}: CompetitorNewsModalProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = useCallback(async () => {
    if (!competitor.newsFeedSources || competitor.newsFeedSources.length === 0) {
      return;
    }

    setIsLoading(true);
    try {
      // Fetch articles from competitor_news category filtered by source
      const allArticles: Article[] = [];

      for (const source of competitor.newsFeedSources) {
        const params = new URLSearchParams({
          category: "competitor_news",
          source: source,
          time: "30d",
          limit: "10",
        });

        const res = await fetch(`/api/articles?${params}`);
        const data = await res.json();
        allArticles.push(...data.articles);
      }

      // Sort by date and dedupe
      const uniqueArticles = allArticles
        .filter(
          (article, index, self) =>
            index === self.findIndex((a) => a.url === article.url)
        )
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
        .slice(0, 15);

      setArticles(uniqueArticles);
    } catch (error) {
      console.error("Error fetching competitor news:", error);
    } finally {
      setIsLoading(false);
    }
  }, [competitor.newsFeedSources]);

  useEffect(() => {
    if (isOpen) {
      fetchNews();
    }
  }, [isOpen, fetchNews]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasNewsFeeds =
    competitor.newsFeedSources && competitor.newsFeedSources.length > 0;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">{competitor.name}</h2>
            <p className="text-sm text-gray-500">Actualites recentes</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {!hasNewsFeeds ? (
            <div className="text-center py-12 text-gray-500">
              <p>Pas de flux d&apos;actualites configure pour ce concurrent.</p>
              <p className="text-sm mt-2">
                Les actualites de {competitor.name} ne sont pas encore suivies.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Aucune actualite recente trouvee.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    {article.imageUrl && (
                      <img
                        src={article.imageUrl}
                        alt=""
                        className="w-20 h-14 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {article.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Badge variant="outline" className="text-[10px] px-1.5">
                          {article.source}
                        </Badge>
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {hasNewsFeeds && (
          <div className="border-t p-4 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Sources: {competitor.newsFeedSources?.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
