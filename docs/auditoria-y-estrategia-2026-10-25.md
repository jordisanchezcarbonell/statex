# StateX — Auditoría, estrategia y rediseño (2026-10-25)

Fases 1 y 2 del rediseño. La implementación (fase 3) está en `app/_site/` y `app/servicios/`. Los
pendientes, en `docs/pendientes.md`. La competencia y el SEO, en `research/competencia-y-seo-2026-10-25.md`
y `research/cybersecurity-competitors.md`.

## 1. Auditoría técnica (estado antes del cambio)

| Área | Estado encontrado |
|---|---|
| Framework | Next.js 16.4.2 (App Router), React 19.2.0, TypeScript 5.9 estricto, Tailwind 4.3.3, Motion 13.5.1, lucide-react. Node 22 (`.nvmrc`) |
| Estructura | La web real vivía dentro del design lab (`app/design-lab/h/`) y leía el `content.ts` compartido por nueve conceptos de exploración |
| Sistema de diseño | Tokens de H en `ui.tsx` (obsidiana, grafito, marfil, titanio, rojo línea), Inter auto-hospedada, `SectionHead`, foco visible común |
| Formulario | Server Action con validación en servidor, honeypot, estado `not-configured` y envío REST a Resend. Sin validación en cliente, sin límite de envíos, un único estado de error para validación y fallo de envío |
| Servicios externos | Resend (solo servidor). Sin analítica, cookies ni scripts de terceros |
| Seguridad | CSP de mismo origen, COOP, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options. Secretos solo en variables de entorno. `npm audit`: 0 vulnerabilidades |
| SEO | `noindex` global, sin `robots.txt`, sin sitemap, sin canonical, sin imagen OG, sin datos estructurados. Una sola página: las búsquedas comerciales no tenían página de destino |
| Lint / tests | No hay ESLint ni tests configurados |

## 2. Diagnóstico de contenido

**Fortalezas que se conservan**
- Dirección visual H: sobria, editorial, con un único acento. Encaja con la referencia Porsche / Massimo Dutti / consultora.
- Honestidad: Hoy frente a Visión, archivo 2012–2018 verificado, sin clientes ni cifras inventadas.
- Formulario seguro y sin trackers: coherencia con lo que se vende.
- Componentes que funcionaban (cabecera, hero con la escena de pórticos, método con línea de progreso, FAQ con `details`, formulario de línea inferior): reutilizados.

**Problemas detectados**
1. **Demasiado catálogo**: cinco áreas en inglés (EASM, Web Application Security, VA, Security Engineering, AI-Assisted Research) más tres ofertas. Un directivo no sabe qué contratar.
2. **Argumentos repetidos** en Problema, Enfoque, Rigor y Ofertas: verificación manual, priorización y alcance salen cuatro veces.
3. **Placeholders publicados**: `[Pendiente: precio y plazo]` ×3, bios, correo, datos legales, automatizaciones internas y primeras publicaciones. Restan credibilidad en una web comercial.
4. **Funcionalidades futuras en la home** (monitorización continua, IA, informes interactivos): ocupan una sección entera y diluyen lo que se puede contratar hoy.
5. **"Investigando seguridad ofensiva desde 2012"** sugería continuidad profesional; el blog fue un proyecto personal.
6. **No se aprovechaba la diferencia real**: la experiencia en desarrollo (Next.js, React, Node, Kubernetes, autenticación).
7. **Sin prueba del entregable**: el informe de ejemplo existía en el concept I, pero no en la web real.
8. **SEO inexistente**: una sola URL, sin páginas por servicio.

## 3. Competencia: qué cambia para StateX

Hechos e inferencias detallados en los dos documentos de `research/`. Conclusiones aplicadas:

- **Tarlogic, S21sec (ahora integrada en Thales), A2SECURE, Ackcent, Hispasec**: escala, SOC/MDR, cifras y logos. No compiten por el CTO de un SaaS pequeño, y StateX no puede ni debe imitar su prueba social.
- **PentestingTeam** es lo más parecido: "auditamos a mano", proceso por fases, retest y precios "desde". Esos mensajes ya son lo mínimo exigible, no un diferencial.
- **Huecos que nadie cubre**: hablar como un CTO de SaaS o agencia, mostrar el informe antes de contratar, ayudar a **corregir** (no solo encontrar), una web sin trackers y una especialidad clara en APIs.

## 4. Estrategia (fase 2)

**Posicionamiento.** Consultoría boutique de seguridad de aplicaciones, APIs y exposición externa, con criterio de ingeniería de software. "Seguridad que entiende cómo se construye el software."

**Cliente ideal.** Empresas SaaS y de producto digital, agencias digitales (también como canal), startups y pymes tecnológicas en España, con Barcelona como mercado inicial. Interlocutor: CTO, responsable técnico o fundador. Detonantes de compra: lanzamiento, entrada de un cliente grande, due diligence, cambios importantes.

**Tres servicios** (sustituyen a las cinco áreas y las tres ofertas):
1. Auditoría de seguridad web y APIs.
2. Evaluación de exposición externa.
3. Ingeniería de software segura.

Lo que se descarta de la home: el producto futuro y la monitorización continua (siguen siendo visión interna), la "investigación asistida por IA" como servicio y "Vulnerability Assessment" como línea separada (queda dentro de los otros dos).

**Modelo comercial recomendado** (sin publicar precios):
- *Puerta de entrada*: **evaluación inicial de alcance limitado** (exposición externa y aplicación principal, acotada). Baja fricción y genera datos para la propuesta siguiente. En la home aparece como "¿No sabes por dónde empezar?".
- *Núcleo*: **auditoría de alcance definido** con propuesta cerrada (alcance, plazo y precio).
- *Expansión*: **acompañamiento de remediación** y revisión posterior, que es el diferencial frente a "informe y adiós".
- *Consultoría personalizada* para ingeniería segura (por días o bolsa de horas).
- Diseño preparado para precios: `services[].price` se pinta solo cuando tiene valor.

**Estructura de la home** (cada bloque cumple una función y no repite a otro):

| # | Sección | Función comercial |
|---|---|---|
| 1 | Hero: "La seguridad no se presupone. Se demuestra." | Qué hacemos y para quién en 10 segundos; CTA principal |
| 2 | Servicios (`#servicios`) | Qué se puede contratar: qué revisamos y qué recibes |
| 3 | Por qué StateX (`#enfoque`) | Diferencia: ingeniería de software y seguridad |
| 4 | Metodología (`#metodo`) | Rigor y trazabilidad: 4 fases, qué queda por escrito |
| 5 | Entregables (`#entregables`) | Ver el valor antes de pagar: informe de demostración |
| 6 | Trayectoria (`#trayectoria`) | Origen honesto: proyectos originales, investigación y hoy, separados |
| 7 | Equipo (`#equipo`) | Quién hace el trabajo y con qué experiencia |
| 8 | Preguntas (`#preguntas`) | Objeciones: legalidad, producción, escáner, precio, agencias |
| 9 | Contacto (`#contacto`) | Qué pasa después y formulario breve |
| 10 | Pie | Servicios, secciones, legales, "sin analítica ni cookies de seguimiento" |

Se elimina la sección "Problema" porque el hero y "Qué revisamos" ya la cubren. "Cómo trabajamos" se
funde en Enfoque y Metodología, y "Hoy vs Visión" sale de la home (ver diagnóstico 4).

**Conversión.**
- CTA único y explícito: "Solicitar evaluación" (cabecera, hero, cada servicio y cada página de servicio).
- Los enlaces de servicio preseleccionan el tipo en el formulario.
- El formulario pide nombre, email corporativo, empresa, tipo de servicio y descripción, con aviso de no enviar credenciales ni detalles de vulnerabilidades.
- "Qué pasa después" en tres pasos: nos escribes, hablamos y recibes una propuesta cerrada.

## 5. SEO

- **Páginas de destino**: `/servicios/auditoria-seguridad-web-api`, `/servicios/evaluacion-exposicion-externa` y `/servicios/ingenieria-software-segura`, con title, description, canonical, Open Graph, `Service` y `BreadcrumbList` en JSON-LD.
- **Home**: title "StateX · Auditoría de seguridad web, APIs y exposición externa", `ProfessionalService` con catálogo de servicios y `areaServed` Barcelona y España. Sin reseñas, valoraciones ni direcciones inventadas.
- **Encabezados**: un h1 por página, h2 por sección, h3/h4 por bloque.
- **Técnico**: `robots.ts`, `sitemap.ts`, `metadataBase`, imagen OG generada en build y design lab con `noindex`. Todo queda en `noindex` hasta `SITE_INDEXABLE=true`.
- **Términos**: "auditoría de seguridad web" tiene intención sobre todo informativa; "pentesting web", comercial; "auditoría de seguridad de APIs" tiene poca competencia de páginas de servicio en español. No hay datos de volumen: validar con Search Console tras el lanzamiento. Siguiente paso de contenido: una guía real "Qué incluye una auditoría de seguridad web y de qué depende el precio". Una página `/barcelona` solo con contenido genuino.

## 6. Cambios priorizados (impacto / esfuerzo)

| Prioridad | Cambio | Impacto | Esfuerzo | Estado |
|---|---|---|---|---|
| 1 | Tres servicios claros + copy completo | Alto | Medio | Hecho |
| 2 | Quitar placeholders y funcionalidades futuras de la web pública | Alto | Bajo | Hecho |
| 3 | Informe de demostración en la home | Alto | Medio | Hecho |
| 4 | Páginas de servicio + SEO técnico | Alto | Medio | Hecho |
| 5 | Formulario: validación cliente/servidor compartida, antiabuso, estados claros | Medio | Bajo | Hecho |
| 6 | Separar la web del design lab (`app/_site/`) | Medio | Bajo | Hecho |
| 7 | Configurar buzón, datos legales y dominio | Crítico para lanzar | Bajo | Pendiente (vosotros) |
| 8 | Bios verificables, primeras notas de investigación, PDF de ejemplo | Alto | Medio | Pendiente |
| 9 | Límite de envíos global, ESLint | Bajo | Medio | Pendiente (requiere dependencias) |
