import type { MetadataRoute } from "next";
import { site } from "./_site/content";
import { researchArticles } from "./investigacion/_content/research-articles";

// Mantiene el bloqueo global previo salvo los artículos cuya publicación se aprueba
// explícitamente. Los estáticos de Next permiten renderizar esas páginas al crawler.
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    const paths = researchArticles.filter((a) => a.indexable).map((a) => a.path);
    if (!paths.length) return { rules: { userAgent: "*", disallow: "/" } };
    return { rules: { userAgent: "*", disallow: "/", allow: [...paths, "/_next/static/"] }, sitemap: `${site.url}/sitemap.xml` };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
