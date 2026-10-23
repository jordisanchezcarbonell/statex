import type { sampleAssets } from "../../content";

export type Level = (typeof sampleAssets)[number]["level"];

const chip: Record<Level, string> = {
  alto: "bg-(--signal) text-(--navy)",
  medio: "bg-(--navy)/[0.07] text-(--navy) ring-1 ring-inset ring-(--navy)/15",
  bajo: "text-(--muted) ring-1 ring-inset ring-(--edge)",
};

/** Nivel ilustrativo (bajo/medio/alto). Nunca puntuaciones inventadas. */
export function LevelChip({ level, withLabel = false }: { level: Level; withLabel?: boolean }) {
  return (
    <span
      className={`inline-flex h-5 items-center rounded-[5px] px-1.5 font-(family-name:--f-mono) text-[11.5px] leading-none font-medium ${chip[level]}`}
    >
      <span className={withLabel ? "" : "sr-only"}>nivel&nbsp;</span>
      {level}
    </span>
  );
}

const dot: Record<Level, string> = {
  alto: "bg-(--signal) ring-2 ring-(--navy)",
  medio: "bg-white ring-2 ring-(--navy)",
  bajo: "bg-(--fog) ring-2 ring-(--edge)",
};

export function LevelDot({ level, className = "" }: { level: Level; className?: string }) {
  return <span aria-hidden="true" className={`block size-2.5 rounded-full ${dot[level]} ${className}`} />;
}
