// Símbolo de StateX en Future Security: una lente (círculo) que contiene tres isolíneas
// de interferencia. Fuera de la lente, la señal; dentro, lo que ve el atacante.
// Decorativo: el nombre de la marca va siempre en texto junto a él.

import { useId } from "react";

type Props = {
  className?: string;
  /** "light": para fondos claros. "dark": para fondos tinta. */
  tone?: "light" | "dark";
};

export function LensMark({ className, tone = "light" }: Props) {
  const id = `f-lens-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const disc = tone === "light" ? "var(--tinta)" : "var(--nieve)";
  const line = tone === "light" ? "var(--hielo)" : "var(--cobalto)";
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="15" fill={disc} />
      <clipPath id={id}>
        <circle cx="16" cy="16" r="13.2" />
      </clipPath>
      <g clipPath={`url(#${id})`} stroke={line} strokeWidth="1.6" strokeLinecap="round">
        <path d="M-2 11.5C5 8.5 10 14.5 17 11.5S28 8.5 34 11.5" />
        <path d="M-2 17C5 14 10 20 17 17S28 14 34 17" opacity="0.85" />
        <path d="M-2 22.5C5 19.5 10 25.5 17 22.5S28 19.5 34 22.5" opacity="0.6" />
      </g>
      <circle cx="16" cy="16" r="15" stroke="var(--cobalto)" strokeWidth="1.2" strokeOpacity={tone === "light" ? 0 : 1} />
    </svg>
  );
}
