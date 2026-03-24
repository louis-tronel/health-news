export interface Article {
  id: string;
  title: string;
  description: string | null;
  url: string;
  source: string;
  category: string;
  imageUrl: string | null;
  publishedAt: string | Date;
  createdAt: string | Date;
  relevanceScore?: number;
  matchedKeywords?: string[];
  relevanceCategories?: string[];
  geography?: string[];
  competitors?: string[];
  competitorType?: "direct" | "indirect" | "traditional" | null;
  language?: "en" | "fr" | "es" | "de" | "unknown";
  requiresTranslation?: boolean;
}

export interface Feed {
  id: string;
  name: string;
  url: string;
  category: string;
  lastFetchedAt: string | null;
  isActive: boolean;
}

export interface ArticlesResponse {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FeedsResponse {
  feeds: Feed[];
}
