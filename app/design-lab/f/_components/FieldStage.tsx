"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { FRAG_BODY, VERT } from "./shader";

// Escenario de fondo para hero + #problema + #enfoque: UN solo contexto WebGL en un canvas
// sticky del alto del viewport. Cada fotograma lee los bordes de las secciones y la lente,
// así que el fondo "cambia de estado" exactamente donde cambia el contenido.

export type HeroBinding = {
  section: HTMLElement;
  /** Bloque de texto: el shader se atenúa detrás y la lente no entra. */
  text: HTMLElement;
  /** Zona donde reposa y deambula la lente; contiene la capa de etiquetas. */
  field: HTMLElement;
  /** Capa HTML enmascarada por la lente (recibe --x, --y, --r). */
  tags: HTMLElement;
};

type StageApi = {
  bind: (h: HeroBinding | null) => void;
  setExposed: (v: boolean) => void;
};

const StageCtx = createContext<StageApi | null>(null);
export const useStage = () => useContext(StageCtx);

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

const SEAM = 56;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function FieldStage({
  children,
  problemId,
  approachId,
}: {
  children: ReactNode;
  problemId: string;
  approachId: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HeroBinding | null>(null);
  const exposedRef = useRef(false);
  const kickRef = useRef<() => void>(() => {});
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"pending" | "ready" | "failed">("pending");

  const api = useMemo<StageApi>(
    () => ({
      bind: (h) => {
        heroRef.current = h;
        kickRef.current();
      },
      setExposed: (v) => {
        exposedRef.current = v;
        kickRef.current();
      },
    }),
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const still = !!reduce;
    const touch = window.matchMedia("(hover: none)").matches;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    }) as WebGLRenderingContext | null;
    if (!gl) {
      setStatus("failed");
      return;
    }

    const deriv = gl.getExtension("OES_standard_derivatives");
    const header = deriv
      ? "#extension GL_OES_standard_derivatives : enable\n#define FW(x) fwidth(x)\n"
      : "#define FW(x) 0.08\n";
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, header + FRAG_BODY);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setStatus("failed");
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setStatus("failed");
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      src: gl.getUniformLocation(prog, "u_src0"),
      mask: gl.getUniformLocation(prog, "u_mask"),
      dpr: gl.getUniformLocation(prog, "u_dpr"),
      lens: gl.getUniformLocation(prog, "u_lens"),
      bound: gl.getUniformLocation(prog, "u_bound"),
      scroll: gl.getUniformLocation(prog, "u_scroll"),
    };

    let dpr = 1;
    const measure = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Estado animado. La lente vive en coordenadas de viewport (px CSS).
    const lens = { x: 0, y: 0, r: 0, init: false };
    const src = { x: 0.35, y: 0.05 };
    let pointer: { x: number; y: number } | null = null;
    let time = 9.0;
    let last = 0;
    let raf = 0;
    let onScreen = true;
    let running = false;

    const step = (now: number, dt: number) => {
      const cr = canvas.getBoundingClientRect();
      const h = heroRef.current;
      const mask = [0, 0, 0, 0];

      if (h) {
        const fr = h.field.getBoundingClientRect();
        const base = Math.min(150, Math.max(72, Math.min(fr.width, fr.height) * 0.36));
        const tr = exposedRef.current ? Math.hypot(cr.width, cr.height) * 1.1 : base;
        let tx = fr.left + fr.width * 0.5;
        let ty = fr.top + fr.height * 0.45;
        if (!still && pointer && !touch) {
          tx = pointer.x;
          ty = pointer.y;
        } else if (!still && touch) {
          const s = now / 1000;
          tx = fr.left + fr.width * (0.5 + 0.3 * Math.sin(s * 0.32));
          ty = fr.top + fr.height * (0.45 + 0.28 * Math.sin(s * 0.51 + 1.2));
        }
        if (!lens.init || still) {
          lens.x = tx;
          lens.y = ty;
          lens.r = tr;
          lens.init = true;
        } else {
          const kp = 1 - Math.pow(0.0005, dt);
          const kr = 1 - Math.pow(0.01, dt);
          lens.x += (tx - lens.x) * kp;
          lens.y += (ty - lens.y) * kp;
          lens.r += (tr - lens.r) * kr;
        }
        const tg = h.tags.getBoundingClientRect();
        h.tags.style.setProperty("--x", `${(lens.x - tg.left).toFixed(1)}px`);
        h.tags.style.setProperty("--y", `${(lens.y - tg.top).toFixed(1)}px`);
        h.tags.style.setProperty("--r", `${lens.r.toFixed(1)}px`);

        const m = h.text.getBoundingClientRect();
        mask[0] = (m.left - cr.left) * dpr;
        mask[1] = (cr.bottom - m.bottom) * dpr;
        mask[2] = m.width * dpr;
        mask[3] = m.height * dpr;
      }

      // Fuente de ondas del hero: sigue al cursor con inercia o deriva sola.
      if (!still) {
        let sx: number;
        let sy: number;
        if (pointer && !touch) {
          sx = (pointer.x - cr.left - cr.width / 2) / cr.height;
          sy = (cr.top + cr.height / 2 - pointer.y) / cr.height;
        } else {
          const aspect = cr.width / cr.height;
          sx = 0.22 * aspect * Math.cos(time * 0.13) + 0.1 * aspect;
          sy = 0.18 * Math.sin(time * 0.11) + 0.05;
        }
        const ke = 1 - Math.pow(0.04, dt);
        src.x += (sx - src.x) * ke;
        src.y += (sy - src.y) * ke;
      }

      // La costura se centra 56px dentro de la sección: la banda de transición cae en su padding,
      // nunca bajo los CTA del hero ni bajo el primer titular.
      const edge = (id: string) => {
        const el = document.getElementById(id);
        return el ? (cr.bottom - el.getBoundingClientRect().top - SEAM) * dpr : -1e5;
      };
      const rr = root.getBoundingClientRect();
      const progress = clamp01(-rr.top / Math.max(1, rr.height - cr.height));

      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, time);
      gl.uniform2f(U.src, src.x, src.y);
      gl.uniform4f(U.mask, mask[0], mask[1], mask[2], mask[3]);
      gl.uniform1f(U.dpr, dpr);
      gl.uniform3f(U.lens, (lens.x - cr.left) * dpr, (cr.bottom - lens.y) * dpr, h ? lens.r * dpr : 0);
      gl.uniform2f(U.bound, edge(problemId), edge(approachId));
      gl.uniform1f(U.scroll, progress);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      time += dt;
      step(now, dt);
      raf = requestAnimationFrame(frame);
    };

    // Movimiento reducido: sin bucle; un único fotograma cuando algo cambia (scroll, tamaño, botón).
    let pendingDraw = 0;
    const drawOnce = () => {
      if (pendingDraw) return;
      pendingDraw = requestAnimationFrame((now) => {
        pendingDraw = 0;
        step(now, 0);
      });
    };

    const start = () => {
      if (running || still) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (onScreen && !document.hidden) {
        if (still) drawOnce();
        else start();
      } else stop();
    };
    kickRef.current = () => (running ? undefined : drawOnce());

    measure();
    step(performance.now(), 0);
    setStatus("ready");

    const ro = new ResizeObserver(() => {
      measure();
      if (!running) drawOnce();
    });
    ro.observe(canvas);
    ro.observe(root);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(root);

    const onVis = () => sync();
    document.addEventListener("visibilitychange", onVis);

    const onScroll = () => {
      if (still && onScreen) drawOnce();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onPointer = (e: PointerEvent) => {
      if (still || e.pointerType === "touch") return;
      const sec = heroRef.current?.section.getBoundingClientRect();
      pointer =
        sec && e.clientY >= sec.top && e.clientY <= sec.bottom ? { x: e.clientX, y: e.clientY } : null;
    };
    const onLeave = () => {
      pointer = null;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      setStatus("failed");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    sync();

    return () => {
      stop();
      cancelAnimationFrame(pendingDraw);
      kickRef.current = () => {};
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [reduce, problemId, approachId]);

  return (
    <StageCtx.Provider value={api}>
      <div ref={rootRef} data-gl={status} className="group/stage relative isolate">
        <div aria-hidden="true" className="pointer-events-none sticky top-0 -z-10 -mb-[100svh] h-svh overflow-hidden">
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
              status === "ready" ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        {children}
      </div>
    </StageCtx.Provider>
  );
}
