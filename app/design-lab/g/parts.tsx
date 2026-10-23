import type { CSSProperties, ReactNode } from "react";

// Piezas de servidor compartidas por la homepage y la identidad de Concept G.

export const gutter = "mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--red)";

export const mono = "font-(family-name:--f-mono)";
export const serif = "font-(family-name:--f-serif)";

// --archive (#6B6E68) solo para filetes; --archive-ink (#575A54, 5,8:1 sobre papel) para texto.
export const tokens = {
  "--paper": "#E9EAE6",
  "--ink": "#111111",
  "--red": "#D7261E",
  "--archive": "#6B6E68",
  "--archive-ink": "#575A54",
  "--card": "#F7F7F4",
} as CSSProperties;

// Grano de papel muy sutil (ruido SVG en línea, sin peticiones externas).
export const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Cursor de bloque rojo. Decorativo. */
export function Cursor({ blink = true, className = "" }: { blink?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[0.72em] w-[0.42em] translate-y-[0.04em] bg-(--red) ${blink ? "ed-cursor" : ""} ${className}`}
    />
  );
}

/** Logotipo tipográfico: StateX en serif seguido del cursor. */
export function Wordmark({ className = "", blink = true }: { className?: string; blink?: boolean }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.08em] ${serif} leading-none tracking-[-0.01em] ${className}`}>
      StateX
      <Cursor blink={blink} />
    </span>
  );
}

/** Hueco de contenido real pendiente: siempre visible, nunca disimulado. */
export function Pending({ children, dark = false, id }: { children: ReactNode; dark?: boolean; id?: string }) {
  return (
    <p
      id={id}
      className={`inline-block border border-dashed px-3 py-2 ${mono} text-[13px] leading-snug ${
        dark ? "border-[#8A8C86] text-[#C9CBC5]" : "border-(--archive) text-(--archive-ink)"
      }`}
    >
      {children}
    </p>
  );
}

/** Línea de prompt. El texto de la orden es decorativo: repite el ancla de la sección. */
export function Prompt({ cmd, dark = false, className = "" }: { cmd: string; dark?: boolean; className?: string }) {
  return (
    <p aria-hidden="true" className={`${mono} text-[13px] ${dark ? "text-[#C9CBC5]" : "text-(--archive-ink)"} ${className}`}>
      <span className={dark ? "text-[#F7F7F4]" : "text-(--ink)"}>~/statex</span> $ {cmd}
    </p>
  );
}

/**
 * Cabecera de sección: filete grueso, h2 (de `sections`) y la orden `cd` que lleva a su ancla.
 * Debajo, el titular editorial de la sección en serif grande.
 */
export function SectionHead({
  id,
  name,
  title,
  intro,
  dark = false,
}: {
  id: string;
  name: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className={`border-t-2 pt-3 ${dark ? "border-[#F7F7F4]" : "border-(--ink)"}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id={`${id}-title`} className={`${serif} text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none`}>
          {name}
        </h2>
        <Prompt cmd={`cd ${id}`} dark={dark} />
      </div>
      <div className="mt-[clamp(2rem,5vw,4rem)] grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
        <p
          className={`${serif} text-[clamp(2.6rem,6.6vw,6.25rem)] leading-[0.94] tracking-[-0.015em] text-balance lg:col-span-8 ${
            dark ? "text-white" : ""
          }`}
        >
          {title}
        </p>
        {intro && (
          <p className={`max-w-[46ch] text-[1.05rem] leading-[1.65] text-pretty lg:col-span-4 ${dark ? "text-[#E3E4DF]" : ""}`}>
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}

/** Corta el titular en `n` líneas de longitud parecida, sin dejar palabras cortas colgando. */
export function splitLines(text: string, n: number): string[] {
  const words = text.split(" ");
  if (words.length <= n) return words;
  let best: string[] = [text];
  let bestCost = Infinity;
  const mean = text.length / n;
  const walk = (start: number, acc: string[]) => {
    if (acc.length === n - 1) {
      const lines = [...acc, words.slice(start).join(" ")];
      let cost = lines.reduce((c, l) => c + (l.length - mean) ** 2, 0);
      lines.slice(0, -1).forEach((l) => {
        if ((l.split(" ").at(-1) ?? "").length <= 3) cost += 60;
      });
      if (cost < bestCost) {
        bestCost = cost;
        best = lines;
      }
      return;
    }
    for (let end = start + 1; end < words.length - (n - 1 - acc.length) + 1; end++) {
      walk(end, [...acc, words.slice(start, end).join(" ")]);
    }
  };
  walk(0, []);
  return best;
}
