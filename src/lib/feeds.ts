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
  // === FRENCH INSURANCE & HEALTH ===
  {
    name: "L'Argus de l'Assurance",
    url: "https://www.argusdelassurance.com/rss.xml",
    category: "insurance",
  },
  {
    name: "TICsanté",
    url: "https://www.ticsante.com/feed/",
    category: "health_tech",
  },
  {
    name: "Frenchweb",
    url: "https://www.frenchweb.fr/feed",
    category: "health_tech",
  },
  {
    name: "Maddyness",
    url: "https://www.maddyness.com/feed/",
    category: "funding",
  },
  {
    name: "News Assurances Pro",
    url: "https://www.newsassurancespro.com/feed/",
    category: "insurance",
  },

  // === EUROPEAN TECH & INSURTECH ===
  {
    name: "Sifted",
    url: "https://sifted.eu/feed",
    category: "funding",
  },
  {
    name: "EU-Startups",
    url: "https://www.eu-startups.com/feed/",
    category: "funding",
  },
  {
    name: "Tech.eu",
    url: "https://tech.eu/feed/",
    category: "funding",
  },

  // === HEALTH TECH ===
  {
    name: "MobiHealthNews",
    url: "https://www.mobihealthnews.com/feed",
    category: "health_tech",
  },
  {
    name: "Healthcare IT News",
    url: "https://www.healthcareitnews.com/feed",
    category: "health_tech",
  },
  {
    name: "Rock Health",
    url: "https://rockhealth.com/feed/",
    category: "health_tech",
  },
  {
    name: "STAT News",
    url: "https://www.statnews.com/feed/",
    category: "health_tech",
  },
  {
    name: "Fierce Healthcare",
    url: "https://www.fiercehealthcare.com/rss/xml",
    category: "health_tech",
  },
  {
    name: "Healthcare Dive",
    url: "https://www.healthcaredive.com/feeds/news/",
    category: "health_tech",
  },

  // === REGULATORY ===
  {
    name: "CNIL",
    url: "https://www.cnil.fr/fr/rss.xml",
    category: "regulatory",
  },
  {
    name: "HAS",
    url: "https://www.has-sante.fr/jcms/p_3048847/fr/flux-rss",
    category: "regulatory",
  },
  {
    name: "ACPR (Autorité de contrôle)",
    url: "https://acpr.banque-france.fr/rss/actualites",
    category: "regulatory",
  },

  // === FUNDING & BUSINESS NEWS ===
  {
    name: "TechCrunch Health",
    url: "https://techcrunch.com/category/health/feed/",
    category: "funding",
  },

  // === INSURANCE INDUSTRY ===
  {
    name: "Insurance Journal",
    url: "https://www.insurancejournal.com/feed/",
    category: "insurance",
  },
  {
    name: "Coverager",
    url: "https://coverager.com/feed/",
    category: "insurance",
  },
  {
    name: "The Digital Insurer",
    url: "https://www.the-digital-insurer.com/feed/",
    category: "insurance",
  },
  {
    name: "Digital Insurance",
    url: "https://www.dig-in.com/feed",
    category: "insurance",
  },

  // === GENERAL INSURTECH NEWS (stays in main feed) ===
  {
    name: "Google News - Insurtech France",
    url: "https://news.google.com/rss/search?q=insurtech+france+assurance&hl=fr&gl=FR&ceid=FR:fr",
    category: "insurance",
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
