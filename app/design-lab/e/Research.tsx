import { ExternalLink } from "lucide-react";
import { research, sections } from "../content";
import { PressLink } from "./Press";
import s from "./e.module.css";

// Investigación (pieza traída de Concept G, reinterpretada en neo-brutalismo):
// retícula de años con una fila por proyecto + cabeceras de publicación del archivo real.

const START = 2012;
const END = 2026;
const YEARS = Array.from({ length: END - START + 1 }, (_, i) => START + i);

const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
const monoLabel = "font-[family-name:var(--e-mono)] text-[13px] leading-none";
const hardShadow = "shadow-[6px_6px_0_0_#000]";

// "2012 – 2018" es un rango continuo; "2013 y 2016" son años sueltos.
function activeYears(label: string): number[] {
  const nums = label.match(/\d{4}/g)?.map(Number) ?? [];
  if (nums.length === 2 && /–|-/.test(label)) {
    return YEARS.filter((y) => y >= nums[0] && y <= nums[1]);
  }
  return nums;
}

const host = (url: string) => new URL(url).host;

const rows = [
  ...research.archive.map((a, i) => ({
    name: a.name,
    years: activeYears(a.years),
    fill: i === 0 ? "bg-black" : "bg-[var(--e-lilac)]",
    dashed: false,
  })),
  { name: research.lab.name, years: [END], fill: "bg-[var(--e-cobalt)]", dashed: true },
];

export function Research() {
  return (
    <section id="investigacion" aria-labelledby="e-investigacion" className="scroll-mt-4 border-b-[3px] border-black">
      <div className={`${wrap} py-20 lg:py-28`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className={`${monoLabel} m-0 inline-block border-[3px] border-black bg-black px-3 py-2 text-white`}>{sections.research}</p>
            <h2 id="e-investigacion" className={`${s.display} ${s.h2} m-0 mt-6 max-w-[16ch]`}>
              {research.title}
            </h2>
          </div>
          <p className="m-0 max-w-[46ch] text-[clamp(1.125rem,1.6vw,1.3rem)] leading-[1.45] lg:col-span-5">{research.intro}</p>
        </div>

        {/* Retícula de años: una fila por proyecto, una celda por año */}
        <figure className="m-0 mt-14">
          <figcaption className="sr-only">
            Cronología: {research.archive.map((a) => `${a.name}, ${a.years}`).join("; ")}; {research.lab.name}, {END}.
          </figcaption>
          <div aria-hidden="true" className="overflow-x-auto">
            <div className="min-w-[760px] border-l-[3px] border-t-[3px] border-black bg-white">
              <div className="grid grid-cols-[9rem_repeat(15,minmax(0,1fr))]">
                <div className="border-b-[3px] border-r-[3px] border-black" />
                {YEARS.map((y) => (
                  <div key={y} className={`${monoLabel} border-b-[3px] border-r-[3px] border-black px-1 py-2 text-center text-[12px]`}>
                    {String(y).slice(2)}
                  </div>
                ))}
              </div>
              {rows.map((r) => (
                <div key={r.name} className="grid grid-cols-[9rem_repeat(15,minmax(0,1fr))]">
                  <div className={`${s.display} border-b-[3px] border-r-[3px] border-black px-3 py-3 text-[1.05rem] leading-none`}>{r.name}</div>
                  {YEARS.map((y) => (
                    <div key={y} className="border-b-[3px] border-r-[3px] border-black p-1.5">
                      {r.years.includes(y) && (
                        <span className={`block h-full min-h-6 ${r.fill} ${r.dashed ? "border-[3px] border-dashed border-black" : ""}`} />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className={`${monoLabel} m-0 mt-3 text-[12px]`}>Años con publicaciones en el archivo. 2026: relanzamiento.</p>
        </figure>

        {/* Cabeceras de publicación */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {research.archive.map((a, i) => {
            const dark = i === 1;
            return (
              <article
                key={a.name}
                aria-labelledby={`e-archivo-${i}`}
                className={`flex flex-col border-[3px] border-black p-6 sm:p-8 ${
                  dark ? "bg-black text-[var(--e-concrete)] lg:col-span-5" : `bg-white lg:col-span-7 ${hardShadow}`
                }`}
              >
                <div className={`${monoLabel} flex flex-wrap justify-between gap-2 border-b-[3px] pb-3 ${dark ? "border-[var(--e-concrete)]" : "border-black"}`}>
                  <span>{host(a.url)}</span>
                  <span>{a.years}</span>
                </div>
                <h3
                  id={`e-archivo-${i}`}
                  className={`${s.display} m-0 mt-6 break-words leading-[0.85] ${
                    dark ? "text-[clamp(2.6rem,5.5vw,4.5rem)]" : "text-[clamp(3rem,8vw,7rem)]"
                  }`}
                >
                  {a.name}
                </h3>
                <p className="m-0 mt-5 max-w-[44ch] flex-1 text-[18px]">{a.text}</p>
                <PressLink
                  href={a.url}
                  external
                  shadowColor={dark ? "#2E4BFF" : "#000000"}
                  className={`mt-8 min-h-12 self-start px-5 text-[16px] ${dark ? "bg-[var(--e-lilac)] text-black" : "bg-[var(--e-mint)] text-black"}`}
                >
                  Abrir {a.name}
                  <ExternalLink size={16} strokeWidth={2.5} aria-hidden="true" className="ml-2" />
                  <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </PressLink>
              </article>
            );
          })}
        </div>

        {/* Temas del archivo + StateX Lab */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className={`${monoLabel} m-0 text-[14px] font-medium`}>{research.topicsLabel}</h3>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-3 p-0">
              {research.topics.map((t) => (
                <li key={t} className="border-[3px] border-black bg-white px-3 py-2 font-semibold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className={`border-[3px] border-black bg-[var(--e-lilac)] p-6 sm:p-8 lg:col-span-5 ${hardShadow}`}>
            <h3 className={`${s.display} m-0 text-[clamp(1.8rem,3vw,2.5rem)]`}>{research.lab.name}</h3>
            <p className="m-0 mt-3 text-[18px]">{research.lab.text}</p>
            <p className={`${s.pending} m-0 mt-6`}>{research.lab.pending}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
