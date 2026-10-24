import type { Metadata } from "next";
import { brand } from "../content";
import { LabBar } from "../_shared/LabBar";
import { StatexHome, homeOpenGraph } from "./Home";

export const metadata: Metadata = { title: "Concept H", description: brand.tagline, openGraph: homeOpenGraph };

export default function ConceptH() {
  return (
    <StatexHome>
      <LabBar current="h" />
    </StatexHome>
  );
}
