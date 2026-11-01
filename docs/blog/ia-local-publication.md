# Preparación editorial local — 1 de noviembre de 2026

La fase experimental está cerrada. No se ha ejecutado ningún modelo durante este trabajo editorial. Sin push, merge, despliegue, publicación en redes ni limpieza de recursos del laboratorio.

Rama: `editorial/ia-local-dependencia`.

## Artículo y procedencia

Título: «Probamos una IA local para actualizar una dependencia: por qué rechazamos su propuesta».

Autor: Jordi Sánchez. Extensión renderizada: **1.149 palabras**, incluido diagrama, tabla y fuentes; excluye cabecera y pie de la web. Fecha editorial: 2026-11-01. No se inventa una fecha de publicación efectiva: JSON-LD registra `dateCreated`; `datePublished` y `publishedTime` no se declaran todavía.

Fuentes internas leídas, sin publicarlas automáticamente:

- `statex-ai-remediation-lab/reports/observed.md`.
- `statex-ai-remediation-lab/reports/first-local-pilot-observed.md`.
- `statex-ai-remediation-lab/reports/statex-post-draft.md`.

Los pilotos originales y sus artefactos no se modificaron. Se añadió únicamente el cierre editorial a observed.md y README del laboratorio; no se copiaron pesos, respuestas o trazas a `public/` ni a los módulos del blog.

Fuentes técnicas verificadas por lectura el 2026-11-01:

- [GitHub Advisory Database, CVE-2024-21538](https://github.com/advisories/GHSA-3xgq-45jj-v275): rango vulnerable y versión 7.0.5 reparada.
- [Qwen, revisión de pesos utilizada](https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF/tree/f86cb2c1fa58255f8052cc32aeede1b7482d4361): procedencia oficial GGUF.
- [llama.cpp, fuente fijada en formato raw](https://raw.githubusercontent.com/ggml-org/llama.cpp/74d4f5b041ad837153b0e90fc864b8290e01d8d5/examples/main/main.cpp): marcador del CLI. El visor GitHub devolvió un fallo de caché en la herramienta de consulta; se verificó el raw de la misma revisión y la copia local de fuente. El artículo enlaza al visor y sus líneas.
- [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/): contrato de instalación y relación con el lockfile.

Las fuentes externas explican los componentes. Los resultados medidos proceden exclusivamente de los tres informes internos.

## Integración

No existía `/blog`. Se añadieron índice y artículo estáticos con Shell, tipografía, paleta, cabecera y pie existentes. Menú y pie incluyen Blog. El constructor de enlaces distingue rutas de anclas para evitar `//blog` desde páginas interiores.

Incluye canonical, descripción, autor, Open Graph, Twitter, imagen social generada con código y JSON-LD BlogPosting. El sitemap incorpora las rutas solo si la configuración existente hace indexable el sitio; no se activó indexación ni se cambió el dominio.

El texto breve de LinkedIn está en [ia-local-linkedin.md](ia-local-linkedin.md), únicamente como borrador local.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | Aprobado; 47 páginas generadas, incluidas índice, artículo e imagen social |
| Primer intento de build en sandbox | Interrumpido al quedar bloqueado en compilación; no se presenta como aprobado |
| Build fuera del sandbox | Compilación, TypeScript y prerender aprobados |
| `npm run typecheck` | Aprobado |
| `git diff --check` | Aprobado |
| Chrome headless existente, Puppeteer Core 24.43.1 | Script de comprobación aprobado, sin instalar dependencias |
| Anchos 320, 375, 768, 1024, 1440 px | Sin desbordamiento de página o cabecera; diagrama adapta columnas |
| Menú móvil a 375 px | Abrir y navegar a Blog funciona |
| Enlaces internos del artículo, incluidos cabecera y pie | 12 rutas distintas con HTTP 200 |
| Anclas internas y hacia la home | 8 destinos existentes |
| Imagen social específica del artículo | HTTP 200, image/png |
| Metadatos y JSON-LD | Autor, canonical, imagen social y BlogPosting comprobados |
| Rutas de informes/evidencias/trazas ensayadas | Cuatro rutas con HTTP 404 |
| Errores JavaScript en páginas visitadas | Ninguno detectado |
| Inspección visual de capturas | Cabecera móvil y artículo de escritorio revisados |

El script bloquea solicitudes del navegador a otros orígenes. No probó formularios, servicios externos, motores de redes sociales ni todos los posibles tamaños o lectores de pantalla. Las respuestas 404 de cuatro rutas no son una auditoría universal de exposición. El blog no importa ni monta los archivos del laboratorio.

Capturas y resultados: [checks.json](../capturas/blog/checks.json), [móvil](../capturas/blog/articulo-movil-cabecera.png), [escritorio](../capturas/blog/articulo-escritorio.png). Se conservan bajo docs, no public/.

## Previsualización local

Con el build ya generado:

```sh
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100
```

Abrir `http://127.0.0.1:3100/blog` y `http://127.0.0.1:3100/blog/ia-local-actualizar-dependencia`. Para iterar: `npm run dev`, en el puerto 3000 por defecto. No hace falta Docker ni ejecutar controles del laboratorio.

Para repetir solo la comprobación web usando instalaciones locales ya disponibles:

```sh
STATEX_PUPPETEER_MODULE=/ruta/al/modulo/puppeteer-core.js STATEX_BROWSER=/ruta/al/ejecutable/chrome node scripts/check-blog.mjs
```

El script no descarga navegador ni ejecuta modelos. Las rutas de instalación se facilitan como variables y no se incorporan a la web.

## Pendiente antes de publicar

Revisión editorial final y autorización de publicación. Confirmar URL pública definitiva y fecha efectiva de publicación si se añaden al metadato. No extrapolar la comparación de semilla 42 a una tasa de éxito, ni la salud del observador a confidencialidad. Los huecos de cobertura del laboratorio siguen inconclusos; cerrarlos requeriría una fase nueva, fuera de este encargo.
