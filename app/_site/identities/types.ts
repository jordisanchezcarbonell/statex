import type { CSSProperties } from "react";
import type { IdentityKey } from "../ui";

// Identidad de marca para las previews de /preview/<clave>. Comparten contenido, componentes y
// lógica comercial con la web pública; solo cambian nombre, tokens, tipografía, cabecera y escena del hero.
// La web de producción (/) no usa nada de esta carpeta.
export type Identity = {
  key: IdentityKey;
  name: string;
  tagline: string;
  direction: string; // nombre de la dirección visual
  concept: string; // idea de la marca, en una línea
  // Clases de next/font (variables CSS de las familias que usa la identidad).
  fontClass: string;
  // Sustituye tokens de app/_site/ui.tsx (--h-ink, --h-red como acento único, --h-display…).
  tokens: CSSProperties;
  themeColor: string;
  hero: "corridor" | "horizon" | "ledger";
  header: "standard" | "centered" | "ledger";
};
