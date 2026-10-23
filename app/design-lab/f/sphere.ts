// Geometría de la esfera de alambre (proyección ortográfica con inclinación).
// Módulo puro: se usa en servidor (render inicial) y en cliente (rotación).
import { sampleAssets } from "../content";

export const VIEW = 440; // viewBox cuadrado de la esfera
export const CX = 220;
export const CY = 220;
export const R = 168;
const TILT = 0.38; // ~22°: vemos la esfera ligeramente desde arriba
const sinT = Math.sin(TILT);
const cosT = Math.cos(TILT);
export const THETA0 = -0.55; // ángulo de reposo (y estático con movimiento reducido)

const DEG = Math.PI / 180;

export type P = { x: number; y: number; z: number };

export function project(lat: number, lon: number, theta: number): P {
  const l = lon + theta;
  const x = R * Math.cos(lat) * Math.sin(l);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.cos(l);
  return { x: CX + x, y: CY - (y * cosT - z * sinT), z: y * sinT + z * cosT };
}

const f = (n: number) => n.toFixed(1);

// Divide una polilínea en tramo visible (delante) y oculto (detrás).
function split(pts: P[]): { front: string; back: string } {
  let front = "";
  let back = "";
  let lastF = -2;
  let lastB = -2;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    if ((a.z + b.z) / 2 >= 0) {
      if (lastF !== i - 1) front += `M${f(a.x)} ${f(a.y)}`;
      front += `L${f(b.x)} ${f(b.y)}`;
      lastF = i;
    } else {
      if (lastB !== i - 1) back += `M${f(a.x)} ${f(a.y)}`;
      back += `L${f(b.x)} ${f(b.y)}`;
      lastB = i;
    }
  }
  return { front, back };
}

// Medios meridianos (polo a polo) cada 30°: rotan con theta.
export const MERIDIANS = Array.from({ length: 12 }, (_, k) => ({
  lon: k * 30 * DEG,
  accent: k === 0 || k === 7,
}));

export function meridianPath(lon: number, theta: number) {
  const pts: P[] = [];
  for (let i = 0; i <= 28; i++) pts.push(project(-90 * DEG + (i / 28) * Math.PI, lon, theta));
  return split(pts);
}

// Paralelos: no dependen de la rotación, se calculan una vez.
export const PARALLELS = [-60, -30, 0, 30, 60].map((deg) => {
  const pts: P[] = [];
  for (let i = 0; i <= 64; i++) pts.push(project(deg * DEG, (i / 64) * Math.PI * 2, 0));
  return { deg, ...split(pts) };
});

// Puntos expuestos: posiciones ilustrativas sobre la superficie, ordenados de norte a sur
// para que las líneas guía hacia la lista lateral se crucen lo menos posible.
const POS: Record<string, [number, number]> = {
  "www.ejemplo.com": [34, 20],
  "staging.ejemplo.com": [12, 95],
  "api.ejemplo.com": [-18, 200],
  "203.0.113.14": [50, 250],
  "mail.ejemplo.com": [-42, 320],
  "198.51.100.7": [-4, 150],
};

export const POINTS = sampleAssets
  .map((a) => ({ ...a, lat: POS[a.host][0] * DEG, lon: POS[a.host][1] * DEG }))
  .sort((a, b) => b.lat - a.lat)
  .map((a, i, arr) => ({ ...a, slotY: 62 + (i * (VIEW - 124)) / (arr.length - 1) }));

// Las líneas guía terminan fuera del viewBox (overflow visible), donde empieza la lista.
export const LEADER_END = 470;
export const FIGURE_W = 640;

export function leaderPath(p: P, slotY: number) {
  return `M${f(p.x)} ${f(p.y)}L448 ${f(slotY)}H${LEADER_END}`;
}
