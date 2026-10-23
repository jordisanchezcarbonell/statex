import Link from "next/link";
import { DIRECTIONS } from "../directions";

// Barra flotante y neutral para saltar entre conceptos. No forma parte de ningún diseño.
export function LabBar({ current }: { current: string }) {
  const i = DIRECTIONS.findIndex((d) => d.slug === current);
  const prev = DIRECTIONS[(i - 1 + DIRECTIONS.length) % DIRECTIONS.length];
  const next = DIRECTIONS[(i + 1) % DIRECTIONS.length];
  const here = DIRECTIONS[i];
  const item = "inline-flex min-h-9 items-center justify-center rounded-full hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <nav
      aria-label="Design lab"
      className="fixed bottom-[max(14px,env(safe-area-inset-bottom))] left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-0.5 whitespace-nowrap rounded-full bg-zinc-900/90 p-1 font-sans text-[13px] font-medium text-zinc-50 shadow-[0_6px_24px_rgba(0,0,0,0.25)] backdrop-blur"
    >
      <Link href="/design-lab" className={`${item} bg-white/10 px-3.5`}>Design lab</Link>
      <Link href={`/design-lab/${prev.slug}`} className={`${item} w-9 text-xl`} aria-label={`Anterior: Concept ${prev.letter}`}>‹</Link>
      <span className="min-w-[6.5em] px-2 text-center" title={here.name}>Concept {here.letter}</span>
      <Link href={`/design-lab/${next.slug}`} className={`${item} w-9 text-xl`} aria-label={`Siguiente: Concept ${next.letter}`}>›</Link>
    </nav>
  );
}
