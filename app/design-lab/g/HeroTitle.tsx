import type { CSSProperties } from "react";
import { serif, splitLines } from "./parts";

/**
 * H1 del hero. Cada línea arranca tapada por una barra de censura que se retira
 * (origen alternado). Todo es CSS (`editorial.css`): las barras solo se pintan si hay
 * scripting y movimiento permitido, así que sin JS o con reduced motion el texto se ve.
 */
export function HeroTitle({ title }: { title: string }) {
  const lines = splitLines(title, 3);
  return (
    <h1
      id="hero-title"
      className={`${serif} text-[clamp(2.9rem,9.2vw,9rem)] leading-[0.9] tracking-[-0.02em]`}
    >
      {lines.map((line, i) => (
        <span key={line} className="relative block w-fit max-w-full pb-[0.04em]">
          {line}
          {i < lines.length - 1 ? " " : ""}
          <span
            aria-hidden="true"
            className="ed-bar ed-bar--intro inset-x-[-0.06em] top-[0.12em] bottom-[0.02em]"
            style={{ "--ed-delay": `${0.3 + i * 0.22}s`, "--ed-origin": i % 2 === 0 ? "right" : "left" } as CSSProperties}
          />
        </span>
      ))}
    </h1>
  );
}
