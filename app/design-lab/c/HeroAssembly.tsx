"use client";

import { MotionConfig } from "motion/react";
import { MotionPiece } from "./MotionPiece";
import { HERO, HERO_FROM } from "./pieces";

// Momento de carga: las piezas llegan desde fuera de la retícula y encajan en la X.
// Primero los satélites, al final los cuatro cuartos de círculo.
// Con movimiento reducido, MotionConfig anula los desplazamientos y giros: la X aparece montada.
export function HeroAssembly({ className = "" }: { className?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden="true" className={`relative aspect-square ${className}`}>
        {HERO.p.map((p, i) => {
          const [dx, dy, dr] = HERO_FROM[i];
          const isX = p.k === "q" && (p.s ?? 1) === 2;
          return (
            <MotionPiece
              key={i}
              kind={p.k}
              grid={HERO.g}
              to={p}
              from={{ ...p, x: p.x + dx, y: p.y + dy, r: (p.r ?? 0) + dr, o: 0 }}
              transition={{
                type: "spring",
                stiffness: isX ? 120 : 90,
                damping: isX ? 15 : 18,
                delay: 0.15 + (isX ? 0.55 + (i - 6) * 0.08 : i * 0.06),
                opacity: { duration: 0.35, delay: 0.1 + i * 0.05 },
              }}
            />
          );
        })}
      </div>
    </MotionConfig>
  );
}
