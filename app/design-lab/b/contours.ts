// Relieve de isolíneas determinista. Util puro: se ejecuta en servidor y solo
// entrega cadenas `d` de SVG. Campo de alturas = pendiente suave + suma de gaussianas;
// las curvas de nivel salen de marching squares con segmentos unidos en polilíneas.

export type Peak = { x: number; y: number; sx: number; sy: number; h: number };
export type ContourPath = { d: string; major: boolean };

type Options = {
  width: number;
  height: number;
  cols: number;
  rows: number;
  peaks: Peak[];
  levels: number;
  /** Pendiente lineal hacia la derecha (0 = plano). */
  tilt?: number;
  /** Semilla para las ondulaciones menores (deterministas). */
  seed?: number;
  /** Cada cuántos niveles se marca una curva maestra. */
  majorEvery?: number;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function field(o: Options): { values: Float64Array; min: number; max: number } {
  const { width, height, cols, rows, tilt = 0, seed = 1 } = o;
  const rand = mulberry32(seed);
  // Ondulaciones pequeñas para que el terreno no parezca dibujado a compás.
  const ripples: Peak[] = Array.from({ length: 14 }, () => ({
    x: width * (0.35 + rand() * 0.75),
    y: height * (rand() * 1.1 - 0.05),
    sx: 60 + rand() * 120,
    sy: 50 + rand() * 110,
    h: (rand() - 0.35) * 0.22,
  }));
  const all = [...o.peaks, ...ripples];
  const values = new Float64Array((cols + 1) * (rows + 1));
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j <= rows; j++) {
    const y = (j / rows) * height;
    for (let i = 0; i <= cols; i++) {
      const x = (i / cols) * width;
      let v = tilt * (x / width);
      for (const p of all) {
        const dx = (x - p.x) / p.sx;
        const dy = (y - p.y) / p.sy;
        v += p.h * Math.exp(-0.5 * (dx * dx + dy * dy));
      }
      values[j * (cols + 1) + i] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  return { values, min, max };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function contours(o: Options): ContourPath[] {
  const { width, height, cols, rows, levels, majorEvery = 5 } = o;
  const { values, min, max } = field(o);
  const stride = cols + 1;
  const cw = width / cols;
  const ch = height / rows;
  const vOffset = stride * (rows + 1);
  const at = (i: number, j: number) => values[j * stride + i];
  const out: ContourPath[] = [];

  for (let l = 1; l <= levels; l++) {
    const t = min + ((max - min) * l) / (levels + 1);
    // Clave de arista -> punto interpolado. Aristas horizontales: j*stride+i; verticales: vOffset + j*stride+i.
    const pts = new Map<number, [number, number]>();
    const segs: [number, number][] = [];

    const hEdge = (i: number, j: number) => {
      const k = j * stride + i;
      if (!pts.has(k)) {
        const a = at(i, j), b = at(i + 1, j);
        pts.set(k, [(i + (t - a) / (b - a)) * cw, j * ch]);
      }
      return k;
    };
    const vEdge = (i: number, j: number) => {
      const k = vOffset + j * stride + i;
      if (!pts.has(k)) {
        const a = at(i, j), b = at(i, j + 1);
        pts.set(k, [i * cw, (j + (t - a) / (b - a)) * ch]);
      }
      return k;
    };

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const tl = at(i, j), tr = at(i + 1, j), br = at(i + 1, j + 1), bl = at(i, j + 1);
        const c = (tl > t ? 8 : 0) | (tr > t ? 4 : 0) | (br > t ? 2 : 0) | (bl > t ? 1 : 0);
        if (c === 0 || c === 15) continue;
        const top = () => hEdge(i, j);
        const bottom = () => hEdge(i, j + 1);
        const left = () => vEdge(i, j);
        const right = () => vEdge(i + 1, j);
        switch (c) {
          case 1: case 14: segs.push([left(), bottom()]); break;
          case 2: case 13: segs.push([bottom(), right()]); break;
          case 3: case 12: segs.push([left(), right()]); break;
          case 4: case 11: segs.push([top(), right()]); break;
          case 6: case 9: segs.push([top(), bottom()]); break;
          case 7: case 8: segs.push([left(), top()]); break;
          case 5: case 10: {
            // Punto de silla: se resuelve con la media del centro de la celda.
            const centerHigh = (tl + tr + br + bl) / 4 > t;
            if ((c === 5) === centerHigh) {
              segs.push([left(), top()], [bottom(), right()]);
            } else {
              segs.push([left(), bottom()], [top(), right()]);
            }
            break;
          }
        }
      }
    }

    // Unir segmentos que comparten arista en polilíneas continuas.
    const adj = new Map<number, number[]>();
    segs.forEach(([a, b], s) => {
      (adj.get(a) ?? adj.set(a, []).get(a)!).push(s);
      (adj.get(b) ?? adj.set(b, []).get(b)!).push(s);
    });
    const used = new Uint8Array(segs.length);
    const walk = (from: number, chain: number[]) => {
      let cur = from;
      for (;;) {
        const next = adj.get(cur)?.find((s) => !used[s]);
        if (next === undefined) return;
        used[next] = 1;
        const [a, b] = segs[next];
        cur = a === cur ? b : a;
        chain.push(cur);
      }
    };

    const parts: string[] = [];
    for (let s = 0; s < segs.length; s++) {
      if (used[s]) continue;
      used[s] = 1;
      const fwd = [segs[s][0], segs[s][1]];
      walk(fwd[1], fwd);
      const back: number[] = [];
      walk(fwd[0], back);
      const chain = [...back.reverse(), ...fwd];
      if (chain.length < 4) continue; // descarta motas sueltas
      const closed = chain[0] === chain[chain.length - 1];
      const coords = (closed ? chain.slice(0, -1) : chain).map((k) => {
        const [x, y] = pts.get(k)!;
        return `${r1(x)} ${r1(y)}`;
      });
      parts.push(`M${coords[0]}L${coords.slice(1).join(" ")}${closed ? "Z" : ""}`);
    }
    if (parts.length) out.push({ d: parts.join(""), major: l % majorEvery === 0 });
  }
  return out;
}

// --- Escenas concretas del Concept B -------------------------------------

export const HERO_VIEW = { width: 1600, height: 1000 } as const;

/** Cimas donde se colocan las cotas (coordenadas del viewBox del hero). */
export const HERO_SUMMITS = [
  { x: 1250, y: 250 },
  { x: 1470, y: 420 },
  { x: 1150, y: 500 },
] as const;

export function heroContours(): ContourPath[] {
  const [a, b, c] = HERO_SUMMITS;
  return contours({
    ...HERO_VIEW,
    cols: 160,
    rows: 100,
    levels: 20,
    tilt: 0.3,
    seed: 7,
    peaks: [
      { ...a, sx: 125, sy: 105, h: 1.05 },
      { ...b, sx: 95, sy: 125, h: 0.9 },
      { ...c, sx: 85, sy: 70, h: 0.62 },
      { x: 1340, y: 380, sx: 260, sy: 230, h: 0.35 },
      { x: 1400, y: 840, sx: 240, sy: 130, h: 0.4 },
      { x: 920, y: 150, sx: 200, sy: 110, h: 0.25 },
    ],
  });
}

export const CTA_VIEW = { width: 1600, height: 600 } as const;

export function ctaContours(): ContourPath[] {
  return contours({
    ...CTA_VIEW,
    cols: 120,
    rows: 45,
    levels: 14,
    tilt: 0.25,
    seed: 23,
    peaks: [
      { x: 1350, y: 260, sx: 240, sy: 170, h: 1 },
      { x: 1080, y: 470, sx: 150, sy: 110, h: 0.5 },
    ],
  });
}
