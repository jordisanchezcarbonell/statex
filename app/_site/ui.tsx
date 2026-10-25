import type { CSSProperties, ReactNode } from "react";

// Sistema visual de StateX (dirección H, Boutique Precision): una sola familia (Inter, en font.ts)
// y un solo acento, la línea roja.

export const tokens = {
  "--h-ink": "#0B0D10",
  "--h-graphite": "#20242A",
  "--h-ivory": "#F2F0EA",
  "--h-titanium": "#A8A39B",
  "--h-red": "#A83A35",
  // Solo para texto de error sobre oscuro: el rojo de marca no llega a AA como texto.
  "--h-red-text": "#E07A73",
  "--h-line": "rgba(242,240,234,0.14)",
  // Texto secundario sobre papel marfil (informe): 6,2:1 sobre #F2F0EA; el titanio no llega a AA ahí.
  "--h-stone": "#5C5850",
  "--h-paper-line": "rgba(11,13,16,0.14)",
} as CSSProperties;

export const wrap = "mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14";
export const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--h-ivory)";
export const section = "scroll-mt-20 py-[clamp(5.5rem,11vw,10rem)]";
/** Titulares: mayúsculas, peso 600, interletrado ajustado. Las frases vienen de content.ts en minúsculas. */
export const display = "font-semibold uppercase leading-[0.98] tracking-[-0.025em] [font-variation-settings:'opsz'_32] text-balance";
export const h2 = `${display} m-0 text-[clamp(1.75rem,4.6vw,4.25rem)]`;
export const muted = "text-(--h-titanium)";
export const pendingCls = "inline-block border border-dashed border-(--h-titanium)/60 px-2 py-1 text-[13px] text-(--h-titanium)";

export function Pending({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`${pendingCls} ${className}`}>{children}</span>;
}

/** Logotipo provisional: STATEX con interletrado amplio; la línea roja subraya solo la X. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-semibold uppercase leading-none tracking-[0.32em] ${className}`}>
      State
      <span className="relative">
        X
        <span aria-hidden="true" className="absolute -bottom-[0.28em] left-0 right-[0.32em] h-[0.09em] min-h-px bg-(--h-red)" />
      </span>
    </span>
  );
}

/** Cabecera de sección: rail lateral con el nombre (texto normal, sin mayúsculas) y un único h2. */
export function SectionHead({ id, label, title, intro }: { id: string; label: string; title: string; intro?: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <p className={`m-0 flex items-center gap-3 text-[14px] lg:col-span-3 lg:items-start lg:pt-3 ${muted}`}>
        <span aria-hidden="true" className="h-px w-8 bg-(--h-titanium)/60" />
        {label}
      </p>
      <div className="lg:col-span-9">
        <h2 id={id} className={`${h2} max-w-[18ch]`}>{title}</h2>
        {intro && <p className={`m-0 mt-7 max-w-[54ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.55] ${muted}`}>{intro}</p>}
      </div>
    </div>
  );
}
