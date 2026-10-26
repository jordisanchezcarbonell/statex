import { Newsreader } from "next/font/google";
import type { Identity } from "./types";

// C · Vantis — Corporate Intelligence. Nombre de fantasía; su lectura («vantage», anticipación) es una
// interpretación de marca, no una definición. Azul noche, gris piedra, blanco y titulares editoriales con serifa.
const newsreader = Newsreader({ subsets: ["latin", "latin-ext"], axes: ["opsz"], variable: "--font-vantis", display: "swap" });

export const vantis: Identity = {
  key: "vantis",
  name: "Vantis",
  tagline: "Security Beyond Detection.",
  direction: "Corporate Intelligence",
  concept: "Anticipación, visión estratégica y confianza.",
  fontClass: newsreader.variable,
  tokens: {
    "--h-ink": "#0C1524", // azul noche
    "--h-graphite": "#142036",
    "--h-ivory": "#F4F3EF",
    "--h-titanium": "#A7A9AC", // gris piedra: 6,8:1 sobre #142036
    "--h-red": "#6F9BD8", // acento: azul señal (solo líneas, nunca texto)
    "--h-red-text": "#F08C82",
    "--h-line": "rgba(244,243,239,0.13)",
    "--h-stone": "#545A63",
    "--h-paper-line": "rgba(12,21,36,0.14)",
    "--h-display": "var(--font-vantis)",
    "--h-display-weight": "400",
    "--h-title-weight": "500",
    "--h-display-case": "none",
    "--h-display-tracking": "-0.015em",
  } as Identity["tokens"],
  themeColor: "#0C1524",
  hero: "ledger",
  header: "ledger",
};
