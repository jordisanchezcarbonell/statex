// Contenido de la evolución comercial que se compara en /preview/statex, /preview/noxen y /preview/vantis.
// Es el mismo para las tres identidades: solo cambia el nombre de la marca. Se apoya en app/_site/content.ts
// (servicios, precios, compromisos, bios verificadas) y no añade clientes, cifras ni acreditaciones.
// La home de producción (/) no lo usa; si se aprueba, se integrará en content.ts.

import { method, services, team, trajectory } from "./content";

const byId = (id: string) => {
  const s = services.find((x) => x.id === id);
  if (!s) throw new Error(`Servicio desconocido: ${id}`);
  return s;
};

export function evolution(brand: string) {
  return {
    nav: [
      { href: "#servicios", label: "Servicios" },
      { href: "#metodo", label: "Método" },
      { href: "#por-que", label: "Por qué" },
      { href: "#entregables", label: "Entregables" },
      { href: "#equipo", label: "Equipo" },
    ],

    hero: {
      lines: ["La seguridad no termina", "cuando encuentras una vulnerabilidad."],
      body: "Identificamos riesgos, corregimos vulnerabilidades y reforzamos tus sistemas. De la evaluación técnica a la solución.",
      claim: ["Detectamos", "Priorizamos", "Corregimos", "Verificamos"],
    },

    // Tres áreas de oferta. Son líneas de servicio propuestas, no capacidades certificadas: cada encargo
    // se define con alcance y autorización por escrito. Cada área enlaza los servicios con precio publicado.
    areas: {
      label: "Servicios",
      title: "Tres áreas. Del hallazgo a la solución.",
      intro:
        "Evaluamos como un atacante, corregimos como un equipo de ingeniería y te ayudamos a decidir qué hacer primero. Puedes contratar un área o las tres.",
      includesLabel: "Qué incluye",
      entryLabel: "Por dónde empezar",
      note: "Líneas de servicio propuestas. Cada encargo se define con un alcance técnico cerrado y una autorización firmada antes de empezar.",
      items: [
        {
          id: "offensive",
          name: "Offensive Security",
          descriptor: "Evaluación ofensiva autorizada",
          summary: "Buscamos lo que encontraría un atacante en tu aplicación, tus APIs y lo que tu empresa expone en internet, siempre dentro del alcance firmado.",
          lines: ["Evaluaciones de seguridad", "Pentesting autorizado", "Análisis de vulnerabilidades", "Revisiones de seguridad web y APIs"],
          entries: [byId("auditoria-web-api"), byId("exposicion-externa")],
        },
        {
          id: "engineering",
          name: "Secure Engineering",
          descriptor: "Ingeniería segura y corrección",
          summary: "Corregimos lo encontrado en tu código, tu configuración o tu arquitectura, y dejamos a tu equipo con un sistema más difícil de romper.",
          lines: [
            "Corrección de vulnerabilidades",
            "Desarrollo seguro",
            "Hardening de aplicaciones",
            "Revisión de autenticación",
            "Seguridad de APIs",
            "Mejora de arquitecturas existentes",
          ],
          entries: [byId("ingenieria-segura")],
        },
        {
          id: "advisory",
          name: "Security Advisory",
          descriptor: "Asesoramiento técnico",
          summary: "Te ayudamos a decidir con criterio: qué riesgos importan, qué proteger primero y cómo mejorar con el tiempo sin frenar al equipo.",
          lines: [
            "Consultoría de seguridad",
            "Evaluación de riesgos",
            "Priorización de medidas de protección",
            "Asesoramiento de seguridad técnica",
            "Seguimiento periódico y mejora continua, si se contrata",
          ],
          entries: [],
        },
      ],
    },

    method: {
      ...method,
      label: "Nuestro método",
      title: "Detectamos. Priorizamos. Corregimos. Verificamos.",
      intro: "Cuatro fases acotadas y trazables. Sabes qué se va a probar, cuándo, qué recibirás y cómo comprobamos que el problema ya no existe.",
      steps: [
        { name: "Evaluamos", text: "Comprendemos el contexto, la aplicación y los activos, e identificamos los riesgos dentro de un alcance autorizado.", record: "Alcance, autorización y registro de pruebas" },
        { name: "Priorizamos", text: "Clasificamos cada vulnerabilidad por impacto, probabilidad y contexto de negocio. Primero, lo que más te puede costar.", record: "Informe técnico y resumen ejecutivo" },
        { name: "Corregimos", text: "Implementamos las medidas necesarias con tu equipo, o te entregamos la corrección lista para tu stack.", record: "Plan de corrección y cambios aplicados" },
        { name: "Verificamos", text: "Volvemos a probar cada corrección para confirmar que el fallo está cerrado y que no abre otro problema.", record: "Retest por escrito durante 6 meses" },
      ],
    },

    why: {
      label: "Por qué elegirnos",
      title: "Encontrar el fallo es solo la mitad del trabajo.",
      intro: `Muchas consultoras entregan una lista de vulnerabilidades. En ${brand} la seguridad y la ingeniería trabajan juntas, así que el encargo termina cuando el problema está resuelto y comprobado.`,
      points: [
        { name: "Seguridad e ingeniería, juntas", text: "Un especialista en seguridad y un ingeniero de software en el mismo encargo, desde la primera conversación." },
        { name: "No nos quedamos en el informe", text: "Si lo contratas, aplicamos la corrección: código, configuración o arquitectura." },
        { name: "Soluciones técnicas reales", text: "Correcciones pensadas para tu stack y tu forma de desplegar, no enlaces a una guía genérica." },
        { name: "Prioridad por riesgo e impacto", text: "Primero lo que puede costarte datos, dinero o clientes. Después, el resto, con un plan." },
        { name: "Resultados que se entienden", text: "Un resumen para dirección, que decide, y el detalle técnico para el equipo que corrige." },
        { name: "Alcance definido y autorizado", text: "Ninguna prueba activa sin autorización escrita, alcance firmado y ventana horaria acordada." },
      ],
    },

    team: {
      ...team,
      label: "Quiénes somos",
      title: "Dos perfiles complementarios. Un mismo encargo.",
      intro: `${brand} la forman dos hermanos de Barcelona: uno viene de la ciberseguridad y el otro de la ingeniería de software. Quien te propone el alcance es quien hace el trabajo y te presenta los resultados.`,
      founders: [
        { ...team.founders[0], duty: "Responsable de las evaluaciones técnicas de seguridad, el análisis de riesgos y la consultoría." },
        { ...team.founders[1], duty: "Responsable del desarrollo seguro, la corrección de vulnerabilidades y las soluciones técnicas." },
      ],
      experience: [
        "Consultoría y gestión de proyectos de ciberseguridad",
        "Pentesting y seguridad web",
        "React, Next.js y TypeScript",
        "APIs REST e integraciones empresariales",
        "Autenticación y control de acceso",
        "Arquitectura de aplicaciones",
        "Infraestructura y despliegues",
        "Corrección de vulnerabilidades en aplicaciones",
        "Automatización e inteligencia artificial",
      ],
    },

    // StateX conserva su historia tal cual; con otro nombre, el origen se cuenta como antecedente.
    trajectory:
      brand === "StateX"
        ? trajectory
        : {
            ...trajectory,
            intro: `Todo empezó en 2012 con InfoStateX, el blog de Albert sobre seguridad informática, y en 2013 Jordi sumó DoubleReboot. No era una empresa: era curiosidad, herramientas y muchas horas de pruebas. Hoy esa curiosidad trabaja con método, alcance y contrato, y se llama ${brand}.`,
            today: { ...trajectory.today, text: `${brand} nace como consultoría especializada en seguridad de aplicaciones, APIs, exposición externa y desarrollo seguro.` },
          },
  };
}

export type Evolution = ReturnType<typeof evolution>;
