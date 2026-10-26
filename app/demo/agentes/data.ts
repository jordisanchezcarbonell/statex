// Datos de la demo interna del pipeline de agentes (ver docs/servicio-agentes-vulnerabilidades-2026-10-26.md).
// Los hallazgos son REALES: salen de auditar la propia web de StateX (nuestro repo, autorizado). Nada inventado.
// Esta página es interna y noindex: no es una capacidad que se anuncie en la web pública.

export type Severity = "Crítica" | "Alta" | "Media" | "Baja" | "Informativa" | "Correcto";

export const severityOrder: Severity[] = ["Crítica", "Alta", "Media", "Baja", "Informativa", "Correcto"];

export type Finding = {
  stage: number; // etapa que lo produjo
  title: string;
  severity: Severity;
  location: string; // archivo:línea o componente
  what: string; // qué es, en una frase
  evidence: string;
  fix: string;
  needsManual?: boolean; // un agente no lo confirma sin prueba activa / criterio humano
};

export type Checkpoint = { after: number; label: string };

export type Stage = {
  n: number;
  key: string;
  name: string;
  role: string; // etiqueta corta
  does: string; // qué hace el agente en esta etapa
  delegated: boolean; // true = lo hace un agente; false = etapa con decisión humana
};

// Las cinco etapas del pipeline. La priorización y el informe también los asiste un agente,
// pero el informe lo revisa y firma una persona (barrera final).
export const stages: Stage[] = [
  {
    n: 1,
    key: "recon",
    name: "Reconocimiento",
    role: "Inventario, solo lectura",
    does: "Enumera la superficie dentro del alcance firmado: rutas, tecnologías, dependencias públicas, configuración expuesta. No añade objetivos por su cuenta.",
    delegated: true,
  },
  {
    n: 2,
    key: "analisis",
    name: "Análisis",
    role: "Candidatos a vulnerabilidad",
    does: "Revisa cabeceras y CSP, la Server Action del formulario, el tratamiento de datos y las dependencias en busca de patrones peligrosos. Propone candidatos con evidencia.",
    delegated: true,
  },
  {
    n: 3,
    key: "verificacion",
    name: "Verificación",
    role: "Descarta falsos positivos",
    does: "Intenta refutar cada candidato. Lo que no puede confirmar sin prueba activa con impacto lo marca como «requiere confirmación manual».",
    delegated: true,
  },
  {
    n: 4,
    key: "priorizacion",
    name: "Priorización",
    role: "Orden por impacto",
    does: "Ordena por impacto, probabilidad y contexto de negocio. Primero lo que puede costar datos, dinero o clientes.",
    delegated: true,
  },
  {
    n: 5,
    key: "informe",
    name: "Informe",
    role: "Borrador para revisión humana",
    does: "Redacta el borrador técnico y el resumen ejecutivo con el formato de las plantillas. Una persona de StateX lo revisa, corrige y firma antes de entregar.",
    delegated: true,
  },
];

// Puntos de parada humanos obligatorios entre etapas.
export const checkpoints: Checkpoint[] = [
  { after: 0, label: "Una persona carga el alcance firmado como única fuente de objetivos válidos" },
  { after: 1, label: "Valida el inventario (nada fuera de alcance) y autoriza las pruebas activas acotadas" },
  { after: 3, label: "Confirma los hallazgos reales y decide qué, si algo, se prueba de forma activa" },
  { after: 5, label: "Revisa, corrige y firma el informe antes de entregarlo al cliente" },
];

// ─── Hallazgos reales de auditar la web de StateX (2026-10-26) ───────────────
// Salida del pipeline sobre nuestro propio repo. Sin hallazgos Críticos ni Altos.
export const findings: Finding[] = [
  // Etapa 1 — Reconocimiento
  {
    stage: 1,
    title: "Previews con los nombres en estudio abiertas por defecto",
    severity: "Media",
    location: "proxy.ts:4-9 · .env.example:19-23",
    what: "Riesgo de negocio, no técnico: sin credenciales en el entorno, /preview/* queda público en Vercel y expone los nombres de marca en estudio.",
    evidence: "if (!user || !pass) return NextResponse.next(); — decisión documentada el 2026-10-26. Mitigado con noindex por cabecera y metadatos, pero accesible con la URL.",
    fix: "Definir PREVIEW_USER y PREVIEW_PASSWORD en Vercel mientras se comparan, o sacar noxen/vantis del build de producción.",
    needsManual: true,
  },
  {
    stage: 1,
    title: "Sin HSTS emitido desde la aplicación",
    severity: "Baja",
    location: "next.config.ts:25-33",
    what: "No se envía Strict-Transport-Security; un primer acceso por HTTP en red hostil podría degradarse.",
    evidence: "La lista securityHeaders no lo incluye. El CSP lleva upgrade-insecure-requests, que no sustituye a HSTS. Vercel suele añadirlo, sin confirmar para dominio propio.",
    fix: "Añadir Strict-Transport-Security: max-age=63072000; includeSubDomains solo en producción.",
    needsManual: true,
  },
  {
    stage: 1,
    title: "CSP con 'unsafe-inline' en script-src y style-src",
    severity: "Baja",
    location: "next.config.ts:11-12",
    what: "El CSP permite scripts y estilos inline, así que un XSS no quedaría frenado por el CSP.",
    evidence: "Decisión consciente para mantener las páginas estáticas (sin nonce). Riesgo real bajo: no hay entrada de usuario reflejada ni dangerouslySetInnerHTML con datos del usuario.",
    fix: "Aceptar y documentar (razonable en sitio estático), o migrar a nonces/hashes a costa del cacheo estático.",
  },
  {
    stage: 1,
    title: "robots.txt revelaría las rutas internas al indexar",
    severity: "Informativa",
    location: "app/robots.ts:8",
    what: "Con SITE_INDEXABLE=true, el Disallow lista /design-lab, /preview y /demo.",
    evidence: "El control real es el noindex (cabecera y metadatos), no el Disallow. No revela contenido.",
    fix: "Sin cambio necesario si las rutas están protegidas por noindex.",
    needsManual: true,
  },
  // Etapa 2 — Análisis
  {
    stage: 2,
    title: "Límite de frecuencia del formulario en memoria y por instancia",
    severity: "Baja",
    location: "app/actions/contact.ts:24-39, 57-60",
    what: "5 envíos cada 10 min en memoria; en serverless cada instancia tiene su contador, así que se evade.",
    evidence: "const hits = new Map(); y caída a x-forwarded-for como último recurso. El propio comentario reconoce que es orientativo.",
    fix: "Almacén compartido (Upstash/Vercel KV) o Vercel Firewall; CAPTCHA si llega spam.",
    needsManual: true,
  },
  {
    stage: 2,
    title: "Remitente de pruebas por defecto si falta CONTACT_FROM",
    severity: "Baja",
    location: "app/actions/contact.ts:82",
    what: "Sin CONTACT_FROM se usa onboarding@resend.dev: peor reputación y sin alineación de dominio.",
    evidence: "Afecta a la entregabilidad y la confianza, no a la seguridad directa.",
    fix: "Tratar la ausencia de CONTACT_FROM como 'not-configured', igual que RESEND_API_KEY y CONTACT_TO.",
  },
  {
    stage: 2,
    title: "Antiabuso de cliente fácil de saltar (campo de tiempo y honeypot)",
    severity: "Informativa",
    location: "app/actions/contact.ts:45-52 · ContactForm.tsx:152-155",
    what: "El instante de renderizado lo controla el cliente; un bot que lo omita salta el tiempo mínimo.",
    evidence: "Aceptable como primera capa. El honeypot solo frena bots ingenuos.",
    fix: "Para control real, firmar el instante con HMAC en el servidor.",
  },
  {
    stage: 2,
    title: "next y postcss un parche por detrás",
    severity: "Informativa",
    location: "package.json:17",
    what: "next 16.4.2 (existe 16.4.3) y postcss 8.5.29 (existe 8.5.31). npm audit limpio.",
    evidence: "Resto de actualizaciones son saltos mayores que no conviene tocar ahora.",
    fix: "Subir next a 16.4.3 y postcss a 8.5.31 tras leer sus notas de versión.",
  },
  // Etapa 3 — Verificación: el pipeline también confirma lo que está bien hecho
  {
    stage: 3,
    title: "Inyección de cabeceras de correo bien resuelta",
    severity: "Correcto",
    location: "app/actions/contact.ts:42 · validate.ts:13",
    what: "oneLine() elimina caracteres de control y U+2028/U+2029; el email pasa por EMAIL_RE; Resend se llama con JSON, no SMTP en bruto.",
    evidence: "No hay vía de inyección de cabeceras en el correo.",
    fix: "—",
  },
  {
    stage: 3,
    title: "Sin dangerouslySetInnerHTML con datos de usuario",
    severity: "Correcto",
    location: "app/_site/Shell.tsx:111",
    what: "El único uso es el JSON-LD, que escapa '<' y sale de content.ts, no del usuario.",
    evidence: "Patrón correcto; no se puede cerrar el <script>.",
    fix: "—",
  },
  {
    stage: 3,
    title: "npm audit sin vulnerabilidades, versiones fijadas",
    severity: "Correcto",
    location: "package.json:14-29",
    what: "0 vulnerabilidades; versiones exactas sin ^ ni ~; solo 5 dependencias de producción.",
    evidence: "Comprobado con Node 22.",
    fix: "—",
  },
  {
    stage: 3,
    title: "Validación en servidor y logs sin datos personales",
    severity: "Correcto",
    location: "app/actions/contact.ts:54, 91 · validate.ts:19",
    what: "La validación real es en servidor; límites por slice; servicio contra lista cerrada; los logs no incluyen cuerpo ni datos personales; fetch con timeout.",
    evidence: "Si faltan variables, devuelve 'not-configured', no un falso éxito.",
    fix: "—",
  },
  {
    stage: 3,
    title: "Sin terceros en runtime, sin analítica ni trackers",
    severity: "Correcto",
    location: "next.config.ts · fuentes autohospedadas",
    what: "El CSP solo permite 'self'; default-src 'self', object-src 'none', base-uri 'self', form-action 'self', frame-ancestors 'self'.",
    evidence: "Enlaces externos con rel=noopener noreferrer; poweredByHeader desactivado.",
    fix: "—",
  },
  {
    stage: 3,
    title: "security.txt: Expires dinámico (a revisar)",
    severity: "Informativa",
    location: "app/.well-known/security.txt/route.ts:10",
    what: "Expires = hoy + 180 días, fijado en cada build (force-static). Sin redespliegue en 180 días, caduca.",
    evidence: "Hoy la ruta da 404 porque no hay correo corporativo.",
    fix: "Mantener un redespliegue periódico o fijar la fecha explícitamente.",
  },
];

// Aviso transversal: si la verificación confirma un crítico, se dispara el aviso el mismo día.
// El agente lo PREPARA; una persona lo envía al contacto de emergencia acordado.
export const alertNote =
  "Si en cualquier momento se confirma un hallazgo crítico, el agente prepara el aviso (qué, dónde, por qué, mitigación provisional) y una persona de StateX lo envía el mismo día al contacto acordado. El agente no contacta directamente con el cliente.";
