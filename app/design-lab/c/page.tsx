import type { CSSProperties, ReactNode } from "react";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
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
  nav,
  problem,
  research,
  sections,
  solutions,
  technology,
} from "../content";
import { LabBar } from "../_shared/LabBar";
import { Composition, Glyph } from "./Composition";
import { HeroAssembly } from "./HeroAssembly";
import { MobileNav } from "./MobileNav";
import { Stage } from "./Stage";
import { Wordmark, display } from "./Wordmark";
import { X_MARK, stageComposition, type GlyphId, type Ink, type Kind, type StageId } from "./pieces";
import { btnInk, btnLine, focus, gutter, pending } from "./ui";

export const metadata = { title: "Concept C" };

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--c-display",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--c-text", display: "swap" });

// Paleta de la dirección C. Los pasteles nunca se usan como color de texto sobre Papel.
// --ink-soft (#46454F): 8,4:1 sobre Papel, 4,8:1 sobre Albaricoque y Lila, 5,3:1 sobre Salvia.
// --paper-soft (#C9CCC6): 11:1 sobre Tinta, 5,5:1 sobre Petróleo.
const tokens = {
  "--paper": "#F1F3EF",
  "--ink": "#17161C",
  "--sage": "#A9CBB6",
  "--apricot": "#F3A877",
  "--lilac": "#C3B2F2",
  "--petrol": "#14524F",
  "--ink-soft": "#46454F",
  "--paper-soft": "#C9CCC6",
} as CSSProperties;

const statement = `${display} mt-6 max-w-[15ch] text-[clamp(2.25rem,1rem+3.6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.03em]`;
const lead = "mt-8 max-w-[38rem] text-[1.1875rem] leading-[1.55]";
const h3 = `${display} text-[1.375rem] leading-tight font-bold tracking-[-0.01em]`;

const solutionGlyph: Record<string, GlyphId> = {
  easm: "exposicion",
  appsec: "verificacion",
  va: "prioridad",
  engineering: "reduccion",
  "ai-research": "investigacion",
};

export default function ConceptC() {
  return (
    <div
      style={tokens}
      className={`${bricolage.variable} ${hanken.variable} min-h-screen overflow-x-clip bg-(--paper) font-(family-name:--c-text) text-(--ink) selection:bg-(--lilac) selection:text-(--ink)`}
    >
      <a
        href="#contenido"
        className="absolute top-2 left-2 z-50 -translate-y-24 rounded-r-full bg-(--ink) py-2 pr-5 pl-4 text-(--paper) outline-none focus:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--ink)"
      >
        Saltar al contenido
      </a>

      {/* Cabecera */}
      <header className="relative z-30">
        <div className={`${gutter} flex h-20 items-center justify-between gap-6`}>
          <a href="#inicio" className={`rounded-[0.2rem] ${focus}`}>
            <Wordmark className="text-[1.875rem]" />
          </a>
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-x-7 text-[0.9375rem] font-medium">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`inline-flex min-h-11 items-center decoration-2 underline-offset-[6px] hover:underline ${focus}`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <a href="#contacto" className={btnInk}>
                {cta.primary}
              </a>
            </span>
            <MobileNav />
          </div>
        </div>
      </header>

      <main id="contenido">
        {/* Hero: el titular se cruza con la columna izquierda de la composición (solo pasteles). */}
        <section
          id="inicio"
          aria-labelledby="c-hero"
          className={`relative ${gutter} pt-8 pb-20 sm:pt-12 lg:min-h-[calc(100svh-5rem)] lg:pt-16 lg:pb-28`}
        >
          <div className="pointer-events-none absolute top-4 right-[-3vw] hidden w-[min(50vw,780px)] lg:block">
            <HeroAssembly />
          </div>
          <div className="relative z-10">
            <h1
              id="c-hero"
              className={`${display} max-w-[17ch] text-[clamp(2.6rem,1.1rem+5.2vw,6.75rem)] leading-[0.92] font-extrabold tracking-[-0.035em] text-balance lg:max-w-[min(17ch,54vw)]`}
            >
              {hero.title}
            </h1>
            <p className="mt-8 max-w-[34rem] text-[1.1875rem] leading-[1.55] text-(--ink-soft) lg:max-w-[min(34rem,38vw)]">
              {hero.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contacto" className={btnInk}>
                {cta.primary}
              </a>
              <a href="#soluciones" className={btnLine}>
                {cta.explore}
              </a>
            </div>
          </div>
          <div className="mt-14 lg:hidden">
            <HeroAssembly className="mx-auto w-full max-w-[30rem]" />
          </div>
        </section>

        {/* Capítulos con composición fija: en escritorio, una columna sticky recompone las piezas. */}
        <div className="relative lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-[1] hidden lg:col-start-1 lg:row-span-6 lg:row-start-1 lg:block motion-reduce:hidden!"
          >
            <div className="sticky top-0 flex h-svh items-center justify-center">
              <Stage />
            </div>
          </div>

          {/* El problema */}
          <Chapter id="problema" row="lg:row-start-1" tone="bg-(--ink) text-(--paper)" mark="apricot" title={sections.problem}>
            <p className={statement}>{problem.title}</p>
            <p className={`${lead} text-(--paper-soft)`}>{problem.intro}</p>
            <ul role="list" className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {problem.risks.map((r, i) => {
                const kinds: Kind[] = ["q", "s", "r", "t"];
                const inks: Ink[] = ["sage", "apricot", "lilac", "paper"];
                return (
                  <li key={r.name} className="border-t border-(--paper)/25 pt-5">
                    <Composition comp={{ g: 1, p: [{ k: kinds[i % 4], c: inks[i % 4], x: 0, y: 0 }] }} className="size-9" />
                    <h3 className={`${h3} mt-4`}>{r.name}</h3>
                    <p className="mt-2 leading-[1.6] text-(--paper-soft)">{r.text}</p>
                  </li>
                );
              })}
            </ul>
          </Chapter>

          {/* Nuestro enfoque: cinco peldaños, cada uno un poco más a la derecha. */}
          <Chapter id="enfoque" row="lg:row-start-2" tone="bg-(--paper) text-(--ink)" mark="petrol" title={sections.approach}>
            <p className={statement}>{approach.title}</p>
            <p className={`${lead} text-(--ink-soft)`}>{approach.intro}</p>
            <ol role="list" className="mt-14">
              {approach.steps.map((s, i) => (
                <li
                  key={s.name}
                  style={{ marginLeft: `calc(${i} * clamp(0.75rem, 3.5vw, 3.25rem))` }}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-t-2 border-(--ink) pt-5 pb-9 sm:grid-cols-[4.5rem_minmax(0,1fr)]"
                >
                  <span aria-hidden="true" className={`${display} text-[2.75rem] leading-[0.85] font-extrabold text-(--petrol) sm:text-[3.5rem]`}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className={h3}>{s.name}</h3>
                    <p className="mt-2 max-w-[30rem] leading-[1.6] text-(--ink-soft)">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Chapter>

          {/* Soluciones: lista con pictograma propio, no tarjetas. */}
          <Chapter
            id="soluciones"
            row="lg:row-start-3"
            tone="bg-(--lilac) text-(--ink)"
            mark="petrol"
            title={sections.solutions}
            bigTitle
          >
            <ul role="list" className="mt-12 border-t-2 border-(--ink)">
              {solutions.map((s) => (
                <li
                  key={s.id}
                  className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-5 border-b-2 border-(--ink) py-7 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-x-8"
                >
                  <Glyph id={solutionGlyph[s.id]} remap={{ lilac: "paper" }} className="size-16 sm:size-24" />
                  <div>
                    <h3 className={`${display} text-[clamp(1.5rem,1rem+1.6vw,2.375rem)] leading-[1.02] font-bold tracking-[-0.02em]`}>
                      {s.name}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] font-semibold">{s.short}</p>
                    <p className="mt-3 max-w-[36rem] leading-[1.6] text-(--ink-soft)">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-14 ml-auto max-w-[34rem] rounded-tr-[5rem] bg-(--ink) p-7 text-(--paper) sm:p-9">
              <Glyph id="construccion" className="size-14" />
              <p className="mt-6 text-[0.9375rem] font-semibold text-(--sage)">{complementary.label}</p>
              <h3 className={`${display} mt-1 text-[1.75rem] leading-tight font-bold`}>{complementary.name}</h3>
              <p className="mt-3 leading-[1.6] text-(--paper-soft)">{complementary.text}</p>
            </div>
          </Chapter>

          {/* Tecnología y visión: lo que existe (bloque sólido) frente a lo que no (bloque en obra). */}
          <Chapter id="tecnologia" row="lg:row-start-4" tone="bg-(--sage) text-(--ink)" mark="petrol" title={sections.technology}>
            <p className={statement}>{technology.title}</p>
            <p className={`${lead} text-(--ink-soft)`}>{technology.intro}</p>
            <div className="mt-14 grid gap-5 xl:grid-cols-2">
              <div className="rounded-[0.3rem] bg-(--paper) p-7">
                <h3 className={`${h3} flex items-center gap-3`}>
                  <span aria-hidden="true" className="size-3.5 shrink-0 bg-(--petrol)" />
                  {technology.today.label}
                </h3>
                <ul role="list" className="mt-5 grid gap-4">
                  {technology.today.items.map((t) => (
                    <li key={t} className="flex gap-3 leading-[1.55]">
                      <span aria-hidden="true" className="mt-[0.45em] size-2.5 shrink-0 bg-(--ink)" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6">
                  <span className={pending}>{technology.today.pending}</span>
                </p>
              </div>
              <div className="overflow-hidden rounded-[0.3rem] border-2 border-dashed border-(--ink)">
                <div
                  aria-hidden="true"
                  className="h-4 border-b-2 border-dashed border-(--ink)"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, var(--ink) 0 6px, transparent 6px 14px)",
                  }}
                />
                <div className="p-7">
                  <h3 className={`${h3} flex items-center gap-3`}>
                    <span aria-hidden="true" className="size-3.5 shrink-0 border-2 border-(--ink)" />
                    {technology.roadmap.label}
                  </h3>
                  <ul role="list" className="mt-5 grid gap-4">
                    {technology.roadmap.items.map((t) => (
                      <li key={t} className="flex gap-3 leading-[1.55]">
                        <span aria-hidden="true" className="mt-[0.45em] size-2.5 shrink-0 border-[1.5px] border-(--ink)" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-l-4 border-(--ink) pl-3 font-semibold">{technology.roadmap.note}</p>
                </div>
              </div>
            </div>
          </Chapter>

          {/* Investigación: archivo real, temas apilados como lomos de libro y el laboratorio. */}
          <Chapter
            id="investigacion"
            row="lg:row-start-5"
            tone="bg-(--petrol) text-(--paper)"
            mark="apricot"
            title={sections.research}
          >
            <p className={statement}>{research.title}</p>
            <p className={`${lead} text-(--paper-soft)`}>{research.intro}</p>
            <ul role="list" className="mt-14 border-t border-(--paper)/35">
              {research.archive.map((a) => (
                <li
                  key={a.name}
                  className="grid gap-x-8 gap-y-3 border-b border-(--paper)/35 py-8 sm:grid-cols-[10.5rem_minmax(0,1fr)]"
                >
                  <p className={`${display} text-[1.625rem] leading-none font-bold whitespace-nowrap text-(--sage)`}>{a.years}</p>
                  <div>
                    <h3>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${display} inline-flex items-center gap-2 rounded-[0.2rem] text-[2rem] leading-none font-bold tracking-[-0.02em] underline decoration-2 underline-offset-[6px] hover:decoration-(--apricot) ${focus}`}
                      >
                        {a.name}
                        <ArrowUpRight aria-hidden="true" className="size-6 shrink-0" />
                        <span className="sr-only">(se abre en una pestaña nueva)</span>
                      </a>
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-(--paper-soft)">{new URL(a.url).host}</p>
                    <p className="mt-3 max-w-[34rem] leading-[1.6]">{a.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-14 grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <h3 className={h3}>Temas</h3>
                <ul role="list" className="mt-5 grid justify-items-start gap-1.5">
                  {research.topics.map((t, i) => {
                    const bg = ["bg-(--sage)", "bg-(--apricot)", "bg-(--lilac)", "bg-(--paper)"][i % 4];
                    const shift = ["ml-0", "ml-6", "ml-2", "ml-9"][i % 4];
                    return (
                      <li
                        key={t}
                        className={`${bg} ${shift} max-w-[calc(100%-2.25rem)] rounded-l-[0.2rem] rounded-r-full py-2.5 pr-6 pl-4 font-semibold text-(--ink)`}
                      >
                        {t}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="self-start rounded-tl-[4rem] border-2 border-(--paper) p-7 pt-10">
                <h3 className={`${display} text-[1.75rem] leading-tight font-bold`}>{research.lab.name}</h3>
                <p className="mt-2 leading-[1.6] text-(--paper-soft)">{research.lab.text}</p>
                <p className="mt-5">
                  <span className={pending}>{research.lab.pending}</span>
                </p>
              </div>
            </div>
          </Chapter>

          {/* Sobre StateX: línea temporal con hitos en forma de semicírculo. */}
          <Chapter id="sobre" row="lg:row-start-6" tone="bg-(--apricot) text-(--ink)" mark="petrol" title={sections.about}>
            <p className={statement}>{about.title}</p>
            <p className={`${lead} text-(--ink)`}>{about.text}</p>
            <ol role="list" className="mt-16 grid md:grid-cols-4">
              {about.timeline.map((t, i) => {
                const last = i === about.timeline.length - 1;
                return (
                  <li
                    key={t.year}
                    className="relative border-l-2 border-(--ink) pb-9 pl-6 md:border-t-2 md:border-l-0 md:pt-6 md:pr-6 md:pb-0 md:pl-0"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 100 50"
                      className="absolute top-3 left-[18px] h-5 w-10 origin-top-left rotate-90 md:-top-[22px] md:left-0 md:rotate-0"
                    >
                      <path d="M0 50A50 50 0 0 1 100 50Z" fill={last ? "var(--petrol)" : "var(--ink)"} />
                    </svg>
                    <p className={`${display} text-[2.5rem] leading-none font-extrabold tracking-[-0.02em]`}>{t.year}</p>
                    <p className="mt-2 max-w-[16rem] leading-[1.55]">{t.text}</p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-12">
              <span className={pending}>{about.pending}</span>
            </p>
          </Chapter>
        </div>

        {/* Contacto: el titular cruza una X pastel; dos vías en bloques a sangre. */}
        <section id="contacto" aria-labelledby="contacto-h" className="relative">
          <div className={`relative ${gutter} pt-24 pb-14 sm:pt-28 lg:pt-36`}>
            <div className="pointer-events-none absolute top-10 right-[-8vw] w-[min(62vw,600px)] sm:right-[-4vw] lg:top-16">
              <Composition comp={X_MARK(["lilac", "apricot", "sage", "lilac"])} gap={0.03} className="w-full" />
            </div>
            <div className="relative z-10">
              <SectionTitle id="contacto-h" mark="petrol">
                {sections.contact}
              </SectionTitle>
              <p className={`${display} mt-6 max-w-[13ch] text-[clamp(2.75rem,1rem+6vw,7.5rem)] leading-[0.9] font-extrabold tracking-[-0.035em]`}>
                {contact.title}
              </p>
              <p id="contacto-pendiente" className="mt-10">
                <span className={`${pending} bg-(--paper)`}>{contact.pending}</span>
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <ContactWay tone="bg-(--sage)" label={contact.primary.label} text={contact.primary.text} cta={contact.primary.cta} glyph="exposicion" />
            <ContactWay
              tone="bg-(--lilac)"
              label={contact.secondary.label}
              text={contact.secondary.text}
              cta={contact.secondary.cta}
              glyph="construccion"
              remap={{ lilac: "paper" }}
            />
          </div>
        </section>
      </main>

      <footer className="bg-(--ink) text-(--paper)">
        <div className={`${gutter} pt-16 pb-28 sm:pt-20`}>
          <Wordmark tone="dark" className="text-[clamp(4.5rem,21vw,20rem)]" />
          <div className="mt-10 grid gap-6 border-t border-(--paper)/25 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className={`${display} max-w-[22ch] text-[1.625rem] leading-tight font-bold`}>{brand.tagline}</p>
            <div className="grid gap-3 text-[0.9375rem] text-(--paper-soft) md:justify-items-end">
              <p>
                © {footer.year} {brand.name}
              </p>
              <p>
                <span className={pending}>{footer.legal}</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <LabBar current="c" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SectionTitle({ id, mark, children, big = false }: { id: string; mark: Ink; children: ReactNode; big?: boolean }) {
  if (big) {
    return (
      <h2
        id={id}
        className={`${display} text-[clamp(3.25rem,1.5rem+6vw,7.5rem)] leading-[0.9] font-extrabold tracking-[-0.035em]`}
      >
        {children}
      </h2>
    );
  }
  return (
    <h2 id={id} className="flex items-center gap-2.5 text-[1.0625rem] font-semibold">
      <Composition comp={{ g: 1, p: [{ k: "q", c: mark, x: 0, y: 0 }] }} className="size-4 shrink-0" />
      {children}
    </h2>
  );
}

function Chapter({
  id,
  row,
  tone,
  mark,
  title,
  bigTitle = false,
  children,
}: {
  id: StageId;
  /** Clase literal de fila en la retícula de escritorio (lg:row-start-N). */
  row: string;
  tone: string;
  mark: Ink;
  title: string;
  bigTitle?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`relative lg:col-span-2 lg:col-start-1 ${row} ${tone}`}>
      <div className={`${gutter} grid py-20 sm:py-24 lg:min-h-svh lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-32`}>
        {/* Pictograma estático: móvil y movimiento reducido. En escritorio lo sustituye la composición fija. */}
        <div className="mb-12 lg:mb-0 lg:hidden lg:pr-[4vw] motion-reduce:block!">
          <div className="lg:sticky lg:top-24">
            <Composition comp={stageComposition(id)} className="w-[min(56vw,15rem)] lg:w-full lg:max-w-[26rem]" />
          </div>
        </div>
        <div className="min-w-0 lg:col-start-2 lg:pl-[2vw]">
          <SectionTitle id={`${id}-h`} mark={mark} big={bigTitle}>
            {title}
          </SectionTitle>
          {children}
        </div>
      </div>
    </section>
  );
}

function ContactWay({
  tone,
  label,
  text,
  cta: ctaLabel,
  glyph,
  remap,
}: {
  tone: string;
  label: string;
  text: string;
  cta: string;
  glyph: GlyphId;
  remap?: Partial<Record<Ink, Ink>>;
}) {
  return (
    <div className={`${tone} ${gutter} flex flex-col items-start py-14 sm:py-16 lg:py-20`}>
      <Glyph id={glyph} remap={remap} className="size-20" />
      <h3 className={`${display} mt-8 max-w-[18ch] text-[clamp(1.75rem,1.2rem+1.4vw,2.5rem)] leading-[1.02] font-bold tracking-[-0.02em]`}>
        {label}
      </h3>
      <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-[1.6] text-(--ink-soft)">{text}</p>
      <button type="button" aria-describedby="contacto-pendiente" className={`${btnInk} mt-8`}>
        {ctaLabel}
      </button>
    </div>
  );
}
