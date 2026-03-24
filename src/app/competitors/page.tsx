"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  COMPETITORS_DATA,
  getAverageRating,
  type Competitor,
} from "@/lib/competitors";
import {
  Star,
  Users,
  MapPin,
  Building2,
  TrendingUp,
  TrendingDown,
  Globe,
  Smartphone,
  Minus,
  Newspaper,
} from "lucide-react";
import { CompetitorNewsModal } from "@/components/CompetitorNewsModal";

// Calculate MoM change from app reviews
function getMoMChange(reviews: { rating: number; previousRating?: number }[]): number {
  const validReviews = reviews.filter(r => r.previousRating !== undefined);
  if (validReviews.length === 0) return 0;

  const currentAvg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const previousAvg = validReviews.reduce((acc, r) => acc + (r.previousRating || r.rating), 0) / validReviews.length;

  return Math.round((currentAvg - previousAvg) * 10) / 10;
}

const TYPE_LABELS = {
  own: { label: "Our company", color: "bg-blue-500" },
  direct: { label: "Direct competitor", color: "bg-red-500" },
  indirect: { label: "Indirect competitor", color: "bg-orange-500" },
  traditional: { label: "Traditional insurer", color: "bg-slate-500" },
};

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : i === fullStars && hasHalf
                ? "fill-yellow-400/50 text-yellow-400"
                : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

// Compact card for 2x3 grid layout
function CompactCompetitorCard({
  competitor,
  onViewNews,
}: {
  competitor: Competitor;
  onViewNews: () => void;
}) {
  const avgRating = getAverageRating(competitor.appReviews);
  const typeConfig = TYPE_LABELS[competitor.type];
  const momChange = getMoMChange(competitor.appReviews);
  const hasNewsFeed = competitor.newsFeedSources && competitor.newsFeedSources.length > 0;

  return (
    <Card className={competitor.id === "alan" ? "ring-2 ring-blue-500" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{competitor.name}</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              {competitor.type !== "own" && (
                <Badge className={`${typeConfig.color} text-white text-xs`}>
                  {typeConfig.label}
                </Badge>
              )}
              {hasNewsFeed && (
                <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
                  <Newspaper className="h-3 w-3 mr-0.5" />
                  News
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{avgRating.toFixed(1)}</span>
              {momChange !== 0 && (
                <span className={`text-xs ${momChange > 0 ? "text-green-600" : "text-red-600"}`}>
                  {momChange > 0 ? "+" : ""}{momChange.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{competitor.description}</p>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="truncate">{competitor.headquarters}</span>
          </div>
          {competitor.members && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-gray-400" />
              <span>{competitor.members}</span>
            </div>
          )}
        </div>

        {/* App Ratings compact */}
        <div className="flex flex-wrap gap-1 mb-3">
          {competitor.appReviews.map((review) => (
            <div
              key={review.platform}
              className="flex items-center gap-0.5 text-xs bg-gray-100 px-1.5 py-0.5 rounded"
            >
              <span className="capitalize">{review.platform.slice(0, 3)}:</span>
              <span className="font-medium">{review.rating.toFixed(1)}</span>
            </div>
          ))}
        </div>

        {/* Top 3 strengths & Top 3 weaknesses */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <p className="font-medium text-green-700 mb-1">Strengths</p>
            {competitor.strengths.slice(0, 3).map((s, i) => (
              <div key={i} className="flex items-start gap-1 text-green-700">
                <span>+</span>
                <span className="line-clamp-1">{s}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <p className="font-medium text-red-700 mb-1">Weaknesses</p>
            {competitor.weaknesses.slice(0, 3).map((w, i) => (
              <div key={i} className="flex items-start gap-1 text-red-700">
                <span>-</span>
                <span className="line-clamp-1">{w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent 3 customer reviews */}
        {competitor.customerReviews && competitor.customerReviews.length > 0 && (
          <div className="mt-3 pt-2 border-t">
            <p className="text-xs font-medium text-gray-700 mb-2">Recent Reviews</p>
            <div className="space-y-1.5">
              {competitor.customerReviews.slice(0, 3).map((review, i) => (
                <div
                  key={i}
                  className={`text-xs p-1.5 rounded ${
                    review.sentiment === "positive"
                      ? "bg-green-50"
                      : review.sentiment === "negative"
                        ? "bg-red-50"
                        : "bg-gray-50"
                  }`}
                >
                  <p className="italic line-clamp-2">&ldquo;{review.text}&rdquo;</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{review.source} • {review.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mt-2">
          <a
            href={competitor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Visit website →
          </a>
          {hasNewsFeed && (
            <button
              onClick={onViewNews}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Voir actualites →
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Full card for detailed view
function CompetitorCard({ competitor }: { competitor: Competitor }) {
  const avgRating = getAverageRating(competitor.appReviews);
  const typeConfig = TYPE_LABELS[competitor.type];

  return (
    <Card className={competitor.id === "alan" ? "ring-2 ring-blue-500" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{competitor.name}</CardTitle>
            </div>
            {competitor.type !== "own" && (
              <Badge className={`${typeConfig.color} text-white`}>
                {typeConfig.label}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <RatingStars rating={avgRating} />
            <p className="text-xs text-gray-500 mt-1">Average rating</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{competitor.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{competitor.headquarters}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span>{competitor.markets.join(", ")}</span>
          </div>
          {competitor.members && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span>{competitor.members} members</span>
            </div>
          )}
          {competitor.valuation && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span>{competitor.valuation}</span>
            </div>
          )}
        </div>

        {/* App Ratings */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            App Ratings
          </h4>
          <div className="flex flex-wrap gap-2">
            {competitor.appReviews.map((review) => (
              <div
                key={review.platform}
                className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded"
              >
                <span className="capitalize font-medium">{review.platform}:</span>
                <span>{review.rating.toFixed(1)}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-500">
                  ({review.reviewCount.toLocaleString()})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-green-700">
              <TrendingUp className="h-4 w-4" />
              Strengths
            </h4>
            <ul className="text-xs space-y-1">
              {competitor.strengths.slice(0, 4).map((s, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-green-500">+</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-red-700">
              <TrendingDown className="h-4 w-4" />
              Weaknesses
            </h4>
            <ul className="text-xs space-y-1">
              {competitor.weaknesses.slice(0, 4).map((w, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-red-500">-</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Customer Reviews */}
        {competitor.customerReviews && competitor.customerReviews.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Recent Customer Reviews</h4>
            <div className="space-y-2">
              {competitor.customerReviews.slice(0, 3).map((review, i) => (
                <div
                  key={i}
                  className={`text-xs p-2 rounded ${
                    review.sentiment === "positive"
                      ? "bg-green-50 border-l-2 border-green-500"
                      : review.sentiment === "negative"
                        ? "bg-red-50 border-l-2 border-red-500"
                        : "bg-gray-50 border-l-2 border-gray-400"
                  }`}
                >
                  <p className="italic">&ldquo;{review.text}&rdquo;</p>
                  <p className="mt-1 text-gray-500">
                    {review.source} - {review.date} - {review.rating}/5
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t">
          <a
            href={competitor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Visit website →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  // All competitors for the grid view
  const allCompetitors = COMPETITORS_DATA;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Competitive Analysis</h1>
        <p className="text-gray-500">
          Detailed comparison of Alan with key competitors. Click &quot;Voir actualites&quot; to see company-specific news.
        </p>
      </div>

      {/* All Companies - 2x3 Grid */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Company Overview</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {allCompetitors.map((competitor) => (
            <CompactCompetitorCard
              key={competitor.id}
              competitor={competitor}
              onViewNews={() => setSelectedCompetitor(competitor)}
            />
          ))}
        </div>
      </section>

      {/* Ratings Comparison */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Ratings Comparison</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {COMPETITORS_DATA.sort(
                (a, b) => getAverageRating(b.appReviews) - getAverageRating(a.appReviews)
              ).map((competitor) => {
                const avgRating = getAverageRating(competitor.appReviews);
                const widthPercent = (avgRating / 5) * 100;
                const momChange = getMoMChange(competitor.appReviews);

                return (
                  <div key={competitor.id} className="flex items-center gap-4">
                    <div className="w-36 text-sm font-medium truncate">
                      {competitor.name}
                      {competitor.id === "alan" && (
                        <span className="ml-1 text-blue-500">★</span>
                      )}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div
                        className={`h-4 rounded-full ${
                          competitor.id === "alan" ? "bg-blue-500" : "bg-gray-400"
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm font-medium">
                      {avgRating.toFixed(1)}
                    </div>
                    <div className="w-20 text-xs flex items-center gap-1">
                      {momChange > 0 ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-green-600">+{momChange.toFixed(1)}</span>
                        </>
                      ) : momChange < 0 ? (
                        <>
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span className="text-red-600">{momChange.toFixed(1)}</span>
                        </>
                      ) : (
                        <>
                          <Minus className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-500">0.0</span>
                        </>
                      )}
                      <span className="text-gray-400">MoM</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Insights */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Key Insights</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-green-700 mb-2">
                  Alan&apos;s Competitive Advantages
                </h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      Best app rating among European insurtechs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      Ultra-fast reimbursement (24h) vs days for traditional insurers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      Responsive chat support (5 min response time)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      Integrated prevention approach (doctor, therapist, physio in-app)
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-amber-700 mb-2">
                  Areas for Improvement
                </h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">!</span>
                    <span>
                      Limited geographic expansion (4 markets)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">!</span>
                    <span>
                      Some complaints about serious illness coverage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">!</span>
                    <span>
                      Premium positioning may limit mass-market adoption
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Competitor News Modal */}
      {selectedCompetitor && (
        <CompetitorNewsModal
          competitor={selectedCompetitor}
          isOpen={!!selectedCompetitor}
          onClose={() => setSelectedCompetitor(null)}
        />
      )}
    </div>
  );
}
