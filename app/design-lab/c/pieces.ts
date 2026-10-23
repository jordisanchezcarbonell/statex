// Alfabeto modular de StateX (Concept C).
// Cuatro piezas sobre una retícula cuadrada. Cada pieza se dibuja en una celda de 100 × 100
// y se coloca con (x, y) en celdas, s = tamaño en celdas y r = giro en grados.
// La misma geometría alimenta el SVG estático (servidor) y las piezas animadas (cliente).

export type Kind = "q" | "s" | "r" | "t";
export type Ink = "paper" | "ink" | "sage" | "apricot" | "lilac" | "petrol";

export const HEX: Record<Ink, string> = {
  paper: "#F1F3EF",
  ink: "#17161C",
  sage: "#A9CBB6",
  apricot: "#F3A877",
  lilac: "#C3B2F2",
  petrol: "#14524F",
};

/** q: cuarto de círculo (centro arriba-izquierda) · s: semicírculo (base abajo) · r: cuadrado · t: triángulo rectángulo (ángulo abajo-izquierda). */
export const SHAPE: Record<Kind, string> = {
  q: "M0 0H100A100 100 0 0 1 0 100Z",
  s: "M0 100A50 50 0 0 1 100 100Z",
  r: "M0 0H100V100H0Z",
  t: "M0 0V100H100Z",
};

export const KIND_NAME: Record<Kind, string> = {
  q: "Cuarto de círculo",
  s: "Semicírculo",
  r: "Cuadrado",
  t: "Triángulo rectángulo",
};

export type Piece = { k: Kind; c: Ink; x: number; y: number; s?: number; r?: number; o?: number };
export type Composition = { g: number; p: Piece[] };

/** La X: cuatro cuartos de círculo enfrentados en una retícula 2 × 2. */
export const X_MARK = (colors: [Ink, Ink, Ink, Ink] = ["petrol", "apricot", "lilac", "sage"]): Composition => ({
  g: 2,
  p: [
    { k: "q", c: colors[0], x: 0, y: 0, r: 0 },
    { k: "q", c: colors[1], x: 1, y: 0, r: 90 },
    { k: "q", c: colors[2], x: 1, y: 1, r: 180 },
    { k: "q", c: colors[3], x: 0, y: 1, r: 270 },
  ],
});

/* ------------------------------------------------------------------ */
/* Escenario fijo: diez piezas que se recomponen en cada sección.      */
/* El orden y el tipo de cada pieza no cambian; solo posición y color. */
/* ------------------------------------------------------------------ */

export const STAGE_KINDS: Kind[] = ["q", "q", "q", "q", "s", "s", "r", "r", "t", "t"];
export const STAGE_GRID = 6;

type Pose = [x: number, y: number, s: number, r: number, c: Ink, o?: number];

export const STAGE_IDS = ["problema", "enfoque", "soluciones", "tecnologia", "investigacion", "sobre"] as const;
export type StageId = (typeof STAGE_IDS)[number];

// Cada estado tiene en cuenta el color de fondo de su sección para que ninguna pieza desaparezca.
export const STAGE: Record<StageId, Pose[]> = {
  // Fondo Tinta. Piezas dispersas, giros irregulares; una casi invisible (lo que no se ve).
  problema: [
    [0.3, 0.5, 1, 20, "sage"],
    [4.4, 0.3, 1.2, 205, "apricot"],
    [2.7, 4.3, 1, 110, "lilac"],
    [4.5, 3.4, 0.9, 300, "paper"],
    [2.3, 1.4, 1, -30, "apricot"],
    [0.4, 3.2, 1, 150, "paper"],
    [3.3, 2.4, 0.6, 15, "lilac"],
    [1.3, 4.9, 0.7, 40, "sage"],
    [5.0, 5.0, 0.8, 80, "petrol"],
    [1.5, 2.3, 0.6, 260, "sage"],
  ],
  // Fondo Papel. Cinco peldaños: las piezas se alinean en la retícula.
  enfoque: [
    [1.5, 3, 1, 270, "petrol"],
    [2.5, 2, 1, 270, "apricot"],
    [3.5, 2, 1, 0, "sage"],
    [4.5, 0, 1, 270, "lilac"],
    [0.5, 4, 1, 0, "ink"],
    [3.5, 1, 1, 0, "petrol"],
    [0.5, 5, 1, 0, "sage"],
    [2.5, 3, 1, 0, "lilac"],
    [1.5, 4, 1, 0, "apricot"],
    [4.5, 1, 1, 0, "ink"],
  ],
  // Fondo Lila. La X completa; el resto se recoge en el centro.
  soluciones: [
    [1, 1, 2, 0, "petrol"],
    [3, 1, 2, 90, "apricot"],
    [3, 3, 2, 180, "paper"],
    [1, 3, 2, 270, "sage"],
    [2.75, 2.75, 0.5, 0, "ink", 0],
    [2.75, 2.75, 0.5, 0, "ink", 0],
    [5.2, 0.3, 0.5, 0, "ink"],
    [2.75, 2.75, 0.5, 0, "ink", 0],
    [0.3, 5.2, 0.5, 0, "ink"],
    [2.75, 2.75, 0.5, 0, "ink", 0],
  ],
  // Fondo Salvia. Una parte construida y piezas suspendidas que aún no encajan.
  tecnologia: [
    [2.5, 3.5, 1, 270, "lilac"],
    [3.6, 1.6, 1, 25, "apricot", 0.5],
    [2.9, 0.4, 0.7, 140, "lilac", 0.5],
    [4.7, 3.5, 0.8, -35, "ink", 0.45],
    [0.5, 1.5, 2, 0, "apricot"],
    [4.4, 2.6, 1, 90, "petrol", 0.5],
    [0.5, 3.5, 2, 0, "petrol"],
    [2.5, 4.5, 1, 0, "ink"],
    [3.5, 4.5, 1, 0, "paper"],
    [4.6, 0.4, 0.8, -20, "paper", 0.6],
  ],
  // Fondo Petróleo. Tres pilas apoyadas en la misma balda, como libros.
  investigacion: [
    [1, 2.5, 1, 270, "lilac"],
    [2.2, 4, 1, 180, "paper"],
    [3.4, 4.4, 1.6, 270, "sage"],
    [5, 5, 1, 270, "lilac"],
    [1, 4, 1, 0, "sage"],
    [2.2, 3, 1, 0, "apricot"],
    [1, 5, 1, 0, "paper"],
    [1, 3.5, 1, 0, "apricot"],
    [2.2, 5, 1, 0, "sage"],
    [2.2, 5, 1, 180, "apricot"],
  ],
  // Fondo Albaricoque. Una línea punteada y cuatro hitos que crecen hacia el presente.
  sobre: [
    [0, 2.2, 1, 270, "petrol"],
    [1.15, 2.2, 1, 270, "lilac"],
    [2.6, 2.0, 1.2, 270, "sage"],
    [4.4, 1.6, 1.6, 270, "ink"],
    [4.35, 3.45, 0.3, 0, "ink"],
    [5.35, 3.45, 0.3, 0, "ink"],
    [0.35, 3.45, 0.3, 0, "ink"],
    [1.35, 3.45, 0.3, 0, "ink"],
    [2.35, 3.45, 0.3, 0, "ink"],
    [3.35, 3.45, 0.3, 0, "ink"],
  ],
};

export function stageComposition(id: StageId): Composition {
  return {
    g: STAGE_GRID,
    p: STAGE[id].map(([x, y, s, r, c, o], i) => ({ k: STAGE_KINDS[i], x, y, s, r, c, o })),
  };
}

/* ------------------------------------------------------------------ */
/* Hero: la X grande y piezas satélite. Las de la columna izquierda    */
/* quedan bajo el titular, por eso solo usan pasteles (texto Tinta).   */
/* ------------------------------------------------------------------ */

export const HERO: Composition = {
  g: 6,
  p: [
    { k: "t", c: "sage", x: 0, y: 2, r: 0 },
    { k: "r", c: "apricot", x: 0, y: 3, r: 0 },
    { k: "s", c: "lilac", x: 5, y: 0, r: 180 },
    { k: "r", c: "ink", x: 5.25, y: 5.25, s: 0.5, r: 0 },
    { k: "s", c: "sage", x: 3, y: 5, r: 180 },
    { k: "t", c: "petrol", x: 5, y: 3, r: 90 },
    { k: "q", c: "petrol", x: 1, y: 1, s: 2, r: 0 },
    { k: "q", c: "apricot", x: 3, y: 1, s: 2, r: 90 },
    { k: "q", c: "lilac", x: 3, y: 3, s: 2, r: 180 },
    { k: "q", c: "sage", x: 1, y: 3, s: 2, r: 270 },
  ],
};

/** Punto de partida de cada pieza del hero antes de ensamblarse (desplazamiento en celdas y giro extra). */
export const HERO_FROM: [dx: number, dy: number, dr: number][] = [
  [-1.2, 1.8, -120],
  [-0.8, -2.2, 90],
  [1.4, -1.1, 140],
  [0.8, 0.9, -90],
  [-1.6, 1.2, 180],
  [1.5, 0.6, -150],
  [-2.2, -1.8, -90],
  [2.2, -1.8, 90],
  [2.2, 1.8, -90],
  [-2.2, 1.8, 90],
];

/* ------------------------------------------------------------------ */
/* Pictogramas por concepto (retícula 3 × 3).                          */
/* ------------------------------------------------------------------ */

export type GlyphId = "exposicion" | "verificacion" | "prioridad" | "reduccion" | "investigacion" | "construccion";

export const GLYPH_NAME: Record<GlyphId, string> = {
  exposicion: "Exposición",
  verificacion: "Verificación",
  prioridad: "Prioridad",
  reduccion: "Reducción",
  investigacion: "Investigación",
  construccion: "Ingeniería",
};

export const GLYPHS: Record<GlyphId, Composition> = {
  // Lo que asoma por encima del horizonte.
  exposicion: {
    g: 3,
    p: [
      { k: "q", c: "apricot", x: 0, y: 0, s: 2, r: 270 },
      { k: "r", c: "ink", x: 0, y: 2 },
      { k: "r", c: "ink", x: 1, y: 2 },
      { k: "r", c: "ink", x: 2, y: 2 },
      { k: "r", c: "petrol", x: 2.2, y: 0.2, s: 0.6 },
    ],
  },
  // Dos triángulos que encajan: el hallazgo se confirma.
  verificacion: {
    g: 3,
    p: [
      { k: "t", c: "sage", x: 0, y: 0, s: 2, r: 0 },
      { k: "t", c: "petrol", x: 0, y: 0, s: 2, r: 180 },
      { k: "r", c: "apricot", x: 2, y: 2 },
    ],
  },
  // Columnas de mayor a menor.
  prioridad: {
    g: 3,
    p: [
      { k: "s", c: "apricot", x: 0, y: 0 },
      { k: "r", c: "apricot", x: 0, y: 1 },
      { k: "r", c: "apricot", x: 0, y: 2 },
      { k: "s", c: "petrol", x: 1, y: 1 },
      { k: "r", c: "petrol", x: 1, y: 2 },
      { k: "s", c: "lilac", x: 2, y: 2 },
    ],
  },
  // Cuartos concéntricos que se encogen hacia la esquina.
  reduccion: {
    g: 3,
    p: [
      { k: "q", c: "lilac", x: 0, y: 0, s: 3 },
      { k: "q", c: "apricot", x: 0, y: 0, s: 2 },
      { k: "q", c: "petrol", x: 0, y: 0, s: 1 },
    ],
  },
  // Libros apilados: cuadrado + semicírculo.
  investigacion: {
    g: 3,
    p: [
      { k: "r", c: "petrol", x: 0.2, y: 0 },
      { k: "s", c: "petrol", x: 1.2, y: 0, r: 90 },
      { k: "r", c: "apricot", x: 0.6, y: 1 },
      { k: "s", c: "apricot", x: 1.6, y: 1, r: 90 },
      { k: "r", c: "sage", x: 0, y: 2 },
      { k: "s", c: "sage", x: 1, y: 2, r: 90 },
    ],
  },
  // Un volumen construido con cuadrado, cúpula y rampa.
  construccion: {
    g: 3,
    p: [
      { k: "s", c: "lilac", x: 0, y: 0, s: 1.5 },
      { k: "r", c: "sage", x: 0, y: 1.5, s: 1.5 },
      { k: "t", c: "apricot", x: 1.5, y: 2 },
    ],
  },
};
