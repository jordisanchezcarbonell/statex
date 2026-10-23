import type { CSSProperties } from "react";
import { Geist, JetBrains_Mono } from "next/font/google";
import { LabBar } from "../_shared/LabBar";
import { Approach } from "./Approach";
import { Hero } from "./Hero";
import { Solutions } from "./Solutions";
import { About, Contact, Footer, Header, Problem, Research, Technology } from "./sections";
import { focusRing } from "./ui";

export const metadata = { title: "Concept D" };

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jbm = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbm", display: "swap" });

// Paleta de directions.ts ("d") + un derivado de trabajo para las líneas.
const tokens = {
  "--bg": "#0B0C0E",
  "--surface": "#141619",
  "--line": "rgba(232,230,227,0.1)",
  "--fg": "#E8E6E3",
  "--muted": "#8A8F98",
  "--amber": "#FFB000",
} as CSSProperties;

export default function ConceptDPage() {
  return (
    <div
      id="top"
      style={tokens}
      className={`${geist.variable} ${jbm.variable} min-h-screen overflow-x-clip bg-[color:var(--bg)] font-[family-name:var(--font-geist)] text-[color:var(--fg)] antialiased selection:bg-[color:var(--amber)] selection:text-[#0B0C0E]`}
    >
      <a
        href="#contenido"
        className={`sr-only z-[60] rounded-[2px] bg-[color:var(--amber)] px-4 py-2 text-[14px] font-medium text-[#0B0C0E] focus:not-sr-only focus:fixed focus:left-4 focus:top-3 ${focusRing}`}
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <Problem />
        <Approach />
        <Solutions />
        <Technology />
        <Research />
        <About />
        <Contact />
      </main>
      <Footer />
      <LabBar current="d" />
    </div>
  );
}
