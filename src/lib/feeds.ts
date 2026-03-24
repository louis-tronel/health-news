export const CATEGORIES = {
  health_tech: "Health Tech",
  insurance: "Insurance",
  regulatory: "Regulatory",
  funding: "Funding",
  general: "General",
  competitor_news: "Competitor News", // Company-specific news, shown in Competitors tab only
} as const;

export type Category = keyof typeof CATEGORIES;

export interface FeedConfig {
  name: string;
  url: string;
  category: Category;
}

export const DEFAULT_FEEDS: FeedConfig[] = [
  // === TOP 10 SOURCES BY AUDIENCE ===
  // Only keeping major outlets to surface important news

  // #1 - TechCrunch Health (~10M+ monthly visitors)
  {
    name: "TechCrunch Health",
    url: "https://techcrunch.com/category/health/feed/",
    category: "funding",
  },
  // #2 - STAT News (~3M monthly visitors)
  {
    name: "STAT News",
    url: "https://www.statnews.com/feed/",
    category: "health_tech",
  },
  // #3 - Maddyness (~1M monthly visitors)
  {
    name: "Maddyness",
    url: "https://www.maddyness.com/feed/",
    category: "funding",
  },
  // #4 - Sifted (~500K monthly visitors)
  {
    name: "Sifted",
    url: "https://sifted.eu/feed",
    category: "funding",
  },
  // #5 - Frenchweb (~500K monthly visitors)
  {
    name: "Frenchweb",
    url: "https://www.frenchweb.fr/feed",
    category: "health_tech",
  },
  // #6 - Fierce Healthcare (~500K monthly visitors)
  {
    name: "Fierce Healthcare",
    url: "https://www.fiercehealthcare.com/rss/xml",
    category: "health_tech",
  },
  // #7 - Healthcare IT News (~300K monthly visitors)
  {
    name: "Healthcare IT News",
    url: "https://www.healthcareitnews.com/feed",
    category: "health_tech",
  },
  // #8 - EU-Startups (~300K monthly visitors)
  {
    name: "EU-Startups",
    url: "https://www.eu-startups.com/feed/",
    category: "funding",
  },
  // #9 - Insurance Journal (~300K monthly visitors)
  {
    name: "Insurance Journal",
    url: "https://www.insurancejournal.com/feed/",
    category: "insurance",
  },
  // #10 - Tech.eu (~200K monthly visitors)
  {
    name: "Tech.eu",
    url: "https://tech.eu/feed/",
    category: "funding",
  },

  // === COMPETITOR-SPECIFIC NEWS (shown in Competitors tab only) ===
  // These feeds track individual companies - useful for deep dives but too noisy for main feed
  {
    name: "Alan Blog",
    url: "https://alan.com/blog/rss.xml",
    category: "competitor_news",
  },
  {
    name: "Google News - Alan",
    url: "https://news.google.com/rss/search?q=alan+assurance+santé&hl=fr&gl=FR&ceid=FR:fr",
    category: "competitor_news",
  },
  {
    name: "Google News - Harmonie Mutuelle",
    url: "https://news.google.com/rss/search?q=harmonie+mutuelle&hl=fr&gl=FR&ceid=FR:fr",
    category: "competitor_news",
  },
  {
    name: "Google News - Malakoff Humanis",
    url: "https://news.google.com/rss/search?q=malakoff+humanis&hl=fr&gl=FR&ceid=FR:fr",
    category: "competitor_news",
  },
  {
    name: "Google News - AXA Santé France",
    url: "https://news.google.com/rss/search?q=axa+santé+mutuelle&hl=fr&gl=FR&ceid=FR:fr",
    category: "competitor_news",
  },
  {
    name: "Google News - Groupe VYV MGEN",
    url: "https://news.google.com/rss/search?q=groupe+vyv+OR+mgen+mutuelle&hl=fr&gl=FR&ceid=FR:fr",
    category: "competitor_news",
  },
  {
    name: "Google News - AG2R La Mondiale",
    url: "https://news.google.com/rss/search?q=ag2r+la+mondiale&hl=fr&gl=FR&ceid=FR:fr",
    category: "competitor_news",
  },
  {
    name: "Google News - Groupama Santé",
    url: "https://news.google.com/rss/search?q=groupama+santé+mutuelle&hl=fr&gl=FR&ceid=FR:fr",
    category: "competitor_news",
  },
  {
    name: "Google News - Oscar Health",
    url: "https://news.google.com/rss/search?q=oscar+health+insurance&hl=en-US&gl=US&ceid=US:en",
    category: "competitor_news",
  },
  {
    name: "Google News - Doctolib",
    url: "https://news.google.com/rss/search?q=doctolib&hl=fr&gl=FR&ceid=FR:fr",
    category: "competitor_news",
  },
  {
    name: "Google News - Kry Livi",
    url: "https://news.google.com/rss/search?q=kry+healthcare+OR+livi+telehealth&hl=en&gl=GB&ceid=GB:en",
    category: "competitor_news",
  },
  {
    name: "Google News - Wefox",
    url: "https://news.google.com/rss/search?q=wefox+insurance&hl=en&gl=DE&ceid=DE:en",
    category: "competitor_news",
  },
];
