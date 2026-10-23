// Contenido comercial ÚNICO de StateX. Los seis conceptos lo consumen tal cual:
// cambian el diseño, nunca el mensaje. Si un concepto necesita texto nuevo, se añade aquí para todos.

export const brand = "StateX";

export const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#metodologia", label: "Metodología" },
  { href: "#entregables", label: "Entregables" },
  { href: "#confianza", label: "Por qué StateX" },
];

export const cta = { primary: "Solicitar evaluación", secondary: "Ver servicios" };

export const hero = {
  title: "Encuentra tus puntos débiles antes que un atacante.",
  body:
    "StateX es una firma de ciberseguridad B2B. Evaluamos tu superficie de ataque externa, tus aplicaciones web y tu arquitectura, y te entregamos hallazgos verificados con un plan claro para corregirlos.",
};

export type Service = { id: string; name: string; short: string; text: string };

export const services: Service[] = [
  {
    id: "easm",
    name: "External Attack Surface Assessment",
    short: "Superficie externa",
    text: "Identificamos dominios, subdominios, IPs, servicios y aplicaciones expuestos a internet, incluidos los que no tenías inventariados, y evaluamos el riesgo de cada uno.",
  },
  {
    id: "web",
    name: "Auditoría de seguridad web",
    short: "Seguridad web",
    text: "Revisamos aplicaciones web y APIs: autenticación, control de acceso, sesiones, validación de entradas, configuración y dependencias.",
  },
  {
    id: "va",
    name: "Vulnerability Assessment",
    short: "Vulnerabilidades",
    text: "Detectamos y verificamos vulnerabilidades en sistemas e infraestructura, descartamos falsos positivos y las priorizamos por impacto real.",
  },
  {
    id: "hardening",
    name: "Arquitectura y hardening",
    short: "Hardening",
    text: "Analizamos el diseño de tu infraestructura y la configuración de servidores, nube y servicios para reducir la superficie de ataque.",
  },
  {
    id: "consultoria",
    name: "Consultoría técnica en seguridad",
    short: "Consultoría",
    text: "Acompañamos a tu equipo en decisiones de seguridad: criterios técnicos, priorización y revisión de soluciones.",
  },
];

export const complementary = {
  label: "Servicio complementario",
  name: "Ingeniería de software y automatización con IA",
  text: "Desarrollamos software y automatizaciones con IA construidos con criterios de seguridad desde el diseño.",
};

export const method = [
  { name: "Alcance", text: "Definimos objetivos, activos y límites. Ninguna prueba empieza sin autorización por escrito." },
  { name: "Reconocimiento", text: "Descubrimos y mapeamos lo que está expuesto, desde fuera, como lo vería un atacante." },
  { name: "Análisis", text: "Probamos y verificamos cada hallazgo manualmente para descartar falsos positivos." },
  { name: "Informe", text: "Documentamos hallazgos con evidencia, impacto y una remediación priorizada." },
  { name: "Acompañamiento", text: "Presentamos los resultados y resolvemos dudas de tu equipo durante la corrección." },
];

export const deliverables = [
  { name: "Inventario de superficie expuesta", text: "Activos visibles desde internet, con su nivel de exposición." },
  { name: "Informe técnico", text: "Cada hallazgo con evidencia reproducible, impacto y cómo corregirlo." },
  { name: "Resumen ejecutivo", text: "El riesgo explicado para dirección, sin jerga." },
  { name: "Plan de remediación", text: "Acciones ordenadas por prioridad y esfuerzo." },
  { name: "Sesión de resultados", text: "Repaso del informe con tu equipo técnico y de negocio." },
];

// Confianza: solo información real o compromisos que StateX debe confirmar antes de publicar.
export const trust = {
  title: "Por qué StateX",
  origin:
    "StateX recupera el espíritu de DoubleReboot e InfoStateX, proyectos tecnológicos anteriores de su fundador, y lo enfoca en la ciberseguridad profesional.",
  originPending: "[Pendiente: breve historia de DoubleReboot e InfoStateX y enlaces]",
  principles: [
    { name: "Autorización primero", text: "Alcance y permiso por escrito antes de cualquier prueba." },
    { name: "Hallazgos verificados", text: "Revisión manual de cada resultado, no listados automáticos." },
    { name: "Claridad", text: "Informes que entienden tanto el equipo técnico como la dirección." },
    { name: "Confidencialidad", text: "La información de cada cliente se trata como sensible por defecto." },
  ],
  principlesPending: "[Por confirmar: compromisos de trabajo de StateX]",
};

export const closing = {
  title: "Empieza por saber qué ve un atacante.",
  body: "Cuéntanos qué quieres proteger y te proponemos un alcance inicial.",
  pending: "[Pendiente: formulario o email de contacto]",
};

export const footer = { legal: "[Pendiente: datos legales]", year: "2026" };

// Ejemplos ilustrativos para visualizaciones: dominio reservado y rangos de documentación (RFC 5737).
export const sampleAssets = [
  { host: "www.ejemplo.com", kind: "Web", level: "bajo" },
  { host: "staging.ejemplo.com", kind: "Pruebas", level: "alto" },
  { host: "api.ejemplo.com", kind: "API", level: "medio" },
  { host: "203.0.113.14", kind: "VPN", level: "alto" },
  { host: "mail.ejemplo.com", kind: "Correo", level: "medio" },
  { host: "198.51.100.7", kind: "SSH", level: "bajo" },
] as const;
