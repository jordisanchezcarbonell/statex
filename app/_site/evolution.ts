// Contenido de la home según el nombre de la marca. Producción (/) usa StateX; las previews de
// /preview/noxen y /preview/vantis cambian solo los textos que nombran la marca. Todo lo demás vive en
// app/_site/content.ts, que es la única fuente del copy.

import { areas, brand, hero, method, nav, team, teamIntro, trajectory, why, whyIntro } from "./content";

export function evolution(brandName: string = brand.name) {
  return {
    nav,
    hero,
    areas,
    method,
    why: { ...why, intro: whyIntro(brandName) },
    team: { ...team, intro: teamIntro(brandName) },
    // StateX conserva su historia tal cual; con otro nombre, el origen se cuenta como antecedente.
    trajectory:
      brandName === brand.name
        ? trajectory
        : {
            ...trajectory,
            intro: `Todo empezó en 2012 con InfoStateX, el blog de Albert sobre seguridad informática, y en 2013 Jordi sumó DoubleReboot. No era una empresa: era curiosidad, herramientas y muchas horas de pruebas. Hoy esa curiosidad trabaja con método, alcance y contrato, y se llama ${brandName}.`,
            today: { ...trajectory.today, text: `${brandName} nace como consultoría especializada en seguridad de aplicaciones, APIs, exposición externa y desarrollo seguro.` },
          },
  };
}

export type Evolution = ReturnType<typeof evolution>;
