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
  { href: "#enfoque", label: "Enfoque" },
  { href: "#metodo", label: "Método" },
  { href: "#entregables", label: "Entregables" },
  { href: "#trayectoria", label: "Trayectoria" },
];

export const cta = {
  primary: "Solicitar evaluación",
  explore: "Explorar servicios",
};

export const hero = {
  // Dos frases, dos líneas: la primera atenuada, la segunda en marfil.
  lines: ["La seguridad no se presupone.", "Se demuestra."],
  body:
    "Auditamos aplicaciones web, APIs y la infraestructura que tu empresa expone en internet. Verificamos cada hallazgo, lo priorizamos según tu negocio y te explicamos cómo corregirlo.",
  audience: "Desde Barcelona, para empresas SaaS, agencias digitales y equipos tecnológicos de toda España",
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
  // Precio de lanzamiento "desde" (cálculo en research/services-pricing.md §8). null = no se muestra.
  price: string | null;
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
    ],
    when: "Antes de un lanzamiento, de la entrada de un cliente grande o de una due diligence, y después de cambios importantes en la aplicación.",
    price: "Desde 2.900 € + IVA",
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
    ],
    when: "Cuando no sabes con certeza qué tiene publicado tu empresa, tras una migración o adquisición, o como primer paso antes de auditar una aplicación concreta.",
    note: "Las pruebas activas se hacen solo sobre activos autorizados y dentro del alcance firmado.",
    price: "Desde 1.500 € + IVA",
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
    price: "Desde 1.800 € + IVA",
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
  start: {
    title: "¿No sabes por dónde empezar?",
    text: "Empieza por una evaluación inicial de alcance limitado: una revisión acotada de tu exposición externa y de tu aplicación principal para decidir, con datos, qué conviene auditar a fondo.",
    cta: "Pedir una evaluación inicial",
    interest: "evaluacion-inicial",
    price: "900 € + IVA, precio cerrado",
  },
};

// ─── Propuesta de valor ──────────────────────────────────────────────────────

export const value = {
  label: "Por qué StateX",
  title: "Seguridad que entiende cómo se construye el software.",
  intro:
    "Venimos del desarrollo: aplicaciones, integraciones, autenticación, despliegues. Por eso no nos quedamos en la lista de vulnerabilidades. Te ayudamos a entenderlas, priorizarlas y corregirlas.",
  points: [
    {
      name: "Arquitecturas reales",
      text: "Evaluamos tu aplicación sabiendo cómo está hecha: frameworks, integraciones, autenticación, colas y despliegues. Por eso encontramos lo que solo ve quien ha construido software parecido.",
    },
    {
      name: "Correcciones que tu equipo puede aplicar",
      text: "Hablamos el idioma de tu stack. La recomendación llega pensada para vuestro código y vuestra forma de desplegar, no como un enlace genérico a una guía.",
    },
    {
      name: "Un puente entre seguridad y desarrollo",
      text: "Explicamos cada riesgo a tu equipo técnico en su lenguaje y a dirección en el suyo. Nadie se queda sin saber qué hay que hacer ni por qué.",
    },
  ],
};

// ─── Metodología ─────────────────────────────────────────────────────────────

export const method = {
  label: "Metodología",
  title: "Cuatro fases. Todo por escrito.",
  intro: "Un proceso acotado y trazable: sabes qué se va a probar, cuándo y qué recibirás al terminar.",
  recordLabel: "Queda por escrito",
  steps: [
    { name: "Entender", text: "Comprendemos la aplicación, el negocio, los activos y los riesgos que importan.", record: "Alcance y autorización firmados" },
    { name: "Evaluar", text: "Hacemos el análisis técnico dentro de un alcance definido y autorizado.", record: "Registro de pruebas y evidencias" },
    { name: "Priorizar", text: "Clasificamos los hallazgos según impacto, probabilidad y contexto de negocio.", record: "Informe técnico y resumen ejecutivo" },
    { name: "Corregir", text: "Entregamos recomendaciones concretas y, cuando se contrata, acompañamos la corrección y la validamos.", record: "Plan de corrección y revisión posterior" },
  ],
  rule: "Ninguna prueba activa empieza sin autorización por escrito ni sale del alcance acordado.",
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

export const team = {
  label: "Equipo",
  title: "Una firma pequeña. Hablas con quien hace el trabajo.",
  intro:
    "StateX la dirigen sus dos fundadores: un consultor de seguridad con más de diez años de oficio y un desarrollador full stack. Son las dos mitades de nuestro enfoque. Quien te propone el alcance es quien hace la auditoría y te presenta los resultados.",
  // Bios redactadas a partir de sus perfiles de LinkedIn (consultados el 2026-10-25). Sin empleadores
  // actuales, sin titulaciones en curso y sin certificaciones de vigencia no confirmada.
  founders: [
    {
      name: "Albert Sánchez",
      role: "Cofundador · Seguridad",
      bio: "Consultor de seguridad desde 2014 y jefe de proyectos de ciberseguridad desde 2017. Antes, pentester, responsable de seguridad web y formador en seguridad en internet y hacking." as string | null,
      links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/albert-sanchez-carbonell-a13b585b/" }],
    },
    {
      name: "Jordi Sánchez",
      role: "Cofundador · Ingeniería",
      bio: "Desarrollador full stack desde 2020, con React, Next.js y NestJS. Antes, asesor en seguridad web. Aporta la mirada de quien construye y mantiene las aplicaciones que auditamos." as string | null,
      links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/jordi-s%C3%A1nchez-carbonell-baa83797/" }],
    },
  ],
  experienceLabel: "Experiencia del equipo",
  experience: [
    "Consultoría y gestión de proyectos de ciberseguridad",
    "Pentesting y seguridad web",
    "Desarrollo web y de aplicaciones",
    "APIs e integraciones",
    "Autenticación y autorización",
    "Next.js, React, Node.js y NestJS",
    "Kubernetes y despliegue",
    "Arquitectura de software",
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
      a: "La evaluación inicial tiene precio cerrado (900 € + IVA). Para el resto, cada servicio indica un precio desde, que depende sobre todo del número de aplicaciones, endpoints, roles y dominios. Tras una primera conversación te enviamos una propuesta cerrada con alcance, plazo y precio, sin sorpresas después.",
    },
    {
      q: "¿Qué necesitáis de nosotros?",
      a: "Una persona de contacto técnica, el alcance (dominios, aplicaciones o APIs), cuentas de prueba si hacen falta y la autorización firmada. Nunca te pediremos credenciales por el formulario ni por correo sin cifrar.",
    },
    {
      q: "¿Revisáis las correcciones?",
      a: "Sí, cuando se incluye en la propuesta: comprobamos que cada corrección resuelve el problema y no abre otro.",
    },
    {
      q: "¿Trabajáis con agencias?",
      a: "Sí. Podemos auditar las plataformas que desarrolláis para vuestros clientes. Como los activos son del cliente final, la autorización también la firma él.",
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
    { name: "Recibes una propuesta", text: "Alcance, plazo y precio cerrados antes de empezar cualquier trabajo." },
  ],
};

export const contactForm = {
  title: "Solicitar evaluación",
  fields: {
    name: "Nombre",
    email: "Email corporativo",
    company: "Empresa",
    service: "Tipo de servicio",
    message: "Describe el proyecto",
  },
  messageHint: "Qué aplicación, API o infraestructura quieres revisar y por qué ahora. No incluyas contraseñas, claves ni detalles de vulnerabilidades.",
  serviceOptions: [
    ...services.map((s) => ({ value: s.id, label: s.name })),
    { value: "evaluacion-inicial", label: "Evaluación inicial (no sé por dónde empezar)" },
    { value: "otra", label: "Otra consulta o colaboración" },
  ],
  consent: { before: "He leído la ", link: "política de privacidad", after: " y acepto que StateX use estos datos solo para responder a mi solicitud.", href: "/privacidad" },
  submit: "Enviar solicitud",
  sending: "Enviando…",
  success: "Solicitud recibida. Te responderemos personalmente por email.",
  invalid: "Revisa los campos marcados.",
  error: "No hemos podido enviar tu solicitud. Inténtalo de nuevo en unos minutos.",
  notConfigured: "El formulario todavía no está activo y tu solicitud no se ha enviado. Inténtalo más tarde.",
  rateLimited: "Has enviado varias solicitudes seguidas. Espera unos minutos y vuelve a intentarlo.",
};

// ─── Pie y datos de empresa ──────────────────────────────────────────────────

export const footer = {
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
