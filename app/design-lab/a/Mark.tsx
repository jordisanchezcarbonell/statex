import { A, inX } from "./x";

type MatrixProps = {
  n?: number;
  half?: number;
  /** Color de las celdas de la X. */
  on?: string;
  /** Color de la retícula (celdas apagadas). `null` = sin retícula. */
  grid?: string | null;
  /** Celdas en acento, como claves "r-c". */
  accent?: Set<string>;
  accentColor?: string;
  /** Hueco entre celdas, en fracción de celda. */
  gap?: number;
  /** Retícula como puntos (true) o como celdas completas (false). */
  dots?: boolean;
  className?: string;
};

/** Matriz SVG del módulo X. Siempre decorativa: quien la use debe dar la información en texto. */
export function XMatrix({
  n = 20,
  half,
  on = A.ink,
  grid = A.line,
  accent,
  accentColor = A.teal,
  gap = 0.16,
  dots = true,
  className,
}: MatrixProps) {
  const s = 1 - gap;
  const o = gap / 2;
  const d = 0.18;
  const cells = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const k = `${r}-${c}`;
      if (inX(n, r, c, half)) {
        cells.push(<rect key={k} x={c + o} y={r + o} width={s} height={s} fill={accent?.has(k) ? accentColor : on} />);
      } else if (grid) {
        cells.push(
          dots ? (
            <rect key={k} x={c + 0.5 - d / 2} y={r + 0.5 - d / 2} width={d} height={d} fill={grid} />
          ) : (
            <rect key={k} x={c + o} y={r + o} width={s} height={s} fill={grid} />
          ),
        );
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} aria-hidden="true" focusable="false" className={className} shapeRendering="crispEdges">
      {cells}
    </svg>
  );
}

/** La X del logotipo: matriz 5×5 con la celda central en turquesa. */
export function XGlyph({ className, on = "currentColor", center = A.teal }: { className?: string; on?: string; center?: string }) {
  return (
    <XMatrix n={5} half={0} on={on} grid={null} gap={0.14} accent={new Set(["2-2"])} accentColor={center} className={className} />
  );
}

/** Logotipo tipográfico: «State» en Hanken Grotesk 800 + la X construida con el módulo. */
export function Logo({ className = "", center }: { className?: string; center?: string }) {
  return (
    <span className={`inline-flex items-baseline font-extrabold leading-none tracking-[-0.045em] ${className}`}>
      <span className="sr-only">StateX</span>
      <span aria-hidden="true">State</span>
      <XGlyph center={center} className="ml-[0.06em] h-[0.7em] w-[0.7em] shrink-0 self-baseline" />
    </span>
  );
}

/** Divisor: una fila de celdas de la retícula. */
export function CellRule({ className = "", color = A.line }: { className?: string; color?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[6px] w-full ${className}`}
      style={{ backgroundImage: `linear-gradient(90deg, ${color} 6px, transparent 6px)`, backgroundSize: "12px 6px" }}
    />
  );
}

/**
 * Icono de paso del método: la X 5×5 se completa a medida que avanza el proceso.
 * step 1 → solo la celda central; step 5 → X completa en turquesa.
 */
const ORDER = ["2-2", "1-1", "3-3", "1-3", "3-1", "0-0", "4-4", "0-4", "4-0"];
export function StepGlyph({ step, total = 5, className }: { step: number; total?: number; className?: string }) {
  const lit = Math.round((ORDER.length * step) / total);
  const done = step === total;
  return (
    <svg viewBox="0 0 5 5" aria-hidden="true" focusable="false" className={className} shapeRendering="crispEdges">
      {ORDER.map((k, i) => {
        const [r, c] = k.split("-").map(Number);
        const isOn = i < lit;
        return (
          <rect
            key={k}
            x={c + 0.08}
            y={r + 0.08}
            width={0.84}
            height={0.84}
            fill={isOn ? (done ? A.teal : A.ink) : "none"}
            stroke={isOn ? "none" : A.line}
            strokeWidth={0.12}
          />
        );
      })}
    </svg>
  );
}
