import type { IdentityKey } from "../ui";

// Nombre de marca para las previews de /preview/<clave>. Las tres usan el diseño de StateX tal cual
// (decisión 2026-10-26: comparar solo el nombre); cambian logotipo, textos con la marca y tagline.
export type Identity = {
  key: IdentityKey;
  name: string;
  tagline: string;
  concept: string; // idea de la marca, en una línea
};
