// Render estático de las isolíneas: la misma suma de ondas radiales que el shader,
// contorneada con marching squares en el servidor. Sirve para piezas de marca sin WebGL.

export type Source = { x: number; y: number; k: number; a?: number; phase?: number };

type Options = {
  width: number;
  height: number;
  /** Paso de la rejilla en unidades del viewBox (más pequeño = más fino y más pesado). */
  step: number;
  sources: Source[];
  /** Niveles de contorno en el rango del campo. */
  levels: number[];
};

const r1 = (v: number) => Math.round(v * 10) / 10;

export function isolines({ width, height, step, sources, levels }: Options): string[] {
  const nx = Math.ceil(width / step) + 1;
  const ny = Math.ceil(height / step) + 1;
  const field = new Float32Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const x = i * step;
      const y = j * step;
      let v = 0;
      for (const s of sources) v += (s.a ?? 1) * Math.cos(Math.hypot(x - s.x, y - s.y) * s.k + (s.phase ?? 0));
      field[j * nx + i] = v;
    }
  }

  return levels.map((lv) => {
    const segs: [number, number, number, number][] = [];
    const lerp = (a: number, b: number) => (lv - a) / (b - a || 1e-6);
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const tl = field[j * nx + i];
        const tr = field[j * nx + i + 1];
        const br = field[(j + 1) * nx + i + 1];
        const bl = field[(j + 1) * nx + i];
        const c = (tl > lv ? 8 : 0) | (tr > lv ? 4 : 0) | (br > lv ? 2 : 0) | (bl > lv ? 1 : 0);
        if (c === 0 || c === 15) continue;
        const x = i * step;
        const y = j * step;
        const top: [number, number] = [r1(x + step * lerp(tl, tr)), r1(y)];
        const right: [number, number] = [r1(x + step), r1(y + step * lerp(tr, br))];
        const bottom: [number, number] = [r1(x + step * lerp(bl, br)), r1(y + step)];
        const left: [number, number] = [r1(x), r1(y + step * lerp(tl, bl))];
        const seg = (a: [number, number], b: [number, number]) => segs.push([a[0], a[1], b[0], b[1]]);
        switch (c) {
          case 1: case 14: seg(left, bottom); break;
          case 2: case 13: seg(bottom, right); break;
          case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(top, right); break;
          case 5: seg(left, top); seg(bottom, right); break;
          case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(left, top); break;
          case 10: seg(left, bottom); seg(top, right); break;
        }
      }
    }
    return chain(segs);
  });
}

// Une segmentos que comparten extremo en polilíneas: el path pesa la mitad.
function chain(segs: [number, number, number, number][]): string {
  const key = (x: number, y: number) => `${x},${y}`;
  const ends = new Map<string, number[]>();
  segs.forEach((s, i) => {
    for (const k of [key(s[0], s[1]), key(s[2], s[3])]) {
      const list = ends.get(k);
      if (list) list.push(i);
      else ends.set(k, [i]);
    }
  });
  const used = new Uint8Array(segs.length);
  const next = (x: number, y: number) => {
    const list = ends.get(key(x, y));
    if (!list) return -1;
    for (const i of list) if (!used[i]) return i;
    return -1;
  };
  let d = "";
  for (let i = 0; i < segs.length; i++) {
    if (used[i]) continue;
    used[i] = 1;
    const pts: number[] = [segs[i][0], segs[i][1], segs[i][2], segs[i][3]];
    // hacia delante
    for (;;) {
      const x = pts[pts.length - 2];
      const y = pts[pts.length - 1];
      const n = next(x, y);
      if (n < 0) break;
      used[n] = 1;
      const s = segs[n];
      if (s[0] === x && s[1] === y) pts.push(s[2], s[3]);
      else pts.push(s[0], s[1]);
    }
    // hacia atrás
    for (;;) {
      const n = next(pts[0], pts[1]);
      if (n < 0) break;
      used[n] = 1;
      const s = segs[n];
      if (s[0] === pts[0] && s[1] === pts[1]) pts.unshift(s[2], s[3]);
      else pts.unshift(s[0], s[1]);
    }
    d += `M${pts[0]} ${pts[1]}L${pts.slice(2).join(" ")}`;
  }
  return d;
}

/** Campo por defecto de la marca: tres fuentes, como el hero. */
export function brandField(width: number, height: number, step = 6, density = 1) {
  const k = (2 * Math.PI) / (height * 0.16) * density;
  return isolines({
    width,
    height,
    step,
    sources: [
      { x: width * 0.78, y: height * 0.3, k },
      { x: width * 0.55, y: height * 0.78, k: k * 0.94, a: 0.95 },
      { x: width * 1.05, y: height * 0.95, k: k * 1.06, a: 0.8 },
    ],
    levels: [-1.6, -0.8, 0, 0.8, 1.6],
  });
}
