---
name: statex-design-lab
description: Genera, itera y compara direcciones visuales radicalmente distintas (actualmente seis, Concept A–F) para la web de StateX dentro de la ruta /design-lab. Úsala cuando se pida explorar estilos, crear o rehacer una propuesta de homepage, añadir una variante o decidir qué dirección desarrollar.
---

# StateX Design Lab

Objetivo: producir propuestas de homepage navegables y comparables, no la web completa.

## Antes de diseñar
1. Lee `CLAUDE.md` (posicionamiento, restricciones, stack).
2. Si existe la skill `frontend-design:frontend-design`, invócala y aplica su proceso (plan → revisión contra el brief → código → crítica).
3. Revisa `app/design-lab/directions.ts` para ver qué direcciones existen ya y no repetirlas.

## Definir cada dirección
Para cada una, escribe primero (en el comentario de cabecera del `page.tsx` de la dirección):
- **Tesis** (1 frase) y **a quién habla** (CTO técnico, CISO, consejo…).
- **Paleta:** 4–6 hex con nombre.
- **Tipografía:** 1–2 familias de `next/font/google` y su rol.
- **Layout:** wireframe ASCII del hero y del recorrido.
- **Elemento memorable:** una sola cosa; el resto, sobrio.

**Misma empresa, distinto diseño.** Todas las direcciones usan la marca StateX, la misma propuesta comercial y el contenido de `app/design-lab/content.ts`. No inventes posicionamientos, submarcas ni nombres comerciales: los conceptos se llaman internamente "Concept A, B, C, D".

Todas deben diferir en **al menos tres ejes**: claro/oscuro, tipografía (grotesca/condensada/serif/mono), composición (asimétrica, diagrama, split, columna de lectura), tipo de hero (ilustración generativa, interacción, tipografía, documento) y público principal.

Comprueba contra los clichés: crema+serif+terracota, negro+acento ácido, layout de periódico con filetes, kit de tarjetas SaaS, eyebrows en MAYÚSCULAS, `A · B · C`, `→` en cada botón, 01/02/03 sin secuencia. Si una dirección cae en uno sin justificación, cámbiala.

## Implementación
- Ruta: `app/design-lab/<letra>/page.tsx` con Tailwind CSS 4, Motion (`motion/react`) y lucide-react (+ componentes `"use client"` para interacción).
- Registra la dirección en `directions.ts` con fuentes, paleta, referencias (de `docs/design-research.md`) y movimiento.
- Todo el texto sale de `content.ts`; si un concepto necesita un texto nuevo, añádelo allí para todos.
- Incluye `<LabBar current="<slug>" />` de `app/design-lab/_shared/LabBar.tsx` para navegar entre propuestas.
- Registra la dirección en el array `DIRECTIONS` de `app/design-lab/directions.ts` (alimenta el comparador y la barra).
- Secciones obligatorias y comparables: navegación, hero, servicios, metodología, entregables, confianza (solo información real), CTA y pie.
- Sin hackers con capucha, dashboards recargados, hexágonos ni estética de videojuego. Nada de lorem ipsum. Nada de clientes/cifras/certificaciones inventadas: usa `[Pendiente: …]`.
- Responsive, accesible, `prefers-reduced-motion` respetado.

## Comparar y recomendar
Cuando se pida elegir, puntúa cada dirección 1–5 en: claridad del mensaje, distinción frente a la competencia, credibilidad técnica, adecuación al público objetivo, escalabilidad a una web completa, accesibilidad y coste de implementación. Presenta una tabla y una recomendación argumentada (puedes proponer un híbrido, diciendo exactamente qué se toma de cada una).

## Verificación
`npm run typecheck && npm run build`, y abrir `http://localhost:3000/design-lab` y cada `/design-lab/<slug>`.
