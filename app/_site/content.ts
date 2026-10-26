// Contenido de la web pública de StateX. Único sitio donde se edita el copy de la home y de las
// páginas de servicio. (El design lab conserva su propio content.ts como archivo de exploración.)
//
// Reglas: nada de clientes, testimonios, cifras de negocio, certificaciones ni precios inventados.
// Si falta un dato, el campo vale null y la web simplemente no lo muestra: los pendientes se
// gestionan en docs/pendientes.md, no en la página publicada.

export const site = {
  // Dominio definitivo pendiente: mientras tanto, la URL de previsualización.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://statex-two.vercel.app").replace(/\/$/, ""),
  // Indexación desactivada hasta el lanzamiento (dominio propio y aprobación expresa).
  indexable: process.env.SITE_INDEXABLE === "true",
  locale: "es_ES",
};

export const brand = {
  name: "StateX",
  descriptor: "Consultoría de ciberseguridad",
  tagline: "Seguridad de aplicaciones, APIs e infraestructura expuesta, con criterio de ingeniería.",
};

export const seo = {
  title: "StateX · Auditoría de seguridad web, APIs y exposición externa",
  description:
    "Consultoría boutique de ciberseguridad en Barcelona. Auditamos aplicaciones web, APIs e infraestructura expuesta, verificamos cada hallazgo y te ayudamos a corregirlo.",
};

export const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#metodo", label: "Método" },
  { href: "#por-que", label: "Por qué" },
  { href: "#entregables", label: "Entregables" },
  { href: "#equipo", label: "Equipo" },
];

export const cta = {
  primary: "Solicitar evaluación",
  explore: "Explorar servicios",
};

export const hero = {
  // Dos frases, dos líneas: la primera atenuada, la segunda en marfil.
  lines: ["La seguridad no termina", "cuando encuentras una vulnerabilidad."],
  body: "Identificamos riesgos, corregimos vulnerabilidades y reforzamos tus sistemas. De la evaluación técnica a la solución.",
  // Franja inferior: firma y las cuatro fases del método.
  lead: "Secure by Design. · Barcelona",
  claim: ["Evaluamos", "Priorizamos", "Corregimos", "Verificamos"],
};

// ─── Servicios ───────────────────────────────────────────────────────────────

export type Service = {
  id: string; // valor del formulario
  slug: string; // /servicios/<slug>
  name: string;
  short: string;
  summary: string;
  seoDescription: string;
  forWho: string[];
  scopeLabel: string;
  scope: string[];
  deliverables: string[];
  when: string;
  note?: string;
  // Precio de lanzamiento (cálculo en research/services-pricing.md §9). null = no se muestra.
  price: string | null;
  priceFrom: number | null; // importe mínimo sin IVA, para los datos estructurados
  priceScope: string; // a qué alcance corresponde el precio "desde"
  reference: string; // marcos de referencia públicos que seguimos (no son certificaciones)
};

export const services: Service[] = [
  {
    id: "auditoria-web-api",
    slug: "auditoria-seguridad-web-api",
    name: "Auditoría de seguridad web y APIs",
    short: "Aplicaciones y APIs",
    summary:
      "Revisamos tu aplicación y sus APIs como lo haría un atacante, con el contexto de quien sabe cómo se construyen.",
    seoDescription:
      "Auditoría de seguridad de aplicaciones web y APIs: autenticación, autorización, exposición de datos e integraciones. Hallazgos verificados y plan de corrección.",
    forWho: [
      "Empresas SaaS y plataformas propias",
      "Agencias que desarrollan para sus clientes",
      "Equipos con APIs públicas o integraciones con terceros",
    ],
    scopeLabel: "Qué revisamos",
    scope: [
      "Autenticación y gestión de sesiones",
      "Autorización y control de acceso entre cuentas y roles",
      "Exposición de información en respuestas y errores",
      "Lógica de negocio",
      "Configuración del servidor y cabeceras",
      "Integraciones, webhooks y claves de terceros",
    ],
    deliverables: [
      "Informe ejecutivo para dirección",
      "Vulnerabilidades verificadas, con evidencias técnicas",
      "Clasificación de riesgos",
      "Recomendaciones de corrección para tu stack",
      "Sesión de presentación de resultados",
      "Retest de las correcciones durante 6 meses",
    ],
    when: "Antes de un lanzamiento, de la entrada de un cliente grande o de una due diligence, y después de cambios importantes en la aplicación.",
    price: "Web desde 990 € · API desde 690 € (+ IVA)",
    priceFrom: 690,
    priceScope: "El precio desde corresponde a una web de hasta 10 pantallas con un rol de usuario, o a una API de hasta 15 endpoints. Más roles, endpoints o aplicaciones se presupuestan aparte.",
    reference: "OWASP WSTG, OWASP API Security Top 10 y OWASP ASVS",
  },
  {
    id: "exposicion-externa",
    slug: "evaluacion-exposicion-externa",
    name: "Evaluación de exposición externa",
    short: "Superficie expuesta",
    summary:
      "Descubrimos qué ve un atacante de tu empresa en internet y qué parte de eso supone un riesgo real.",
    seoDescription:
      "Evaluación de la exposición externa de tu empresa: inventario de activos, servicios expuestos, configuraciones débiles y software desactualizado, priorizados por criticidad.",
    forWho: [
      "Empresas con infraestructura pública o muchos dominios",
      "Organizaciones que han crecido rápido o por adquisiciones",
      "Equipos sin un inventario fiable de lo que publican",
    ],
    scopeLabel: "Qué revisamos",
    scope: [
      "Activos y subdominios desconocidos u olvidados",
      "Servicios expuestos sin necesidad",
      "Configuraciones débiles en dominios, correo y TLS",
      "Software desactualizado con vulnerabilidades conocidas",
      "Entornos de pruebas accesibles desde internet",
    ],
    deliverables: [
      "Inventario de activos expuestos",
      "Hallazgos verificados",
      "Priorización por criticidad",
      "Plan de reducción de la exposición",
      "Nueva comprobación de lo corregido durante 6 meses",
    ],
    when: "Cuando no sabes con certeza qué tiene publicado tu empresa, tras una migración o adquisición, o como primer paso antes de auditar una aplicación concreta.",
    note: "Las pruebas activas se hacen solo sobre activos autorizados y dentro del alcance firmado.",
    price: "Desde 390 € + IVA",
    priceFrom: 390,
    priceScope: "El precio desde corresponde a un dominio con sus subdominios. Cada dominio adicional o rango de IP se presupuesta aparte.",
    reference: "Buenas prácticas OWASP y CIS para servicios expuestos",
  },
  {
    id: "ingenieria-segura",
    slug: "ingenieria-software-segura",
    name: "Ingeniería de software segura",
    short: "Arquitectura y desarrollo",
    summary:
      "Trabajamos con tu equipo para que la seguridad forme parte de cómo diseñáis, construís y desplegáis el software.",
    seoDescription:
      "Revisión de arquitectura, autenticación, APIs, CI/CD, dependencias, contenedores y cloud. Diagnóstico técnico, plan de mejoras y acompañamiento a tu equipo de desarrollo.",
    forWho: [
      "Startups que preparan su primera versión seria",
      "Equipos de desarrollo sin un perfil de seguridad dedicado",
      "Agencias y empresas con plataformas propias",
    ],
    scopeLabel: "Ámbitos",
    scope: [
      "Arquitectura de aplicaciones",
      "Autenticación, autorización y seguridad de APIs",
      "Configuración de entornos y gestión de secretos",
      "CI/CD y dependencias",
      "Contenedores, Kubernetes y cloud",
      "Seguridad en el ciclo de desarrollo",
    ],
    deliverables: [
      "Diagnóstico técnico",
      "Plan de mejoras priorizado",
      "Recomendaciones de arquitectura",
      "Acompañamiento técnico, si se contrata",
      "Revisión posterior de las correcciones",
    ],
    when: "Al diseñar un producto nuevo, antes de escalar la plataforma o cuando el equipo necesita criterio de seguridad sin contratar un perfil a tiempo completo.",
    price: "Desde 790 € + IVA",
    priceFrom: 790,
    priceScope: "El precio desde corresponde a un diagnóstico de una aplicación con su repositorio y su pipeline de despliegue. El acompañamiento posterior se contrata por días.",
    reference: "OWASP ASVS, OWASP SAMM y OWASP Top 10 CI/CD Security Risks",
  },
];

export const servicesSection = {
  label: "Servicios",
  title: "Tres especialidades. Ninguna genérica.",
  intro: "No hacemos de todo. Nos centramos en lo que mejor conocemos: el software que tu empresa construye y lo que publica en internet.",
  scopeLabel: "Qué revisamos",
  deliverablesLabel: "Qué recibes",
  more: "Ver el servicio",
  request: "Solicitar",
  commitmentsLabel: "En todos los servicios",
  commitments: [
    { name: "Retest durante 6 meses", text: "Cuando corrijas, comprobamos que los fallos críticos y altos están resueltos y te lo dejamos por escrito." },
    { name: "Propuesta en 48 h laborables", text: "Alcance, plazo y precio cerrados tras la primera conversación." },
    { name: "Aviso inmediato", text: "Si encontramos algo crítico, te avisamos el mismo día, sin esperar al informe." },
    { name: "Confidencialidad", text: "Firmamos un acuerdo de confidencialidad si lo necesitas, antes de ver nada." },
  ],
  start: {
    title: "¿No sabes por dónde empezar?",
    text: "Empieza por una evaluación inicial de alcance limitado: una revisión acotada de tu exposición externa y de tu aplicación principal para decidir, con datos, qué conviene auditar a fondo.",
    cta: "Pedir una evaluación inicial",
    interest: "evaluacion-inicial",
    price: "290 € + IVA, precio cerrado. Si después contratas una auditoría, te lo descontamos.",
  },
  // Pack para agencias: varias webs de sus clientes en un solo encargo (cálculo en services-pricing.md §10).
  agencies: {
    title: "¿Eres una agencia?",
    text: "Revisamos la exposición externa y la web pública (sin login) de 5 webs de tus clientes. Un informe por web, uno resumen para la agencia y, si lo prefieres, con tu marca.",
    price: "5 webs por 1.290 € + IVA. Cada web adicional, 240 €.",
    note: "Cada cliente final firma la autorización de sus activos.",
    cta: "Pedir el pack para agencias",
    interest: "pack-agencias",
    sample: { label: "Ver un resumen de ejemplo", href: "/resumen-agencia-de-ejemplo.html" },
  },
};

// ─── Áreas de oferta ─────────────────────────────────────────────────────────
// Tres áreas que agrupan los servicios con precio publicado. Son líneas de servicio, no capacidades
// certificadas: cada encargo se define con alcance y autorización por escrito.

const serviceById = (id: string) => {
  const s = services.find((x) => x.id === id);
  if (!s) throw new Error(`Servicio desconocido: ${id}`);
  return s;
};

export const areas = {
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
      entries: [serviceById("auditoria-web-api"), serviceById("exposicion-externa")],
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
      entries: [serviceById("ingenieria-segura")],
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
        "Revisiones de seguimiento puntuales, si se contratan", // no es monitorización continua (roadmap)
      ],
      entries: [] as Service[], // sin servicio propio: se entra por la evaluación inicial
    },
  ],
};

// ─── Por qué elegirnos ───────────────────────────────────────────────────────

export const whyIntro = (brandName: string) =>
  `Muchas consultoras entregan una lista de vulnerabilidades. En ${brandName} la seguridad y la ingeniería trabajan juntas, así que, si lo contratas, el encargo termina cuando el problema está resuelto y comprobado.`;

export const why = {
  label: "Por qué elegirnos",
  title: "Encontrar el fallo es solo la mitad del trabajo.",
  intro: whyIntro(brand.name),
  points: [
    { name: "Seguridad e ingeniería, juntas", text: "Un especialista en seguridad y un ingeniero de software en la misma firma, desde la primera conversación." },
    { name: "No nos quedamos en el informe", text: "Si lo contratas, aplicamos la corrección: código, configuración o arquitectura." },
    { name: "Soluciones técnicas reales", text: "Correcciones pensadas para tu stack y tu forma de desplegar, no enlaces a una guía genérica." },
    { name: "Prioridad por riesgo e impacto", text: "Primero lo que puede costarte datos, dinero o clientes. Después, el resto, con un plan." },
    { name: "Resultados que se entienden", text: "Un resumen para dirección, que decide, y el detalle técnico para el equipo que corrige." },
    { name: "Alcance definido y autorizado", text: "Ninguna prueba activa sin autorización escrita, alcance firmado y ventana horaria acordada." },
  ],
};

// ─── Metodología ─────────────────────────────────────────────────────────────

export const method = {
  label: "Nuestro método",
  title: "Evaluamos. Priorizamos. Corregimos. Verificamos.",
  intro: "Cuatro fases acotadas y trazables. Sabes qué se va a probar, cuándo, qué recibirás y cómo comprobamos que el problema ya no existe.",
  recordLabel: "Queda por escrito",
  steps: [
    { name: "Evaluamos", text: "Comprendemos el contexto, la aplicación y los activos, e identificamos los riesgos dentro de un alcance autorizado.", record: "Alcance, autorización y registro de pruebas" },
    { name: "Priorizamos", text: "Clasificamos cada vulnerabilidad por impacto, probabilidad y contexto de negocio. Primero, lo que más te puede costar.", record: "Informe técnico y resumen ejecutivo" },
    { name: "Corregimos", text: "Implementamos las medidas necesarias con tu equipo, o te entregamos la corrección lista para tu stack.", record: "Plan de corrección y cambios aplicados" },
    { name: "Verificamos", text: "Volvemos a probar las correcciones de los fallos críticos y altos para confirmar que están cerrados y que no abren otro problema.", record: "Retest de críticos y altos durante 6 meses" },
  ],
  rule: "Ninguna prueba activa empieza sin un plan de pruebas firmado. Las que puedan afectar al servicio se hacen en la ventana horaria que acordemos y, si algo se desvía de lo previsto, paramos y te llamamos.",
};

// ─── Entregables: informe de demostración ────────────────────────────────────
// Todo es ficticio: dominio reservado (ejemplo.com), sin cliente ni vulnerabilidad real.

export type Severity = "Alta" | "Media" | "Baja";

export const report = {
  label: "Entregables",
  title: "Qué recibe tu empresa.",
  intro:
    "Míralo antes de contratar. Un informe pensado para dos lectores: dirección, que necesita decidir, y el equipo técnico, que necesita corregir.",
  contentsLabel: "Qué incluye",
  contents: [
    "Resumen ejecutivo",
    "Inventario de hallazgos",
    "Severidad y prioridad de cada uno",
    "Evidencias reproducibles",
    "Impacto para el negocio",
    "Recomendaciones de corrección",
    "Plan de remediación por fases",
  ],
  demo: "Demostración · datos ficticios",
  // Informe de ejemplo completo (generado desde docs/plantillas; datos ficticios).
  full: {
    label: "Ver el informe de ejemplo completo",
    href: "/informe-de-ejemplo.html",
    pdfLabel: "Descargar en PDF",
    pdf: "/informe-de-ejemplo.pdf",
    meta: "8 páginas · datos ficticios",
  },
  note: "Informe de demostración: ni el dominio, ni la aplicación, ni los hallazgos corresponden a un cliente real.",
  doc: {
    kind: "Auditoría de seguridad web y APIs",
    scope: "app.ejemplo.com · api.ejemplo.com",
    edition: "Versión 1.0 · Confidencial",
    summaryLabel: "Resumen ejecutivo",
    summary:
      "La aplicación protege bien el acceso, pero dos fallos de autorización permiten a un usuario consultar o modificar datos de otras cuentas. Recomendamos corregirlos antes del próximo lanzamiento.",
    findingsLabel: "Inventario de hallazgos",
    detailLabel: "Detalle del hallazgo",
    evidenceLabel: "Evidencia",
    impactLabel: "Impacto",
    fixLabel: "Recomendación",
    priorityLabel: "Prioridad",
  },
  findings: [
    {
      id: "SX-01",
      title: "Acceso a facturas de otras cuentas cambiando el identificador",
      target: "GET /api/v1/invoices/{id}",
      severity: "Alta" as Severity,
      priority: "Inmediata",
      impact: "Cualquier usuario registrado puede descargar facturas de otros clientes, con sus datos fiscales.",
      fix: "Comprobar en el servidor que la factura pertenece a la cuenta de la sesión antes de devolverla.",
      evidence: [
        "GET /api/v1/invoices/10482 HTTP/1.1",
        "Host: api.ejemplo.com",
        "Authorization: Bearer <sesión de la cuenta A>",
        "",
        "200 OK · factura de la cuenta B",
      ],
    },
    { id: "SX-02", title: "Un usuario sin rol de administración puede invitar administradores", target: "POST /api/v1/team/invite", severity: "Alta" as Severity, priority: "Inmediata" },
    { id: "SX-03", title: "Sin límite de intentos en el inicio de sesión", target: "POST /api/v1/auth/login", severity: "Media" as Severity, priority: "Próximo sprint" },
    { id: "SX-04", title: "Cabeceras de seguridad incompletas", target: "app.ejemplo.com", severity: "Baja" as Severity, priority: "Planificada" },
  ],
};

// ─── Trayectoria e investigación ─────────────────────────────────────────────
// Hechos verificados en los blogs originales (docs/design-research.md, ronda 3).
// Autoría confirmada por los fundadores el 2026-10-25: InfoStateX (Albert) y DoubleReboot (Jordi).

export const trajectory = {
  label: "Trayectoria",
  title: "La curiosidad nos trajo hasta aquí. El rigor define lo que hacemos ahora.",
  intro:
    "StateX nació en 2012 como el blog personal de Albert sobre seguridad informática, y en 2013 Jordi sumó DoubleReboot. No era una empresa: era curiosidad, herramientas y muchas horas de pruebas. Hoy esa curiosidad trabaja con método, alcance y contrato.",
  origins: {
    label: "Proyectos originales",
    period: "2012 – 2018",
    items: [
      {
        name: "InfoStateX",
        url: "https://infostatex.blogspot.com/",
        years: "2012 – 2018",
        text: "El blog de Albert sobre hacking, curiosidades y seguridad informática, con más de 1.300 entradas.",
      },
      {
        name: "DoubleReboot",
        url: "https://doublereboot.blogspot.com/",
        years: "2013 y 2016",
        text: "El proyecto de Jordi: tutoriales y herramientas de seguridad ofensiva, bajo el paraguas de State X.",
      },
    ],
    disclaimer: "Fueron proyectos personales de divulgación, no actividad empresarial.",
  },
  research: {
    label: "Investigación",
    text: "Publicaremos aquí notas técnicas, laboratorios, análisis de vulnerabilidades y recursos para desarrolladores, siempre con fecha y autor.",
  },
  today: {
    label: "Hoy",
    period: "2026",
    text: "StateX se relanza como consultoría especializada en seguridad de aplicaciones, APIs y exposición externa.",
  },
};

// ─── Equipo ──────────────────────────────────────────────────────────────────

export const teamIntro = (brandName: string) =>
  `${brandName} la forman dos hermanos de Barcelona: uno viene de la ciberseguridad y el otro de la ingeniería de software. Quien te propone el alcance es quien hace el trabajo y te presenta los resultados.`;

export const team = {
  label: "Quiénes somos",
  title: "Dos perfiles complementarios. Un mismo encargo.",
  intro: teamIntro(brand.name),
  // Bios redactadas a partir de sus perfiles de LinkedIn (consultados el 2026-10-25). Sin empleadores
  // actuales, sin titulaciones en curso y sin certificaciones de vigencia no confirmada.
  founders: [
    {
      name: "Albert Sánchez",
      role: "Cofundador · Seguridad",
      bio: "Consultor de seguridad desde 2014 y jefe de proyectos de ciberseguridad desde 2017. Antes, pentester, responsable de seguridad web y formador en seguridad en internet y hacking." as string | null,
      // Responsabilidad en la firma
      duty: "Responsable de las evaluaciones técnicas de seguridad, el análisis de riesgos y la consultoría." as string | null,
      links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/albert-sanchez-carbonell-a13b585b/" }],
    },
    {
      name: "Jordi Sánchez",
      role: "Cofundador · Ingeniería",
      bio: "Desarrollador full stack desde 2020, con React, Next.js y NestJS. Antes, asesor en seguridad web. Aporta la mirada de quien construye y mantiene las aplicaciones que auditamos." as string | null,
      duty: "Responsable del desarrollo seguro, la corrección de vulnerabilidades y las soluciones técnicas." as string | null,
      links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/jordi-s%C3%A1nchez-carbonell-baa83797/" }],
    },
  ],
  experienceLabel: "Experiencia del equipo",
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
};

// ─── Preguntas frecuentes ────────────────────────────────────────────────────

export const faq = {
  label: "Preguntas frecuentes",
  title: "Antes de escribirnos.",
  items: [
    {
      q: "¿Es legal que auditéis nuestra aplicación?",
      a: "Sí, con vuestra autorización. Firmamos el alcance y la autorización por escrito antes de empezar. Sin ese documento no hacemos ninguna prueba activa.",
    },
    {
      q: "¿Puede afectar a nuestro servicio en producción?",
      a: "Acordamos qué se prueba, cuándo y con qué intensidad. Si tenéis un entorno de preproducción, mejor. Lo que pueda afectar al servicio se coordina antes con vuestro equipo.",
    },
    {
      q: "¿En qué se diferencia de un escáner automático?",
      a: "Un escáner es un punto de partida. Nosotros verificamos a mano cada hallazgo que entra en el informe, descartamos falsos positivos y buscamos lo que un escáner no ve, como los fallos de autorización o de lógica de negocio.",
    },
    {
      q: "¿Cómo se contrata y cuánto cuesta?",
      a: "La evaluación inicial cuesta 290 € + IVA, precio cerrado. Los demás servicios empiezan en 390 € (exposición externa), 690 € (API), 990 € (web) y 790 € (ingeniería segura), sin IVA. El precio final depende del número de aplicaciones, endpoints, roles y dominios. Tras una primera conversación te enviamos en 48 horas laborables una propuesta cerrada, sin sorpresas después. Lo explicamos en detalle en nuestra guía sobre qué incluye una auditoría de seguridad web.",
    },
    {
      q: "¿Qué necesitáis de nosotros?",
      a: "Una persona de contacto técnica, el alcance (dominios, aplicaciones o APIs), cuentas de prueba si hacen falta y la autorización firmada. Nunca te pediremos credenciales por el formulario ni por correo sin cifrar.",
    },
    {
      q: "¿Podéis corregir vosotros lo que encontréis?",
      a: "Sí, si lo contratas. Aplicamos la corrección en vuestro código, configuración o arquitectura, o la dejamos lista para que la aplique vuestro equipo. Se presupuesta aparte, con el alcance claro desde el principio.",
    },
    {
      q: "¿Revisáis las correcciones?",
      a: "Sí. Durante los 6 meses siguientes al informe, comprobamos que los fallos críticos y altos están corregidos y que la corrección no abre otro problema, y te lo entregamos por escrito.",
    },
    {
      q: "¿Trabajáis con agencias?",
      a: "Sí. Tenemos un pack de 5 webs por 1.290 € + IVA (240 € cada web adicional), con un informe por web, uno resumen para la agencia y, si lo preferís, con vuestra marca. Para plataformas más complejas, auditoría a medida. Como los activos son del cliente final, la autorización también la firma él.",
    },
    {
      q: "¿Qué pasa si encontráis algo grave durante la auditoría?",
      a: "Te avisamos el mismo día, sin esperar al informe, para que puedas corregirlo cuanto antes. El protocolo y la persona de contacto se acuerdan antes de empezar.",
    },
    {
      q: "¿Qué hacéis con la información que encontráis?",
      a: "La tratamos como confidencial y solo la compartimos con las personas que designéis. Si lo necesitáis, firmamos un acuerdo de confidencialidad antes de empezar.",
    },
  ],
};

// ─── Contacto y formulario ───────────────────────────────────────────────────

export const contact = {
  label: "Contacto",
  title: "Cuéntanos qué quieres revisar.",
  intro: "Te responde una persona del equipo, no un sistema automático.",
  stepsLabel: "Qué pasa después",
  steps: [
    { name: "Nos escribes", text: "Con lo que quieres proteger y el contexto. Sin datos sensibles." },
    { name: "Hablamos", text: "Una primera conversación para entender la aplicación, los plazos y lo que necesitas." },
    { name: "Recibes una propuesta", text: "En 48 horas laborables: alcance, plazo y precio cerrados antes de empezar cualquier trabajo." },
  ],
};

export const contactForm = {
  title: "Solicitar evaluación",
  fields: {
    name: "Nombre",
    email: "Email corporativo",
    company: "Empresa",
    url: "Web corporativa (opcional)",
    service: "Tipo de servicio",
    message: "Describe el proyecto",
  },
  messageHint: "Qué aplicación, API o infraestructura quieres revisar y por qué ahora. No incluyas contraseñas, claves ni detalles de vulnerabilidades.",
  serviceOptions: [
    ...services.map((s) => ({ value: s.id, label: s.name })),
    { value: "evaluacion-inicial", label: "Evaluación inicial (no sé por dónde empezar)" },
    { value: "pack-agencias", label: "Pack para agencias (5 webs)" },
    { value: "otra", label: "Otra consulta o colaboración" },
  ],
  // {marca} se sustituye por el nombre de la identidad (StateX en producción).
  consent: { before: "He leído la ", link: "política de privacidad", after: " y acepto que {marca} use estos datos solo para responder a mi solicitud.", href: "/privacidad" },
  authorization: "Enviar este formulario no autoriza a {marca} a realizar ninguna prueba de seguridad. Cualquier prueba requiere una autorización firmada y un alcance acordado por escrito.",
  submit: "Enviar solicitud",
  sending: "Enviando…",
  success: "Solicitud recibida. Te responderemos personalmente por email.",
  invalid: "Revisa los campos marcados.",
  error: "No hemos podido enviar tu solicitud. Inténtalo de nuevo en unos minutos.",
  notConfigured: "El formulario todavía no está activo y tu solicitud no se ha enviado. Inténtalo más tarde.",
  rateLimited: "Has enviado varias solicitudes seguidas. Espera unos minutos y vuelve a intentarlo.",
};

// ─── Pie y datos de empresa ──────────────────────────────────────────────────

export const guides = [
  {
    slug: "que-incluye-una-auditoria-de-seguridad-web",
    title: "Qué incluye una auditoría de seguridad web y de qué depende el precio",
    short: "Qué incluye una auditoría web",
    description:
      "Qué revisa una auditoría de seguridad web, qué entregables exigir, qué hay que preparar y qué factores mueven el precio, con ejemplos de alcance y precios orientativos.",
    published: "2026-10-25",
  },
  {
    slug: "que-incluye-una-auditoria-de-seguridad-de-apis",
    title: "Qué incluye una auditoría de seguridad de APIs",
    short: "Qué incluye una auditoría de APIs",
    description:
      "El OWASP API Security Top 10 explicado en llano, qué cambia en REST, GraphQL y webhooks, qué preparar, qué entregables pedir y ejemplos de precio.",
    published: "2026-10-25",
  },
  {
    slug: "como-preparar-tu-web-para-una-auditoria-de-seguridad",
    title: "Cómo preparar tu web para una auditoría de seguridad",
    short: "Cómo preparar tu web para una auditoría",
    description:
      "Autorización, alcance, entorno de pruebas, cuentas por rol y lista de comprobación por fases para que la auditoría encuentre más y cueste menos.",
    published: "2026-10-25",
  },
];

export const footer = {
  guidesLabel: "Guías",
  servicesLabel: "Servicios",
  siteLabel: "StateX",
  location: "Barcelona · Servicio en toda España",
  privacy: "Sin analítica ni cookies de seguimiento.",
  year: "2026",
};

// Titular de la web: ÚNICO sitio donde rellenarlo. Hasta constituir una sociedad, StateX es el nombre
// comercial de una persona física (uno de los fundadores, dado de alta como autónomo cuando facture).
// La web pública no muestra estos datos; las páginas legales sí (lo exigen la LSSI y el RGPD) y,
// mientras valgan null, enseñan un [Pendiente] porque son borradores que no se publican así.
export const company: Record<"legalName" | "taxId" | "address" | "registry" | "email", string | null> & {
  kind: "persona-fisica" | "sociedad";
  city: string;
} = {
  kind: "persona-fisica",
  city: "Barcelona",
  legalName: null, // Nombre y apellidos del titular (o razón social cuando haya sociedad)
  taxId: null, // NIF del titular (o CIF de la sociedad)
  address: null, // Domicilio en Barcelona donde recibir notificaciones (puede ser un coworking o una domiciliación)
  registry: null, // Solo si es sociedad: datos del Registro Mercantil
  email: null, // Correo de contacto y para ejercer derechos de protección de datos
};

export const legalLinks = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
];
