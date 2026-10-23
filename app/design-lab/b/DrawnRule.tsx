"use client";

import { motion, useReducedMotion } from "motion/react";

// Filete de la metodología: se traza una sola vez al entrar en vista.
export function DrawnRule({ axis, className }: { axis: "x" | "y"; className: string }) {
  const reduce = useReducedMotion();
  const from = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const to = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: axis === "x" ? "left center" : "center top" }}
      initial={reduce ? false : from}
      whileInView={to}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
