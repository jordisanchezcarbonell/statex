import type { Metadata, Viewport } from "next";
import { brand, seo, site } from "./_site/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.title, template: `%s · ${brand.name}` },
  description: seo.description,
  applicationName: brand.name,
  // Sin indexar hasta el lanzamiento (SITE_INDEXABLE=true lo activa; ver docs/pendientes.md).
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = { themeColor: "#0B0D10", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
