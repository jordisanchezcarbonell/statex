import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import {
  about,
  approach,
  brand,
  complementary,
  contact,
  cta,
  faq,
  footer,
  hero,
  offers,
  problem,
  sections,
  solutions,
  solutionsHead,
  technology,
} from "../content";
import { LabBar } from "../_shared/LabBar";
import { Header } from "./Header";
import { Research } from "./Research";
import { ContactForm, OfferLink } from "./ContactForm";
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
const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--e-cobalt)]";
const hardShadow = "shadow-[6px_6px_0_0_#000]";

// Celdas del bento: la primera en Cobalto y a doble ancho; el resto alterna blanco/Lila/Menta.
const cellTone = [
  "bg-[var(--e-cobalt)] text-white md:col-span-2",
  "bg-white",
  "bg-[var(--e-lilac)]",
  "bg-[var(--e-mint)]",
  "bg-white",
];

// Cabecera de sección: el nombre va en una pestaña (pequeña, como la de una carpeta)
// y el titular de verdad es el único h2 grande. Evita dos titulares compitiendo.
function SectionHead({ id, label, title, intro, dark = false, className = "" }: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className={`${monoLabel} m-0 inline-block border-[3px] px-3 py-2 ${
          dark ? "border-[var(--e-concrete)] bg-[var(--e-concrete)] text-black" : "border-black bg-black text-white"
        }`}
      >
        {label}
      </p>
      <h2 id={id} className={`${s.display} ${s.h2} m-0 mt-6 max-w-[16ch]`}>
        {title}
      </h2>
      {intro && <p className="m-0 mt-6 max-w-[52ch] text-[clamp(1.125rem,1.6vw,1.3rem)] leading-[1.45]">{intro}</p>}
    </div>
  );
}

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
                  <PressLink href="#ofertas" className="min-h-12 bg-white px-5 text-[17px] text-black">
                    Ver por dónde empezar
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
              <SectionHead id="e-problema" label={sections.problem} title={problem.title} intro={problem.intro} dark />
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
            <SectionHead id="e-enfoque" label={sections.approach} title={approach.title} intro={approach.intro} />
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
            <SectionHead id="e-soluciones" label={sections.solutions} title={solutionsHead.title} />
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

        {/* Ofertas: lo que una empresa puede pedir hoy */}
        <section id="ofertas" aria-labelledby="e-ofertas" className="scroll-mt-4 border-b-[3px] border-black bg-[var(--e-lilac)]">
          <div className={`${wrap} py-20 lg:py-28`}>
            <SectionHead id="e-ofertas" label={offers.label} title={offers.title} intro={offers.intro} />
            <ol className="m-0 mt-12 grid list-none gap-8 p-0 lg:grid-cols-3">
              {offers.items.map((o, i) => (
                <li
                  key={o.id}
                  className={`flex flex-col border-[3px] border-black p-6 sm:p-8 ${
                    o.featured ? "bg-black text-[var(--e-concrete)] shadow-[6px_6px_0_0_var(--e-cobalt)]" : "bg-white"
                  }`}
                >
                  <span className={`${monoLabel} ${o.featured ? "text-[var(--e-mint)]" : ""}`}>
                    {o.featured ? "Recomendado para empezar" : `Opción ${i + 1}`}
                  </span>
                  <h3 className={`${s.display} m-0 mt-5 text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[0.95]`}>{o.name}</h3>
                  <p className="m-0 mt-4 text-[18px]">{o.forWho}</p>
                  <ul className="m-0 mt-6 grid flex-1 list-none content-start gap-3 p-0">
                    {o.includes.map((x) => (
                      <li key={x} className="grid grid-cols-[auto_1fr] gap-3">
                        <span aria-hidden="true" className={`mt-[0.45em] block size-3.5 ${o.featured ? "bg-[var(--e-mint)]" : "bg-black"}`} />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={`${s.pending} m-0 mt-6 self-start`}>{offers.pricePending}</p>
                  <OfferLink
                    interest={o.id}
                    className={`mt-6 self-start text-[17px] ${o.featured ? "bg-[var(--e-mint)] text-black" : "bg-[var(--e-cobalt)] text-white"}`}
                  >
                    {offers.cta}
                  </OfferLink>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tecnología: hoy (bloque sólido con sombra) frente a visión (borde discontinuo, sin sombra) */}
        <section id="tecnologia" aria-labelledby="e-tecnologia" className="scroll-mt-4 border-b-[3px] border-black bg-white">
          <div className={`${wrap} py-20 lg:py-28`}>
            <SectionHead id="e-tecnologia" label={sections.technology} title={technology.title} intro={technology.intro} />

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
        <Research />

        {/* Sobre StateX */}
        <section id="sobre" aria-labelledby="e-sobre" className="scroll-mt-4 border-b-[3px] border-black bg-white">
          <div className={`${wrap} py-20 lg:py-28`}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <SectionHead id="e-sobre" label={sections.about} title={about.title} />
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

        {/* Preguntas frecuentes: objeciones antes de contactar */}
        <section id="preguntas" aria-labelledby="e-preguntas" className="scroll-mt-4 border-b-[3px] border-black">
          <div className={`${wrap} grid gap-12 py-20 lg:grid-cols-12 lg:py-28`}>
            <SectionHead id="e-preguntas" label={faq.label} title={faq.title} className="lg:col-span-5" />
            <div className="border-t-[3px] border-black lg:col-span-7">
              {faq.items.map((f) => (
                <details key={f.q} className="group border-b-[3px] border-black">
                  <summary className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[clamp(1.15rem,1.8vw,1.4rem)] font-extrabold ${focus} [&::-webkit-details-marker]:hidden`}>
                    {f.q}
                    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center border-[3px] border-black bg-white text-[22px] leading-none group-open:bg-black group-open:text-white">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <p className="m-0 max-w-[60ch] pb-6 text-[18px]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" aria-labelledby="e-contacto" className="scroll-mt-4 border-b-[3px] border-black bg-[var(--e-mint)]">
          <div className={`${wrap} py-20 lg:py-32`}>
            <p className={`${monoLabel} m-0 inline-block border-[3px] border-black bg-black px-3 py-2 text-white`}>{sections.contact}</p>
            <h2 id="e-contacto" className={`${s.display} ${s.giant} m-0 mt-6 max-w-[14ch]`}>
              {contact.title}
            </h2>

            <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="grid content-start gap-8 lg:col-span-5">
                <div className="border-[3px] border-black bg-white p-6 sm:p-8">
                  <h3 className={`${s.display} m-0 text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1]`}>{contact.primary.label}</h3>
                  <p className="m-0 mt-4 text-[18px]">{contact.primary.text}</p>
                </div>
                <div className="border-[3px] border-black bg-[var(--e-concrete)] p-6 sm:p-8">
                  <h3 className={`${s.display} m-0 text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1]`}>{contact.secondary.label}</h3>
                  <p className="m-0 mt-4 text-[18px]">{contact.secondary.text}</p>
                  <OfferLink interest="colaboracion" className="mt-6 bg-[var(--e-lilac)] text-[17px] text-black">
                    {contact.secondary.cta}
                  </OfferLink>
                </div>
              </div>
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
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
