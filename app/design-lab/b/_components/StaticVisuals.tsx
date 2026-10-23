// Visuales estáticos (server-safe) para Tecnología y la identidad.

const NAVY = "#0B1533";
const SKY = "#3D8BFF";
const SIGNAL = "#FFC933";
const EDGE = "#B9C2D3";
const MUTED = "#4B5675";
const label = "font-(family-name:--f-mono) text-[12px]";

/** Hoy: herramientas e IA supervisada convergen en un especialista que verifica. Trazo sólido. */
export function TodayVisual() {
  const ins = [
    { y: 40, t: "open source" },
    { y: 90, t: "automatización" },
    { y: 140, t: "IA supervisada" },
  ];
  return (
    <svg viewBox="0 0 480 180" className="h-auto w-full" aria-hidden="true">
      {ins.map((n) => (
        <g key={n.t}>
          <path d={`M 130 ${n.y} C 190 ${n.y}, 190 90, 250 90`} fill="none" stroke={EDGE} strokeWidth={1.5} />
          <circle cx={122} cy={n.y} r={6} fill="#FFFFFF" stroke={NAVY} strokeWidth={1.5} />
          <text x={108} y={n.y + 4} textAnchor="end" className={label} fill={MUTED}>{n.t}</text>
        </g>
      ))}
      <circle cx={262} cy={90} r={16} fill={NAVY} />
      <circle cx={262} cy={90} r={5} fill={SKY} />
      <text x={262} y={132} textAnchor="middle" className={label} fill={NAVY}>especialista</text>
      <line x1={280} y1={90} x2={384} y2={90} stroke={SKY} strokeWidth={2} />
      <rect x={386} y={72} width={36} height={36} rx={10} fill="#FFFFFF" stroke={SKY} strokeWidth={2} />
      <path d="M 396 90 l 6 6 l 11 -12" fill="none" stroke={SKY} strokeWidth={2.25} />
      <text x={404} y={132} textAnchor="middle" className={label} fill={NAVY}>verificado</text>
    </svg>
  );
}

/** Visión: boceto de vigilancia continua. Todo en discontinuo: no existe todavía. */
export function VisionVisual() {
  const xs = [40, 120, 200, 280, 360, 440];
  return (
    <svg viewBox="0 0 480 180" className="h-auto w-full" aria-hidden="true">
      <line x1={30} y1={140} x2={460} y2={140} stroke={MUTED} strokeWidth={1.25} strokeDasharray="2 5" />
      <path
        d="M 40 112 C 80 112, 90 70, 120 78 S 170 120, 200 104 S 250 52, 280 66 S 330 110, 360 92 S 420 60, 440 70"
        fill="none"
        stroke={NAVY}
        strokeWidth={1.5}
        strokeDasharray="6 6"
      />
      {xs.map((x) => (
        <g key={x}>
          <line x1={x} y1={134} x2={x} y2={146} stroke={MUTED} strokeWidth={1.25} />
          <circle cx={x} cy={140} r={4} fill="none" stroke={MUTED} strokeDasharray="2 2" />
        </g>
      ))}
      <text x={30} y={170} className={label} fill={MUTED}>tiempo</text>
      <text x={460} y={34} textAnchor="end" className={label} fill={MUTED}>¿cambió la exposición?</text>
    </svg>
  );
}

/** Motivo del sistema gráfico: Internet → nodo intermedio → activos, con un camino resaltado. */
export function GraphMotif({
  className = "",
  tone = "light",
  showLabels = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  showLabels?: boolean;
}) {
  const dark = tone === "dark";
  const edge = dark ? "#2A3866" : EDGE;
  const node = dark ? "#FFFFFF" : NAVY;
  const bg = dark ? NAVY : "#FFFFFF";
  const leaves = [30, 80, 130, 180, 230];
  const hi = 1;
  return (
    <svg viewBox="0 0 400 260" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {[70, 190].map((gy) => (
        <path key={gy} d={`M 30 130 C 100 130, 100 ${gy}, 170 ${gy}`} fill="none" stroke={edge} strokeWidth={1.5} />
      ))}
      {leaves.map((y, i) => {
        const gy = i < 3 ? 70 : 190;
        return (
          <path
            key={y}
            d={`M 170 ${gy} C 250 ${gy}, 250 ${y}, 330 ${y}`}
            fill="none"
            stroke={i === hi ? SKY : edge}
            strokeWidth={i === hi ? 2.5 : 1.5}
          />
        );
      })}
      <path d="M 30 130 C 100 130, 100 70, 170 70" fill="none" stroke={SKY} strokeWidth={2.5} />
      <circle cx={30} cy={130} r={11} fill={node} />
      <circle cx={30} cy={130} r={4} fill={SKY} />
      {[70, 190].map((gy) => (
        <circle key={gy} cx={170} cy={gy} r={6.5} fill={gy === 70 ? SKY : bg} stroke={node} strokeWidth={1.75} />
      ))}
      {leaves.map((y, i) => (
        <circle
          key={y}
          cx={334}
          cy={y}
          r={7}
          fill={i === hi ? SIGNAL : i === 3 ? bg : dark ? "#1A2650" : "#F2F4F8"}
          stroke={i === hi || i === 3 ? node : edge}
          strokeWidth={2}
        />
      ))}
      {motifLabels(showLabels, dark)}
    </svg>
  );
}

function motifLabels(show: boolean, dark: boolean) {
  if (!show) return null;
  const fill = dark ? "#C3CADB" : MUTED;
  return (
    <g className={label} fill={fill}>
      <text x={18} y={108}>Internet</text>
      <text x={170} y={52} textAnchor="middle">ejemplo.com</text>
      <text x={346} y={84}>staging</text>
    </g>
  );
}
