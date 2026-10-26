import { Manrope } from "next/font/google";
import type { Identity } from "./types";

// B · Noxen — Dark Precision. Nombre de fantasía inspirado en «nox» (noche, en latín); la terminación
// «-en» es una decisión creativa. Negro más profundo, blanco cálido y un acento metálico (bronce) muy contenido.
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-noxen", display: "swap" });

export const noxen: Identity = {
  key: "noxen",
  name: "Noxen",
  tagline: "Find the Risk. Fix the Weakness.",
  direction: "Dark Precision",
  concept: "Discreción, inteligencia, protección y precisión.",
  fontClass: manrope.variable,
  tokens: {
    "--h-ink": "#07080A",
    "--h-graphite": "#15171B",
    "--h-ivory": "#EEEBE4",
    "--h-titanium": "#9E9A92", // 6,4:1 sobre grafito
    "--h-red": "#B09A74", // acento: bronce satinado (solo líneas, nunca texto)
    "--h-line": "rgba(238,235,228,0.12)",
    "--h-display": "var(--font-noxen)",
    "--h-display-weight": "300",
    "--h-title-weight": "500",
    "--h-display-case": "uppercase",
    "--h-display-tracking": "0.01em",
  } as Identity["tokens"],
  themeColor: "#07080A",
  hero: "horizon",
  header: "centered",
};
