// Clases compartidas del Concept A. Los colores son custom properties definidas en el contenedor raíz (page.tsx).

export const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";

// Titulares: Instrument Sans estrechada, peso 600, tracking negativo.
export const display = "font-semibold [font-stretch:82%] text-[var(--tinta)]";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--azul)]";

const btnBase = `inline-flex min-h-12 items-center justify-center rounded-[10px] px-5 text-[15px] font-medium transition-colors duration-200 ${focusRing}`;

export const btnPrimary = `${btnBase} bg-[var(--azul)] text-white hover:bg-[var(--azul-hondo)]`;

export const btnSecondary = `${btnBase} border border-[var(--linea)] bg-white/60 text-[var(--tinta)] hover:border-[var(--pizarra)]`;
