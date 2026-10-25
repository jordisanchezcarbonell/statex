import type { Metadata } from "next";
import { seo } from "./_site/content";
import { StatexHome, homeOpenGraph } from "./_site/Home";

// Home de StateX: dirección H (Boutique Precision).
export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: { ...homeOpenGraph, url: "/" },
};

export default function Home() {
  return <StatexHome />;
}
