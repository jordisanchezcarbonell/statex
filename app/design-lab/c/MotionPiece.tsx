"use client";

import { motion, type Transition } from "motion/react";
import { HEX, SHAPE, type Kind, type Piece } from "./pieces";

// Pieza animable. La capa exterior coloca y escala (origen arriba-izquierda, unidades = celdas);
// la interior gira sobre el centro de la celda y cambia de color.
export function MotionPiece({
  kind,
  grid,
  to,
  from,
  transition,
}: {
  kind: Kind;
  grid: number;
  to: Piece;
  from?: Piece & { o?: number };
  transition?: Transition;
}) {
  const pose = (p: Piece, o?: number) => ({
    x: `${p.x * 100}%`,
    y: `${p.y * 100}%`,
    scale: p.s ?? 1,
    opacity: o ?? p.o ?? 1,
  });
  return (
    <motion.div
      className="absolute top-0 left-0 aspect-square will-change-transform"
      style={{ width: `${100 / grid}%`, originX: 0, originY: 0 }}
      initial={from ? pose(from, from.o) : false}
      animate={pose(to)}
      transition={transition}
    >
      <motion.div
        className="h-full w-full"
        initial={from ? { rotate: from.r ?? 0, color: HEX[from.c] } : false}
        animate={{ rotate: to.r ?? 0, color: HEX[to.c] }}
        transition={transition}
      >
        <svg viewBox="0 0 100 100" className="block h-full w-full overflow-visible" focusable="false">
          <path d={SHAPE[kind]} fill="currentColor" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
