// Logotipo de StateX en Concept B.
// La X es un "cruce" de esquema: el trazo azul pasa por encima del marino con un corte
// del color de fondo, igual que una arista cruza otra en el grafo de superficie.

type MarkProps = {
  className?: string;
  /** Color del trazo descendente (el "de abajo"). */
  base?: string;
  /** Color del trazo ascendente (el camino que cruza). */
  accent?: string;
  /** Color del fondo sobre el que se dibuja: genera el corte del cruce. */
  gap?: string;
};

export function XMark({ className, base = "currentColor", accent = "#3D8BFF", gap = "#FFFFFF" }: MarkProps) {
  return (
    <svg viewBox="0 0 66 70" className={className} aria-hidden="true" focusable="false">
      <polygon points="0,0 14.5,0 66,70 51.5,70" fill={base} />
      <polygon
        points="51.5,0 66,0 14.5,70 0,70"
        fill={accent}
        stroke={gap}
        strokeWidth={9}
        strokeLinejoin="bevel"
        paintOrder="stroke"
      />
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  tone?: "light" | "dark";
  /** Color de fondo real (para el corte del cruce). */
  gap?: string;
};

export function Wordmark({ className = "", tone = "light", gap }: WordmarkProps) {
  const dark = tone === "dark";
  return (
    <span className={`inline-flex items-baseline font-(family-name:--f-sans) font-semibold leading-none tracking-[-0.045em] ${className}`}>
      <span aria-hidden="true" className={dark ? "text-white" : "text-(--navy)"}>
        State
      </span>
      <XMark
        className={`ml-[0.035em] h-[0.7em] w-[0.66em] ${dark ? "text-white" : "text-(--navy)"}`}
        gap={gap ?? (dark ? "#0B1533" : "#FFFFFF")}
      />
      <span className="sr-only">StateX</span>
    </span>
  );
}
