// Matemática del globo ASCII de Concept D. Sin dependencias: la usan el canvas del hero (cliente)
// y el horizonte estático del cierre (servidor), así ambos comparten exactamente el mismo dibujo.

export const RAMP = " .:-=+*#%@";

export type View = { cr: number; sr: number; ct: number; st: number; sweep: number };

export function makeView(rot: number, tilt: number, sweep: number): View {
  return { cr: Math.cos(rot), sr: Math.sin(rot), ct: Math.cos(tilt), st: Math.sin(tilt), sweep };
}

// Luz fija en espacio de vista (arriba a la izquierda, hacia el observador).
const LX = -0.52;
const LY = 0.56;
const LZ = 0.645;

function hash(ix: number, iy: number, iz: number): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iy, 0x165667b1) ^ Math.imul(iz, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function noise3(x: number, y: number, z: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fy = y - iy;
  const fz = z - iz;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const w = fz * fz * (3 - 2 * fz);
  const a = hash(ix, iy, iz);
  const b = hash(ix + 1, iy, iz);
  const c = hash(ix, iy + 1, iz);
  const d = hash(ix + 1, iy + 1, iz);
  const e = hash(ix, iy, iz + 1);
  const f = hash(ix + 1, iy, iz + 1);
  const g = hash(ix, iy + 1, iz + 1);
  const h = hash(ix + 1, iy + 1, iz + 1);
  const x1 = a + (b - a) * u;
  const x2 = c + (d - c) * u;
  const x3 = e + (f - e) * u;
  const x4 = g + (h - g) * u;
  const y1 = x1 + (x2 - x1) * v;
  const y2 = x3 + (x4 - x3) * v;
  return y1 + (y2 - y1) * w;
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

// Masas abstractas (no es un mapa real): ruido fractal sobre la esfera, sin costuras.
function landmass(x: number, y: number, z: number): number {
  const n =
    noise3(x * 1.7 + 11.3, y * 1.7 + 3.1, z * 1.7 + 7.7) * 0.62 +
    noise3(x * 3.9 + 2.2, y * 3.9 + 9.4, z * 3.9 + 1.6) * 0.27 +
    noise3(x * 8.3 + 5.5, y * 8.3 + 4.4, z * 8.3 + 8.8) * 0.11;
  return smoothstep(0.45, 0.58, n);
}

const STEP = Math.PI / 6; // retícula cada 30°

/**
 * Intensidad 0..1 de un punto del disco en coordenadas de vista (x a la derecha, y arriba,
 * radio 1). Devuelve -1 fuera de la esfera.
 */
export function shade(x: number, y: number, v: View): number {
  const d2 = x * x + y * y;
  if (d2 > 1) return -1;
  const z = Math.sqrt(1 - d2);
  const lam = Math.max(0, x * LX + y * LY + z * LZ);

  // Vista -> mundo: deshacer inclinación (eje X) y giro (eje Y).
  const y1 = y * v.ct + z * v.st;
  const z1 = -y * v.st + z * v.ct;
  const wx = x * v.cr - z1 * v.sr;
  const wz = x * v.sr + z1 * v.cr;
  const wy = y1;

  const land = landmass(wx, wy, wz);

  const lat = Math.asin(Math.max(-1, Math.min(1, wy)));
  const lon = Math.atan2(wx, wz);
  const dLat = Math.abs(lat / STEP - Math.round(lat / STEP)) * STEP;
  const dLon = Math.abs(lon / STEP - Math.round(lon / STEP)) * STEP * Math.cos(lat);
  const grid = dLat < 0.022 || dLon < 0.022 ? 1 : 0;

  // Barrido: banda vertical en espacio de vista que cruza la cara visible.
  const a = Math.atan2(x, z);
  const off = a - v.sweep;
  const band = Math.exp(-(off * off) / 0.0081);
  const tail = off < 0 ? Math.exp(off * 3.2) * 0.32 : 0;
  const scan = (band * 0.62 + tail) * (0.55 + 0.45 * land);

  const rim = smoothstep(1, 0.82, d2);
  const i = 0.05 + lam * (0.2 + 0.64 * land) * (0.55 + 0.45 * rim) + grid * 0.11 * (0.3 + lam) + scan;
  return Math.min(1, i);
}

/** Proyecta lat/lon (grados) a coordenadas de vista. z > 0 = cara visible. */
export function project(latDeg: number, lonDeg: number, v: View): { x: number; y: number; z: number } {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const wx = Math.cos(lat) * Math.sin(lon);
  const wy = Math.sin(lat);
  const wz = Math.cos(lat) * Math.cos(lon);
  const x1 = wx * v.cr + wz * v.sr;
  const z1 = -wx * v.sr + wz * v.cr;
  return { x: x1, y: wy * v.ct - z1 * v.st, z: wy * v.st + z1 * v.ct };
}

/** Arco de horizonte en texto para el fondo del cierre (se genera en el servidor). */
export function asciiHorizon(cols: number, rows: number): string {
  const v = makeView(2.1, 0.62, -9);
  const R = cols * 0.46; // en anchos de celda; la celda mide 1:2
  const cy = 1.5 + R / 2;
  const out: string[] = [];
  for (let j = 0; j < rows; j++) {
    let line = "";
    for (let i = 0; i < cols; i++) {
      const x = (i + 0.5 - cols / 2) / R;
      const y = -((j + 0.5 - cy) * 2) / R;
      const s = shade(x, y, v);
      line += s < 0 ? " " : RAMP[Math.min(RAMP.length - 1, Math.floor(s * RAMP.length))];
    }
    out.push(line.trimEnd());
  }
  return out.join("\n");
}

/** Disco completo en texto (identidad, portadas). Se genera en el servidor. */
export function asciiGlobe(cols: number, rows: number, rot = 0.9, tilt = 0.36, sweep = 0.42): string {
  const v = makeView(rot, tilt, sweep);
  const R = Math.min(cols / 2, rows) * 0.92; // celda 1:2
  const out: string[] = [];
  for (let j = 0; j < rows; j++) {
    let line = "";
    for (let i = 0; i < cols; i++) {
      const x = (i + 0.5 - cols / 2) / R;
      const y = -((j + 0.5 - rows / 2) * 2) / R;
      const s = shade(x, y, v);
      line += s < 0 ? " " : RAMP[Math.min(RAMP.length - 1, Math.floor(s * RAMP.length))];
    }
    out.push(line.trimEnd());
  }
  return out.join("\n");
}
