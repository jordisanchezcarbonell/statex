"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { sampleAssets } from "../content";
import { A, inX } from "./x";

const N = 20;
const RADIUS = 2.7; // radio de influencia del cursor, en celdas
const HOLD = 700; // ms que una celda sigue girada tras alejarse el cursor
const HOLD_ASSET = 2400; // las celdas con activo aguantan más para poder leer la etiqueta

// Celdas de la X que esconden un activo de ejemplo (una por elemento de sampleAssets).
const ASSET_CELLS: [number, number][] = [
  [3, 3],
  [4, 15],
  [8, 8],
  [12, 7],
  [16, 16],
  [15, 4],
];

type Cell = {
  r: number;
  c: number;
  on: boolean;
  p: number; // progreso del giro: 0 = cara frontal, 1 = cara trasera
  until: number; // hasta cuándo debe permanecer girada
  born: number; // instante de aparición en el ensamblaje (ms desde inicio)
  asset: number; // índice en sampleAssets o -1
};

const levelText: Record<string, string> = { bajo: "riesgo bajo", medio: "riesgo medio", alto: "riesgo alto" };

export function HeroX() {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const cells: Cell[] = [];
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++)
        cells.push({ r, c, on: inX(N, r, c, 1), p: 0, until: 0, born: 0, asset: -1 });
    ASSET_CELLS.forEach(([r, c], i) => (cells[r * N + c].asset = i));

    // Ensamblaje: una sola secuencia, desde el cruce hacia los extremos de cada brazo.
    const ctr = (N - 1) / 2;
    const order = cells
      .filter((k) => k.on)
      .sort((a, b) => Math.hypot(a.r - ctr, a.c - ctr) - Math.hypot(b.r - ctr, b.c - ctr) || a.r - b.r);
    const STEP = 9;
    order.forEach((k, i) => (k.born = 260 + i * STEP));
    const assembleEnd = 260 + order.length * STEP + 360;

    let size = 0;
    let dpr = 1;
    let start = performance.now();
    let last = start;
    let raf = 0;
    let visible = true;
    let pointer: { x: number; y: number } | null = null;
    let probe: { x: number; y: number; r: number } | null = null;
    let touched = false;
    let tour = -1;
    let tourTimer = 0;
    const shown = new Array(sampleAssets.length).fill(false);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = el.clientWidth;
      cv.width = Math.round(size * dpr);
      cv.height = Math.round(size * dpr);
      cv.style.width = `${size}px`;
      cv.style.height = `${size}px`;
      kick();
    };

    const draw = (now: number) => {
      const t = now - start;
      const cell = size / N;
      const gap = cell * 0.16;
      const s = cell - gap;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const gridIn = reduce ? 1 : Math.min(1, t / 420);

      for (const k of cells) {
        const x = k.c * cell + gap / 2;
        const y = k.r * cell + gap / 2;
        const back = k.p > 0.5;
        let sx = Math.abs(Math.cos(Math.PI * k.p));

        if (k.on) {
          if (!reduce) {
            const a = Math.min(1, Math.max(0, (t - k.born) / 340));
            if (a <= 0) continue;
            // Entra girando desde el canto, como si la celda se volteara a su sitio.
            sx *= 1 - Math.pow(1 - a, 3);
          }
          ctx.fillStyle = back ? A.teal : A.ink;
          const w = s * sx;
          ctx.fillRect(x + (s - w) / 2, y, w, s);
        } else {
          if (k.p > 0.02) {
            ctx.fillStyle = back ? A.line : "#F1F2F4";
            const w = s * sx;
            ctx.fillRect(x + (s - w) / 2, y, w, s);
          } else {
            ctx.globalAlpha = gridIn;
            ctx.fillStyle = A.line;
            const d = Math.max(1.5, cell * 0.14);
            ctx.fillRect(k.c * cell + cell / 2 - d / 2, k.r * cell + cell / 2 - d / 2, d, d);
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const step = (now: number) => {
      raf = 0;
      const dt = Math.min(64, now - last);
      last = now;
      const t = now - start;
      const assembling = !reduce && t < assembleEnd;
      const ease = reduce ? 1 : 1 - Math.exp(-dt / 70);
      let moving = false;

      const sources = [pointer && { ...pointer, r: RADIUS }, probe].filter(Boolean) as { x: number; y: number; r: number }[];
      for (const k of cells) {
        const cx = k.c + 0.5;
        const cy = k.r + 0.5;
        // Durante el ensamblaje la X no reacciona: la secuencia de entrada es una sola.
        if (!assembling && (!k.on || reduce || t > k.born + 340)) {
          for (const sItem of sources) {
            const dist = Math.hypot(cx - sItem.x, cy - sItem.y);
            if (dist < sItem.r) {
              // El borde del radio gira algo más tarde: el giro se propaga desde el cursor.
              const lag = reduce ? 0 : (dist / sItem.r) * 120;
              k.until = Math.max(k.until, now + lag + (k.asset >= 0 ? HOLD_ASSET : HOLD));
            }
          }
        }
        const target = now < k.until ? 1 : 0;
        const next = k.p + (target - k.p) * ease;
        k.p = Math.abs(next - target) < 0.004 ? target : next;
        if (k.p !== target || k.until > now) moving = true;

        if (k.asset >= 0) {
          const vis = k.p > 0.5;
          if (vis !== shown[k.asset]) {
            shown[k.asset] = vis;
            const lab = labels.current[k.asset];
            if (lab) lab.dataset.on = vis ? "1" : "0";
          }
        }
      }

      draw(now);
      if (visible && (assembling || moving || pointer || probe)) raf = requestAnimationFrame(step);
    };

    function kick() {
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    }

    // Recorrido automático: una sola vuelta por los seis activos, solo si nadie ha tocado la X.
    const runTour = () => {
      if (touched || reduce) return;
      if (!visible) {
        tourTimer = window.setTimeout(runTour, 800);
        return;
      }
      tour += 1;
      if (tour >= ASSET_CELLS.length) {
        probe = null;
        return;
      }
      const [r, c] = ASSET_CELLS[tour];
      probe = { x: c + 0.5, y: r + 0.5, r: 1.9 };
      kick();
      window.setTimeout(() => {
        probe = null;
      }, 260);
      tourTimer = window.setTimeout(runTour, 1500);
    };

    const toLocal = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      return { x: ((e.clientX - rect.left) / rect.width) * N, y: ((e.clientY - rect.top) / rect.height) * N };
    };
    const stopTour = () => {
      if (touched) return;
      touched = true;
      probe = null;
      window.clearTimeout(tourTimer);
    };
    const onMove = (e: PointerEvent) => {
      stopTour();
      pointer = toLocal(e);
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el);
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onLeave);

    start = performance.now();
    resize();
    if (!reduce) tourTimer = window.setTimeout(runTour, assembleEnd + 500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(tourTimer);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
    };
  }, [reduce]);

  return (
    <div ref={wrap} aria-hidden="true" className="relative aspect-square w-full touch-pan-y select-none">
      <canvas ref={canvas} className="absolute inset-0 block" />
      {sampleAssets.map((a, i) => {
        const [r, c] = ASSET_CELLS[i];
        const right = c < N / 2;
        const style = right
          ? { left: `${((c + 1) / N) * 100}%`, top: `${(r / N) * 100}%` }
          : { right: `${((N - c) / N) * 100}%`, top: `${(r / N) * 100}%` };
        return (
          <div
            key={a.host}
            ref={(n) => {
              labels.current[i] = n;
            }}
            data-on="0"
            style={style}
            className={`pointer-events-none absolute z-10 whitespace-nowrap bg-[#00796B] px-2 py-1 text-white opacity-0 transition-[opacity,transform] duration-200 ease-out data-[on=1]:translate-x-0 data-[on=1]:opacity-100 ${
              right ? "ml-1 -translate-x-1" : "mr-1 translate-x-1"
            }`}
          >
            <span className="block text-[12px] font-semibold leading-tight tracking-[-0.005em]">{a.host}</span>
            <span className="block text-[11px] leading-tight text-white">
              {a.kind}, {levelText[a.level]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
