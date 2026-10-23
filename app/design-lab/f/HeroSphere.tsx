"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  CX,
  CY,
  LEADER_END,
  MERIDIANS,
  PARALLELS,
  POINTS,
  R,
  THETA0,
  VIEW,
  leaderPath,
  meridianPath,
  project,
} from "./sphere";
import styles from "./f.module.css";

const SPIN = (Math.PI * 2) / 80; // una vuelta cada 80 s en reposo

const initial = {
  meridians: MERIDIANS.map((m) => meridianPath(m.lon, THETA0)),
  points: POINTS.map((p) => project(p.lat, p.lon, THETA0)),
};

export function HeroSphere() {
  const reduce = useReducedMotion();
  const figRef = useRef<HTMLElement>(null);
  const inView = useInView(figRef);
  const { scrollY } = useScroll();
  // El scroll hace avanzar la rotación: ~1,5 vueltas por cada 2000 px.
  const scrollAngle = useTransform(scrollY, [0, 2000], [0, Math.PI * 3], { clamp: false });
  const layerY = useTransform(scrollY, [0, 900], [0, -70]);

  const mFront = useRef<(SVGPathElement | null)[]>([]);
  const mBack = useRef<(SVGPathElement | null)[]>([]);
  const dots = useRef<(SVGGElement | null)[]>([]);
  const leaders = useRef<(SVGPathElement | null)[]>([]);
  const spin = useRef(0);
  const last = useRef<number | null>(null);

  const draw = (theta: number) => {
    MERIDIANS.forEach((m, i) => {
      const { front, back } = meridianPath(m.lon, theta);
      mFront.current[i]?.setAttribute("d", front || "M0 0");
      mBack.current[i]?.setAttribute("d", back || "M0 0");
    });
    POINTS.forEach((p, i) => {
      const q = project(p.lat, p.lon, theta);
      const visible = q.z >= 0;
      const g = dots.current[i];
      if (g) {
        g.setAttribute("transform", `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`);
        g.style.opacity = visible ? "1" : "0.28";
      }
      const l = leaders.current[i];
      if (l) {
        l.setAttribute("d", leaderPath(q, p.slotY));
        l.style.opacity = visible ? "1" : "0.3";
      }
    });
  };

  useAnimationFrame((t) => {
    if (reduce || !inView) {
      last.current = null;
      return;
    }
    const dt = last.current === null ? 0 : Math.min(t - last.current, 64);
    last.current = t;
    spin.current += (dt / 1000) * SPIN;
    draw(THETA0 + spin.current + scrollAngle.get());
  });

  // Con movimiento reducido la esfera vuelve (y se queda) en su posición de reposo.
  useEffect(() => {
    if (reduce) draw(THETA0);
  }, [reduce]);

  return (
    <figure
      ref={figRef}
      className="relative mx-auto w-full max-w-[640px] xl:aspect-[640/440] xl:max-w-none"
    >
      {/* Capa translúcida trasera con paralaje suave */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduce ? 0 : layerY }}
        className="pointer-events-none absolute inset-x-[4%] top-[10%] bottom-[18%] rounded-[28px] border border-white/80 bg-white/35 shadow-[0_30px_60px_-40px_rgba(11,21,48,0.35)] backdrop-blur-md xl:inset-x-auto xl:left-[6%] xl:right-[2%] xl:bottom-[6%]"
      />

      <motion.svg
        aria-hidden="true"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto block aspect-square w-full max-w-[460px] overflow-visible xl:absolute xl:left-0 xl:top-0 xl:h-full xl:w-[68.75%] xl:max-w-none"
      >
        <defs>
          <radialGradient id="f-sphere-light" cx="38%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={R} fill="url(#f-sphere-light)" />

        <g fill="none" strokeWidth={0.8} vectorEffect="non-scaling-stroke" strokeLinecap="round">
          {PARALLELS.map((p) => (
            <g key={p.deg} stroke={p.deg === 0 ? "var(--cian)" : "var(--noche)"}>
              <path d={p.back} strokeOpacity={p.deg === 0 ? 0.18 : 0.06} />
              <path d={p.front} strokeOpacity={p.deg === 0 ? 0.55 : 0.16} />
            </g>
          ))}
          {MERIDIANS.map((m, i) => (
            <g key={i} stroke={m.accent ? "var(--plasma)" : "var(--noche)"}>
              <path
                ref={(el) => {
                  mBack.current[i] = el;
                }}
                d={initial.meridians[i].back || "M0 0"}
                strokeOpacity={m.accent ? 0.2 : 0.06}
              />
              <path
                ref={(el) => {
                  mFront.current[i] = el;
                }}
                d={initial.meridians[i].front || "M0 0"}
                strokeOpacity={m.accent ? 0.75 : 0.16}
                strokeWidth={m.accent ? 1.1 : 0.8}
              />
            </g>
          ))}
          <circle cx={CX} cy={CY} r={R} stroke="var(--noche)" strokeOpacity={0.22} />
        </g>

        {/* Líneas guía: solo en escritorio ancho, donde la lista está al lado */}
        <g
          className="max-xl:hidden"
          fill="none"
          stroke="var(--noche)"
          strokeOpacity={0.38}
          strokeWidth={0.7}
        >
          {POINTS.map((p, i) => (
            <path
              key={p.host}
              ref={(el) => {
                leaders.current[i] = el;
              }}
              d={leaderPath(initial.points[i], p.slotY)}
            />
          ))}
          {POINTS.map((p) => (
            <circle key={p.host} cx={LEADER_END} cy={p.slotY} r={1.6} fill="var(--noche)" stroke="none" />
          ))}
        </g>

        {POINTS.map((p, i) => {
          const q = initial.points[i];
          return (
            <g
              key={p.host}
              ref={(el) => {
                dots.current[i] = el;
              }}
              transform={`translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`}
              style={{ opacity: q.z >= 0 ? 1 : 0.28 }}
            >
              {p.level === "alto" && (
                <>
                  <circle r={12} fill="var(--plasma)" fillOpacity={0.12} />
                  <circle
                    r={12}
                    fill="none"
                    stroke="var(--plasma)"
                    strokeOpacity={0.5}
                    className={styles.halo}
                  />
                </>
              )}
              <circle r={p.level === "bajo" ? 3 : 4} fill="var(--plasma)" />
              <circle r={p.level === "bajo" ? 3 : 4} fill="none" stroke="#fff" strokeWidth={1} />
            </g>
          );
        })}
      </motion.svg>

      <figcaption className="relative mt-6 xl:absolute xl:inset-y-0 xl:left-[73.4%] xl:right-0 xl:mt-0">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-3 min-[420px]:grid-cols-2 xl:block">
          {POINTS.map((p) => (
            <li
              key={p.host}
              className="flex items-start gap-2.5 xl:absolute xl:left-0 xl:right-0 xl:-translate-y-1/2"
              style={{ top: `${(p.slotY / VIEW) * 100}%` }}
            >
              <span
                aria-hidden="true"
                className={`mt-[0.4em] inline-block size-2 shrink-0 rounded-full bg-[var(--plasma)] xl:hidden ${
                  p.level === "alto" ? "ring-4 ring-[var(--plasma)]/20" : ""
                }`}
              />
              <span className="min-w-0 xl:pl-2.5">
                <span className="block truncate text-[13px] font-semibold text-[var(--noche)] [font-variant-numeric:tabular-nums]">
                  {p.host}
                </span>
                <span className="block text-[12px] text-[var(--bruma)]">
                  {p.kind}, nivel {p.level}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[12px] text-[var(--bruma)] xl:absolute xl:top-0 xl:left-2.5 xl:mt-0">
          Ejemplo ilustrativo
        </p>
      </figcaption>
    </figure>
  );
}
