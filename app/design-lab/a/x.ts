// El módulo de StateX: una matriz cuadrada de celdas en la que las diagonales forman una X.
// Lo usan el logotipo, el hero, los iconos del método, los divisores y las piezas de marca.

/** Tokens de color del concepto A. Los dos últimos solo existen para texto sobre Tinta (AA). */
export const A = {
  white: "#FFFFFF",
  ink: "#0C0D10",
  gray: "#5F646D", // 5,95:1 sobre blanco
  line: "#E4E6EA",
  teal: "#00796B", // 5,32:1 sobre blanco; 3,65:1 sobre Tinta (solo gráfico o texto grande)
  tealOnInk: "#4FB3A5", // 7,70:1 sobre Tinta
  grayOnInk: "#A7ACB5", // 8,52:1 sobre Tinta
} as const;

/** ¿Pertenece la celda (r, c) a la X de una matriz n×n? `half` es el semiancho del trazo en celdas. */
export function inX(n: number, r: number, c: number, half = n >= 12 ? 1 : 0) {
  return Math.abs(r - c) <= half || Math.abs(r + c - (n - 1)) <= half;
}

export type CellPos = { r: number; c: number };

export function xCells(n: number, half?: number): CellPos[] {
  const out: CellPos[] = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (inX(n, r, c, half)) out.push({ r, c });
  return out;
}
