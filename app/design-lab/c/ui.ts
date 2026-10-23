// Clases compartidas de Concept C.

/** Foco visible: anillo del color del texto, siempre contrastado con su fondo. */
export const focus = "outline-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-current";

// Botones con forma de pieza: canto recto a la izquierda, semicírculo a la derecha.
const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-l-[0.3rem] rounded-r-full pr-6 pl-5 text-[1rem] leading-tight font-semibold transition-colors duration-200 outline-none focus-visible:outline-3 focus-visible:outline-offset-3";

export const btnInk = `${btn} bg-(--ink) text-(--paper) hover:bg-(--petrol) focus-visible:outline-(--ink)`;
export const btnPaper = `${btn} bg-(--paper) text-(--ink) hover:bg-(--sage) focus-visible:outline-(--paper)`;
export const btnLine = `${btn} border-2 border-(--ink) text-(--ink) hover:bg-(--ink) hover:text-(--paper) focus-visible:outline-(--ink)`;

export const gutter = "px-5 sm:px-8 lg:px-12 2xl:px-16";

/** Marcador «[Pendiente: …]» siempre visible, en el color del texto de su bloque. */
export const pending =
  "inline-block rounded-[0.3rem] border-[1.5px] border-dashed border-current px-2.5 py-1 text-[0.9375rem] font-medium";
