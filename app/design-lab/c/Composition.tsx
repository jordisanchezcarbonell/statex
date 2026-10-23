import { GLYPHS, HEX, SHAPE, X_MARK, type Composition as Comp, type GlyphId, type Ink } from "./pieces";

// Render estático (servidor) de cualquier composición del alfabeto modular.
// Decorativo: el significado siempre está en el texto que lo acompaña.
export function Composition({
  comp,
  className = "",
  grid = false,
  gridColor = "currentColor",
  gap = 0,
  remap,
}: {
  comp: Comp;
  className?: string;
  /** Dibuja la retícula de construcción. */
  grid?: boolean;
  gridColor?: string;
  /** Separación entre piezas, en fracción de celda (encoge cada pieza hacia su centro). */
  gap?: number;
  /** Sustituye colores que desaparecerían sobre el fondo (p. ej. Lila sobre Lila). */
  remap?: Partial<Record<Ink, Ink>>;
}) {
  const size = comp.g * 100;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${size} ${size}`}
      className={`block overflow-visible ${className}`}
    >
      {grid && (
        <g stroke={gridColor} strokeWidth={size / 400} fill="none" opacity={0.35}>
          {Array.from({ length: comp.g + 1 }, (_, i) => (
            <g key={i}>
              <line x1={i * 100} y1={0} x2={i * 100} y2={size} />
              <line x1={0} y1={i * 100} x2={size} y2={i * 100} />
            </g>
          ))}
        </g>
      )}
      {comp.p.map((p, i) => {
        const s = (p.s ?? 1) * (1 - gap);
        const off = ((p.s ?? 1) * gap * 100) / 2;
        return (
          <path
            key={i}
            d={SHAPE[p.k]}
            fill={HEX[remap?.[p.c] ?? p.c]}
            opacity={p.o ?? 1}
            transform={`translate(${p.x * 100 + off} ${p.y * 100 + off}) scale(${s}) rotate(${p.r ?? 0} 50 50)`}
          />
        );
      })}
    </svg>
  );
}

export function Glyph({ id, className, remap }: { id: GlyphId; className?: string; remap?: Partial<Record<Ink, Ink>> }) {
  return <Composition comp={GLYPHS[id]} className={className} remap={remap} />;
}

/** Símbolo: la X de StateX. En fondo oscuro el cuarto Petróleo pasa a Papel. */
export function XMark({ tone = "light", className, gap = 0 }: { tone?: "light" | "dark"; className?: string; gap?: number }) {
  const colors: [Ink, Ink, Ink, Ink] = tone === "dark" ? ["paper", "apricot", "lilac", "sage"] : ["petrol", "apricot", "lilac", "sage"];
  return <Composition comp={X_MARK(colors)} className={className} gap={gap} />;
}
