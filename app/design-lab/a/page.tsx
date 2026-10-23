import type { CSSProperties } from "react";
import { Hanken_Grotesk } from "next/font/google";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  about,
  approach,
  brand,
  complementary,
  contact,
  cta,
  footer,
  hero,
  problem,
  research,
  sampleAssets,
  sections,
  solutions,
  technology,
} from "../content";
import { LabBar } from "../_shared/LabBar";
import { Header } from "./Header";
import { HeroX } from "./HeroX";
import { CellRule, Logo, StepGlyph, XMatrix } from "./Mark";
import { A } from "./x";
import { Pending, SectionHead, focus, focusOnInk, grid12, shell } from "./ui";

export const metadata = { title: "Concept A" };

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-a",
  display: "swap",
});

const tokens = {
  "--ink": A.ink,
  "--gray": A.gray,
  "--line": A.line,
  "--teal": A.teal,
  "--teal-on-ink": A.tealOnInk,
  "--gray-on-ink": A.grayOnInk,
} as CSSProperties;

// Los cuatro riesgos bajan en diagonal, como un trazo de la X.
const stair = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3", "lg:col-start-4"];

// Línea temporal: una celda por año entre el primer y el último hito.
const firstYear = Number(about.timeline[0].year);
const lastYear = Number(about.timeline[about.timeline.length - 1].year);
const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
const eventYears = new Set(about.timeline.map((t) => Number(t.year)));
// Posición de cada hito en la retícula de años (dos alturas para que 2012 y 2013 no choquen).
const tlPlace = [
  "lg:col-start-1 lg:col-span-5 lg:row-start-1",
  "lg:col-start-2 lg:col-span-5 lg:row-start-2",
  "lg:col-start-7 lg:col-span-5 lg:row-start-1",
  "lg:col-start-11 lg:col-span-5 lg:row-start-2 lg:text-right",
];

const sectionPad = "scroll-mt-20 py-24 sm:py-32 lg:py-40";

export default function ConceptA() {
  const title = hero.title.replace(/\.$/, "");
  return (
    <div
      id="top"
      style={tokens}
      className={`${hanken.variable} min-h-screen overflow-x-clip bg-white font-(family-name:--font-a) text-(--ink) antialiased selection:bg-(--teal) selection:text-white`}
    >
      <a
        href="#main"
        className="sr-only z-[60] bg-(--ink) px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="main">
        {/* ——— Hero ——— */}
        <section aria-labelledby="hero-title" className={`${shell} pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28`}>
          <div className={`${grid12} gap-y-10 lg:gap-y-12`}>
            <h1
              id="hero-title"
              className="text-[clamp(2.6rem,0.9rem+5.4vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-balance lg:col-span-7 lg:row-start-1"
            >
              {title}
              <span aria-hidden="true" className="ml-[0.05em] inline-block size-[0.15em] bg-(--teal)" />
              <span className="sr-only">.</span>
            </h1>

            <div className="lg:col-span-6 lg:row-start-2">
              <p className="max-w-[46ch] text-[18px] leading-[1.55] text-(--gray) sm:text-[20px]">{hero.body}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contacto"
                  className={`inline-flex min-h-14 items-center bg-(--ink) px-6 text-[16px] font-semibold text-white transition-colors hover:bg-(--teal) ${focus}`}
                >
                  {cta.primary}
                </a>
                <a
                  href="#soluciones"
                  className={`inline-flex min-h-14 items-center border border-(--ink) px-6 text-[16px] font-semibold text-(--ink) transition-colors hover:bg-(--ink) hover:text-white ${focus}`}
                >
                  {cta.explore}
                </a>
              </div>
            </div>

            <figure className="mx-auto w-full max-w-[34rem] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
              <HeroX />
              <figcaption className="mt-5 flex items-start gap-2.5 border-t border-(--line) pt-4 text-[14px] leading-snug text-(--gray)">
                <span aria-hidden="true" className="mt-[0.3em] size-2 shrink-0 bg-(--teal)" />
                <span>
                  <strong className="font-semibold text-(--ink)">Ejemplo ilustrativo.</strong> Acerca el cursor o toca la X
                  para ver activos de muestra con dominios reservados y rangos de documentación.
                </span>
              </figcaption>
              <ul className="sr-only">
                {sampleAssets.map((a) => (
                  <li key={a.host}>
                    {a.host}: {a.kind}, riesgo {a.level}
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        </section>

        <div className={shell}>
          <CellRule />
        </div>

        {/* ——— Problema ——— */}
        <section id="problema" aria-labelledby="problema-t" className={`${shell} ${sectionPad}`}>
          <SectionHead id="problema-t" k="problem" title={problem.title} intro={problem.intro} />
          <ul className="mt-16 lg:mt-24">
            {problem.risks.map((r, i) => (
              <li key={r.name} className={`${grid12} gap-y-3 border-t border-(--line) py-8 last:border-b lg:py-10`}>
                <h3
                  className={`text-[clamp(1.75rem,0.9rem+2.9vw,3.75rem)] font-bold leading-[1] tracking-[-0.04em] text-balance lg:col-span-6 ${stair[i]}`}
                >
                  {r.name}
                </h3>
                <p className="max-w-[44ch] text-[17px] leading-[1.55] text-(--gray) lg:col-span-3 lg:col-start-10 lg:pt-1.5">{r.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ——— Enfoque ——— */}
        <section id="enfoque" aria-labelledby="enfoque-t" className={`border-t border-(--line) ${shell} ${sectionPad}`}>
          <SectionHead id="enfoque-t" k="approach" title={approach.title} intro={approach.intro} />
          <ol className="relative mt-16 grid gap-10 lg:mt-24 lg:grid-cols-5 lg:gap-8">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-5 w-px bg-(--line) lg:hidden" />
            <span aria-hidden="true" className="absolute top-5 right-0 left-0 hidden h-px bg-(--line) lg:block" />
            {approach.steps.map((s, i) => (
              <li key={s.name} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 lg:block">
                <div className="relative z-10 size-10 bg-white shadow-[0_0_0_10px_white]">
                  <StepGlyph step={i + 1} total={approach.steps.length} className="size-10" />
                </div>
                <div className="lg:mt-8">
                  <h3 className="text-[22px] font-bold leading-tight tracking-[-0.025em]">
                    <span className="mr-2 font-semibold text-(--gray) tabular-nums">{i + 1}</span>
                    {s.name}
                  </h3>
                  <p className="mt-2.5 max-w-[40ch] text-[16px] leading-[1.55] text-(--gray)">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ——— Soluciones ——— */}
        <section id="soluciones" aria-labelledby="soluciones-t" className={`border-t border-(--line) ${shell} ${sectionPad}`}>
          <SectionHead id="soluciones-t" k="solutions" title={sections.solutions} />
          <div className={`${grid12} mt-16 lg:mt-24`}>
            <ul className="lg:col-span-9 lg:col-start-4">
              {solutions.map((s) => (
                <li
                  key={s.id}
                  className="grid gap-3 border-t border-(--line) py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:gap-10"
                >
                  <h3 lang="en" className="text-[clamp(1.5rem,1.05rem+1.5vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-balance">
                    {s.name}
                  </h3>
                  <p className="text-[17px] leading-[1.55] text-(--gray) md:pt-1">
                    <strong className="font-semibold text-(--ink)">{s.short}.</strong> {s.text}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 lg:col-span-9 lg:col-start-4">
              <CellRule />
              <div className="grid gap-3 pt-10 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:gap-10">
                <div>
                  <p className="text-[15px] font-semibold text-(--teal)">{complementary.label}</p>
                  <h3 className="mt-2 text-[clamp(1.375rem,1.05rem+1vw,2rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                    {complementary.name}
                  </h3>
                </div>
                <p className="text-[17px] leading-[1.55] text-(--gray) md:pt-8">{complementary.text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ——— Tecnología ——— */}
        <section id="tecnologia" aria-labelledby="tecnologia-t" className={`border-t border-(--line) ${shell} ${sectionPad}`}>
          <SectionHead id="tecnologia-t" k="technology" title={technology.title} intro={technology.intro} />
          <div className={`${grid12} mt-16 gap-y-8 lg:mt-24`}>
            <div className="border-t-4 border-(--ink) pt-8 lg:col-span-6">
              <h3 className="flex items-center gap-3 text-[22px] font-bold tracking-[-0.025em]">
                <span aria-hidden="true" className="size-3.5 bg-(--teal)" />
                {technology.today.label}
              </h3>
              <ul className="mt-8 grid gap-5">
                {technology.today.items.map((it) => (
                  <li key={it} className="flex gap-4 text-[18px] leading-[1.5]">
                    <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 bg-(--ink)" />
                    {it}
                  </li>
                ))}
              </ul>
              <Pending className="mt-9">{technology.today.pending}</Pending>
            </div>

            <div
              className="border-2 border-dashed border-(--gray) p-6 sm:p-8 lg:col-span-6"
              style={{
                backgroundImage: "repeating-linear-gradient(135deg, transparent 0 11px, #F2F3F5 11px 12px)",
              }}
            >
              <h3 className="flex items-center gap-3 text-[22px] font-bold tracking-[-0.025em] text-(--ink)">
                <span aria-hidden="true" className="size-3.5 border-2 border-(--gray)" />
                {technology.roadmap.label}
              </h3>
              <ul className="mt-8 grid gap-5">
                {technology.roadmap.items.map((it) => (
                  <li key={it} className="flex gap-4 text-[18px] leading-[1.5] text-(--gray)">
                    <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 border border-(--gray)" />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-9 border-t border-dashed border-(--gray) pt-5 text-[15px] font-semibold text-(--ink)">
                {technology.roadmap.note}
              </p>
            </div>
          </div>
        </section>

        {/* ——— Investigación ——— */}
        <section id="investigacion" aria-labelledby="investigacion-t" className={`border-t border-(--line) ${shell} ${sectionPad}`}>
          <SectionHead id="investigacion-t" k="research" title={research.title} intro={research.intro} />
          <ul className="mt-16 lg:mt-24">
            {research.archive.map((a) => (
              <li key={a.name} className={`${grid12} gap-y-3 border-t border-(--line) py-9`}>
                <p className="text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold tracking-[-0.03em] text-(--gray) tabular-nums lg:col-span-3">
                  {a.years}
                </p>
                <h3 className="lg:col-span-4">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-start gap-1.5 text-[clamp(1.75rem,1.2rem+1.9vw,3rem)] leading-none font-extrabold tracking-[-0.04em] underline decoration-(--line) decoration-2 underline-offset-[0.14em] transition-colors hover:decoration-(--teal) ${focus}`}
                  >
                    {a.name}
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={2.25}
                      className="mt-[0.06em] size-[0.55em] shrink-0 text-(--teal) transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </h3>
                <p className="max-w-[48ch] text-[17px] leading-[1.55] text-(--gray) lg:col-span-5">{a.text}</p>
              </li>
            ))}
            <li className={`${grid12} gap-y-3 border-y border-(--line) py-9`}>
              <div aria-hidden="true" className="hidden lg:col-span-3 lg:block" />
              <h3 className="text-[clamp(1.75rem,1.2rem+1.9vw,3rem)] leading-none font-extrabold tracking-[-0.04em] lg:col-span-4">
                {research.lab.name}
              </h3>
              <div className="lg:col-span-5">
                <p className="text-[17px] leading-[1.55] text-(--gray)">{research.lab.text}</p>
                <Pending className="mt-4">{research.lab.pending}</Pending>
              </div>
            </li>
          </ul>

          <div className={`${grid12} mt-14 gap-y-5`}>
            <h3 className="text-[15px] font-semibold lg:col-span-3">Temas del archivo</h3>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:col-span-9">
              {research.topics.map((t) => (
                <li key={t} className="flex gap-3 text-[18px] leading-snug">
                  <span aria-hidden="true" className="mt-[0.5em] size-1.5 shrink-0 bg-(--teal)" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— Sobre ——— */}
        <section id="sobre" aria-labelledby="sobre-t" className={`border-t border-(--line) ${shell} ${sectionPad}`}>
          <SectionHead id="sobre-t" k="about" title={about.title} />
          <div className={`${grid12} mt-10`}>
            <p className="max-w-[56ch] text-[19px] leading-[1.6] sm:text-[21px] lg:col-span-7 lg:col-start-4">{about.text}</p>
          </div>

          <div className="mt-16 lg:mt-24">
            <div
              aria-hidden="true"
              className="grid gap-1 sm:gap-1.5"
              style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}
            >
              {years.map((y) => (
                <div
                  key={y}
                  className={`aspect-square ${
                    y === lastYear ? "bg-(--teal)" : eventYears.has(y) ? "bg-(--ink)" : "border border-(--line)"
                  }`}
                />
              ))}
            </div>
            <div aria-hidden="true" className="mt-2 flex justify-between text-[13px] font-medium text-(--gray) tabular-nums">
              <span>{firstYear}</span>
              <span>{lastYear}</span>
            </div>
            <ol
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-[repeat(15,minmax(0,1fr))] lg:gap-x-1.5 lg:gap-y-8"
            >
              {about.timeline.map((t, i) => (
                <li key={t.year} className={tlPlace[i]}>
                  <p className="text-[28px] font-extrabold leading-none tracking-[-0.04em] tabular-nums">{t.year}</p>
                  <p className="mt-2 max-w-[30ch] text-[16px] leading-[1.5] text-(--gray) lg:inline-block">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <Pending className="mt-14">{about.pending}</Pending>
        </section>

        {/* ——— Contacto ——— */}
        <section
          id="contacto"
          aria-labelledby="contacto-t"
          className="relative isolate scroll-mt-16 overflow-hidden bg-(--ink) text-white"
        >
          <XMatrix
            n={20}
            on="#191B20"
            grid="#15171B"
            className="pointer-events-none absolute -right-[18%] -bottom-[30%] -z-10 w-[min(70rem,120vw)] sm:-right-[10%]"
          />
          <div className={`${shell} py-24 sm:py-32 lg:py-40`}>
            <SectionHead id="contacto-t" k="contact" title={contact.title} dark />
            <div className={`${grid12} mt-16 gap-y-12 lg:mt-24`}>
              {[contact.primary, contact.secondary].map((c, i) => (
                <div
                  key={c.label}
                  className={`flex flex-col border-t border-white/25 pt-8 lg:col-span-4 ${i === 0 ? "lg:col-start-4" : "lg:col-start-9"}`}
                >
                  <h3 className="text-[clamp(1.5rem,1.1rem+1.2vw,2.125rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
                    {c.label}
                  </h3>
                  <p className="mt-4 max-w-[40ch] flex-1 text-[17px] leading-[1.55] text-(--gray-on-ink)">{c.text}</p>
                  <button
                    type="button"
                    aria-describedby="contacto-pendiente"
                    className={`mt-8 inline-flex min-h-14 items-center self-start px-6 text-[16px] font-semibold transition-colors ${focusOnInk} ${
                      i === 0
                        ? "bg-(--teal) text-white hover:bg-white hover:text-(--ink)"
                        : "border border-white/70 text-white hover:border-white hover:bg-white hover:text-(--ink)"
                    }`}
                  >
                    {c.cta}
                  </button>
                </div>
              ))}
              <div className="lg:col-span-9 lg:col-start-4">
                <Pending id="contacto-pendiente" dark>
                  {contact.pending}
                </Pending>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${shell} pt-16 pb-28`}>
        <div className={`${grid12} gap-y-8`}>
          <div className="lg:col-span-3">
            <Logo className="text-[32px]" />
          </div>
          <p className="max-w-[30ch] text-[20px] font-semibold leading-snug tracking-[-0.02em] lg:col-span-5 lg:col-start-4">
            {brand.tagline}
          </p>
          <div className="grid content-start gap-2 text-[14px] text-(--gray) lg:col-span-4 lg:justify-items-end">
            <p>
              © {footer.year} {brand.name}
            </p>
            <p>{footer.legal}</p>
            <Link href="/design-lab/a/marca" className={`font-semibold text-(--ink) underline underline-offset-4 ${focus}`}>
              Identidad visual
            </Link>
          </div>
        </div>
      </footer>

      <LabBar current="a" />
    </div>
  );
}
