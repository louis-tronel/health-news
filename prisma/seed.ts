import { PrismaClient } from "@prisma/client";

const DEFAULT_FEEDS = [
  // French Insurance & Health
  { name: "L'Argus de l'Assurance", url: "https://www.argusdelassurance.com/rss.xml", category: "insurance" },
  { name: "TICsanté", url: "https://www.ticsante.com/feed/", category: "health_tech" },
  { name: "Frenchweb", url: "https://www.frenchweb.fr/feed", category: "health_tech" },
  { name: "Maddyness", url: "https://www.maddyness.com/feed/", category: "funding" },
  { name: "News Assurances Pro", url: "https://www.newsassurancespro.com/feed/", category: "insurance" },
  // European Tech & Insurtech (English only)
  { name: "Sifted", url: "https://sifted.eu/feed", category: "funding" },
  { name: "EU-Startups", url: "https://www.eu-startups.com/feed/", category: "funding" },
  { name: "Tech.eu", url: "https://tech.eu/feed/", category: "funding" },
  // Health Tech
  { name: "MobiHealthNews", url: "https://www.mobihealthnews.com/feed", category: "health_tech" },
  { name: "Healthcare IT News", url: "https://www.healthcareitnews.com/feed", category: "health_tech" },
  { name: "Rock Health", url: "https://rockhealth.com/feed/", category: "health_tech" },
  { name: "STAT News", url: "https://www.statnews.com/feed/", category: "health_tech" },
  { name: "Fierce Healthcare", url: "https://www.fiercehealthcare.com/rss/xml", category: "health_tech" },
  { name: "Healthcare Dive", url: "https://www.healthcaredive.com/feeds/news/", category: "health_tech" },
  // Regulatory
  { name: "CNIL", url: "https://www.cnil.fr/fr/rss.xml", category: "regulatory" },
  { name: "HAS", url: "https://www.has-sante.fr/jcms/p_3048847/fr/flux-rss", category: "regulatory" },
  { name: "ACPR (Autorité de contrôle)", url: "https://acpr.banque-france.fr/rss/actualites", category: "regulatory" },
  // Funding & Business
  { name: "TechCrunch Health", url: "https://techcrunch.com/category/health/feed/", category: "funding" },
  // Insurance Industry
  { name: "Insurance Journal", url: "https://www.insurancejournal.com/feed/", category: "insurance" },
  { name: "Coverager", url: "https://coverager.com/feed/", category: "insurance" },
  { name: "The Digital Insurer", url: "https://www.the-digital-insurer.com/feed/", category: "insurance" },
  { name: "Digital Insurance", url: "https://www.dig-in.com/feed", category: "insurance" },
  // Direct Competitor News - French Market
  { name: "Alan Blog", url: "https://alan.com/blog/rss.xml", category: "insurance" },
  { name: "Google News - Alan", url: "https://news.google.com/rss/search?q=alan+assurance+santé&hl=fr&gl=FR&ceid=FR:fr", category: "insurance" },
  { name: "Google News - Harmonie Mutuelle", url: "https://news.google.com/rss/search?q=harmonie+mutuelle&hl=fr&gl=FR&ceid=FR:fr", category: "insurance" },
  { name: "Google News - Malakoff Humanis", url: "https://news.google.com/rss/search?q=malakoff+humanis&hl=fr&gl=FR&ceid=FR:fr", category: "insurance" },
  { name: "Google News - AXA Santé France", url: "https://news.google.com/rss/search?q=axa+santé+mutuelle&hl=fr&gl=FR&ceid=FR:fr", category: "insurance" },
  { name: "Google News - Groupe VYV MGEN", url: "https://news.google.com/rss/search?q=groupe+vyv+OR+mgen+mutuelle&hl=fr&gl=FR&ceid=FR:fr", category: "insurance" },
  { name: "Google News - AG2R La Mondiale", url: "https://news.google.com/rss/search?q=ag2r+la+mondiale&hl=fr&gl=FR&ceid=FR:fr", category: "insurance" },
  { name: "Google News - Groupama Santé", url: "https://news.google.com/rss/search?q=groupama+santé+mutuelle&hl=fr&gl=FR&ceid=FR:fr", category: "insurance" },
  { name: "Google News - Oscar Health", url: "https://news.google.com/rss/search?q=oscar+health+insurance&hl=en-US&gl=US&ceid=US:en", category: "insurance" },
  { name: "Google News - Insurtech France", url: "https://news.google.com/rss/search?q=insurtech+france+assurance&hl=fr&gl=FR&ceid=FR:fr", category: "insurance" },
  // New competitor tracking
  { name: "Google News - Doctolib", url: "https://news.google.com/rss/search?q=doctolib&hl=fr&gl=FR&ceid=FR:fr", category: "health_tech" },
  { name: "Google News - Kry Livi", url: "https://news.google.com/rss/search?q=kry+healthcare+OR+livi+telehealth&hl=en&gl=GB&ceid=GB:en", category: "health_tech" },
  { name: "Google News - Wefox", url: "https://news.google.com/rss/search?q=wefox+insurance&hl=en&gl=DE&ceid=DE:en", category: "insurance" },
];

const prisma = new PrismaClient();

// Feeds to disable (German-language feeds)
const FEEDS_TO_DISABLE = [
  "https://versicherungswirtschaft-heute.de/feed/",
  "https://news.google.com/rss/search?q=ottonova+krankenversicherung&hl=de&gl=DE&ceid=DE:de",
];

async function main() {
  console.log("Seeding database...");

  // Add/update active feeds
  for (const feed of DEFAULT_FEEDS) {
    await prisma.feed.upsert({
      where: { url: feed.url },
      update: { name: feed.name, category: feed.category, isActive: true },
      create: { ...feed, isActive: true },
    });
    console.log(`Added feed: ${feed.name}`);
  }

  // Disable German-language feeds
  for (const url of FEEDS_TO_DISABLE) {
    await prisma.feed.updateMany({
      where: { url },
      data: { isActive: false },
    });
    console.log(`Disabled feed: ${url}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
