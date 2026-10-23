import type { CSSProperties } from "react";

// Tokens de Concept B. Contrastes medidos (WCAG 2.x):
// --navy sobre blanco 18:1 · --muted #4B5675: 7,27:1 sobre blanco, 6,61:1 sobre --fog
// --sky #3D8BFF: 3,31:1 sobre blanco → SOLO trazos, rellenos y texto sobre --navy (5,42:1)
// --sky-ink #1A5BD0: 6,08:1 sobre blanco, 5,53:1 sobre --fog → enlaces, foco y texto de acento
// --signal #FFC933: siempre con texto --navy (11,68:1); nunca como texto sobre claro
export const tokens = {
  "--white": "#FFFFFF",
  "--fog": "#F2F4F8",
  "--navy": "#0B1533",
  "--sky": "#3D8BFF",
  "--sky-ink": "#1A5BD0",
  "--signal": "#FFC933",
  "--muted": "#4B5675",
  "--line": "#DCE1EA",
  "--edge": "#B9C2D3",
  "--dot": "#D3D9E4",
} as CSSProperties;

export const shell = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
export const ring =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--sky-ink)";
export const ringDark =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--sky)";
export const mono = "font-(family-name:--f-mono)";

export const btnPrimary = `inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-(--navy) px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1A2650] ${ring}`;
export const btnGhost = `inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-(--edge) bg-white px-5 text-[15px] font-semibold text-(--navy) transition-colors hover:border-(--navy) ${ring}`;

// Canvas punteado de las visualizaciones (lienzo de producto, no decoración de fondo).
export const dotCanvas: CSSProperties = {
  backgroundImage: "radial-gradient(var(--dot) 1px, transparent 1.4px)",
  backgroundSize: "16px 16px",
};

export const levelOrder = { alto: 0, medio: 1, bajo: 2 } as const;
