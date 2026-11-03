import type { Metadata } from "next";
import { brand, site } from "../../_site/content";
import { VisaWordPressArticle } from "../_content/visa-wordpress-ia";
import { visaWordPressArticle as article } from "../_content/research-articles";

const url = `${site.url}${article.path}`;
const image = `${url}/opengraph-image`;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  authors: [{ name: article.author }],
  alternates: { canonical: url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    title: article.title,
    description: article.description,
    url,
    type: "article",
    locale: site.locale,
    siteName: brand.name,
    authors: [article.author],
    images: [{ url: image, width: 1200, height: 630, alt: "StateX: un caso sintético WordPress con Visa VVAH y Claude, validado mediante HTTP independiente" }],
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.description,
    images: [image],
  },
};

export default function VisaWordPressPublicPage() {
  return <VisaWordPressArticle />;
}
