import type { CSSProperties, ReactNode } from "react";

// Concept I: marfil, arena, grafito y un acento oliva. Serif editorial para titulares,
// Inter para leer y mono solo dentro de los artefactos (informe, alcance).
export const tokens = {
  "--i-ivory": "#F5F2EC",
  "--i-sand": "#D9D0C3",
  "--i-graphite": "#33352F",
  "--i-olive": "#777E70", // solo grande o no textual (3,8:1)
  "--i-olive-text": "#5C6356", // texto secundario (5,6:1)
  "--i-paper": "#FBFAF7",
  "--i-line": "rgba(51,53,47,0.16)",
  "--i-error": "#9B2C22",
  "--i-error-dark": "#F0A397",
} as CSSProperties;

export const wrap = "mx-auto w-full max-w-[1480px] px-4 sm:px-8 lg:px-16";
export const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--i-graphite)";
export const focusDark = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--i-ivory)";
export const section = "scroll-mt-24 py-[clamp(5rem,10vw,9rem)]";
export const serifCls = "font-(family-name:--i-serif) font-normal [font-variation-settings:'opsz'_72]";
export const display = `${serifCls} leading-[1.02] tracking-[-0.02em] text-balance`;
export const h2 = `${display} m-0 text-[clamp(2.1rem,4.4vw,4rem)]`;
export const sub = "text-(--i-olive-text)";
export const monoCls = "font-(family-name:--i-mono)";
export const btn = `inline-flex min-h-13 items-center justify-center bg-(--i-graphite) px-7 text-[15px] font-medium text-(--i-ivory) transition-colors duration-300 hover:bg-[#1F201C] motion-reduce:transition-none ${focus}`;
export const textLink = `group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium ${focus}`;
export const rule = "border-t border-(--i-line)";

/** Subrayado que se dibuja de izquierda a derecha al pasar el cursor. */
export function Underline({ children }: { children: ReactNode }) {
  return (
    <span className="relative">
      {children}
      <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px bg-current opacity-30" />
      <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
    </span>
  );
}

export function Pending({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-block border border-dashed border-current/40 px-2 py-1 text-[13px] opacity-80 ${className}`}>{children}</span>;
}

/** Logotipo provisional: StateX en serif, filete fino y descriptor fijo. */
export function Wordmark({ className = "", descriptor = true }: { className?: string; descriptor?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 leading-none ${className}`}>
      <span className={`${serifCls} text-[1.5em] tracking-[-0.01em]`}>StateX</span>
      {descriptor && (
        <>
          <span aria-hidden="true" className="h-[1.1em] w-px bg-current opacity-30" />
          <span className="text-[0.72em] tracking-[0.08em] opacity-75">Ciberseguridad</span>
        </>
      )}
    </span>
  );
}

/** Cabecera de sección asimétrica: nombre a la izquierda (texto normal), titular y entradilla a la derecha. */
export function SectionHead({ id, label, title, intro, dark = false }: { id: string; label: string; title: string; intro?: string; dark?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <p className={`m-0 text-[14px] lg:col-span-3 lg:pt-4 ${dark ? "text-(--i-sand)" : sub}`}>{label}</p>
      <div className="lg:col-span-8">
        <h2 id={id} className={`${h2} max-w-[18ch]`}>{title}</h2>
        {intro && <p className={`m-0 mt-7 max-w-[54ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.65] ${dark ? "text-(--i-sand)" : sub}`}>{intro}</p>}
      </div>
    </div>
  );
}

/** Columna de contenido alineada con el titular de SectionHead (columnas 4–12). */
export const body = "lg:ml-[calc(25%+0.625rem)]";
