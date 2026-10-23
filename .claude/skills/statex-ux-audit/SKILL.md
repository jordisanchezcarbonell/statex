---
name: statex-ux-audit
description: Auditoría de calidad visual, accesibilidad (WCAG 2.2 AA) y experiencia de usuario para páginas de StateX. Úsala tras construir o modificar una página, o para comparar las propuestas del design lab con criterios objetivos.
---

# StateX UX Audit

## Alcance
Indica qué ruta(s) auditas. Lee el TSX y el CSS module de cada una y `CLAUDE.md`.

## Checklist

### 1. Mensaje y conversión
- [ ] En 10 s queda claro qué hace StateX, para quién y qué hacer a continuación.
- [ ] El CTA principal es visible sin scroll en 1280×800 y en 390×844.
- [ ] El texto del CTA describe la acción exacta y es coherente en toda la página.
- [ ] No hay afirmaciones, clientes, cifras ni certificaciones inventadas.

### 2. Calidad visual
- [ ] Escala tipográfica coherente; medida de línea ≤ ~75 caracteres en cuerpo.
- [ ] Jerarquía clara: un único foco por pantalla.
- [ ] Espaciado con ritmo consistente; sin colisiones de especificidad CSS.
- [ ] Un solo elemento memorable; decoración que no informa → eliminar.
- [ ] Sin clichés genéricos (ver `CLAUDE.md`).

### 3. Accesibilidad (WCAG 2.2 AA)
- [ ] Contraste texto ≥ 4.5:1 (≥ 3:1 para texto grande y elementos de UI). Calcula los ratios de los pares de color reales.
- [ ] Un `h1`, jerarquía de encabezados sin saltos, landmarks (`header`, `nav`, `main`, `footer`).
- [ ] Todo lo interactivo es operable con teclado y tiene foco visible.
- [ ] Controles personalizados con rol/estado ARIA correctos (`aria-pressed`, `aria-selected`, `role="slider"` + valores…).
- [ ] Objetivos táctiles ≥ 44×44px en móvil.
- [ ] `prefers-reduced-motion` desactiva animaciones no esenciales.
- [ ] SVG decorativos con `aria-hidden`; los informativos con título o texto alternativo.
- [ ] `lang="es"` en el documento.

### 4. Responsive
- [ ] 360, 768, 1280 y 1600px sin scroll horizontal ni texto cortado.
- [ ] Navegación usable en móvil.

### 5. Rendimiento percibido
- [ ] Fuentes vía `next/font` con `display: swap`; máximo 2 familias por página.
- [ ] Sin imágenes pesadas innecesarias; SVG/CSS cuando sea posible.
- [ ] JavaScript de cliente limitado a lo interactivo.

## Informe
```
## Auditoría UX — <ruta>
| Severidad | Archivo:línea | Problema | Impacto | Arreglo |
|-----------|---------------|----------|---------|---------|

Puntuación (1–5): Mensaje · Calidad visual · Accesibilidad · Responsive · Rendimiento
Top 3 acciones:
1. …
```
Para comparativas del design lab, añade una tabla con una columna por dirección y la recomendación final.
