"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { complementary, solutions } from "../../content";
import {
  AiVisual,
  CodeVisual,
  FindingsVisual,
  HttpVisual,
  LayersVisual,
  RadarVisual,
  type VisualProps,
} from "./visuals";

const visualFor: Record<string, ComponentType<VisualProps>> = {
  easm: RadarVisual,
  appsec: HttpVisual,
  va: FindingsVisual,
  engineering: LayersVisual,
  "ai-research": AiVisual,
};

function Cell({
  className = "",
  visualClass,
  Visual,
  children,
  layout = "stack",
}: {
  className?: string;
  visualClass: string;
  Visual: ComponentType<VisualProps>;
  children: ReactNode;
  layout?: "stack" | "row";
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion() ?? false;
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (inView) setRun((r) => r + 1);
  }, [inView]);

  return (
    <li
      ref={ref}
      onMouseEnter={() => !reduce && setRun((r) => r + 1)}
      className={`relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-(--tinta)/10 bg-white p-2 transition-colors duration-500 hover:border-(--cobalto)/40 ${
        layout === "row" ? "lg:flex-row lg:items-stretch" : ""
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className={`relative overflow-hidden rounded-[14px] bg-(--nieve) ring-1 ring-inset ring-(--tinta)/5 ${visualClass}`}
      >
        <Visual active={inView} run={run} reduce={reduce} />
        {/* El radar ya lleva su propia nota; el resto de visuales la necesitan para no leerse como producto. */}
        {Visual !== RadarVisual && (
          <p className="absolute bottom-2 right-3 text-[11px] text-(--gris)">Ejemplo ilustrativo</p>
        )}
      </div>
      <div
        className={`flex flex-col px-4 pb-5 pt-5 sm:px-5 ${
          layout === "row" ? "lg:order-first lg:flex-1 lg:justify-center lg:py-8 lg:pr-10" : ""
        }`}
      >
        {children}
      </div>
    </li>
  );
}

// Bento en 4 columnas (lg): la superficie externa, el núcleo de StateX, ocupa 2×2.
export function SolutionBento() {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {solutions.map((s) => {
        const Visual = visualFor[s.id] ?? FindingsVisual;
        const lead = s.id === "easm";
        return (
          <Cell
            key={s.id}
            className={lead ? "md:col-span-2 lg:row-span-2" : ""}
            Visual={Visual}
            visualClass={lead ? "min-h-[20rem] flex-1 p-5 sm:p-7 lg:min-h-[24rem]" : "h-48"}
          >
            <h3
              className={`font-semibold tracking-[-0.03em] text-(--tinta) ${
                lead ? "text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.05]" : "text-[19px] leading-[1.2]"
              }`}
              lang="en"
            >
              {s.name}
            </h3>
            <p className="mt-1.5 text-[14px] font-medium text-(--cobalto)">{s.short}</p>
            <p
              className={`mt-2.5 text-(--gris) ${lead ? "max-w-[46ch] text-[17px] leading-[1.55]" : "text-[15px] leading-[1.55]"}`}
            >
              {s.text}
            </p>
          </Cell>
        );
      })}
      <Cell
        className="md:col-span-2 lg:col-span-4"
        Visual={CodeVisual}
        visualClass="h-48 lg:h-auto lg:min-h-[13rem] lg:w-[52%] lg:shrink-0"
        layout="row"
      >
        <p className="text-[14px] font-medium text-(--cobalto)">{complementary.label}</p>
        <h3 className="mt-2 text-[clamp(1.35rem,2vw,1.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-(--tinta)">
          {complementary.name}
        </h3>
        <p className="mt-2.5 max-w-[48ch] text-[15px] leading-[1.55] text-(--gris)">{complementary.text}</p>
      </Cell>
    </ul>
  );
}
