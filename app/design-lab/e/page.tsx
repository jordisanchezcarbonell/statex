import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
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
  services,
  trust,
} from "../content";
import { LabBar } from "../_shared/LabBar";
import { HeroStack, PressLink } from "./Press";
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

      {/* Header */}
      <header className="border-b-[3px] border-black">
        <div className={`${wrap} flex min-h-20 items-center justify-between gap-4`}>
          <a
            href="#contenido"
            className={`${s.display} text-[1.75rem] leading-none sm:text-[2rem] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--e-cobalt)]`}
          >
            {brand}
          </a>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="m-0 flex list-none gap-1 p-0">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="inline-flex min-h-11 items-center px-3 font-semibold decoration-[3px] underline-offset-[6px] hover:underline focus-visible:outline-[3px] focus-visible:outline-[var(--e-cobalt)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <PressLink href="#contacto" className="min-h-11 bg-[var(--e-lilac)] px-3.5 text-[15px] text-black sm:min-h-12 sm:px-5 sm:text-[17px]">
            {cta.primary}
          </PressLink>
        </div>
      </header>

      <main id="contenido">
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
                  <PressLink href="#servicios" className="min-h-12 bg-white px-5 text-[17px] text-black">
                    {cta.secondary}
                  </PressLink>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <HeroStack />
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" aria-labelledby="e-servicios" className="scroll-mt-4 border-b-[3px] border-black">
          <div className={`${wrap} py-20 lg:py-28`}>
            <h2 id="e-servicios" className={`${s.display} ${s.h2} m-0 max-w-[14ch]`}>
              Servicios
            </h2>
            <ul className="m-0 mt-12 grid list-none grid-cols-1 border-l-[3px] border-t-[3px] border-black p-0 md:grid-cols-2 lg:grid-cols-3">
              {services.map((sv, i) => (
                <li
                  key={sv.id}
                  className={`flex flex-col border-b-[3px] border-r-[3px] border-black p-6 sm:p-8 ${cellTone[i]} ${
                    i === 0 ? "min-h-[20rem] justify-between lg:p-10" : "min-h-[16rem]"
                  }`}
                >
                  <span className={`${monoLabel}`}>{sv.short}</span>
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
              <span className={`${monoLabel} md:col-span-3`}>Servicio complementario</span>
              <h3 id="e-complementario" className={`${s.display} m-0 text-[1.6rem] leading-[1] md:col-span-4`}>
                {complementary.name}
              </h3>
              <p className="m-0 max-w-[56ch] md:col-span-5">{complementary.text}</p>
            </aside>
          </div>
        </section>

        {/* Metodología */}
        <section id="metodologia" aria-labelledby="e-metodologia" className="scroll-mt-4 border-b-[3px] border-black bg-white">
          <div className={`${wrap} py-20 lg:py-28`}>
            <h2 id="e-metodologia" className={`${s.display} ${s.h2} m-0`}>
              Metodología
            </h2>
            <ol className="m-0 mt-12 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3 xl:grid-cols-5">
              {method.map((m, i) => (
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

        {/* Entregables */}
        <section id="entregables" aria-labelledby="e-entregables" className="scroll-mt-4 border-b-[3px] border-black">
          <div className={`${wrap} grid gap-12 py-20 lg:grid-cols-12 lg:py-28`}>
            <h2 id="e-entregables" className={`${s.display} ${s.h2} m-0 lg:col-span-4`}>
              Entregables
            </h2>
            <ul className="m-0 list-none border-t-[6px] border-black p-0 lg:col-span-8">
              {deliverables.map((d) => (
                <li
                  key={d.name}
                  className="grid grid-cols-[auto_1fr] gap-x-5 border-b-[6px] border-black py-6 sm:grid-cols-[auto_minmax(0,18rem)_1fr] sm:gap-x-8"
                >
                  <span aria-hidden="true" className="mt-2 block size-4 bg-black" />
                  <h3 className={`${s.display} m-0 text-[1.6rem] leading-[1]`}>{d.name}</h3>
                  <p className="col-start-2 m-0 mt-2 sm:col-start-3 sm:mt-0">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Confianza */}
        <section id="confianza" aria-labelledby="e-confianza" className="scroll-mt-4 border-b-[3px] border-black">
          <div className={`${wrap} py-20 lg:py-28`}>
            <div className="bg-black p-8 text-[var(--e-concrete)] sm:p-12 lg:p-16">
              <h2 id="e-confianza" className={`${s.display} ${s.h2} m-0`}>
                {trust.title}
              </h2>
              <p className="m-0 mt-10 max-w-[38ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35]">
                {trust.origin}
              </p>
              <p className={`${s.pending} m-0 mt-8 text-[var(--e-lilac)]`}>{trust.originPending}</p>
            </div>

            <ul className="m-0 mt-8 grid list-none grid-cols-1 border-l-[3px] border-t-[3px] border-black p-0 sm:grid-cols-2 lg:grid-cols-4">
              {trust.principles.map((p) => (
                <li key={p.name} className="border-b-[3px] border-r-[3px] border-black bg-white p-6 sm:p-7">
                  <h3 className={`${s.display} m-0 text-[1.5rem] leading-[1]`}>{p.name}</h3>
                  <p className="m-0 mt-3">{p.text}</p>
                </li>
              ))}
            </ul>
            <p className={`${s.pending} m-0 mt-6`}>{trust.principlesPending}</p>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" aria-labelledby="e-contacto" className="scroll-mt-4 border-b-[3px] border-black bg-[var(--e-mint)]">
          <div className={`${wrap} py-20 lg:py-32`}>
            <h2 id="e-contacto" className={`${s.display} ${s.giant} m-0 max-w-[14ch]`}>
              {closing.title}
            </h2>
            <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="m-0 max-w-[44ch] text-[19px]">{closing.body}</p>
                <p id="e-contacto-pendiente" className={`${s.pending} m-0 mt-5`}>
                  {closing.pending}
                </p>
              </div>
              <PressLink
                href="#contacto"
                shadowColor="#2E4BFF"
                describedBy="e-contacto-pendiente"
                className="min-h-14 self-start bg-black px-7 text-[19px] text-white md:self-auto"
              >
                {cta.primary}
              </PressLink>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className={`${wrap} flex flex-col gap-3 pb-28 pt-10 sm:flex-row sm:items-baseline sm:justify-between`}>
          <span className={`${s.display} text-[1.75rem] leading-none`}>{brand}</span>
          <span className="text-[15px]">© {footer.year} {brand}</span>
          <span className={`${s.pending}`}>{footer.legal}</span>
        </div>
      </footer>

      <LabBar current="e" />
    </div>
  );
}
