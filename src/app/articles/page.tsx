"use client";

import { useEffect, useState, useCallback } from "react";
import { ArticleList } from "@/components/ArticleList";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SourceFilter } from "@/components/SourceFilter";
import { TimeFilter } from "@/components/TimeFilter";
import { RelevanceFilter } from "@/components/RelevanceFilter";
import { CompetitorFilter } from "@/components/CompetitorFilter";
import { GeographyFilter } from "@/components/GeographyFilter";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import type { Article, ArticlesResponse, FeedsResponse } from "@/types";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState("all");
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("7d");
  const [minRelevance, setMinRelevance] = useState("5");
  const [sortBy, setSortBy] = useState("relevance");
  const [competitor, setCompetitor] = useState("all");
  const [geography, setGeography] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== "all") params.set("category", category);
      if (source !== "all") params.set("source", source);
      if (search) params.set("search", search);
      params.set("time", timeFilter);
      params.set("minRelevance", minRelevance);
      params.set("sortBy", sortBy);
      if (competitor !== "all") params.set("competitor", competitor);
      if (geography !== "all") params.set("geography", geography);
      params.set("page", page.toString());
      params.set("limit", "12");

      const res = await fetch(`/api/articles?${params}`);
      const data: ArticlesResponse = await res.json();

      setArticles(data.articles);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [category, source, search, timeFilter, minRelevance, sortBy, competitor, geography, page]);

  const fetchSources = useCallback(async () => {
    try {
      const res = await fetch("/api/feeds");
      const data: FeedsResponse = await res.json();
      setSources(data.feeds.map((f) => f.name));
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  }, []);

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    setPage(1);
  }, [category, source, search, timeFilter, minRelevance, sortBy, competitor, geography]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Veille Concurrentielle Alan</h1>
        <p className="text-gray-500">
          {total} article{total !== 1 ? "s" : ""} pertinent
          {total !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher..."
        />
        <TimeFilter value={timeFilter} onChange={setTimeFilter} />
        <GeographyFilter value={geography} onChange={setGeography} />
        <CompetitorFilter value={competitor} onChange={setCompetitor} />
        <RelevanceFilter value={minRelevance} onChange={setMinRelevance} />
        <CategoryFilter value={category} onChange={setCategory} />
        <SourceFilter value={source} onChange={setSource} sources={sources} />
        <Button
          variant={sortBy === "relevance" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy(sortBy === "relevance" ? "date" : "relevance")}
        >
          <ArrowUpDown className="h-4 w-4 mr-1" />
          {sortBy === "relevance" ? "Par pertinence" : "Par date"}
        </Button>
      </div>

      <ArticleList articles={articles} isLoading={isLoading} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Précédent
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} sur {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
