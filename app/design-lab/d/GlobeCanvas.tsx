"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { sampleAssets } from "../content";
import { TARGET_COORDS } from "./data";
import { RAMP, makeView, project, shade } from "./globe";

const FG = "232,230,227";
const MUTED = "138,143,152";
const AMBER = "255,176,0";
const BG = "11,12,14";
const LEVEL_TEXT: Record<string, string> = { alto: "exposición alta", medio: "exposición media", bajo: "exposición baja" };

const AUTO_SPEED = 0.11; // rad/s
const SWEEP_PERIOD = 7000; // ms
const LENS = 90; // px

/**
 * Globo ASCII renderizado en canvas 2D. Decorativo (aria-hidden): los objetivos que dibuja
 * existen también como texto en el pie de figura.
 */
export function GlobeCanvas({ interactive = true }: { interactive?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let family = getComputedStyle(canvas).fontFamily || "monospace";
    let fs = 11;
    let cw = 6.6;
    let ch = 13.2;
    let cols = 0;
    let rows = 0;
    let R = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let last = 0;
    let clock = 0; // tiempo de animación acumulado (se congela en pausa)
    let onScreen = true;
    let visible = !document.hidden;

    const s = {
      rot: 0.55,
      tilt: 0.36,
      vel: 0,
      dragging: false,
      lastX: 0,
      lastY: 0,
      px: -1e4,
      py: -1e4,
      pings: new Array<number>(sampleAssets.length).fill(-1e9),
      prevOff: new Array<number>(sampleAssets.length).fill(0),
    };

    const buckets: number[][] = Array.from({ length: RAMP.length }, () => []);

    function draw() {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (R <= 0) return;

      const sweep = reduce ? 0.42 : -2.3 + ((clock % SWEEP_PERIOD) / SWEEP_PERIOD) * 5.6;
      const v = makeView(s.rot, s.tilt, sweep);

      for (const b of buckets) b.length = 0;
      const lim = 1.09;
      const j0 = Math.max(0, Math.floor((cy - R * lim) / ch));
      const j1 = Math.min(rows - 1, Math.ceil((cy + R * lim) / ch));
      const i0 = Math.max(0, Math.floor((cx - R * lim) / cw));
      const i1 = Math.min(cols - 1, Math.ceil((cx + R * lim) / cw));

      for (let j = j0; j <= j1; j++) {
        const py = (j + 0.5) * ch;
        const y = -(py - cy) / R;
        for (let i = i0; i <= i1; i++) {
          const px = (i + 0.5) * cw;
          const x = (px - cx) / R;
          let k: number;
          const d2 = x * x + y * y;
          if (d2 > 1) {
            // Halo fino: anillo punteado justo fuera del disco.
            if (d2 < 1.075 && (i * 7 + j * 13) % 3 === 0) k = 1;
            else continue;
          } else {
            let val = shade(x, y, v);
            const dx = px - s.px;
            const dy = py - s.py;
            const dd = dx * dx + dy * dy;
            if (dd < LENS * LENS) val += (1 - Math.sqrt(dd) / LENS) * 0.38;
            k = Math.min(RAMP.length - 1, Math.floor(val * RAMP.length));
          }
          if (k > 0) buckets[k].push(px, py);
        }
      }

      ctx.font = `${fs}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let k = 1; k < RAMP.length; k++) {
        const b = buckets[k];
        if (!b.length) continue;
        ctx.fillStyle = `rgba(${FG},${(0.2 + (0.8 * k) / (RAMP.length - 1)).toFixed(3)})`;
        const c = RAMP[k];
        for (let n = 0; n < b.length; n += 2) ctx.fillText(c, b[n], b[n + 1]);
      }

      // Objetivos.
      const labelSize = Math.max(10, Math.min(12, fs + 1));
      for (let t = 0; t < sampleAssets.length; t++) {
        const [lat, lon] = TARGET_COORDS[t];
        const p = project(lat, lon, v);
        const off = Math.atan2(p.x, p.z) - sweep;
        if (!reduce && p.z > 0 && s.prevOff[t] < 0 && off >= 0) s.pings[t] = clock;
        s.prevOff[t] = off;
        if (p.z <= 0.04) continue;

        const a = Math.min(1, (p.z - 0.04) / 0.22);
        const sx = cx + p.x * R;
        const sy = cy - p.y * R;
        const hover = Math.hypot(sx - s.px, sy - s.py) < 18;

        // Pulso cuando la banda de barrido pasa por el objetivo.
        const age = clock - s.pings[t];
        if (age >= 0 && age < 1400) {
          const q = age / 1400;
          ctx.strokeStyle = `rgba(${AMBER},${((1 - q) * 0.7 * a).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(sx, sy, 6 + q * 26, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Retícula: cuatro trazos y un punto.
        ctx.strokeStyle = `rgba(${AMBER},${a.toFixed(3)})`;
        ctx.lineWidth = 1.25;
        const r0 = hover ? 6 : 4;
        const r1 = hover ? 12 : 9;
        ctx.beginPath();
        ctx.moveTo(sx - r1, sy);
        ctx.lineTo(sx - r0, sy);
        ctx.moveTo(sx + r0, sy);
        ctx.lineTo(sx + r1, sy);
        ctx.moveTo(sx, sy - r1);
        ctx.lineTo(sx, sy - r0);
        ctx.moveTo(sx, sy + r0);
        ctx.lineTo(sx, sy + r1);
        ctx.stroke();
        ctx.fillStyle = `rgba(${AMBER},${a.toFixed(3)})`;
        ctx.fillRect(sx - 1.5, sy - 1.5, 3, 3);

        // Etiqueta.
        const asset = sampleAssets[t];
        ctx.font = `${labelSize}px ${family}`;
        ctx.textBaseline = "middle";
        const host = asset.host;
        const sub = `${asset.kind}  ${LEVEL_TEXT[asset.level]}`;
        const wHost = ctx.measureText(host).width;
        const wSub = hover ? ctx.measureText(sub).width : 0;
        const w = Math.max(wHost, wSub) + 12;
        const h = hover ? labelSize * 2 + 14 : labelSize + 10;
        const flip = sx + 16 + w > W - 4;
        const lx = flip ? sx - 16 - w : sx + 16;
        const ly = sy - (labelSize + 10) / 2;
        ctx.fillStyle = `rgba(${BG},${(0.82 * a).toFixed(3)})`;
        ctx.fillRect(lx, ly, w, h);
        if (hover) {
          ctx.fillStyle = `rgba(${AMBER},${a.toFixed(3)})`;
          ctx.fillRect(flip ? lx + w - 2 : lx, ly, 2, h);
        }
        ctx.textAlign = "left";
        ctx.fillStyle = `rgba(${FG},${a.toFixed(3)})`;
        ctx.fillText(host, lx + 6, ly + (labelSize + 10) / 2);
        if (hover) {
          ctx.fillStyle = `rgba(${MUTED},${a.toFixed(3)})`;
          ctx.fillText(sub, lx + 6, ly + (labelSize + 10) / 2 + labelSize + 4);
        }
      }
    }

    function measure() {
      const r = wrap!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.max(1, Math.round(W * dpr));
      canvas!.height = Math.max(1, Math.round(H * dpr));
      R = Math.min(W, H) * 0.42;
      fs = Math.max(8, Math.min(13, R / 22));
      ctx!.font = `${fs}px ${family}`;
      cw = ctx!.measureText("M").width || fs * 0.6;
      ch = fs * 1.2;
      cols = Math.ceil(W / cw);
      rows = Math.ceil(H / ch);
      cx = W / 2;
      cy = H / 2;
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt * 1000;
      if (!s.dragging) {
        s.rot += (AUTO_SPEED + s.vel) * dt;
        s.vel *= Math.pow(0.04, dt);
      }
      draw();
      raf = requestAnimationFrame(frame);
    }

    function sync() {
      const run = !reduce && onScreen && visible;
      if (run && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(wrap);
    const onVis = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    let alive = true;
    document.fonts?.ready.then(() => {
      if (!alive) return;
      family = getComputedStyle(canvas).fontFamily || family;
      measure();
    });

    // Interacción: arrastrar gira el globo; el cursor ilumina las celdas cercanas.
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top] as const;
    };
    const onDown = (e: PointerEvent) => {
      s.dragging = true;
      s.vel = 0;
      [s.lastX, s.lastY] = local(e);
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const [x, y] = local(e);
      s.px = x;
      s.py = y;
      if (s.dragging) {
        const dx = x - s.lastX;
        const dy = y - s.lastY;
        s.rot += dx * 0.006;
        s.tilt = Math.max(-0.3, Math.min(0.95, s.tilt + dy * 0.004));
        s.vel = Math.max(-2.5, Math.min(2.5, dx * 0.35));
        s.lastX = x;
        s.lastY = y;
      }
      if (!raf) draw();
    };
    const onUp = (e: PointerEvent) => {
      s.dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };
    const onLeave = () => {
      if (s.dragging) return;
      s.px = -1e4;
      s.py = -1e4;
      if (!raf) draw();
    };
    if (interactive) {
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
      canvas.addEventListener("pointerleave", onLeave);
    }

    sync();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, interactive]);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className={`block h-full w-full font-[family-name:var(--font-jbm)] ${
          interactive ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none"
        }`}
      />
    </div>
  );
}
