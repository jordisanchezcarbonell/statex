# Evolución comercial y tres identidades de marca (2026-10-26)

Previews: `/preview/statex`, `/preview/noxen`, `/preview/vantis` (barra inferior para saltar entre ellas y volver a la web actual).
La home de producción (`/`) **no cambia**. Investigación de nombres completa: `docs/investigacion-nombres-2026-10-26.md`.
Capturas (escritorio 1440, tablet 820 y móvil 390): `docs/capturas/identidades/`.

## 1. Diagnóstico de la web existente

La web ya tenía una base sólida: Next.js 16 App Router, TypeScript estricto, Tailwind 4, una sola fuente
auto-hospedada, contenido centralizado en `app/_site/content.ts`, formulario con Server Action real (Resend),
validación compartida cliente/servidor, antiabuso sin dependencias, CSP y cabeceras de seguridad, JSON-LD,
noindex global hasta el lanzamiento, `prefers-reduced-motion` y responsive hasta 360 px. Gran parte del brief
(hero con dos CTA, tres servicios, método en cuatro fases, equipo con LinkedIn, formulario con consentimiento)
ya existía. Por eso esto es una evolución y no un rediseño.

| | Elementos |
|---|---|
| **Conservar** | Sistema H (paleta, Inter en mayúsculas, línea de acento única), Shell/Header/Footer, escena del pasillo, servicios con precio y sus páginas, compromisos (retest 6 meses, 48 h, aviso inmediato, NDA), evaluación inicial y pack de agencias, informe de demostración, trayectoria verificada, FAQ, formulario y Server Action, SEO y cabeceras |
| **Mejorar** | Hero centrado en «detectar y corregir»; método que termina en **Verificar** (antes acababa en Corregir aunque el retest ya existía); bios con la responsabilidad de cada fundador; formulario sin web corporativa ni aviso de que enviarlo no autoriza pruebas |
| **Añadir** | Tres áreas de oferta (Offensive Security, Secure Engineering, Security Advisory), «Por qué elegirnos» con seis razones, tokens de identidad, previews protegidas |
| **Revisar** (sin tocar) | `design-lab` A–I (archivo; 19 rutas públicas en Vercel), ESLint inexistente, límite de envíos en memoria por instancia |

## 2. Qué se ha implementado

**Arquitectura (sin duplicar la app).** Una única home evolucionada (`app/_site/EvolvedHome.tsx`) y un único
contenido (`app/_site/evolution.ts`, función del nombre de marca) sirven a las tres previews. Cada identidad
(`app/_site/identities/*.ts`) solo define nombre, tagline, tokens CSS, fuente, escena del hero y tipo de cabecera.
Los componentes de producción aceptan esas variantes por props con valores por defecto iguales a producción:

- `ui.tsx`: tokens de tipografía (`--h-display`, peso, caja, interletrado) y `Wordmark` por identidad.
- `Shell`/`Header`: identidad y navegación opcionales; cabecera `standard`, `centered` (Noxen) o `ledger` (Vantis, con franja superior).
- `Hero`: copy, franja y escena por props; escenas nuevas en `HeroScenes.tsx` (solo SVG con tokens; sin librerías).
- `Method` acepta sus datos; `Services` expone `ServiceExtras`; Trayectoria, Equipo y FAQ son componentes reutilizables.
- Cada preview carga solo su fuente (Manrope para Noxen, Newsreader para Vantis) con `next/font` auto-hospedado.

**Secciones nuevas (en las previews).** Hero «La seguridad no termina cuando encuentras una vulnerabilidad.» ·
tres áreas con «qué incluye» y «por dónde empezar» (enlazan los servicios con precio publicado y la evaluación
inicial), presentadas como líneas propuestas · método Evaluamos → Priorizamos → Corregimos → Verificamos, con lo
que queda por escrito en cada fase · «Por qué elegirnos» (seis razones) · «Quiénes somos» con bios verificadas
y responsabilidad de cada fundador (sin fotos: no hay imágenes autorizadas en el proyecto) · trayectoria contada
según la marca (con Noxen o Vantis, InfoStateX pasa a ser antecedente).

**Formulario (también en producción, por ser una mejora no visual de marca).** Campo opcional «Web corporativa»
validado en cliente y servidor e incluido en el correo; aviso «Enviar este formulario no autoriza a {marca} a
realizar ninguna prueba de seguridad…»; consentimiento con el nombre de la identidad. Los estados de carga,
error, límite y «no configurado» ya existían: sin `RESEND_API_KEY` el formulario dice que **no** se ha enviado.

**Fuera de buscadores y protegidas.** `noindex, nofollow` en metadatos, cabecera `X-Robots-Tag` y `Disallow:
/preview` en robots. `proxy.ts`: con `PREVIEW_USER`/`PREVIEW_PASSWORD`, autenticación básica; sin ellas (decisión del
2026-10-26), públicas también en Vercel, siempre con noindex. Sin JSON-LD en las previews.

**Decisiones tomadas por defecto** (reversibles): nombres de área en inglés, como en el brief, con descriptor en
español; sin numeración 01/02/03 en las áreas (no son una secuencia; sí en el método); taglines en inglés como
firma, con todo el copy en español; «Seguimiento y mejora continua» redactado como «seguimiento periódico… si se
contrata» para no prometer monitorización continua (roadmap).

## 3. Comparativa de identidades

| | **A · StateX** — Executive Minimal | **B · Noxen** — Dark Precision | **C · Vantis** — Corporate Intelligence |
|---|---|---|---|
| Visual | La web actual: obsidiana, Inter 600 en mayúsculas, línea roja, pasillo de pórticos | Negro más profundo, Manrope ligera en mayúsculas, acento bronce, horizonte nocturno, logo centrado | Azul noche, serifa editorial (Newsreader) en caja baja, acento azul, retícula y línea escalonada |
| Profesionalidad | Alta | Alta | Alta |
| Elegancia | Alta, sobria | La más «lujo» (Porsche/Massimo Dutti) | Editorial, de consultora estratégica |
| Confianza | Alta: historia verificable desde 2012 | Media: nombre nuevo y connotación «noxa/noxious» (daño) | Media: genérico, recuerda a fintech/aseguradora |
| Diferenciación | Media (la X es habitual en tecnología) | Alta en lo visual | Baja: Vanta, VANTIS (escáner), «Vantis Security» |
| Claridad comercial | Igual en las tres: mismo contenido, mismos CTA | Igual | Igual |
| Captar empresas | Buena: CTO y dirección | Buena con CTO; algo fría para dirección no técnica | La más «board-friendly» por tono |
| Escalabilidad | Buena (productos futuros «StateX …») | Buena | Buena |
| **Riesgo de naming** | **Bajo-medio**: inmobiliaria Statex (Madrid) en otro sector; .com de un tercero; statexsecurity.com aparentemente libre | **Alto**: Noxen Technologies (OSINT/ofensiva), European Noxen (Madrid); .com en venta | **Muy alto**: vantissecurity.com en uso, escáner VANTIS, marca AU en clase 42 |

Contraste (WCAG AA) verificado para las tres: texto 16,5–17,1:1; secundario 7,1–7,8:1 sobre fondo y ≥6,2:1 sobre grafito; acentos solo en líneas (≥3:1).

## 4. Recomendación

**Quedarse con StateX**, adoptar la evolución comercial de las previews y tomar prestados dos rasgos de las otras:

1. El nombre: es el único con historia verificable (InfoStateX 2012, DoubleReboot, GitHub de Albert desde 2013),
   sin conflicto observado en ciberseguridad y con una variante de dominio aparentemente libre. Noxen y Vantis
   empiezan de cero y además cargan con conflictos en el mismo sector, el de Vantis casi idéntico.
2. La evolución comercial (hero, tres áreas, método con Verificar, por qué elegirnos, quiénes somos) funciona igual
   con cualquier nombre: es lo que más mejora la conversión y no depende de la marca.
3. Opcional: probar en StateX la tipografía ligera de Noxen solo en el hero, o la franja superior de Vantis. Son
   un cambio de tokens.

**Antes de decidir:** registrar `statexsecurity.com` (el `.env.example` ya lo da como elegido, pero el whois indica
que **no está registrado**) y encargar una búsqueda formal en EUIPO y OEPM (clases 9, 42, 35, 45). Ninguna base
de marcas pudo consultarse automáticamente.

## 5. Para pasar a producción (pendiente de aprobación)

Integrar `evolution.ts` en `content.ts` y hacer que `/` use `EvolvedHome` con la identidad StateX (o sus secciones
en `Home.tsx`); actualizar el JSON-LD (áreas) y la FAQ. No se ha hecho push ni deploy.
