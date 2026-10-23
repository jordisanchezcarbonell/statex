# StateX

Web de **StateX**, startup de ciberseguridad en fase inicial especializada en detectar, comprender y reducir riesgos de seguridad en entornos digitales: External Attack Surface Assessment, Web Application Security, Vulnerability Assessment, Security Engineering y AI-Assisted Security Research. Como capacidad complementaria ofrece ingeniería de software y automatización.

StateX recupera el legado de [InfoStateX](https://infostatex.blogspot.com/) (2012–2018) y [DoubleReboot](https://doublereboot.blogspot.com/).

> **Estado:** fase de exploración de marca. La web definitiva aún no está construida. El repositorio contiene un *design lab* con siete direcciones de marca y homepage para elegir una.

## Design lab

Siete direcciones con **la misma marca, el mismo posicionamiento y el mismo contenido** (`app/design-lab/content.ts`). Cada una incluye homepage e identidad de marca (logotipo, paleta, tipografía, sistema gráfico, tarjeta digital, portada de pitch deck y aplicaciones).

| Concepto | Homepage | Identidad | Momento memorable |
|---|---|---|---|
| A · Venture Capital Ready | `/design-lab/a` | `/design-lab/a/marca` | X monumental de celdas que revela activos expuestos |
| B · Cybersecurity Product | `/design-lab/b` | `/design-lab/b/marca` | Grafo conceptual de la superficie de ataque |
| C · Category Creator | `/design-lab/c` | `/design-lab/c/marca` | Piezas modulares que se recomponen por sección |
| D · Dark Premium Security | `/design-lab/d` | `/design-lab/d/marca` | Globo ASCII en tiempo real y terminal con scroll |
| E · Neo Brutalism | `/design-lab/e` | `/design-lab/e/marca` | Bloques con sombra dura y titular gigante (recuperado de la ronda 1) |
| F · Future Security | `/design-lab/f` | `/design-lab/f/marca` | Shader WebGL con lente que revela la capa del atacante |
| G · Editorial Tech / Underground | `/design-lab/g` | `/design-lab/g/marca` | Barras de censura y archivo tratado como publicación |

El comparador de `/design-lab` permite cambiar de concepto (pestañas o teclas 1–7), alternar homepage e identidad, ver escritorio y móvil, consultar paletas, tipografías y referencias verificadas, y comparar ventajas e inconvenientes.

Capturas en [`docs/capturas/`](docs/capturas/) e investigación en [`docs/design-research.md`](docs/design-research.md).

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
    a/ … g/           Los siete conceptos (homepage + marca/)
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
| Agente | `brand-strategist` | Revisar posicionamiento, mensajes y credibilidad (solo lectura) |
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
- No se despliega a producción sin aprobación explícita. El repositorio está conectado a Vercel: un push a `main` publica el design lab.

Las reglas completas están en [`CLAUDE.md`](CLAUDE.md).

## Pendiente

- Elegir la dirección de marca que se va a desarrollar.
- Confirmar el año de origen (el archivo de InfoStateX empieza en 2012; el brief decía 2013).
- Definir el destino del CTA de contacto (formulario o email).
- Confirmar las automatizaciones internas de «Disponible hoy» y el equipo de «Sobre StateX».
- Añadir los datos legales.
