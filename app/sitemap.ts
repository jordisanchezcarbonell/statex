import type { MetadataRoute } from "next";
import { guides, legalLinks, services, site, studies } from "./_site/content";
import { localAiPost } from "./blog/content";

// Vacío mientras la web no sea indexable (coherente con robots.txt).
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}${localAiPost.path}`, changeFrequency: "yearly", priority: 0.7 },
    ...services.map((s) => ({ url: `${site.url}/servicios/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...guides.map((g) => ({ url: `${site.url}/guias/${g.slug}`, lastModified: g.published, changeFrequency: "yearly" as const, priority: 0.7 })),
    { url: `${site.url}/investigacion`, changeFrequency: "monthly" as const, priority: 0.6 },
    ...studies.map((s) => ({ url: `${site.url}/investigacion/${s.slug}`, lastModified: s.published, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...legalLinks.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
