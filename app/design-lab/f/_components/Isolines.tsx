import { brandField } from "./contours";

// Isolíneas estáticas en SVG (decorativas), calculadas en el servidor con la misma suma de ondas
// que el shader. Los paths se declaran UNA vez (<IsoDefs />) y cada pieza los reutiliza con <use>,
// para no repetir decenas de KB de geometría por aplicación.

const W = 640;
const H = 360;
const VARIANTS = { calm: 1, dense: 1.7 } as const;
type Variant = keyof typeof VARIANTS;

const cache = new Map<Variant, string[]>();
function paths(v: Variant) {
  let p = cache.get(v);
  if (!p) {
    p = brandField(W, H, 8, VARIANTS[v]);
    cache.set(v, p);
  }
  return p;
}

export function IsoDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        {(Object.keys(VARIANTS) as Variant[]).map((v) =>
          paths(v).map((d, i) => <path key={`${v}-${i}`} id={`f-iso-${v}-${i}`} d={d} vectorEffect="non-scaling-stroke" />),
        )}
      </defs>
    </svg>
  );
}

type Props = {
  variant?: Variant;
  /** Color por nivel de contorno (5 niveles; el central es el principal). */
  colors?: string[];
  strokeWidth?: number;
  className?: string;
  /** Alineación del recorte, p. ej. "xMaxYMid". */
  align?: string;
};

export function Isolines({
  variant = "calm",
  colors = ["var(--hielo)", "var(--hielo)", "var(--cobalto)", "var(--cobalto)", "var(--violeta)"],
  strokeWidth = 1,
  className,
  align = "xMidYMid",
}: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={`${align} slice`}
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths(variant).map((_, i) => (
        <use
          key={i}
          href={`#f-iso-${variant}-${i}`}
          stroke={colors[i % colors.length]}
          strokeWidth={i === 2 ? strokeWidth * 1.6 : strokeWidth}
        />
      ))}
    </svg>
  );
}
