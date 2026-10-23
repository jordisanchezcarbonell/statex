import type { ReactNode } from "react";
import { sections } from "../content";

/** Foco visible común: anillo turquesa separado del elemento. */
export const focus =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--teal)";
export const focusOnInk =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white";

export const shell = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14";
/** Retícula de 12 columnas a partir de lg. */
export const grid12 = "grid grid-cols-1 gap-x-6 lg:grid-cols-12 lg:gap-x-8";

/**
 * Hueco pendiente. El borde discontinuo significa en todo el sistema «todavía no existe».
 */
export function Pending({ children, id, dark = false, className = "" }: { children: ReactNode; id?: string; dark?: boolean; className?: string }) {
  return (
    <p
      id={id}
      className={`inline-block border border-dashed px-2.5 py-1.5 text-[14px] leading-snug ${
        dark ? "border-(--gray-on-ink) text-(--gray-on-ink)" : "border-(--gray) text-(--gray)"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * Cabecera de sección: nombre de la sección (de `sections`) en la columna estrecha,
 * título grande en las columnas 4–12. El nombre lleva la celda del módulo como marca.
 */
export function SectionHead({
  id,
  k,
  title,
  intro,
  dark = false,
}: {
  id: string;
  k: keyof typeof sections;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className={`${grid12} gap-y-5`}>
      {/* Si el título ya es el nombre de la sección, no se repite: queda solo la celda. */}
      <p className={`flex items-center gap-2.5 pt-[0.55rem] text-[15px] font-semibold lg:col-span-3 ${dark ? "text-white" : "text-(--ink)"}`}>
        <span aria-hidden="true" className={`size-2 ${dark ? "bg-(--teal-on-ink)" : "bg-(--teal)"}`} />
        {sections[k] !== title && sections[k]}
      </p>
      <div className="lg:col-span-9">
        <h2
          id={id}
          className={`max-w-[18ch] text-[clamp(2.25rem,1.3rem+3.6vw,4.75rem)] font-extrabold leading-[0.96] tracking-[-0.042em] text-balance ${
            dark ? "text-white" : "text-(--ink)"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-6 max-w-[58ch] text-[18px] leading-[1.55] sm:text-[19px] ${dark ? "text-(--gray-on-ink)" : "text-(--gray)"}`}>
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
