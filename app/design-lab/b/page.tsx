import type { CSSProperties } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { LabBar } from "../_shared/LabBar";
import {
  brand,
  closing,
  complementary,
  cta,
  deliverables,
  footer,
  hero,
  method,
  nav,
  sampleAssets,
  services,
  trust,
} from "../content";
import { CTA_VIEW, HERO_SUMMITS, HERO_VIEW, ctaContours, heroContours } from "./contours";
import { DrawnRule } from "./DrawnRule";
import { Relief } from "./Relief";

export const metadata = { title: "Concept B" };

const sans = IBM_Plex_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-b-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-b-mono", display: "swap" });

const palette = {
  "--grafito": "#0E1217",
  "--carbon": "#161B22",
  "--hueso": "#E6E8EB",
  "--acero": "#8B95A3",
  "--ion": "#7C8CFF",
  "--ion-claro": "#9AA6FF",
  "--hallazgo": "#FFB020",
} as CSSProperties;

// Hallazgos de nivel alto/medio de los ejemplos ilustrativos, uno por cima del relieve.
const flagged = sampleAssets.filter((a) => a.level === "alto" || a.level === "medio").slice(0, 3);
const cotas = flagged.map((a, i) => ({
  ...HERO_SUMMITS[i],
  host: a.host,
  level: a.level,
  side: (HERO_SUMMITS[i].x > 1400 ? "left" : "right") as "left" | "right",
}));

const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--hueso)]";
const btnPrimary = `inline-flex min-h-11 items-center justify-center rounded-[3px] bg-[var(--ion)] px-5 text-[15px] font-medium text-[var(--grafito)] transition-colors hover:bg-[var(--ion-claro)] ${focus}`;
const btnSecondary = `inline-flex min-h-11 items-center justify-center rounded-[3px] border border-[var(--acero)]/50 px-5 text-[15px] text-[var(--hueso)] transition-colors hover:border-[var(--hueso)] ${focus}`;
const h2 = "text-[clamp(2rem,4.2vw,3.5rem)] font-light leading-[1.05] tracking-[-0.03em] [font-stretch:92%]";
const monoNote = "font-[family-name:var(--font-b-mono)] text-[13px] leading-snug";
const pending = `${monoNote} inline-block border border-dashed border-[var(--acero)]/60 px-2.5 py-1.5 text-[var(--acero)]`;
const section = "scroll-mt-20 border-t border-[var(--acero)]/20 py-[clamp(4.5rem,11vw,9rem)]";

export default function ConceptB() {
  const heroPaths = heroContours();
  const ctaPaths = ctaContours();

  return (
    <div
      style={palette}
      className={`${sans.variable} ${mono.variable} min-h-screen overflow-x-clip bg-[var(--grafito)] font-[family-name:var(--font-b-sans)] text-[var(--hueso)] selection:bg-[var(--ion)] selection:text-[var(--grafito)]`}
    >
      <a
        href="#contenido"
        className={`sr-only left-4 top-3 z-[60] rounded-[3px] bg-[var(--hueso)] px-4 py-2 text-[var(--grafito)] focus:not-sr-only focus:fixed ${focus}`}
      >
        Saltar al contenido
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--acero)]/15 bg-[var(--grafito)]/85 backdrop-blur-md">
        <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
          <a
            href="#contenido"
            className={`rounded-[2px] text-[19px] font-medium tracking-[-0.02em] [font-stretch:88%] ${focus}`}
          >
            {brand}
          </a>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-8 text-[14px] text-[var(--acero)]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={`rounded-[2px] py-2 transition-colors hover:text-[var(--hueso)] ${focus}`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contacto" className={`${btnPrimary} min-h-10 px-4 text-[14px]`}>
            {cta.primary}
          </a>
        </div>
      </header>

      <main id="contenido">
        {/* Hero: relieve a sangre, texto abajo a la izquierda */}
        <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
          <div className={`${wrap} relative z-10 mt-auto pb-[clamp(3.5rem,9vh,7rem)] pt-[max(58svh,22rem)] lg:pt-40`}>
            <h1
              id="hero-title"
              className="max-w-[13ch] text-[clamp(2.5rem,6.4vw,6.25rem)] font-light leading-[1.02] tracking-[-0.035em] [font-stretch:90%]"
            >
              {hero.title}
            </h1>
            <p className="mt-7 max-w-[36rem] text-[17px] leading-[1.6] text-[var(--acero)] sm:text-[18px]">{hero.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contacto" className={btnPrimary}>
                {cta.primary}
              </a>
              <a href="#servicios" className={btnSecondary}>
                {cta.secondary}
              </a>
            </div>
          </div>

          {/* El relieve va después del texto en el DOM: los lectores de pantalla leen primero el titular. */}
          <div className="absolute inset-x-0 top-0 -z-10 h-[62svh] overflow-hidden lg:h-full">
            <Relief paths={heroPaths} width={HERO_VIEW.width} height={HERO_VIEW.height} cotas={cotas} />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--grafito)_0%,transparent_38%)] lg:bg-[linear-gradient(to_top,var(--grafito)_0%,transparent_22%)]"
            />
            <p className={`${monoNote} absolute right-5 top-20 text-[12px] text-[var(--acero)] sm:right-8 lg:top-auto lg:bottom-8 lg:right-12`}>
              Ejemplo ilustrativo
            </p>
          </div>
        </section>

        {/* Servicios: hoja técnica */}
        <section id="servicios" aria-labelledby="servicios-title" className={section}>
          <div className={wrap}>
            <h2 id="servicios-title" className={h2}>
              Servicios
            </h2>
            <ul className="mt-12 border-b border-[var(--acero)]/25 lg:mt-16">
              {services.map((s) => (
                <li
                  key={s.id}
                  className="grid gap-x-10 gap-y-2 border-t border-[var(--acero)]/25 py-7 md:grid-cols-[11rem_minmax(0,1fr)] lg:grid-cols-[13rem_minmax(0,1fr)_minmax(0,1.2fr)] lg:py-8"
                >
                  <p className={`${monoNote} pt-1 text-[var(--acero)]`}>{s.short}</p>
                  <h3 className="text-[20px] font-medium leading-snug tracking-[-0.01em] sm:text-[22px]">{s.name}</h3>
                  <p className="max-w-[60ch] text-[16px] leading-[1.6] text-[var(--acero)] md:col-start-2 lg:col-start-auto">
                    {s.text}
                  </p>
                </li>
              ))}
              <li className="grid gap-x-10 gap-y-2 border-t border-dashed border-[var(--acero)]/40 py-7 md:grid-cols-[11rem_minmax(0,1fr)] lg:grid-cols-[13rem_minmax(0,1fr)_minmax(0,1.2fr)] lg:py-8">
                <p className={`${monoNote} pt-1 text-[var(--acero)]`}>Complementario</p>
                <h3 className="text-[20px] font-normal leading-snug tracking-[-0.01em] text-[var(--acero)] sm:text-[22px]">
                  {complementary.name}
                </h3>
                <p className="max-w-[60ch] text-[16px] leading-[1.6] text-[var(--acero)] md:col-start-2 lg:col-start-auto">
                  {complementary.text}
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Metodología: secuencia real, numerada */}
        <section id="metodologia" aria-labelledby="metodologia-title" className={section}>
          <div className={wrap}>
            <h2 id="metodologia-title" className={h2}>
              Metodología
            </h2>
            <ol className="relative mt-12 grid gap-11 pl-9 lg:mt-20 lg:grid-cols-5 lg:gap-10 lg:pl-0 lg:pt-14">
              <DrawnRule axis="y" className="absolute bottom-2 left-[3px] top-2 w-px bg-[var(--acero)]/50 lg:hidden" />
              <DrawnRule axis="x" className="absolute inset-x-0 top-[3px] hidden h-px bg-[var(--acero)]/50 lg:block" />
              {method.map((m, i) => (
                <li key={m.name} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-9 top-[5px] size-[7px] border border-[var(--hueso)] bg-[var(--grafito)] lg:-top-14 lg:left-0"
                  />
                  <p className={`${monoNote} text-[var(--acero)]`}>
                    <span className="sr-only">Paso </span>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-[21px] font-medium tracking-[-0.01em]">{m.name}</h3>
                  <p className="mt-2.5 max-w-[34ch] text-[15.5px] leading-[1.6] text-[var(--acero)]">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Entregables: retícula con separadores de 1px */}
        <section id="entregables" aria-labelledby="entregables-title" className={section}>
          <div className={wrap}>
            <h2 id="entregables-title" className={h2}>
              Entregables
            </h2>
            <ul className="mt-12 grid gap-px border border-[var(--acero)]/20 bg-[var(--acero)]/20 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6">
              {deliverables.map((d, i) => (
                <li
                  key={d.name}
                  className={`flex min-h-[11rem] flex-col justify-between gap-8 bg-[var(--grafito)] p-6 sm:p-8 ${
                    i < 2 ? "lg:col-span-3 lg:min-h-[14rem]" : "lg:col-span-2"
                  } ${i === deliverables.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <h3 className="max-w-[20ch] text-[22px] font-normal leading-[1.2] tracking-[-0.015em] sm:text-[24px]">
                    {d.name}
                  </h3>
                  <p className="max-w-[42ch] text-[15.5px] leading-[1.55] text-[var(--acero)]">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Confianza */}
        <section id="confianza" aria-labelledby="confianza-title" className={section}>
          <div className={`${wrap} grid gap-14 lg:grid-cols-2 lg:gap-20`}>
            <div>
              <h2 id="confianza-title" className={h2}>
                {trust.title}
              </h2>
              <p className="mt-8 max-w-[30ch] text-[clamp(1.375rem,2.4vw,2rem)] font-light leading-[1.35] tracking-[-0.015em]">
                {trust.origin}
              </p>
              <p className={`${pending} mt-6`}>{trust.originPending}</p>
            </div>
            <div className="lg:pt-3">
              <ul className="border-b border-[var(--acero)]/25">
                {trust.principles.map((p, i) => (
                  <li key={p.name} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-t border-[var(--acero)]/25 py-6">
                    <span aria-hidden="true" className={`${monoNote} pt-[3px] text-[var(--acero)]`}>
                      P{i + 1}
                    </span>
                    <div>
                      <h3 className="text-[19px] font-medium tracking-[-0.01em]">{p.name}</h3>
                      <p className="mt-1.5 text-[15.5px] leading-[1.6] text-[var(--acero)]">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className={`${pending} mt-6`}>{trust.principlesPending}</p>
            </div>
          </div>
        </section>

        {/* Contacto: fragmento de isolíneas tenue */}
        <section
          id="contacto"
          aria-labelledby="contacto-title"
          className="relative isolate scroll-mt-16 overflow-hidden border-t border-[var(--acero)]/20 bg-[var(--carbon)] py-[clamp(5rem,13vw,10rem)]"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 -z-10 h-full w-full"
            viewBox={`0 0 ${CTA_VIEW.width} ${CTA_VIEW.height}`}
            preserveAspectRatio="xMaxYMid slice"
          >
            {ctaPaths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill="none"
                stroke="var(--acero)"
                strokeOpacity={p.major ? 0.3 : 0.12}
                strokeWidth={p.major ? 1 : 0.75}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <div className={wrap}>
            <h2 id="contacto-title" className={`${h2} max-w-[16ch] text-[clamp(2.25rem,5.4vw,4.75rem)]`}>
              {closing.title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-[18px] leading-[1.6] text-[var(--acero)]">{closing.body}</p>
            <div className="mt-10 flex flex-col items-start gap-4">
              <button type="button" aria-describedby="contacto-pendiente" className={`${btnPrimary} min-h-12 px-6 text-[16px]`}>
                {cta.primary}
              </button>
              <p id="contacto-pendiente" className={pending}>
                {closing.pending}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--acero)]/20 pb-28 pt-10">
        <div className={`${wrap} flex flex-col gap-3 text-[14px] text-[var(--acero)] sm:flex-row sm:items-center sm:justify-between`}>
          <p>
            <span className="font-medium text-[var(--hueso)]">{brand}</span> © {footer.year}
          </p>
          <p className={monoNote}>{footer.legal}</p>
        </div>
      </footer>

      <LabBar current="b" />
    </div>
  );
}
