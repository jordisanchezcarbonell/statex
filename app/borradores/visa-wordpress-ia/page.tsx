import type { Metadata } from "next";
import { VisaWordPressArticle } from "../../investigacion/_content/visa-wordpress-ia";
import { visaWordPressArticle as article } from "../../investigacion/_content/research-articles";

export const metadata: Metadata = {
  title: "Cómo generamos y verificamos un parche de seguridad en WordPress con IA",
  description: article.description,
  authors: [{ name: article.author }],
  alternates: { canonical: article.path },
  robots: { index: false, follow: false },
};

export default function VisaWordPressDraft() {
  return <VisaWordPressArticle draft />;
}
