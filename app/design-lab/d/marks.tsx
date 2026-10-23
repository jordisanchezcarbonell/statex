import { brand } from "../content";

// Piezas gráficas de Concept D compartidas por la homepage y la ficha de marca (Server Components).

/**
 * Logotipo tipográfico: "State" y la X dentro de un bloque ámbar, como el cursor de una terminal
 * posado sobre el último carácter. El nombre completo sigue siendo texto legible ("StateX").
 */
export function Wordmark({
  tone = "dark",
  className = "text-[17px]",
}: {
  /** "dark": sobre fondo oscuro. "light": sobre fondo claro. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const name = brand.name;
  return (
    <span
      className={`inline-flex items-baseline font-[family-name:var(--font-geist)] font-semibold leading-none tracking-[-0.04em] ${
        tone === "dark" ? "text-[#E8E6E3]" : "text-[#0B0C0E]"
      } ${className}`}
    >
      {name.slice(0, -1)}
      <span className="ml-[0.06em] inline-block bg-[#FFB000] px-[0.08em] pb-[0.04em] pt-[0.1em] tracking-normal text-[#0B0C0E]">
        {name.slice(-1)}
      </span>
    </span>
  );
}

/** Marcas de esquina de la retícula. Decorativas: el padre debe ser `relative`. */
export function CornerMarks({ size = 10, className = "border-[rgba(232,230,227,0.38)]" }: { size?: number; className?: string }) {
  const s = { width: size, height: size };
  const base = `pointer-events-none absolute ${className}`;
  return (
    <>
      <span aria-hidden="true" style={s} className={`${base} left-0 top-0 border-l border-t`} />
      <span aria-hidden="true" style={s} className={`${base} right-0 top-0 border-r border-t`} />
      <span aria-hidden="true" style={s} className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden="true" style={s} className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}
