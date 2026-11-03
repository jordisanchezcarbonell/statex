import type { MetadataRoute } from "next";
import { researchArticles } from "./investigacion/_content/research-articles";
import { guides, legalLinks, services, site, studies } from "./_site/content";

// La publicación expresa de un artículo no activa la indexación del resto del sitio.
// Solo URLs editoriales explícitas: los borradores nunca entran en el sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = researchArticles.filter((a) => a.indexable).map((a) => ({ url: `${site.url}${a.path}`, changeFrequency: "yearly" as const, priority: 0.7 }));
  if (!site.indexable) return articles;
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/servicios/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...guides.map((g) => ({ url: `${site.url}/guias/${g.slug}`, lastModified: g.published, changeFrequency: "yearly" as const, priority: 0.7 })),
    { url: `${site.url}/investigacion`, changeFrequency: "monthly" as const, priority: 0.6 },
    ...studies.map((s) => ({ url: `${site.url}/investigacion/${s.slug}`, lastModified: s.published, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...articles,
    ...legalLinks.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
