// Competitor analysis data for Alan
// Data should be updated periodically
// ONLY includes health insurance providers (direct competitors)

export interface AppReview {
  platform: "ios" | "android" | "trustpilot";
  rating: number;
  reviewCount: number;
  lastUpdated: string;
  previousRating?: number; // For MoM comparison
}

export interface CustomerReview {
  text: string;
  rating: number;
  date: string;
  source: string;
  sentiment: "positive" | "negative" | "neutral";
}

export interface Competitor {
  id: string;
  name: string;
  logo?: string;
  description: string;
  founded: number;
  headquarters: string;
  markets: string[];
  type: "own" | "direct" | "indirect" | "traditional";
  funding?: string;
  valuation?: string;
  employees?: string;
  members?: string;
  appReviews: AppReview[];
  customerReviews: CustomerReview[];
  strengths: string[];
  weaknesses: string[];
  website: string;
  newsFeedSources?: string[]; // RSS feed source names for company-specific news
}

export const COMPETITORS_DATA: Competitor[] = [
  {
    id: "alan",
    name: "Alan",
    description: "Europe's first digital health insurance. Combines prevention, insurance and daily health support.",
    founded: 2016,
    headquarters: "Paris, France",
    markets: ["France", "Belgium", "Spain", "Canada"],
    type: "own",
    funding: "€500M+",
    valuation: "€4.5B",
    employees: "700+",
    members: "700,000+",
    appReviews: [
      { platform: "ios", rating: 4.9, reviewCount: 6500, lastUpdated: "2026-02", previousRating: 4.9 },
      { platform: "android", rating: 4.2, reviewCount: 3050, lastUpdated: "2026-02", previousRating: 4.1 },
      { platform: "trustpilot", rating: 4.3, reviewCount: 750, lastUpdated: "2026-02", previousRating: 4.4 },
    ],
    customerReviews: [
      {
        text: "Simply an excellent health insurance in every way. I can only recommend it.",
        rating: 5,
        date: "2026-01-30",
        source: "Trustpilot",
        sentiment: "positive",
      },
      {
        text: "Fast and clear response. Very professional and attentive. I recommend this insurance for its fluidity and responsiveness as well as its top-notch coverage.",
        rating: 5,
        date: "2026-02-21",
        source: "Trustpilot",
        sentiment: "positive",
      },
      {
        text: "Great app, amazing customer service and their entire approach is modern and client friendly. Everyone in our company loves Alan.",
        rating: 5,
        date: "2026-01",
        source: "App Store",
        sentiment: "positive",
      },
      {
        text: "Alan is not what it used to be... you ask questions on the chat, nobody answers; you ask to be called back... you have to wait 3-4 days.",
        rating: 2,
        date: "2026-02-20",
        source: "Trustpilot",
        sentiment: "negative",
      },
      {
        text: "Multiple exchanges with an AI that completely misses the point of my questions.",
        rating: 2,
        date: "2026-02-17",
        source: "Trustpilot",
        sentiment: "negative",
      },
      {
        text: "Excessive premium increases year after year (2021, 2023, 2024, 2026...). The startup Alan that wanted to disrupt the market... no longer exists.",
        rating: 1,
        date: "2026-02",
        source: "Trustpilot",
        sentiment: "negative",
      },
      {
        text: "One of the worst coverages in France. It's way too expensive for what little it covers, especially regarding glasses, teeth and alternative medicines.",
        rating: 1,
        date: "2026-01",
        source: "Trustpilot",
        sentiment: "negative",
      },
    ],
    strengths: [
      "Ultra-fast reimbursement (24h)",
      "Excellent UX/UI",
      "Responsive chat support",
      "Integrated health services (therapist, physio, doctor)",
      "33,000+ business clients",
      "Prevention-first approach",
    ],
    weaknesses: [
      "Limited to 4 markets",
      "Regular price increases",
      "Support sometimes perceived as bot-like",
      "Limited coverage (glasses, dental, alternative medicine)",
    ],
    website: "https://alan.com",
    newsFeedSources: ["Alan Blog", "Google News - Alan"],
  },
  {
    id: "doctolib",
    name: "Doctolib",
    description: "Europe's leading healthcare booking platform. Expanded into telehealth and practice management software.",
    founded: 2013,
    headquarters: "Paris, France",
    markets: ["France", "Germany", "Italy"],
    type: "direct",
    funding: "€500M+",
    valuation: "€6B+",
    employees: "2,800+",
    members: "80M+ patients",
    appReviews: [
      { platform: "ios", rating: 4.8, reviewCount: 450000, lastUpdated: "2026-03", previousRating: 4.8 },
      { platform: "android", rating: 4.6, reviewCount: 320000, lastUpdated: "2026-03", previousRating: 4.5 },
      { platform: "trustpilot", rating: 3.9, reviewCount: 12000, lastUpdated: "2026-03", previousRating: 3.8 },
    ],
    customerReviews: [
      {
        text: "Essential app for booking doctors in France. Easy to find available slots and manage appointments.",
        rating: 5,
        date: "2026-02",
        source: "App Store",
        sentiment: "positive",
      },
      {
        text: "Teleconsultation works well but video quality can be inconsistent. Good for quick consultations.",
        rating: 4,
        date: "2026-02",
        source: "Google Play",
        sentiment: "positive",
      },
    ],
    strengths: [
      "Dominant market position in France",
      "Massive user base (80M+ patients)",
      "Strong telehealth offering",
      "Expanding into healthcare services",
      "Excellent app ratings",
    ],
    weaknesses: [
      "Not an insurer (complementary, not competing)",
      "Revenue dependent on healthcare providers",
      "Limited outside France/Germany/Italy",
    ],
    website: "https://doctolib.fr",
    newsFeedSources: ["Google News - Doctolib"],
  },
  {
    id: "kry",
    name: "Kry / Livi",
    description: "Europe's largest digital healthcare provider. On-demand telehealth across multiple countries.",
    founded: 2015,
    headquarters: "Stockholm, Sweden",
    markets: ["Sweden", "Norway", "UK", "France", "Germany"],
    type: "direct",
    funding: "$700M+",
    valuation: "$2B+",
    employees: "1,500+",
    members: "200M+ patient interactions",
    appReviews: [
      { platform: "ios", rating: 4.7, reviewCount: 85000, lastUpdated: "2026-03", previousRating: 4.7 },
      { platform: "android", rating: 4.5, reviewCount: 42000, lastUpdated: "2026-03", previousRating: 4.4 },
      { platform: "trustpilot", rating: 4.2, reviewCount: 8500, lastUpdated: "2026-03", previousRating: 4.1 },
    ],
    customerReviews: [
      {
        text: "Got a doctor appointment within 10 minutes. Prescription sent directly to my pharmacy. Incredibly convenient.",
        rating: 5,
        date: "2026-02",
        source: "Trustpilot",
        sentiment: "positive",
      },
      {
        text: "Good for minor issues but felt rushed during consultation. Doctors have limited time per patient.",
        rating: 3,
        date: "2026-02",
        source: "App Store",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Market leader in European telehealth",
      "Fast access to doctors (minutes)",
      "Multi-country presence including France",
      "Strong app experience",
      "Integrated prescriptions",
    ],
    weaknesses: [
      "Not an insurer (service provider)",
      "Consultations can feel rushed",
      "Dependent on partnerships with insurers/NHS",
    ],
    website: "https://kry.se",
    newsFeedSources: ["Google News - Kry Livi"],
  },
  {
    id: "wefox",
    name: "Wefox",
    description: "Europe's largest insurtech. B2B2C platform connecting insurers, brokers, and customers.",
    founded: 2015,
    headquarters: "Berlin, Germany",
    markets: ["Germany", "Switzerland", "Austria", "Poland", "Italy"],
    type: "direct",
    funding: "$1.3B+",
    valuation: "$4.5B",
    employees: "1,400+",
    members: "3M+ customers",
    appReviews: [
      { platform: "ios", rating: 4.4, reviewCount: 15000, lastUpdated: "2026-03", previousRating: 4.3 },
      { platform: "android", rating: 4.2, reviewCount: 22000, lastUpdated: "2026-03", previousRating: 4.1 },
      { platform: "trustpilot", rating: 3.8, reviewCount: 4500, lastUpdated: "2026-03", previousRating: 3.7 },
    ],
    customerReviews: [
      {
        text: "Easy to manage all my insurance policies in one place. Claims process is straightforward.",
        rating: 4,
        date: "2026-02",
        source: "Trustpilot",
        sentiment: "positive",
      },
      {
        text: "Good platform but customer service response times could be better.",
        rating: 3,
        date: "2026-02",
        source: "Google Play",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Largest European insurtech by valuation",
      "B2B2C platform model",
      "700+ exclusive agents",
      "Multi-product (not just health)",
      "Strong tech infrastructure",
    ],
    weaknesses: [
      "Not direct-to-consumer focused",
      "Complex business model",
      "Limited health insurance focus",
      "Not in France yet",
    ],
    website: "https://wefox.com",
    newsFeedSources: ["Google News - Wefox"],
  },
  {
    id: "ottonova",
    name: "Ottonova",
    description: "Germany's first 100% digital private health insurance.",
    founded: 2017,
    headquarters: "Munich, Germany",
    markets: ["Germany"],
    type: "indirect",
    funding: "€100M+",
    employees: "200+",
    members: "50,000+",
    appReviews: [
      { platform: "ios", rating: 4.6, reviewCount: 1200, lastUpdated: "2026-02", previousRating: 4.5 },
      { platform: "android", rating: 4.4, reviewCount: 800, lastUpdated: "2026-02", previousRating: 4.3 },
      { platform: "trustpilot", rating: 4.1, reviewCount: 450, lastUpdated: "2026-02", previousRating: 4.0 },
    ],
    customerReviews: [
      {
        text: "Super simple app, invoices are reimbursed quickly. Finally a modern health insurance.",
        rating: 5,
        date: "2026-01",
        source: "Trustpilot",
        sentiment: "positive",
      },
      {
        text: "The digital processing is great, but the premiums increase significantly every year.",
        rating: 3,
        date: "2026-02",
        source: "Google Play",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "100% digital - no paperwork",
      "Fast reimbursement via app",
      "Integrated telemedicine",
      "Modern UX",
    ],
    weaknesses: [
      "Germany only",
      "Private insurance (not for everyone)",
      "Annual price increases",
    ],
    website: "https://ottonova.de",
  },
  {
    id: "oscar",
    name: "Oscar Health",
    description: "Tech-driven health insurance in the US, focused on simplicity and personalization.",
    founded: 2012,
    headquarters: "New York, USA",
    markets: ["USA (21 states)"],
    type: "indirect",
    funding: "$1.6B+",
    valuation: "Public (NYSE: OSCR)",
    employees: "3,000+",
    members: "1.5M+",
    appReviews: [
      { platform: "ios", rating: 4.7, reviewCount: 45000, lastUpdated: "2026-02", previousRating: 4.7 },
      { platform: "android", rating: 4.2, reviewCount: 15000, lastUpdated: "2026-02", previousRating: 4.1 },
      { platform: "trustpilot", rating: 2.8, reviewCount: 320, lastUpdated: "2026-02", previousRating: 2.9 },
    ],
    customerReviews: [
      {
        text: "Oscar insurance has been good to me with quality care from my providers.",
        rating: 5,
        date: "2026-01",
        source: "Google Play",
        sentiment: "positive",
      },
      {
        text: "The app barely lets me log in. I have messages on the app that I can't read because I can't log in.",
        rating: 2,
        date: "2026-01",
        source: "Google Play",
        sentiment: "negative",
      },
    ],
    strengths: [
      "Free telemedicine",
      "Step rewards ($1/day)",
      "Powerful digital tools",
      "Large US doctor network",
      "94% member retention",
    ],
    weaknesses: [
      "USA only",
      "App login issues",
      "Imprecise doctor search",
    ],
    website: "https://hioscar.com",
    newsFeedSources: ["Google News - Oscar Health"],
  },
  {
    id: "kaiser",
    name: "Kaiser Permanente",
    description: "Largest integrated managed care consortium in the US. Combines insurance with healthcare delivery through owned hospitals and clinics.",
    founded: 1945,
    headquarters: "Oakland, California, USA",
    markets: ["USA (8 states + DC)"],
    type: "indirect",
    employees: "300,000+",
    members: "12.7M+",
    appReviews: [
      { platform: "ios", rating: 4.8, reviewCount: 850000, lastUpdated: "2026-02", previousRating: 4.8 },
      { platform: "android", rating: 4.6, reviewCount: 320000, lastUpdated: "2026-02", previousRating: 4.5 },
    ],
    customerReviews: [
      {
        text: "Love the integrated care model. Everything in one place - appointments, prescriptions, test results. Best healthcare app I've used.",
        rating: 5,
        date: "2026-02-14",
        source: "App Store",
        sentiment: "positive",
      },
      {
        text: "Getting a same-day appointment is nearly impossible. The app is great but finding available doctors is frustrating.",
        rating: 3,
        date: "2026-02-10",
        source: "Google Play",
        sentiment: "neutral",
      },
      {
        text: "Telemedicine is excellent. Video visits with doctors are smooth and they can prescribe directly. Very convenient.",
        rating: 5,
        date: "2026-02-08",
        source: "Trustpilot",
        sentiment: "positive",
      },
    ],
    strengths: [
      "Vertically integrated (insurance + care)",
      "Excellent app ratings",
      "Strong telemedicine platform",
      "Own hospital network",
      "Massive member base",
      "Pioneer in preventive care",
    ],
    weaknesses: [
      "Limited to Kaiser network only",
      "USA only (8 states)",
      "Long wait times for specialists",
      "Less flexibility in provider choice",
    ],
    website: "https://healthy.kaiserpermanente.org",
  },
  {
    id: "harmonie",
    name: "Harmonie Mutuelle",
    description: "France's largest health mutual, specialized in social protection.",
    founded: 2012,
    headquarters: "Paris, France",
    markets: ["France"],
    type: "traditional",
    members: "5M+",
    employees: "5,500+",
    appReviews: [
      { platform: "ios", rating: 3.2, reviewCount: 2100, lastUpdated: "2026-02", previousRating: 3.1 },
      { platform: "android", rating: 2.8, reviewCount: 1800, lastUpdated: "2026-02", previousRating: 2.7 },
    ],
    customerReviews: [
      {
        text: "App crashes regularly. Impossible to see my reimbursements.",
        rating: 1,
        date: "2026-01",
        source: "App Store",
        sentiment: "negative",
      },
      {
        text: "Good insurance but the app and customer service are from another era.",
        rating: 3,
        date: "2026-02",
        source: "Trustpilot",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Largest French mutual",
      "Extensive care network",
      "Strong brand awareness",
      "Comprehensive coverage",
    ],
    weaknesses: [
      "Aging technology",
      "Slow digital transformation",
      "Bureaucratic processes",
      "Poor app experience",
    ],
    website: "https://harmonie-mutuelle.fr",
    newsFeedSources: ["Google News - Harmonie Mutuelle"],
  },
  {
    id: "axa",
    name: "AXA Santé",
    description: "Global insurance leader with a strong health offering in France and Europe.",
    founded: 1985,
    headquarters: "Paris, France",
    markets: ["Global (50+ countries)"],
    type: "traditional",
    employees: "145,000+",
    members: "95M+ (global)",
    appReviews: [
      { platform: "ios", rating: 4.0, reviewCount: 15000, lastUpdated: "2026-02", previousRating: 3.9 },
      { platform: "android", rating: 3.8, reviewCount: 22000, lastUpdated: "2026-02", previousRating: 3.8 },
    ],
    customerReviews: [
      {
        text: "Efficient customer service, decent reimbursements but high prices.",
        rating: 3,
        date: "2026-01",
        source: "Trustpilot",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Global scale and brand",
      "Financial stability",
      "Wide product range",
      "Powerful distribution network",
    ],
    weaknesses: [
      "Less agile than insurtechs",
      "Complex products",
      "Inconsistent digital experience",
    ],
    website: "https://axa.fr",
    newsFeedSources: ["Google News - AXA Santé France"],
  },
  {
    id: "malakoff",
    name: "Malakoff Humanis",
    description: "French social protection group from the merger of Malakoff Médéric and Humanis. #2 health insurer in France.",
    founded: 2019,
    headquarters: "Paris, France",
    markets: ["France"],
    type: "traditional",
    members: "10M+",
    employees: "10,000+",
    appReviews: [
      { platform: "ios", rating: 2.9, reviewCount: 1200, lastUpdated: "2026-02", previousRating: 2.8 },
      { platform: "android", rating: 2.5, reviewCount: 900, lastUpdated: "2026-02", previousRating: 2.6 },
    ],
    customerReviews: [
      {
        text: "Impossible to reach customer service. Very slow reimbursements.",
        rating: 1,
        date: "2026-02-15",
        source: "Trustpilot",
        sentiment: "negative",
      },
      {
        text: "The mobile app is completely unusable. Crashes every time I try to check my reimbursements.",
        rating: 1,
        date: "2026-02-12",
        source: "App Store",
        sentiment: "negative",
      },
      {
        text: "Good coverage for hospitalization but the digital experience is painful.",
        rating: 3,
        date: "2026-02-10",
        source: "Google Play",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Large enterprise client base",
      "Comprehensive coverage",
      "National presence",
    ],
    weaknesses: [
      "Very poorly rated app",
      "Hard to reach customer service",
      "Slow reimbursements",
      "Poor user experience",
    ],
    website: "https://malakoffhumanis.com",
    newsFeedSources: ["Google News - Malakoff Humanis"],
  },
  {
    id: "groupe-vyv",
    name: "Groupe VYV",
    description: "France's #1 mutual health group. Includes Harmonie Mutuelle, MGEN, and other mutuals. Apps: Harmonie & Vous, MGEN.",
    founded: 2017,
    headquarters: "Paris, France",
    markets: ["France"],
    type: "traditional",
    members: "11M+",
    employees: "45,000+",
    appReviews: [
      { platform: "ios", rating: 3.0, reviewCount: 2500, lastUpdated: "2026-02", previousRating: 2.9 },
      { platform: "android", rating: 2.6, reviewCount: 2100, lastUpdated: "2026-02", previousRating: 2.5 },
    ],
    customerReviews: [
      {
        text: "MGEN has great coverage for public sector employees but the app is very slow and often unavailable.",
        rating: 3,
        date: "2026-02-14",
        source: "App Store",
        sentiment: "neutral",
      },
      {
        text: "Harmonie Mutuelle's customer service takes weeks to respond. Digital experience is frustrating.",
        rating: 2,
        date: "2026-02-11",
        source: "Trustpilot",
        sentiment: "negative",
      },
      {
        text: "Good reimbursement rates but you need patience to deal with their systems.",
        rating: 3,
        date: "2026-02-08",
        source: "Google Play",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Largest mutual group in France",
      "Strong public sector presence (MGEN)",
      "Extensive coverage options",
      "Nationwide network",
    ],
    weaknesses: [
      "Multiple apps/brands confusing",
      "Slow digital transformation",
      "Inconsistent service quality",
      "Complex organization structure",
    ],
    website: "https://groupe-vyv.fr",
    newsFeedSources: ["Google News - Groupe VYV MGEN"],
  },
  {
    id: "klesia-generali",
    name: "Alliance Klesia Generali",
    description: "Partnership between Klesia (social protection) and Generali (insurance). Strong in employee benefits.",
    founded: 2020,
    headquarters: "Paris, France",
    markets: ["France"],
    type: "traditional",
    members: "4M+",
    employees: "3,500+",
    appReviews: [
      { platform: "ios", rating: 2.8, reviewCount: 450, lastUpdated: "2026-02", previousRating: 2.7 },
      { platform: "android", rating: 2.4, reviewCount: 380, lastUpdated: "2026-02", previousRating: 2.4 },
    ],
    customerReviews: [
      {
        text: "The Generali app is outdated. Simple tasks like downloading a certificate take forever.",
        rating: 2,
        date: "2026-02-13",
        source: "App Store",
        sentiment: "negative",
      },
      {
        text: "Good coverage through my employer but dealing with claims is a nightmare.",
        rating: 2,
        date: "2026-02-09",
        source: "Trustpilot",
        sentiment: "negative",
      },
      {
        text: "Decent reimbursement rates, but expect to call multiple times for any issue.",
        rating: 3,
        date: "2026-02-06",
        source: "Google Play",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Strong B2B positioning",
      "Generali's financial backing",
      "Comprehensive employee benefits",
    ],
    weaknesses: [
      "Poor app ratings",
      "Complex claims process",
      "Slow customer service",
      "Brand confusion (Klesia vs Generali)",
    ],
    website: "https://www.generali.fr",
  },
  {
    id: "groupama",
    name: "Groupama",
    description: "Major French mutual insurance group. Strong regional presence with local branches. App: Groupama toujours là.",
    founded: 1900,
    headquarters: "Paris, France",
    markets: ["France", "International"],
    type: "traditional",
    members: "12M+",
    employees: "31,000+",
    appReviews: [
      { platform: "ios", rating: 4.5, reviewCount: 8500, lastUpdated: "2026-02", previousRating: 4.4 },
      { platform: "android", rating: 4.2, reviewCount: 12000, lastUpdated: "2026-02", previousRating: 4.1 },
    ],
    customerReviews: [
      {
        text: "The app works well for simple tasks. Easy to submit claims with photos.",
        rating: 4,
        date: "2026-02-15",
        source: "App Store",
        sentiment: "positive",
      },
      {
        text: "Local agency is helpful but online services are limited compared to competitors.",
        rating: 3,
        date: "2026-02-12",
        source: "Trustpilot",
        sentiment: "neutral",
      },
      {
        text: "Reliable insurer with good agricultural sector coverage. App has improved recently.",
        rating: 4,
        date: "2026-02-08",
        source: "Google Play",
        sentiment: "positive",
      },
    ],
    strengths: [
      "Strong regional network",
      "Good app ratings",
      "Agricultural sector expertise",
      "Long-standing reputation",
    ],
    weaknesses: [
      "Less digital-first than insurtechs",
      "Variable service by region",
      "Traditional distribution model",
    ],
    website: "https://groupama.fr",
    newsFeedSources: ["Google News - Groupama Santé"],
  },
  {
    id: "ag2r",
    name: "AG2R La Mondiale",
    description: "Major social protection group. #6 in French health insurance. Strong in retirement and health benefits.",
    founded: 2008,
    headquarters: "Paris, France",
    markets: ["France"],
    type: "traditional",
    members: "15M+",
    employees: "13,500+",
    appReviews: [
      { platform: "ios", rating: 3.4, reviewCount: 1800, lastUpdated: "2026-02", previousRating: 3.3 },
      { platform: "android", rating: 3.1, reviewCount: 1500, lastUpdated: "2026-02", previousRating: 3.0 },
    ],
    customerReviews: [
      {
        text: "App is functional but basic. At least I can check my reimbursements now.",
        rating: 3,
        date: "2026-02-14",
        source: "App Store",
        sentiment: "neutral",
      },
      {
        text: "Customer service wait times are extremely long. Online portal feels outdated.",
        rating: 2,
        date: "2026-02-10",
        source: "Trustpilot",
        sentiment: "negative",
      },
      {
        text: "Good retirement products but health app needs work. Too many crashes.",
        rating: 2,
        date: "2026-02-07",
        source: "Google Play",
        sentiment: "negative",
      },
    ],
    strengths: [
      "Strong retirement products",
      "Large member base",
      "Comprehensive B2B offering",
      "National presence",
    ],
    weaknesses: [
      "Mediocre app experience",
      "Long customer service waits",
      "Slow digital evolution",
      "Complex product range",
    ],
    website: "https://ag2rlamondiale.fr",
    newsFeedSources: ["Google News - AG2R La Mondiale"],
  },
  {
    id: "aesio",
    name: "Aésio Mutuelle (Aéma Groupe)",
    description: "Part of Aéma Groupe (with Macif). Result of merger between Adrea, Apréva, and Eovi-Mcd. #7 health insurer.",
    founded: 2021,
    headquarters: "Lyon, France",
    markets: ["France"],
    type: "traditional",
    members: "3M+",
    employees: "4,000+",
    appReviews: [
      { platform: "ios", rating: 2.5, reviewCount: 650, lastUpdated: "2026-02", previousRating: 2.4 },
      { platform: "android", rating: 2.2, reviewCount: 520, lastUpdated: "2026-02", previousRating: 2.1 },
    ],
    customerReviews: [
      {
        text: "Post-merger chaos. Nobody knows which app to use. Very confusing.",
        rating: 1,
        date: "2026-02-13",
        source: "App Store",
        sentiment: "negative",
      },
      {
        text: "Website constantly redirects between different portals. Frustrating experience.",
        rating: 2,
        date: "2026-02-09",
        source: "Trustpilot",
        sentiment: "negative",
      },
      {
        text: "Coverage is decent but the digital tools are far behind competitors.",
        rating: 2,
        date: "2026-02-05",
        source: "Google Play",
        sentiment: "negative",
      },
    ],
    strengths: [
      "Part of larger Aéma group",
      "Regional presence",
      "Comprehensive coverage",
    ],
    weaknesses: [
      "Very poor app ratings",
      "Post-merger integration issues",
      "Confusing brand structure",
      "Outdated digital tools",
    ],
    website: "https://aesio.fr",
  },
  {
    id: "pro-btp",
    name: "Groupe Pro BTP",
    description: "Social protection specialist for construction and public works sector. #8 health insurer in France.",
    founded: 1993,
    headquarters: "Paris, France",
    markets: ["France"],
    type: "traditional",
    members: "4.5M+",
    employees: "4,200+",
    appReviews: [
      { platform: "ios", rating: 3.8, reviewCount: 1100, lastUpdated: "2026-02", previousRating: 3.7 },
      { platform: "android", rating: 3.5, reviewCount: 950, lastUpdated: "2026-02", previousRating: 3.4 },
    ],
    customerReviews: [
      {
        text: "Good coverage for BTP workers. App is basic but does the job.",
        rating: 4,
        date: "2026-02-14",
        source: "App Store",
        sentiment: "positive",
      },
      {
        text: "Specialized for construction sector which is great. Digital experience is average.",
        rating: 3,
        date: "2026-02-11",
        source: "Trustpilot",
        sentiment: "neutral",
      },
      {
        text: "Decent app for checking reimbursements. Nothing fancy but reliable.",
        rating: 3,
        date: "2026-02-07",
        source: "Google Play",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Construction sector expertise",
      "Tailored BTP products",
      "Decent app for traditional insurer",
      "Strong sector partnerships",
    ],
    weaknesses: [
      "Limited to construction sector",
      "Basic digital features",
      "Less competitive outside BTP",
    ],
    website: "https://probtp.com",
  },
  {
    id: "covea",
    name: "Covéa (MAAF, MMA, GMF)",
    description: "Major mutual group including MAAF, MMA, and GMF brands. #9 in French health insurance.",
    founded: 2003,
    headquarters: "Paris, France",
    markets: ["France"],
    type: "traditional",
    members: "11M+",
    employees: "21,000+",
    appReviews: [
      { platform: "ios", rating: 4.6, reviewCount: 25000, lastUpdated: "2026-02", previousRating: 4.5 },
      { platform: "android", rating: 4.3, reviewCount: 35000, lastUpdated: "2026-02", previousRating: 4.2 },
    ],
    customerReviews: [
      {
        text: "GMF app is surprisingly good. Easy to declare claims and track reimbursements.",
        rating: 5,
        date: "2026-02-15",
        source: "App Store",
        sentiment: "positive",
      },
      {
        text: "MAAF app works well for car insurance but health features are limited.",
        rating: 3,
        date: "2026-02-12",
        source: "Trustpilot",
        sentiment: "neutral",
      },
      {
        text: "MMA has improved their digital experience. App is now usable.",
        rating: 4,
        date: "2026-02-09",
        source: "Google Play",
        sentiment: "positive",
      },
    ],
    strengths: [
      "Strong brand portfolio",
      "Good app ratings",
      "Large customer base",
      "Multi-brand strategy",
    ],
    weaknesses: [
      "Multiple apps for different brands",
      "Health not primary focus",
      "Variable experience by brand",
    ],
    website: "https://covea.eu",
  },
  {
    id: "allianz-france",
    name: "Allianz France",
    description: "French subsidiary of Allianz Group. #10 in French health insurance. Strong international backing.",
    founded: 1890,
    headquarters: "Paris, France",
    markets: ["France", "Global"],
    type: "traditional",
    employees: "8,500+",
    members: "4M+ (France)",
    appReviews: [
      { platform: "ios", rating: 4.2, reviewCount: 5500, lastUpdated: "2026-02", previousRating: 4.1 },
      { platform: "android", rating: 3.9, reviewCount: 7200, lastUpdated: "2026-02", previousRating: 3.8 },
    ],
    customerReviews: [
      {
        text: "App is decent. Can submit claims easily. Response time for reimbursements is good.",
        rating: 4,
        date: "2026-02-14",
        source: "App Store",
        sentiment: "positive",
      },
      {
        text: "Premium pricing but you get good service. App has improved over the years.",
        rating: 4,
        date: "2026-02-10",
        source: "Trustpilot",
        sentiment: "positive",
      },
      {
        text: "Solid insurer but not as innovative as newer players. Gets the job done.",
        rating: 3,
        date: "2026-02-06",
        source: "Google Play",
        sentiment: "neutral",
      },
    ],
    strengths: [
      "Global brand and stability",
      "Good app ratings",
      "Strong B2B presence",
      "International coverage options",
    ],
    weaknesses: [
      "Premium pricing",
      "Less agile than insurtechs",
      "Traditional distribution",
    ],
    website: "https://allianz.fr",
  },
];

export function getCompetitorById(id: string): Competitor | undefined {
  return COMPETITORS_DATA.find((c) => c.id === id);
}

export function getCompetitorsByType(type: Competitor["type"]): Competitor[] {
  return COMPETITORS_DATA.filter((c) => c.type === type);
}

export function getAverageRating(reviews: AppReview[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
