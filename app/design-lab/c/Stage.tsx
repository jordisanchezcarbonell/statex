"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { MotionPiece } from "./MotionPiece";
import { STAGE_GRID, STAGE_IDS, STAGE_KINDS, stageComposition, type StageId } from "./pieces";

// Composición fija (solo escritorio y sin movimiento reducido; lo decide el CSS del contenedor).
// Observa qué sección cruza el centro de la ventana y recompone las diez piezas en su pictograma.
export function Stage() {
  const [state, setState] = useState(() => ({
    id: "problema" as StageId,
    rots: stageComposition("problema").p.map((p) => p.r ?? 0),
  }));

  useEffect(() => {
    const els = STAGE_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id as StageId;
          // Giro equivalente más cercano al actual: las piezas nunca dan vueltas de más.
          setState((prev) =>
            prev.id === id
              ? prev
              : {
                  id,
                  rots: stageComposition(id).p.map((p, i) => {
                    const target = p.r ?? 0;
                    return target + 360 * Math.round((prev.rots[i] - target) / 360);
                  }),
                },
          );
        }
      },
      { rootMargin: "-49% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const pieces = stageComposition(state.id).p.map((p, i) => ({ ...p, r: state.rots[i] }));

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative aspect-square w-[min(34vw,68svh)]" data-stage={state.id}>
        {pieces.map((p, i) => (
          <MotionPiece
            key={i}
            kind={STAGE_KINDS[i]}
            grid={STAGE_GRID}
            to={p}
            transition={{ type: "spring", stiffness: 110, damping: 17, mass: 0.9, delay: i * 0.03 }}
          />
        ))}
      </div>
    </MotionConfig>
  );
}
