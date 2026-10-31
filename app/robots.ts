import type { MetadataRoute } from "next";
import { site } from "./_site/content";

// Hasta el lanzamiento no se indexa nada. Las rutas internas no se listan aquí para no anunciarlas: /design-lab
// no existe en producción y /preview y /demo llevan noindex (metadata y X-Robots-Tag en next.config.ts).
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
