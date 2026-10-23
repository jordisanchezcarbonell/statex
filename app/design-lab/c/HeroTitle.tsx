"use client";

import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import s from "./c.module.css";

const REST = 0.035;
const HOVER = 0.08;

// h1 a dos tintas: al pasar el cursor, el registro de la tinta rosa se desplaza un poco más.
export function HeroTitle({ text, id, className = "" }: { text: string; id: string; className?: string }) {
  const reduce = useReducedMotion();
  const offset = useSpring(REST, { stiffness: 220, damping: 16, mass: 0.6 });
  const transform = useTransform(offset, (v) => `translate(${v}em, ${v * 0.85}em)`);

  return (
    <h1
      id={id}
      className={`${s.serif} ${s.ink} ${className}`}
      onPointerEnter={() => {
        if (!reduce) offset.set(HOVER);
      }}
      onPointerLeave={() => {
        if (!reduce) offset.set(REST);
      }}
    >
      {text}
      <motion.span aria-hidden="true" className={s.inkLayer} style={reduce ? undefined : { transform }}>
        {text}
      </motion.span>
    </h1>
  );
}
