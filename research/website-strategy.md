# Estrategia web y propuesta de home — StateX

Fecha: 2026-10-24. Dirección recomendada: **C. Private Cybersecurity Advisory** (`creative-directions.md`).
Fuentes: `brand-benchmark.md`, `cybersecurity-competitors.md`, `spanish-market.md`, `services-pricing.md` y `naming.md`.

## 1. Decisiones que tomáis vosotros (bloquean contenido, no diseño)

| Decisión | Opciones | Recomendación |
|---|---|---|
| Nombre | Mantener StateX / Sánchez & Sánchez / nombre nuevo | Mantener **StateX** con descriptor fijo "StateX · Ciberseguridad" y los fundadores visibles (`naming.md`: statex.es lo usa una inmobiliaria) |
| Segmento prioritario | Mediana empresa y scaleups (actual `CLAUDE.md`) / empresas que desarrollan apps web y APIs | **Empresas de producto con Next.js/React y APIs** como prioridad 1; la mediana empresa, cuando haya 3–5 casos (`spanish-market.md` §8) |
| Paquetes y precios | Publicar rangos / "desde" / solo bajo propuesta | **No publicar precios** todavía: validar con 8–10 conversaciones y 2–3 pilotos (`services-pricing.md` §7) |
| Fundadores | Nombres y foto / solo nombres / anónimo | **Nombres, rol y una línea real de experiencia de cada uno** `[Pendiente: bios verificables]` |

Si se cambia el segmento, hay que actualizar `CLAUDE.md` ("Para quién") y `app/design-lab/content.ts`.

## 2. Objetivos y medición sin trackers

1. **Conversión principal:** solicitar una consulta (formulario de alcance).
2. **Conversión secundaria:** ver o descargar el informe de ejemplo.
3. **Comprensión:** un directivo entiende en 10 segundos qué hace StateX.

Sin analítica de terceros (`CLAUDE.md`). Se mide contando en el servidor los envíos del formulario y las descargas del informe, sin cookies.

## 3. Arquitectura del sitio

| Ruta | Contenido | Fase |
|---|---|---|
| `/` | Home (sección 4) | Lanzamiento |
| `/servicios/evaluacion-inicial`, `/servicios/auditoria`, `/servicios/acompanamiento` | Un paquete por página: para quién, alcance, exclusiones, entregables, plazo y CTA | Lanzamiento |
| `/metodo` | Las cinco fases con lo que se entrega en cada una, autorización y reglas de intervención | Lanzamiento |
| `/informe-de-ejemplo` | Informe navegable sobre `ejemplo.com` con datos ilustrativos, más PDF | Lanzamiento (es la prueba clave) |
| `/firma` | Jordi y Albert Sánchez, archivo InfoStateX y DoubleReboot 2012–2018, forma de trabajar | Lanzamiento |
| `/investigacion` | Notas técnicas fechadas y firmadas | Cuando haya 2–3 notas |
| `/contacto` | Formulario de alcance, email con PGP `[Pendiente]` | Lanzamiento |
| `/legal`, `/privacidad`, `/.well-known/security.txt` | Aviso legal, privacidad (sin cookies), política de divulgación | Lanzamiento |

## 4. Home propuesta (orden, contenido y por qué)

Navegación: StateX · Servicios · Método · Informe de ejemplo · La firma · Contacto, con el CTA "Solicitar una consulta". La cabecera se vuelve sólida al hacer scroll.

| # | Sección | Contenido | Por qué |
|---|---|---|---|
| 1 | **Hero** | Titular "La confianza se construye con precisión." Subtítulo "Auditamos aplicaciones web, APIs y lo que tu empresa expone en internet. Verificamos cada hallazgo y lo entregamos como un plan priorizado." CTA "Solicitar una consulta" / "Ver el informe de ejemplo". Lámina con la portada del informe de ejemplo | El subtítulo del brief ("excelencia, discreción…") no dice qué hacéis; este sí, en 10 segundos |
| 2 | **Filosofía** | "Excelencia en cada detalle." Composición asimétrica con una tesis breve sobre el riesgo de exposición y tres frases de cómo trabajáis. Fotografía de arquitectura si existe `[Pendiente]` | El punto de vista propio (principio 10 del benchmark) |
| 3 | **Servicios** | Tres bloques amplios con filetes finos. **Evaluación inicial de exposición**, **Auditoría de aplicación web y API** y **Acompañamiento de seguridad**, cada uno con para quién, qué incluye y "Pedir esta evaluación". Las áreas de `content.ts` (EASM, AppSec, VA, Security Engineering e IA) van dentro como capacidades, no como cinco productos | Tres paquetes se entienden; cinco áreas en inglés no |
| 4 | **Método** | "Un método. Cada detalle importa." Cinco fases (Alcance, Descubrimiento, Verificación, Priorización y Reducción) con el **entregable** de cada una. Línea fija: "Ninguna prueba empieza sin autorización por escrito." | Ningún competidor consultado explica fases y entregables en la home (`cybersecurity-competitors.md`, patrón 5). Se mantienen las 5 fases de `CLAUDE.md`, no las 4 del brief |
| 5 | **Informe de ejemplo** | Tres páginas del informe en miniatura (resumen ejecutivo, hallazgo con evidencia y plan de corrección) con datos ilustrativos. CTA "Ver el informe completo" | La mejor prueba disponible sin clientes, al estilo del informe navegable de Trail of Bits |
| 6 | **La firma** | "Una firma independiente, dirigida por sus fundadores." Jordi y Albert Sánchez `[Pendiente: bios]`, el archivo 2012–2018 como línea temporal honesta y "Hablas con quien hace el trabajo." | Exclusividad por acceso (Loro Piana, Aston Martin); el tamaño pequeño como argumento |
| 7 | **Hoy y visión** | Lo que hacéis hoy frente a lo que es roadmap (monitorización continua) | Honestidad diferencial (oportunidad 7 de los competidores) |
| 8 | **Preguntas** | Legalidad y autorización, impacto en producción, qué necesitáis del cliente, precio ("propuesta cerrada tras la primera conversación") y confidencialidad | Responde las objeciones antes del formulario |
| 9 | **Contacto** (fondo grafito) | "La seguridad comienza con una conversación." Qué pasa después: respuesta en `[Pendiente: X días hábiles]`, llamada de 30 minutos y propuesta cerrada. Formulario de alcance | CTA que dice exactamente qué pasa (oportunidad 3) |
| 10 | **Pie** | Logotipo, navegación, email `[Pendiente]`, PGP `[Pendiente]`, `security.txt` y "Esta web no usa cookies ni trackers" | Coherencia comprobable (oportunidad 5) |

## 5. Formulario de alcance

- **Campos:** nombre, empresa, email de trabajo, servicio (los tres paquetes, otra consulta o colaboración), qué queréis proteger (dominios o apps, opcional), mensaje y consentimiento.
- **Seguridad:** ya implementado en `app/actions/contact.ts`.
  - Validación en servidor.
  - Campo oculto contra bots.
  - Sin secretos en el cliente.
  - Estado `not-configured` si falta el buzón.
- **Falta:**
  - Rate limiting por IP. Necesita un almacén, p. ej. Upstash o Vercel KV, que es una dependencia que hay que aprobar.
  - Enlace a la política de privacidad.
  - Buzón real en `CONTACT_TO`.
- **No prometer** auditorías gratuitas ni presupuestos inmediatos.

## 6. SEO técnico

- `metadata` por página, Open Graph con imagen propia, `lang="es"`, `sitemap.xml` y `robots.txt`.
- JSON-LD `Organization` y `ProfessionalService` sin datos inventados: sin reseñas ni valoraciones.
- Contenido orientado a búsquedas reales del segmento prioritario: "auditoría de seguridad Next.js", "pentest de API", "auditoría web empresa". Las palabras clave están por validar con datos de búsqueda `[Pendiente]`.

## 7. Plan de trabajo propuesto

1. Decidir nombre, segmento y bios (sección 1).
2. Concept I en el design lab con la dirección C y comparación con H.
3. Redactar el informe de ejemplo (contenido técnico real, datos ilustrativos).
4. Construir la home y las páginas de lanzamiento. Revisión `ux-reviewer` y `security-reviewer`.
5. Legal: aviso legal, privacidad, plantillas de autorización y reglas de intervención, NDA y acuerdo de tratamiento de datos. Seguro de responsabilidad civil profesional (`services-pricing.md` §7).
6. Publicar solo con aprobación explícita (`CLAUDE.md`).
