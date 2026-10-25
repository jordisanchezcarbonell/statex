import type { MetadataRoute } from "next";
import { guides, legalLinks, services, site } from "./_site/content";

// Vacío mientras la web no sea indexable (coherente con robots.txt).
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/servicios/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...guides.map((g) => ({ url: `${site.url}/guias/${g.slug}`, lastModified: g.published, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...legalLinks.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
