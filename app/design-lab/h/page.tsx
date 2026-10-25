import type { Metadata } from "next";
import { LabBar } from "../_shared/LabBar";
import { seo } from "../../_site/content";
import { StatexHome, homeOpenGraph } from "../../_site/Home";

// Concept H es la dirección elegida: aquí se ve la web pública real con la barra del lab.
export const metadata: Metadata = { title: "Concept H", description: seo.description, openGraph: homeOpenGraph };

export default function ConceptH() {
  return (
    <StatexHome>
      <LabBar current="h" />
    </StatexHome>
  );
}
