import type { Metadata } from "next";
import { brand } from "./design-lab/content";
import { StatexHome, homeOpenGraph } from "./design-lab/h/Home";

// Home de StateX: dirección H (Boutique Precision), elegida en el design lab.
export const metadata: Metadata = { title: { absolute: `${brand.name} — ${brand.descriptor}` }, description: brand.tagline, openGraph: homeOpenGraph };

export default function Home() {
  return <StatexHome />;
}
