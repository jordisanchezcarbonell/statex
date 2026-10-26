import type { MetadataRoute } from "next";
import { site } from "./_site/content";

// Hasta el lanzamiento no se indexa nada. Después, todo salvo el design lab y las previews de identidad (internos).
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/design-lab", "/preview", "/demo"] }, sitemap: `${site.url}/sitemap.xml` };
}
