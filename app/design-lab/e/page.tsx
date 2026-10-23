import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import { ExternalLink } from "lucide-react";
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
  sections,
  solutions,
  technology,
} from "../content";
import { LabBar } from "../_shared/LabBar";
import { Header } from "./Header";
import { HeroStack, PressButton, PressLink } from "./Press";
import s from "./e.module.css";

export const metadata: Metadata = { title: "Concept E" };

const sans = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  variable: "--e-sans",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--e-mono",
  display: "swap",
});

const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
const monoLabel = "font-[family-name:var(--e-mono)] text-[13px] leading-none";
const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--e-cobalt)]";
const lead = `${s.display} m-0 mt-6 max-w-[22ch] text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[0.98]`;
const hardShadow = "shadow-[6px_6px_0_0_#000]";

// Celdas del bento: la primera en Cobalto y a doble ancho; el resto alterna blanco/Lila/Menta.
const cellTone = [
  "bg-[var(--e-cobalt)] text-white md:col-span-2",
  "bg-white",
  "bg-[var(--e-lilac)]",
  "bg-[var(--e-mint)]",
  "bg-white",
];

export default function ConceptE() {
  return (
    <div className={`${s.root} ${sans.variable} ${mono.variable} min-h-dvh`}>
      <a
        href="#contenido"
        className="sr-only z-50 border-[3px] border-black bg-white px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido" className="scroll-mt-4">
        {/* Hero */}
        <section aria-labelledby="e-hero" className="border-b-[3px] border-black">
          <div className={`${wrap} pb-20 pt-12 sm:pt-16 lg:pb-28 lg:pt-20`}>
            <h1 id="e-hero" className={`${s.display} ${s.h1} m-0 max-w-[15ch]`}>
              {hero.title}
            </h1>
            <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="m-0 max-w-[46ch] text-[19px] leading-[1.5]">{hero.body}</p>
                <div className="mt-9 flex flex-wrap gap-5">
                  <PressLink href="#contacto" className="min-h-12 bg-[var(--e-cobalt)] px-5 text-[17px] text-white">
                    {cta.primary}
                  </PressLink>
                  <PressLink href="#soluciones" className="min-h-12 bg-white px-5 text-[17px] text-black">
                    {cta.explore}
                  </PressLink>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <HeroStack />
              </div>
            </div>
          </div>
        </section>

        {/* Problema */}
        <section id="problema" aria-labelledby="e-problema" className="scroll-mt-4 border-b-[3px] border-black">
          <div className={`${wrap} py-20 lg:py-28`}>
            <div className="bg-black p-8 text-[var(--e-concrete)] sm:p-12 lg:p-16">
              <h2 id="e-problema" className={`${s.display} ${s.h2} m-0`}>
                {sections.problem}
              </h2>
              <p className={lead}>{problem.title}</p>
              <p className="m-0 mt-8 max-w-[52ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.45]">{problem.intro}</p>
            </div>

            <ul className="m-0 mt-8 grid list-none grid-cols-1 border-l-[3px] border-t-[3px] border-black p-0 sm:grid-cols-2 lg:grid-cols-4">
              {problem.risks.map((r) => (
                <li key={r.name} className="border-b-[3px] border-r-[3px] border-black bg-white p-6 sm:p-7">
                  <h3 className={`${s.display} m-0 text-[1.5rem] leading-[1]`}>{r.name}</h3>
                  <p className="m-0 mt-3">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Enfoque */}
        <section id="enfoque" aria-labelledby="e-enfoque" className="scroll-mt-4 border-b-[3px] border-black bg-white">
          <div className={`${wrap} py-20 lg:py-28`}>
            <h2 id="e-enfoque" className={`${s.display} ${s.h2} m-0`}>
              {sections.approach}
            </h2>
            <p className={lead}>{approach.title}</p>
            <p className="m-0 mt-5 max-w-[52ch] text-[19px]">{approach.intro}</p>
            <ol className="m-0 mt-12 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3 xl:grid-cols-5">
              {approach.steps.map((m, i) => (
                <li key={m.name} className={`${s.step} border-[3px] border-black bg-[var(--e-concrete)] p-5 sm:p-6 xl:p-5`}>
                  <span aria-hidden="true" className={`${s.display} block text-[5.5rem] leading-[0.8]`}>
                    {i + 1}
                  </span>
                  <h3 className={`${s.display} m-0 mt-6 text-[1.4rem] leading-[1]`}>
                    <span className="sr-only">Paso {i + 1}: </span>
                    {m.name}
                  </h3>
                  <p className="m-0 mt-3">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Soluciones */}
        <section id="soluciones" aria-labelledby="e-soluciones" className="scroll-mt-4 border-b-[3px] border-black">
          <div className={`${wrap} py-20 lg:py-28`}>
            <h2 id="e-soluciones" className={`${s.display} ${s.h2} m-0 max-w-[14ch]`}>
              {sections.solutions}
            </h2>
            <ul className="m-0 mt-12 grid list-none grid-cols-1 border-l-[3px] border-t-[3px] border-black p-0 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map((sv, i) => (
                <li
                  key={sv.id}
                  className={`flex flex-col border-b-[3px] border-r-[3px] border-black p-6 sm:p-8 ${cellTone[i % cellTone.length]} ${
                    i === 0 ? "min-h-[20rem] justify-between lg:p-10" : "min-h-[16rem]"
                  }`}
                >
                  <span className={monoLabel}>{sv.short}</span>
                  <div className={i === 0 ? "mt-10" : "mt-8"}>
                    <h3
                      className={`${s.display} m-0 ${
                        i === 0 ? "max-w-[16ch] text-[clamp(2rem,4vw,3.5rem)]" : "text-[1.75rem] leading-[0.98]"
                      }`}
                    >
                      {sv.name}
                    </h3>
                    <p className={`m-0 mt-4 max-w-[52ch] ${i === 0 ? "text-[18px]" : ""}`}>{sv.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <aside
              aria-labelledby="e-complementario"
              className="mt-8 grid gap-4 border-[3px] border-dashed border-black p-6 sm:p-8 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className={`${monoLabel} md:col-span-3`}>{complementary.label}</span>
              <h3 id="e-complementario" className={`${s.display} m-0 text-[1.6rem] leading-[1] md:col-span-4`}>
                {complementary.name}
              </h3>
              <p className="m-0 max-w-[56ch] md:col-span-5">{complementary.text}</p>
            </aside>
          </div>
        </section>

        {/* Tecnología: hoy (bloque sólido con sombra) frente a visión (borde discontinuo, sin sombra) */}
        <section id="tecnologia" aria-labelledby="e-tecnologia" className="scroll-mt-4 border-b-[3px] border-black bg-white">
          <div className={`${wrap} py-20 lg:py-28`}>
            <h2 id="e-tecnologia" className={`${s.display} ${s.h2} m-0 max-w-[16ch]`}>
              {sections.technology}
            </h2>
            <p className={lead}>{technology.title}</p>
            <p className="m-0 mt-5 max-w-[52ch] text-[19px]">{technology.intro}</p>

            <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
              <article aria-labelledby="e-hoy" className={`border-[3px] border-black bg-[var(--e-mint)] p-6 sm:p-8 ${hardShadow}`}>
                <h3 id="e-hoy" className={`${s.display} m-0 inline-block bg-black px-3 py-2 text-[1.6rem] leading-[1] text-white`}>
                  {technology.today.label}
                </h3>
                <ul className="m-0 mt-8 grid list-none gap-5 p-0">
                  {technology.today.items.map((t) => (
                    <li key={t} className="grid grid-cols-[auto_1fr] gap-4">
                      <span aria-hidden="true" className="mt-[0.4em] block size-4 bg-black" />
                      <span className="text-[18px]">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className={`${s.pending} m-0 mt-8`}>{technology.today.pending}</p>
              </article>

              <article aria-labelledby="e-vision" className="border-[3px] border-dashed border-black bg-[var(--e-concrete)] p-6 sm:p-8">
                <h3
                  id="e-vision"
                  className={`${s.display} m-0 inline-block border-[3px] border-dashed border-black px-3 py-2 text-[1.6rem] leading-[1]`}
                >
                  {technology.roadmap.label}
                </h3>
                <ul className="m-0 mt-8 grid list-none gap-5 p-0">
                  {technology.roadmap.items.map((t) => (
                    <li key={t} className="grid grid-cols-[auto_1fr] gap-4">
                      <span aria-hidden="true" className="mt-[0.4em] block size-4 border-[3px] border-black" />
                      <span className="text-[18px]">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className={`${monoLabel} m-0 mt-8 border-t-[3px] border-dashed border-black pt-5 text-[14px] leading-[1.45]`}>
                  {technology.roadmap.note}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Investigación */}
        <section id="investigacion" aria-labelledby="e-investigacion" className="scroll-mt-4 border-b-[3px] border-black">
          <div className={`${wrap} grid gap-12 py-20 lg:grid-cols-12 lg:py-28`}>
            <div className="lg:col-span-4">
              <h2 id="e-investigacion" className={`${s.display} ${s.h2} m-0`}>
                {sections.research}
              </h2>
              <p className={lead}>{research.title}</p>
              <p className="m-0 mt-5 max-w-[46ch]">{research.intro}</p>
            </div>

            <div className="min-w-0 lg:col-span-8">
              <ul className="m-0 list-none border-t-[6px] border-black p-0">
                {research.archive.map((r) => (
                  <li
                    key={r.name}
                    className="grid grid-cols-[auto_1fr] gap-x-5 border-b-[6px] border-black py-6 sm:grid-cols-[auto_minmax(0,18rem)_1fr] sm:gap-x-8"
                  >
                    <span aria-hidden="true" className="mt-2 block size-4 bg-black" />
                    <div>
                      <h3 className={`${s.display} m-0 text-[1.6rem] leading-[1]`}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-baseline gap-2 underline decoration-[3px] underline-offset-[5px] hover:text-[var(--e-cobalt)] ${focus}`}
                        >
                          {r.name}
                          <ExternalLink size={18} strokeWidth={2.5} aria-hidden="true" className="self-center" />
                          <span className="sr-only"> (se abre en una pestaña nueva)</span>
                        </a>
                      </h3>
                      <p className={`${monoLabel} m-0 mt-3 inline-block border-2 border-black bg-white px-2 py-1`}>{r.years}</p>
                    </div>
                    <p className="col-start-2 m-0 mt-4 sm:col-start-3 sm:mt-0">{r.text}</p>
                  </li>
                ))}
              </ul>

              <h3 className={`${monoLabel} m-0 mt-10 text-[14px] font-medium`}>{research.topicsLabel}</h3>
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-3 p-0">
                {research.topics.map((t) => (
                  <li key={t} className="border-[3px] border-black bg-white px-3 py-2 font-semibold">
                    {t}
                  </li>
                ))}
              </ul>

              <div className={`mt-12 border-[3px] border-black bg-[var(--e-lilac)] p-6 sm:p-8 ${hardShadow}`}>
                <h3 className={`${s.display} m-0 text-[clamp(1.8rem,3vw,2.5rem)]`}>{research.lab.name}</h3>
                <p className="m-0 mt-3 text-[18px]">{research.lab.text}</p>
                <p className={`${s.pending} m-0 mt-6`}>{research.lab.pending}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre StateX */}
        <section id="sobre" aria-labelledby="e-sobre" className="scroll-mt-4 border-b-[3px] border-black bg-white">
          <div className={`${wrap} py-20 lg:py-28`}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 id="e-sobre" className={`${s.display} ${s.h2} m-0`}>
                  {sections.about}
                </h2>
                <p className={lead}>{about.title}</p>
              </div>
              <p className="m-0 max-w-[44ch] self-end text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.4] lg:col-span-6 lg:col-start-7">
                {about.text}
              </p>
            </div>

            <ol className="m-0 mt-16 grid list-none grid-cols-1 border-l-[3px] border-t-[3px] border-black p-0 sm:grid-cols-2 lg:grid-cols-4">
              {about.timeline.map((t, i) => (
                <li
                  key={t.year}
                  className={`border-b-[3px] border-r-[3px] border-black p-6 sm:p-7 ${
                    i === about.timeline.length - 1 ? "bg-[var(--e-cobalt)] text-white" : "bg-[var(--e-concrete)]"
                  }`}
                >
                  <p className={`${s.display} m-0 text-[clamp(3rem,5vw,4.5rem)] leading-[0.85]`}>{t.year}</p>
                  <p className="m-0 mt-5">{t.text}</p>
                </li>
              ))}
            </ol>
            <p className={`${s.pending} m-0 mt-8`}>{about.pending}</p>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" aria-labelledby="e-contacto" className="scroll-mt-4 border-b-[3px] border-black bg-[var(--e-mint)]">
          <div className={`${wrap} py-20 lg:py-32`}>
            <h2 id="e-contacto" className={`${s.display} ${s.h2} m-0`}>
              {sections.contact}
            </h2>
            <p className={`${s.display} ${s.giant} m-0 mt-6 max-w-[14ch]`}>{contact.title}</p>

            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:gap-12">
              {[contact.primary, contact.secondary].map((c, i) => (
                <article
                  key={c.label}
                  aria-labelledby={`e-via-${i}`}
                  className={`flex flex-col border-[3px] border-black p-6 sm:p-8 ${i === 0 ? "bg-white" : "bg-[var(--e-concrete)]"}`}
                >
                  <h3 id={`e-via-${i}`} className={`${s.display} m-0 text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1]`}>
                    {c.label}
                  </h3>
                  <p className="m-0 mt-4 max-w-[44ch] flex-1 text-[18px]">{c.text}</p>
                  <PressButton
                    describedBy="e-contacto-pendiente"
                    shadowColor={i === 0 ? "#2E4BFF" : "#000000"}
                    className={`mt-8 min-h-14 self-start px-6 py-3 text-left text-[18px] ${
                      i === 0 ? "bg-black text-white" : "bg-[var(--e-lilac)] text-black"
                    }`}
                  >
                    {c.cta}
                  </PressButton>
                </article>
              ))}
            </div>
            <p id="e-contacto-pendiente" className={`${s.pending} m-0 mt-10`}>
              {contact.pending}
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className={`${wrap} flex flex-col gap-3 pb-28 pt-10 md:flex-row md:items-baseline md:justify-between`}>
          <span className={`${s.display} text-[1.75rem] leading-none`}>{brand.name}</span>
          <span className="text-[17px] font-semibold">{brand.tagline}</span>
          <span className="text-[15px]">© {footer.year} {brand.name}</span>
          <span className={s.pending}>{footer.legal}</span>
        </div>
      </footer>

      <LabBar current="e" />
    </div>
  );
}
