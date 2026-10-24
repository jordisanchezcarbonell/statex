// Contenido ÚNICO de StateX. Todos los conceptos lo consumen tal cual:
// cambian el diseño, nunca el mensaje ni los hechos.
// Reglas: nada de clientes, cifras de negocio, financiación, equipo, testimonios ni certificaciones inventadas.
// Los hechos de "Sobre StateX" e "Investigación" están verificados en los blogs originales (ver docs/design-research.md).

export const brand = {
  name: "StateX",
  tagline: "Detectar, comprender y reducir el riesgo.",
  descriptor: "Ciberseguridad ofensiva con rigor de investigación",
};

export const nav = [
  { href: "#soluciones", label: "Soluciones" },
  { href: "#tecnologia", label: "Tecnología" },
  { href: "#investigacion", label: "Investigación" },
  { href: "#sobre", label: "Sobre StateX" },
  { href: "#contacto", label: "Contacto" },
];

export const cta = {
  primary: "Solicitar evaluación",
  secondary: "Hablar de una colaboración",
  explore: "Ver soluciones",
};

export const hero = {
  title: "Encontramos lo que tu empresa expone antes de que lo haga un atacante.",
  body:
    "StateX descubre lo que tu organización expone en internet (dominios, aplicaciones, APIs y servicios), verifica qué es explotable y lo entrega como un plan de corrección priorizado para tu equipo técnico.",
};

export const sections = {
  problem: "El problema",
  approach: "Nuestro enfoque",
  solutions: "Soluciones",
  technology: "Tecnología y visión",
  research: "Investigación",
  about: "Sobre StateX",
  contact: "Contacto",
};

export const problem = {
  title: "Lo que no ves también está expuesto.",
  intro:
    "La superficie de ataque de una empresa crece con cada despliegue, proveedor e integración. Los atacantes la recorren de forma automática; los equipos internos, rara vez.",
  risks: [
    {
      name: "Activos olvidados",
      text: "Subdominios, entornos de pruebas y servicios antiguos siguen accesibles desde internet sin que nadie los vigile.",
    },
    {
      name: "Aplicaciones en cambio constante",
      text: "Cada versión puede abrir un fallo de autenticación, una API sin control de acceso o una dependencia vulnerable.",
    },
    {
      name: "Alertas sin contexto",
      text: "Los escáneres generan listas largas; sin verificación, nadie sabe qué corregir primero.",
    },
    {
      name: "IA en producción",
      text: "Asistentes e integraciones con modelos de lenguaje exponen nuevas APIs y datos que también hay que evaluar.",
    },
  ],
};

export const approach = {
  title: "De la exposición al riesgo reducido.",
  intro: "Un proceso acotado, autorizado y documentado, pensado para que tu equipo pueda actuar.",
  steps: [
    { name: "Alcance", text: "Definimos objetivos, activos y límites. Ninguna prueba empieza sin autorización por escrito.", deliverable: "Documento de alcance y autorización firmada" },
    { name: "Descubrimiento", text: "Mapeamos lo que está expuesto desde fuera, como lo vería un atacante.", deliverable: "Inventario de activos expuestos" },
    { name: "Verificación", text: "Comprobamos a mano cada hallazgo que entra en el informe y descartamos falsos positivos.", deliverable: "Hallazgos con evidencia reproducible" },
    { name: "Priorización", text: "Ordenamos los riesgos por explotabilidad, exposición y esfuerzo de corrección.", deliverable: "Informe técnico y resumen ejecutivo" },
    { name: "Reducción", text: "Entregamos el plan de remediación y acompañamos a tu equipo durante la corrección.", deliverable: "Plan de remediación y sesión con tu equipo" },
  ],
};

export const solutionsHead = { title: "Cinco áreas, un mismo método." };

export type Solution = { id: string; name: string; short: string; text: string };

export const solutions: Solution[] = [
  {
    id: "easm",
    name: "External Attack Surface Assessment",
    short: "Superficie externa",
    text: "Inventario y evaluación de lo que tu organización expone en internet, con especial atención a los activos que nadie tenía inventariados.",
  },
  {
    id: "appsec",
    name: "Web Application Security",
    short: "Aplicaciones web",
    text: "Auditoría de aplicaciones web y APIs, incluidas las integraciones con modelos de lenguaje: autenticación, control de acceso, lógica de negocio, configuración y dependencias.",
  },
  {
    id: "va",
    name: "Vulnerability Assessment",
    short: "Vulnerabilidades",
    text: "Detección y verificación de vulnerabilidades en sistemas e infraestructura, priorizadas por impacto real.",
  },
  {
    id: "engineering",
    name: "Security Engineering",
    short: "Ingeniería de seguridad",
    text: "Revisión de arquitectura, hardening de infraestructura y nube, e integración de controles de seguridad en el ciclo de desarrollo.",
  },
  {
    id: "ai-research",
    name: "AI-Assisted Security Research",
    short: "Investigación con IA",
    text: "Modelos de IA como apoyo en el reconocimiento, el análisis y la documentación, con verificación humana de cada hallazgo.",
  },
];

export const complementary = {
  label: "Capacidad complementaria",
  name: "Ingeniería de software y automatización",
  text: "Desarrollo de software y automatizaciones construidas con criterios de seguridad desde el diseño.",
};

// Tecnología y visión: separar SIEMPRE lo que existe hoy de lo que es roadmap.
export const technology = {
  title: "Hoy, servicio experto. Mañana, producto.",
  intro:
    "StateX empieza como firma de servicios. Lo que aprendamos en cada evaluación servirá de base para un producto propio.",
  today: {
    label: "Disponible hoy",
    items: [
      "Evaluaciones realizadas por especialistas, con verificación manual de cada hallazgo del informe.",
      "Herramientas open source reconocidas para descubrimiento y documentación.",
      "Uso de IA como apoyo en investigación, siempre supervisado.",
    ],
    pending: "[Por confirmar: automatizaciones internas]",
  },
  roadmap: {
    label: "Visión, no disponible todavía",
    items: [
      "Monitorización continua de la superficie de ataque externa.",
      "Priorización de hallazgos asistida por IA.",
      "Informes interactivos para equipos técnicos y dirección.",
    ],
    note: "Líneas de exploración. No son funcionalidades operativas.",
  },
};

// Investigación: archivo real de los proyectos originales (verificado en los blogs).
export const research = {
  title: "Investigar es el origen de StateX.",
  intro:
    "Antes de ofrecer servicios, StateX fue un proyecto abierto: de 2012 a 2018, publicaciones sobre hacking, herramientas y seguridad ofensiva.",
  archive: [
    {
      name: "InfoStateX",
      url: "https://infostatex.blogspot.com/",
      years: "2012 – 2018",
      text: "Blog de hacking, curiosidades y opiniones sobre seguridad informática, con más de 1.300 entradas publicadas.",
    },
    {
      name: "DoubleReboot",
      url: "https://doublereboot.blogspot.com/",
      years: "2013 y 2016",
      text: "Tutoriales y herramientas de seguridad ofensiva. Un proyecto de State X.",
    },
  ],
  topicsLabel: "Del archivo 2012–2018",
  topics: [
    "Reconocimiento con Google Dorks",
    "Parrot Security OS",
    "Búsquedas avanzadas con inurlbr",
    "Escáneres automatizados de inyección SQL",
  ],
  lab: {
    name: "StateX Lab",
    text: "Nuevas investigaciones y notas técnicas.",
    pending: "[Pendiente: primeras publicaciones]",
  },
};

export const about = {
  title: "Investigando seguridad ofensiva desde 2012.",
  text:
    "StateX nació como un blog personal de seguridad informática y creció con DoubleReboot, un espacio de tutoriales y herramientas. Hoy aplica ese método de investigación a evaluar la exposición externa de empresas, con la vista puesta en construir un producto propio.",
  timeline: [
    { year: "2012", text: "Primeras publicaciones en InfoStateX." },
    { year: "2013", text: "Nace DoubleReboot, un proyecto de State X." },
    { year: "2018", text: "Cierre de la etapa del blog tras más de 1.300 entradas." },
    { year: "2026", text: "StateX se relanza como firma de ciberseguridad." },
  ],
  pending: "[Pendiente: equipo y datos de la empresa]",
  // Fundadores reales (confirmado por ellos). Las bios quedan pendientes hasta tener datos verificables.
  founders: [
    { name: "Jordi Sánchez", role: "Cofundador", bio: "[Pendiente: experiencia verificable]" },
    { name: "Albert Sánchez", role: "Cofundador", bio: "[Pendiente: experiencia verificable]" },
  ],
  foundersNote: "Una firma pequeña, dirigida por sus fundadores. Hablas con quien hace el trabajo.",
};

export const contact = {
  title: "Hablemos de tu superficie de ataque.",
  primary: {
    label: "Para empresas",
    text: "Cuéntanos qué quieres proteger y te proponemos un alcance inicial.",
    cta: cta.primary,
  },
  secondary: {
    label: "Inversores, aceleradoras y socios",
    text: "Si quieres conocer la visión de StateX o explorar una colaboración, escríbenos.",
    cta: cta.secondary,
  },
  pending: "[Pendiente: email o formulario de contacto]",
};

// Ofertas de entrada: empaquetan los servicios en algo que una empresa puede pedir.
// Sin precios inventados: el precio y el plazo quedan pendientes.
export const offers = {
  label: "Ofertas",
  title: "Por dónde empezar.",
  intro: "Tres formas de trabajar con StateX, de la más acotada a la más profunda. Todas terminan en un informe que tu equipo puede ejecutar.",
  items: [
    {
      id: "evaluacion-inicial",
      name: "Evaluación inicial de exposición",
      forWho: "Para saber qué ve hoy un atacante cuando mira tu empresa.",
      includes: [
        "Inventario de lo que expones en internet",
        "Verificación de los hallazgos de mayor riesgo",
        "Resumen ejecutivo y sesión de resultados",
      ],
      featured: true,
    },
    {
      id: "auditoria-web",
      name: "Auditoría de aplicación web",
      forWho: "Para una aplicación o API concreta, antes o después de publicarla.",
      includes: [
        "Autenticación, control de acceso y lógica de negocio",
        "Informe técnico con evidencias y plan de corrección",
        "Sesión con tu equipo de desarrollo",
      ],
      featured: false,
    },
    {
      id: "arquitectura",
      name: "Revisión de arquitectura y hardening",
      forWho: "Para infraestructuras y entornos cloud que van a crecer.",
      includes: [
        "Revisión de servidores, nube y servicios expuestos",
        "Recomendaciones de hardening priorizadas",
        "Acompañamiento al aplicar los cambios",
      ],
      featured: false,
    },
  ],
  cta: "Pedir esta evaluación",
  pricePending: "[Pendiente: precio y plazo]",
};

export const faq = {
  label: "Preguntas frecuentes",
  title: "Lo que suelen preguntarnos.",
  items: [
    {
      q: "¿Es legal que probéis la seguridad de nuestra web?",
      a: "Sí, si lo autorizáis. Firmamos el alcance y la autorización por escrito antes de empezar; sin ese documento no se hace ninguna prueba.",
    },
    {
      q: "¿Puede afectar a nuestros sistemas en producción?",
      a: "Acordamos con tu equipo qué se prueba, cuándo y con qué intensidad. Lo que pueda afectar al servicio se coordina antes.",
    },
    {
      q: "¿Qué necesitáis de nosotros?",
      a: "Una persona de contacto técnica, la lista de dominios o aplicaciones a evaluar y la autorización firmada.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Depende del alcance. Tras una primera conversación te enviamos una propuesta cerrada, sin compromiso.",
    },
    {
      q: "¿Qué hacéis con la información que encontráis?",
      a: "La tratamos como confidencial y solo la compartimos con las personas que designéis.",
    },
  ],
};

// Principios de trabajo: compromisos verificables sobre cómo trabaja StateX (no son certificaciones).
export const principles = {
  label: "Cómo trabajamos",
  title: "La confianza se construye con rigor.",
  items: [
    { name: "Comunicación clara", text: "Explicamos cada riesgo en lenguaje técnico para tu equipo y en lenguaje de negocio para dirección." },
    { name: "Alcance definido", text: "Cada evaluación tiene objetivos, límites y entregables acordados por escrito antes de empezar." },
    { name: "Riesgos reales", text: "Priorizamos lo que es explotable y relevante para tu negocio, no la lista más larga." },
    { name: "Confidencialidad", text: "Tratamos lo que encontramos como información sensible y solo lo compartimos con quien designes." },
  ],
};

// Informe de ejemplo: todo es ilustrativo (dominio reservado y rangos RFC 5737). No es un cliente real.
export const sampleReport = {
  label: "Informe de ejemplo",
  title: "Lo que recibes, antes de pedirlo.",
  intro: "Cada evaluación termina en un informe que tu equipo puede ejecutar: resumen para dirección, hallazgos con evidencia y un plan de corrección ordenado.",
  cover: {
    kind: "Informe de exposición externa",
    scope: "ejemplo.com · 203.0.113.0/24",
    version: "Versión 1.0",
    classification: "Confidencial",
  },
  findings: [
    { id: "EX-01", title: "Entorno de pruebas accesible sin autenticación", host: "staging.ejemplo.com", level: "Alta" },
    { id: "EX-02", title: "Servicio VPN con versión sin actualizar", host: "203.0.113.14", level: "Alta" },
    { id: "EX-03", title: "API sin limitación de peticiones", host: "api.ejemplo.com", level: "Media" },
    { id: "EX-04", title: "Cabeceras de seguridad incompletas", host: "www.ejemplo.com", level: "Baja" },
  ],
  pages: ["Resumen ejecutivo", "Hallazgos con evidencia", "Plan de corrección"],
  note: "Ejemplo ilustrativo: dominio reservado y rangos de documentación.",
  cta: "Ver el informe completo",
  pending: "[Pendiente: informe de ejemplo completo en PDF]",
};

// Formulario de contacto: textos de interfaz. El envío lo gestiona app/actions/contact.ts.
export const contactForm = {
  title: "Solicita tu evaluación",
  fields: {
    name: "Nombre",
    company: "Empresa",
    email: "Email de trabajo",
    role: "Cargo (opcional)",
    interest: "Qué te interesa",
    message: "Cuéntanos qué quieres proteger",
  },
  interestOptions: [
    { value: "evaluacion-inicial", label: "Evaluación inicial de exposición" },
    { value: "auditoria-web", label: "Auditoría de aplicación web" },
    { value: "arquitectura", label: "Revisión de arquitectura y hardening" },
    { value: "otra", label: "Otra consulta" },
    { value: "colaboracion", label: "Inversión o colaboración" },
  ],
  consent: "Acepto que StateX use estos datos solo para responder a mi solicitud.",
  privacyPending: "[Pendiente: enlace a la política de privacidad]",
  submit: "Enviar solicitud",
  sending: "Enviando…",
  success: "Solicitud enviada. Te responderemos lo antes posible.",
  error: "No se ha podido enviar. Revisa los campos marcados e inténtalo de nuevo.",
  notConfigured: "El formulario todavía no está conectado a un buzón de correo. [Pendiente: configurar el envío]",
};

export const footer = { legal: "[Pendiente: datos legales]", year: "2026" };

// Datos para tarjeta digital y portada de pitch deck: sin inventar personas.
export const identity = {
  card: { name: "[Nombre]", role: "[Cargo]", email: "[email]", web: "[Pendiente: dominio]" },
  deck: { title: "StateX", subtitle: brand.tagline, meta: "Presentación corporativa 2026" },
};

// Ejemplos ilustrativos para visualizaciones: dominio reservado y rangos de documentación (RFC 5737).
export const sampleAssets = [
  { host: "www.ejemplo.com", kind: "Web", level: "bajo" },
  { host: "staging.ejemplo.com", kind: "Pruebas", level: "alto" },
  { host: "api.ejemplo.com", kind: "API", level: "medio" },
  { host: "203.0.113.14", kind: "VPN", level: "alto" },
  { host: "mail.ejemplo.com", kind: "Correo", level: "medio" },
  { host: "198.51.100.7", kind: "SSH", level: "bajo" },
] as const;
