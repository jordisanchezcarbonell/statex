// Contenido de la home según el nombre de la marca. Producción (/) usa StateX; las previews de
// /preview/noxen y /preview/vantis cambian solo los textos que nombran la marca. Todo lo demás vive en
// app/_site/content.ts, que es la única fuente del copy.

import { areas, brand, hero, method, nav, team, teamIntro, trajectory, trajectoryText, why, whyLabel } from "./content";

export function evolution(brandName: string = brand.name) {
  return {
    nav,
    hero,
    areas,
    method,
    why: { ...why, label: whyLabel(brandName) },
    team: { ...team, intro: teamIntro(brandName) },
    trajectory: { ...trajectory, text: trajectoryText(brandName) },
  };
}

export type Evolution = ReturnType<typeof evolution>;
