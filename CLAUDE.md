# StateX — Web corporativa

Proyecto de la web de StateX, startup de ciberseguridad. Fase actual: **exploración visual** (`/design-lab`). Todavía no se construye la web completa.

## Posicionamiento

- **Marca:** únicamente **StateX**. Sin submarcas ni nombres comerciales alternativos.
- **Qué es:** startup de ciberseguridad especializada en **descubrir, evaluar y reducir la exposición externa** de las organizaciones (todo lo que se ve y se puede atacar desde internet).
- **Servicios complementarios:** seguridad web (aplicaciones y APIs), ingeniería y automatización (infraestructura como código, pipelines seguros, controles automatizados).
- **Método:** Descubrir → Evaluar → Reducir → Vigilar.
- **Tono:** profesional, técnico, claro y creíble.
- **Para quién:** empresas medianas y scaleups (España / UE); interlocutores CTO, CISO o responsable de IT. `[POR CONFIRMAR: segmento prioritario]`

## Objetivos comerciales de la web

1. Conversión principal: **solicitar una conversación / evaluación inicial** con el equipo.
2. Conversión secundaria: descargar o pedir un ejemplo de informe (cuando exista).
3. Generar credibilidad técnica sin prueba social inventada: explicar método, entregables y forma de trabajar.
4. Que un directivo no técnico entienda en 10 segundos qué hace StateX y por qué importa.

## Estilo y dirección

- Calidad visual premium: tipografía cuidada, composición deliberada, mucho criterio y poca decoración.
- **Prohibido:** hackers con capucha, candados/escudos genéricos, dashboards recargados, hexágonos como recurso principal, estética de videojuego, fondos "matrix".
- Evitar clichés de plantilla: tarjetas SaaS idénticas con sombra, gradientes decorativos, eyebrows en MAYÚSCULAS sobre cada título, flechas `→` en todos los botones, 01/02/03 si el contenido no es una secuencia.
- Copy en español, frases cortas, voz activa, CTAs que dicen exactamente qué pasa ("Solicitar evaluación").
- Motion escaso e intencional; respetar siempre `prefers-reduced-motion`.

## Restricciones (obligatorias)

- **No inventar** clientes, logos, testimonios, casos, cifras de impacto, certificaciones (ISO 27001, SOC 2, etc.), partners ni premios. Si hace falta un hueco, usar un placeholder visible: `[Pendiente: caso real]`.
- Los ejemplos técnicos (dominios, IPs, hallazgos) deben ser claramente ilustrativos: `ejemplo.com`, rangos de documentación (`192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`).
- Mencionar normativas (NIS2, DORA, ENS) solo como contexto, nunca como certificación de StateX.
- **No desplegar** a producción ni configurar dominios/hosting sin aprobación explícita.
- No copiar diseños ni textos de otras webs.
- No añadir analítica, cookies de terceros ni trackers.
- Dependencias: versiones exactas fijadas y sin vulnerabilidades conocidas (`npm audit` limpio).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript estricto.
- Tailwind CSS 4 (`@tailwindcss/postcss`), Motion (`motion/react`) y lucide-react. Sin librerías de componentes UI.
- Fuentes con `next/font/google` (auto-hospedadas en build, sin peticiones a terceros en runtime).
- Node 22 (`.nvmrc`). Arranque: `nvm use && npm run dev` → http://localhost:3000/design-lab
- Cabeceras de seguridad en `next.config.ts`.

## Estructura

```
app/
  design-lab/
    page.tsx              # Comparador con selector (pestañas, teclas 1–4, escritorio/móvil)
    content.ts            # Contenido ÚNICO de StateX compartido por todos los conceptos
    directions.ts         # Metadatos de cada concepto (paleta, tipografía, intención)
    _shared/              # LabBar (navegación entre conceptos) y Compare (selector)
    a/ b/ c/ d/           # Concept A–D: misma estructura, distinta dirección artística
.claude/
  agents/                 # creative-director, frontend-engineer, ux-reviewer, security-reviewer
  skills/                 # statex-design-lab, statex-ux-audit
```

Regla del design lab: los conceptos comparan **diseño**, no negocios. Todos consumen `content.ts` y tienen las mismas secciones (hero, servicios, método, entregables, CTA). Los nombres "Concept A–D" son internos; la marca visible es siempre StateX.

## Flujo de trabajo con agentes y skills

- Explorar o iterar direcciones visuales → skill `statex-design-lab` (usa `frontend-design` si está disponible).
- Revisar una propuesta → skill `statex-ux-audit` o agente `ux-reviewer`.
- Antes de cualquier merge que toque dependencias, formularios, cabeceras o contenido con afirmaciones → agente `security-reviewer`.
- Decisiones de dirección de arte → agente `creative-director`; implementación → `frontend-engineer`.

## Calidad mínima

Responsive hasta 360px, foco de teclado visible, contraste WCAG AA, HTML semántico, `npm run build` y `npm run typecheck` sin errores.
