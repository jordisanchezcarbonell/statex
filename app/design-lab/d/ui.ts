// Clases compartidas dentro de Concept D. Los tokens de color viven como custom properties en
// el contenedor de page.tsx (--bg, --surface, --line, --fg, --muted, --amber).

export const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-10";

export const mono = "font-[family-name:var(--font-jbm)]";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--amber)]";

export const btnPrimary = `inline-flex min-h-12 items-center justify-center rounded-[2px] bg-[color:var(--amber)] px-5 text-[15px] font-medium tracking-[-0.01em] text-[#0B0C0E] transition-colors duration-200 hover:bg-[#FFC640] active:bg-[#E9A100] ${focusRing}`;

export const btnGhost = `inline-flex min-h-12 items-center justify-center rounded-[2px] border border-[rgba(232,230,227,0.24)] px-5 text-[15px] font-medium tracking-[-0.01em] text-[color:var(--fg)] transition-colors duration-200 hover:border-[color:var(--fg)] hover:bg-[rgba(232,230,227,0.04)] ${focusRing}`;

/** Titular grande de sección (segunda línea del h2). */
export const display =
  "text-[length:clamp(2rem,1.1rem+2.8vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[color:var(--fg)]";

export const body = "text-[16px] leading-[1.65] text-[color:var(--muted)] md:text-[17px]";

export const section = "scroll-mt-14 border-t border-[color:var(--line)]";

export const pad = "py-20 md:py-28 lg:py-32";

export const pending = `${mono} inline-block border border-dashed border-[rgba(232,230,227,0.28)] px-3 py-2 text-[12px] leading-5 text-[color:var(--muted)]`;

/** Pie de figura técnico: "FIG. n" en texto principal y descripción en secundario. */
export const figcap = `${mono} text-[11px] leading-5 text-[color:var(--muted)]`;
