"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types";
import { ExternalLink, Flame, MapPin, Building2, Languages } from "lucide-react";
import { GEOGRAPHY_LABELS } from "@/lib/relevance";

const CATEGORY_COLORS: Record<string, string> = {
  health_tech: "bg-blue-100 text-blue-800",
  insurance: "bg-green-100 text-green-800",
  regulatory: "bg-orange-100 text-orange-800",
  funding: "bg-purple-100 text-purple-800",
  general: "bg-gray-100 text-gray-800",
};

const CATEGORY_LABELS: Record<string, string> = {
  health_tech: "Health Tech",
  insurance: "Insurance",
  regulatory: "Regulatory",
  funding: "Funding",
  general: "General",
};

const COMPETITOR_TYPE_COLORS: Record<string, string> = {
  direct: "bg-red-500 text-white",
  indirect: "bg-orange-500 text-white",
  traditional: "bg-slate-500 text-white",
};

function getRelevanceBadge(score: number) {
  if (score >= 20) return { label: "Très pertinent", className: "bg-green-500 text-white" };
  if (score >= 10) return { label: "Pertinent", className: "bg-blue-500 text-white" };
  if (score >= 5) return { label: "Modéré", className: "bg-yellow-500 text-white" };
  return null;
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const relevanceBadge = article.relevanceScore !== undefined
    ? getRelevanceBadge(article.relevanceScore)
    : null;

  return (
    <Card className={`hover:shadow-md transition-shadow ${article.relevanceScore && article.relevanceScore >= 20 ? 'ring-2 ring-green-500' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1"
          >
            <h3 className="font-semibold text-base leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {article.relevanceScore && article.relevanceScore >= 20 && (
                <Flame className="inline h-4 w-4 text-orange-500 mr-1" />
              )}
              {article.title}
            </h3>
          </a>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 flex-shrink-0"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {article.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {article.description}
          </p>
        )}

        {/* Competitors mentioned */}
        {article.competitors && article.competitors.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {article.competitors.map((comp) => (
              <Badge
                key={comp}
                className={COMPETITOR_TYPE_COLORS[article.competitorType || "indirect"]}
              >
                <Building2 className="h-3 w-3 mr-1" />
                {comp}
              </Badge>
            ))}
          </div>
        )}

        {/* Geography tags and language indicator */}
        <div className="mb-2 flex flex-wrap gap-1">
          {article.geography && article.geography.length > 0 && article.geography.map((geo) => (
            <span
              key={geo}
              className="inline-flex items-center text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded"
            >
              <MapPin className="h-3 w-3 mr-1" />
              {GEOGRAPHY_LABELS[geo as keyof typeof GEOGRAPHY_LABELS] || geo}
            </span>
          ))}
          {article.requiresTranslation && (
            <span className="inline-flex items-center text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
              <Languages className="h-3 w-3 mr-1" />
              DE → EN
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {relevanceBadge && (
              <Badge className={relevanceBadge.className}>
                {relevanceBadge.label}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className={CATEGORY_COLORS[article.category] || CATEGORY_COLORS.general}
            >
              {CATEGORY_LABELS[article.category] || article.category}
            </Badge>
            <span className="text-xs text-gray-500">{article.source}</span>
          </div>
          <span className="text-xs text-gray-400">{publishedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}
