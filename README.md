# StateX

Web de **StateX**, firma de ciberseguridad B2B especializada en External Attack Surface Assessment, auditorías de seguridad web, Vulnerability Assessment, revisiones de arquitectura y hardening, y consultoría técnica. Como servicio complementario ofrece ingeniería de software y automatización con IA.

> **Estado:** fase de exploración visual. La web definitiva aún no está construida. El repositorio contiene un *design lab* con seis direcciones visuales para elegir una antes de continuar.

## Design lab

Seis homepages con **la misma marca, el mismo contenido y la misma estructura**. Solo cambia la dirección artística.

| Concepto | Ruta | Dirección |
|---|---|---|
| A · Premium Cybersecurity | `/design-lab/a` | Claro y minimalista, con un mapa orbital de activos |
| B · Dark Technical | `/design-lab/b` | Oscuro y técnico, con relieve de isolíneas |
| C · Creative Security Studio | `/design-lab/c` | Editorial y asimétrico, impresión a dos tintas |
| D · Cybersecurity SaaS | `/design-lab/d` | Claridad de producto B2B, con vista previa del informe |
| E · Neo Brutalism | `/design-lab/e` | Bloques planos, bordes gruesos y tipografía protagonista |
| F · Futuristic Minimal | `/design-lab/f` | Esfera de alambre y capas translúcidas |

El comparador de `/design-lab` permite:

- cambiar de concepto con las pestañas o con las teclas 1–6;
- alternar entre vista de escritorio y móvil;
- ver las referencias, la tipografía, la paleta y el movimiento de cada concepto;
- preseleccionar favoritos (se guardan solo en tu navegador).

Las capturas de cada concepto están en [`docs/capturas/`](docs/capturas/). La investigación de referencias está en [`docs/design-research.md`](docs/design-research.md).

## Puesta en marcha

Requisitos: Node 22 (ver `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

Abre http://localhost:3000/design-lab.

| Script | Uso |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto 3000 |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run typecheck` | Comprobación de tipos con TypeScript |

## Stack

- Next.js 16 (App Router), React 19 y TypeScript estricto
- Tailwind CSS 4, Motion (`motion/react`) y lucide-react
- Fuentes de Google Fonts mediante `next/font`, alojadas por la propia web (sin peticiones a terceros)
- Cabeceras de seguridad en `next.config.ts`
- Dependencias fijadas a versiones exactas, con `npm audit` limpio

## Estructura

```
app/
  design-lab/
    page.tsx          Comparador
    content.ts        Contenido comercial único, compartido por todos los conceptos
    directions.ts     Metadatos de cada concepto (paleta, tipografía, referencias)
    _shared/          Comparador y barra de navegación entre conceptos
    a/ … f/           Los seis conceptos
docs/
  design-research.md  Análisis de referencias
  capturas/           Capturas de los conceptos
.claude/
  agents/             Subagentes de Claude Code
  skills/             Skills de Claude Code
CLAUDE.md             Posicionamiento, estilo y restricciones del proyecto
```

## Trabajo con Claude Code

El proyecto incluye agentes y skills propios en `.claude/`:

| Tipo | Nombre | Para qué |
|---|---|---|
| Agente | `creative-director` | Definir y criticar direcciones visuales |
| Agente | `frontend-engineer` | Implementar páginas con el stack del proyecto |
| Agente | `ux-reviewer` | Auditar UX y accesibilidad (solo lectura) |
| Agente | `security-reviewer` | Revisar dependencias, cabeceras y afirmaciones (solo lectura) |
| Skill | `/statex-design-lab` | Crear, iterar y comparar conceptos |
| Skill | `/statex-ux-audit` | Checklist de calidad visual, accesibilidad y UX |

Se recomienda tener instalado el plugin oficial `frontend-design`:

```
/plugin install frontend-design@claude-plugins-official
```

## Reglas de contenido

- La única marca es **StateX**. Los nombres "Concept A–F" son internos.
- No se inventan clientes, logos, testimonios, cifras ni certificaciones. Donde falta información real aparece `[Pendiente: …]` o `[Por confirmar: …]`.
- Los ejemplos técnicos usan `ejemplo.com` y rangos IP de documentación (RFC 5737).
- No se despliega a producción sin aprobación explícita.

Las reglas completas están en [`CLAUDE.md`](CLAUDE.md).

## Pendiente

- Elegir la dirección visual que se va a desarrollar.
- Definir el destino del CTA de contacto (formulario o email).
- Redactar la historia de DoubleReboot e InfoStateX.
- Confirmar los compromisos de trabajo de la sección de confianza.
- Añadir los datos legales.
