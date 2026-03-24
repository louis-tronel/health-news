// Keywords and scoring for Alan-relevant news
// Alan is a French health insurance company focusing on B2B, digital experience, and AI

// Direct competitors - ONLY health insurance providers in Europe
export const COMPETITORS = {
  // European health insurance companies (direct competitors)
  direct: [
    { name: "Alan", keywords: ["alan insurance", "alan santé", "alan health", "alan assurance"] },
    { name: "Doctolib", keywords: ["doctolib"] }, // French healthtech, telehealth & booking
    { name: "Kry", keywords: ["kry healthcare", "kry health", "livi telehealth", "livi health"] }, // European telehealth leader
    { name: "Wefox", keywords: ["wefox"] }, // Largest European insurtech
    { name: "Elma Care", keywords: ["elma care"] },
    { name: "Kenko Health", keywords: ["kenko health"] },
    { name: "Ottonova", keywords: ["ottonova"] }, // German digital health insurer
    { name: "Getsafe", keywords: ["getsafe health", "getsafe kranken"] }, // German
    { name: "Feather", keywords: ["feather insurance health", "feather berlin"] }, // German expat health
  ],
  // US competitors (indirect)
  indirect: [
    { name: "Oscar Health", keywords: ["oscar health", "hioscar"] },
    { name: "Clover Health", keywords: ["clover health"] },
    { name: "Devoted Health", keywords: ["devoted health"] },
    { name: "Collective Health", keywords: ["collective health"] },
    { name: "Bright Health", keywords: ["bright health", "neuehealth"] },
    { name: "Lemonade", keywords: ["lemonade insurance"] },
    { name: "Vitality", keywords: ["vitality health", "vitality insurance"] },
  ],
  // Traditional French/European insurers
  traditional: [
    // French mutuelles & insurers
    { name: "MGEN", keywords: ["mgen"] },
    { name: "Harmonie Mutuelle", keywords: ["harmonie mutuelle"] },
    { name: "Malakoff Humanis", keywords: ["malakoff humanis"] },
    { name: "AG2R La Mondiale", keywords: ["ag2r", "la mondiale"] },
    { name: "MAIF", keywords: ["maif"] },
    { name: "MACIF", keywords: ["macif"] },
    { name: "MACSF", keywords: ["macsf"] },
    { name: "Groupe Vyv", keywords: ["vyv", "groupe vyv"] },
    { name: "Aésio Mutuelle", keywords: ["aésio", "aesio"] },
    { name: "April", keywords: ["april assurance", "april insurance"] },
    { name: "Henner", keywords: ["henner"] },
    { name: "Swisslife", keywords: ["swisslife", "swiss life france"] },
    // European majors
    { name: "Axa", keywords: ["axa santé", "axa health"] },
    { name: "Allianz", keywords: ["allianz health", "allianz santé"] },
    { name: "Generali", keywords: ["generali health", "generali santé"] },
    { name: "CNP Assurances", keywords: ["cnp assurances"] },
    { name: "Groupama", keywords: ["groupama"] },
    // Belgian
    { name: "DKV Belgium", keywords: ["dkv belgium", "dkv belgique"] },
    { name: "Partena", keywords: ["partena", "partenamut"] },
    { name: "Helan", keywords: ["helan"] },
    // Spanish
    { name: "Sanitas", keywords: ["sanitas"] },
    { name: "Mapfre", keywords: ["mapfre"] },
    { name: "DKV Spain", keywords: ["dkv spain", "dkv españa"] },
  ],
} as const;

// Geography detection
export const GEOGRAPHY = {
  france: ["france", "french", "français", "paris", "lyon", "marseille"],
  belgium: ["belgium", "belgian", "belgique", "brussels", "bruxelles"],
  spain: ["spain", "spanish", "españa", "espagne", "madrid", "barcelona"],
  germany: ["germany", "german", "allemagne", "deutschland", "berlin", "munich"],
  uk: ["uk", "united kingdom", "british", "london", "england"],
  netherlands: ["netherlands", "dutch", "amsterdam", "holland"],
  europe: ["europe", "european", "eu", "union européenne"],
  canada: ["canada", "canadian", "quebec", "toronto", "montreal"],
  usa: ["usa", "united states", "american", "us health"],
} as const;

export type GeographyRegion = keyof typeof GEOGRAPHY;

// Negative keywords - articles containing these are likely irrelevant
export const NEGATIVE_KEYWORDS = [
  // Unrelated industries
  "crypto", "bitcoin", "nft", "blockchain",
  "gaming", "esports", "video game",
  "fashion", "luxury", "beauty", "cosmetic",
  "restaurant", "food delivery", "foodtech",
  "real estate", "immobilier", "proptech",
  "automotive", "electric vehicle", "ev charging",
  "travel", "tourism", "hotel", "airline",
  "ecommerce", "marketplace", "retail",
  "social media", "influencer", "tiktok", "instagram",
  "music", "streaming", "entertainment",
  "dating", "rencontre",
  "sport", "fitness tracker", "wearable",
  // Climate/environment (not health-related)
  "climate", "climat", "carbon", "carbone", "solar", "solaire",
  "renewable energy", "énergie renouvelable", "wind turbine",
  "aviation", "airplane", "avion", "flight", "vol autour du monde",
  "tour du monde", "world tour", "pilot", "pilote",
  "sustainability", "durabilité", "green energy",
  // Marketing/branding unrelated
  "plateforme de marque", "brand platform", "rebranding",
  "marketing campaign", "publicité",
  // Other insurance types (not health)
  "car insurance", "auto insurance", "assurance auto",
  "home insurance", "assurance habitation",
  "pet insurance", "assurance animaux",
  "travel insurance", "assurance voyage",
  "cyber insurance", "assurance cyber",
];

export const ALAN_KEYWORDS = {
  // Core health insurance topics (high weight)
  health_insurance: [
    "health insurance",
    "assurance santé",
    "mutuelle",
    "complémentaire santé",
    "couverture santé",
    "health coverage",
    "employee health benefits",
    "santé entreprise",
    "prévoyance santé",
    "remboursement santé",
    "health plan",
    "medical insurance",
    "assurance maladie complémentaire",
  ],

  // Insurtech (medium-high weight)
  insurtech: [
    "insurtech",
    "digital insurance",
    "assurance digitale",
    "insurance startup",
    "néo-assurance",
  ],

  // Digital health services (medium weight)
  digital_health: [
    "telemedicine", "télémédecine",
    "digital health", "santé numérique",
    "health app", "application santé",
    "teleconsultation", "téléconsultation",
    "e-health", "e-santé",
  ],

  // Business & Funding (lower weight, needs health context)
  business: [
    "health startup funding",
    "insurtech funding",
    "levée de fonds santé",
    "health tech investment",
  ],

  // Regulatory (important for compliance)
  regulatory: [
    "healthcare regulation",
    "réglementation santé",
    "rgpd santé",
    "health data privacy",
    "sécurité sociale",
    "assurance maladie obligatoire",
  ],
} as const;

export type RelevanceCategory = keyof typeof ALAN_KEYWORDS;

export interface RelevanceScore {
  score: number;
  matchedKeywords: string[];
  categories: RelevanceCategory[];
  geography: GeographyRegion[];
  competitors: string[];
  competitorType: "direct" | "indirect" | "traditional" | null;
  isFiltered: boolean; // True if article should be filtered out
}

const CATEGORY_WEIGHTS: Record<RelevanceCategory, number> = {
  health_insurance: 8, // Core topic - highest weight
  insurtech: 6,
  digital_health: 4,
  business: 2, // Lower weight - needs other context
  regulatory: 3,
};

const GEOGRAPHY_WEIGHTS: Partial<Record<GeographyRegion, number>> = {
  france: 5,
  belgium: 4,
  spain: 4,
  europe: 4,
  germany: 3,
  uk: 3,
  netherlands: 3,
  canada: 2,
  usa: 0, // No bonus for US news
};

export function calculateRelevance(
  title: string,
  description: string | null
): RelevanceScore {
  const text = `${title} ${description || ""}`.toLowerCase();
  const matchedKeywords: string[] = [];
  const matchedCategories = new Set<RelevanceCategory>();
  const matchedGeography = new Set<GeographyRegion>();
  const matchedCompetitors: string[] = [];
  let competitorType: "direct" | "indirect" | "traditional" | null = null;
  let score = 0;
  let isFiltered = false;

  // Check negative keywords first - if too many, filter out
  let negativeCount = 0;
  for (const keyword of NEGATIVE_KEYWORDS) {
    if (text.includes(keyword.toLowerCase())) {
      negativeCount++;
    }
  }
  // If 2+ negative keywords and no health insurance keywords, likely irrelevant
  if (negativeCount >= 2) {
    isFiltered = true;
  }

  // Check competitors (highest weight for direct European health insurers)
  for (const [type, competitors] of Object.entries(COMPETITORS)) {
    for (const competitor of competitors) {
      for (const keyword of competitor.keywords) {
        if (text.includes(keyword.toLowerCase())) {
          matchedCompetitors.push(competitor.name);
          matchedKeywords.push(competitor.name);

          if (type === "direct") {
            score += 20; // Highest weight for direct health insurance competitors
            competitorType = "direct";
            isFiltered = false; // Override filter if competitor mentioned
          } else if (type === "indirect") {
            score += 10;
            if (!competitorType) competitorType = "indirect";
          } else {
            score += 8;
            if (!competitorType) competitorType = "traditional";
          }
          break; // Only count each competitor once
        }
      }
    }
  }

  // Check geography
  for (const [region, keywords] of Object.entries(GEOGRAPHY)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        matchedGeography.add(region as GeographyRegion);
        const weight = GEOGRAPHY_WEIGHTS[region as GeographyRegion] || 0;
        score += weight;
        break; // Only count each region once
      }
    }
  }

  // Check topic keywords
  let hasHealthInsuranceKeyword = false;
  for (const [category, keywords] of Object.entries(ALAN_KEYWORDS)) {
    const cat = category as RelevanceCategory;
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        matchedKeywords.push(keyword);
        matchedCategories.add(cat);
        score += CATEGORY_WEIGHTS[cat];

        if (cat === "health_insurance" || cat === "insurtech") {
          hasHealthInsuranceKeyword = true;
          isFiltered = false; // Override filter if health insurance keyword found
        }
      }
    }
  }

  // If no health insurance related keywords at all, mark as filtered
  if (!hasHealthInsuranceKeyword && matchedCompetitors.length === 0 && score < 10) {
    isFiltered = true;
  }

  return {
    score,
    matchedKeywords: [...new Set(matchedKeywords)],
    categories: Array.from(matchedCategories),
    geography: Array.from(matchedGeography),
    competitors: [...new Set(matchedCompetitors)],
    competitorType,
    isFiltered,
  };
}

export function getRelevanceLabel(score: number): {
  label: string;
  color: string;
} {
  if (score >= 20) return { label: "Très pertinent", color: "bg-green-500" };
  if (score >= 10) return { label: "Pertinent", color: "bg-blue-500" };
  if (score >= 5) return { label: "Modéré", color: "bg-yellow-500" };
  return { label: "Faible", color: "bg-gray-400" };
}

// Get all competitor names for filtering
export function getAllCompetitors(): { name: string; type: string }[] {
  const result: { name: string; type: string }[] = [];
  for (const [type, competitors] of Object.entries(COMPETITORS)) {
    for (const competitor of competitors) {
      result.push({ name: competitor.name, type });
    }
  }
  return result;
}

// Geography labels
export const GEOGRAPHY_LABELS: Record<GeographyRegion, string> = {
  france: "France",
  belgium: "Belgique",
  spain: "Espagne",
  germany: "Allemagne",
  uk: "Royaume-Uni",
  netherlands: "Pays-Bas",
  europe: "Europe",
  canada: "Canada",
  usa: "États-Unis",
};

// Time filters for weekly digest
export const TIME_FILTERS = {
  "7d": { label: "7 derniers jours", days: 7 },
  "14d": { label: "14 derniers jours", days: 14 },
  "30d": { label: "30 derniers jours", days: 30 },
  all: { label: "Tout", days: null },
} as const;

export type TimeFilter = keyof typeof TIME_FILTERS;

// Language detection based on common words
const GERMAN_INDICATORS = [
  "und", "der", "die", "das", "ist", "nicht", "für", "mit", "auf", "sich",
  "versicherung", "krankenversicherung", "gesundheit", "unternehmen",
  "millionen", "deutschland", "münchen", "berlin", "beiträge", "kunden"
];

const FRENCH_INDICATORS = [
  "et", "le", "la", "les", "de", "du", "des", "est", "pour", "avec",
  "assurance", "santé", "mutuelle", "entreprise", "france", "paris"
];

const SPANISH_INDICATORS = [
  "y", "el", "la", "los", "las", "de", "del", "es", "para", "con",
  "seguro", "salud", "empresa", "españa", "madrid", "barcelona"
];

export type Language = "en" | "fr" | "es" | "de" | "unknown";

export function detectLanguage(text: string): Language {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);

  let germanScore = 0;
  let frenchScore = 0;
  let spanishScore = 0;

  for (const word of words) {
    if (GERMAN_INDICATORS.includes(word)) germanScore++;
    if (FRENCH_INDICATORS.includes(word)) frenchScore++;
    if (SPANISH_INDICATORS.includes(word)) spanishScore++;
  }

  // Check for specific German patterns (compound words, umlauts)
  if (/[äöüß]/.test(lowerText)) germanScore += 3;
  if (/ung\b|heit\b|keit\b/.test(lowerText)) germanScore += 2;

  // French patterns
  if (/[éèêëàâùûîïôç]/.test(lowerText)) frenchScore += 2;
  if (/\bqu['']/.test(lowerText) || /\bl['']/.test(lowerText)) frenchScore += 2;

  // Spanish patterns
  if (/[ñ¿¡áéíóú]/.test(lowerText)) spanishScore += 3;

  const maxScore = Math.max(germanScore, frenchScore, spanishScore);

  if (maxScore >= 3) {
    if (germanScore === maxScore) return "de";
    if (frenchScore === maxScore) return "fr";
    if (spanishScore === maxScore) return "es";
  }

  return "en"; // Default to English
}

// Check if article is in a supported language (not German)
export function isInSupportedLanguage(text: string): boolean {
  const lang = detectLanguage(text);
  return lang !== "de";
}

// Flag German articles that need translation
export function needsTranslation(text: string): boolean {
  return detectLanguage(text) === "de";
}

// Trusted/reputable sources for health, insurance, and tech news
export const TRUSTED_SOURCES = [
  // Major tech/business publications
  "techcrunch", "sifted", "eu-startups", "maddyness", "frenchweb",
  "tech.eu", "the information", "bloomberg", "reuters", "financial times", "wsj",
  "les echos", "le monde", "le figaro", "bfm", "la tribune",
  // Health tech specific
  "mobihealthnews", "healthcare it news", "rock health", "stat news",
  "fierce healthcare", "health affairs", "modern healthcare",
  "healthcare dive", "digital health", "healthtech", "ticsante", "tic santé",
  // Insurance specific
  "insurance journal", "coverager", "the digital insurer", "dig-in",
  "digital insurance", "argus de l'assurance", "news assurances pro", "insurance insider",
  // Regulatory
  "cnil", "has-sante", "acpr", "banque de france",
  // Google News aggregation (curated)
  "news.google.com",
];

// Known low-quality or overly niche sources to deprioritize
export const LOW_QUALITY_SOURCES = [
  "healthitanswers", "health it answers",
  "medium.com", // Too generic, many low-quality posts
  "blogspot", "wordpress.com", // Generic blog platforms
  "substack", // Mixed quality
];

// Check if source is trusted
export function isSourceTrusted(source: string): boolean {
  const lowerSource = source.toLowerCase();
  return TRUSTED_SOURCES.some(trusted => lowerSource.includes(trusted));
}

// Check if source is low quality
export function isSourceLowQuality(source: string): boolean {
  const lowerSource = source.toLowerCase();
  return LOW_QUALITY_SOURCES.some(low => lowerSource.includes(low));
}
