import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
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
import { ApproachLog } from "./ApproachLog";
import { Header } from "./Header";
import { HeroTitle } from "./HeroTitle";
import { SolutionStack } from "./SolutionStack";
import { Cursor, Pending, Prompt, SectionHead, Wordmark, focusRing, grain, gutter, mono, serif, tokens } from "./parts";
import "./editorial.css";

export const metadata = { title: "Concept G" };

const fSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--f-serif" });
const fMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono" });
const fSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-sans" });

const section = `${gutter} scroll-mt-4 pb-[clamp(5rem,10vw,9rem)]`;

// Regla temporal del archivo: de la primera entrada al relanzamiento.
const START = Number(about.timeline[0].year);
const END = Number(about.timeline.at(-1)!.year);
const span = END - START + 1;
const years = (s: string) => (s.match(/\d{4}/g) ?? []).map(Number);
const pct = (y: number) => ((y - START) / span) * 100;
const host = (url: string) => new URL(url).hostname;

export default function ConceptEPage() {
  return (
    <div
      style={tokens}
      className={`${fSerif.variable} ${fMono.variable} ${fSans.variable} relative isolate min-h-screen overflow-x-clip bg-(--paper) font-(family-name:--f-sans) text-(--ink) selection:bg-(--ink) selection:text-(--card)`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22]" style={{ backgroundImage: grain }} />

      <a
        href="#contenido"
        className={`absolute top-2 left-2 z-50 -translate-y-24 bg-(--ink) px-4 py-2 ${mono} text-sm text-(--card) focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--red)`}
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section id="inicio" aria-labelledby="hero-title" className={`${gutter} pt-[clamp(2.5rem,8vw,7rem)] pb-[clamp(4rem,10vw,9rem)]`}>
          <div className="mb-[clamp(1.5rem,3vw,2.5rem)]">
            <Prompt cmd="whoami" />
            <p className={`${mono} text-[13px]`}>{brand.descriptor}</p>
          </div>
          <HeroTitle title={hero.title} />

          <div className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <p className="max-w-[54ch] text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.6] text-pretty">{hero.body}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                <a
                  href="#contacto"
                  className={`inline-flex min-h-12 items-center bg-(--ink) px-6 ${mono} text-sm font-medium text-(--card) transition-colors hover:bg-(--red) hover:text-white ${focusRing}`}
                >
                  {cta.primary}
                </a>
                <a
                  href="#soluciones"
                  className={`inline-flex min-h-12 items-center ${mono} text-sm underline decoration-1 underline-offset-[6px] hover:decoration-(--red) hover:decoration-2 ${focusRing}`}
                >
                  {cta.explore}
                </a>
              </div>
            </div>

            {/* Salida de terminal de ejemplo: dominio reservado y rangos de documentación. */}
            <figure className="self-end border border-(--ink) bg-(--card) lg:col-span-4 lg:col-start-1 lg:row-start-1">
              <figcaption className={`flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-(--ink) px-4 py-2 ${mono} text-[12px]`}>
                <span aria-hidden="true">$ ls exposicion/</span>
                <span className="text-(--archive-ink)">Ejemplo ilustrativo</span>
              </figcaption>
              <table className={`w-full ${mono} text-[12px]`}>
                <caption className="sr-only">Inventario de activos de ejemplo con nivel de exposición (datos ilustrativos)</caption>
                <thead className="text-left text-(--archive-ink)">
                  <tr>
                    <th scope="col" className="px-4 pt-3 pb-1 font-normal">Activo</th>
                    <th scope="col" className="px-2 pt-3 pb-1 font-normal">Tipo</th>
                    <th scope="col" className="px-4 pt-3 pb-1 text-right font-normal">Exposición</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleAssets.map((a) => (
                    <tr key={a.host} className="border-t border-dotted border-(--archive)">
                      <td className="px-4 py-2 break-all">{a.host}</td>
                      <td className="px-2 py-2">{a.kind}</td>
                      <td className={`px-4 py-2 text-right ${a.level === "alto" ? "font-medium text-[#B81F18]" : ""}`}>{a.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </div>
        </section>

        {/* ── Problema ─────────────────────────────────────── */}
        <section id="problema" aria-labelledby="problema-title" className={section}>
          <SectionHead id="problema" name={sections.problem} title={problem.title} intro={problem.intro} />
          <ul className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {problem.risks.map((r) => (
              <li
                key={r.name}
                className="border-t border-(--ink) pt-5 pb-10"
              >
                <h3 className={`${serif} text-[clamp(1.6rem,2.3vw,2.1rem)] leading-[1.02]`}>{r.name}</h3>
                <p className="mt-3 max-w-[40ch] leading-[1.6]">{r.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Enfoque: secuencia de cinco fases ────────────── */}
        <section id="enfoque" aria-labelledby="enfoque-title" className={section}>
          <SectionHead id="enfoque" name={sections.approach} title={approach.title} />
          <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="max-w-[40ch] text-[1.05rem] leading-[1.65] lg:sticky lg:top-8">{approach.intro}</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ApproachLog steps={approach.steps} />
            </div>
          </div>
        </section>

        {/* ── Soluciones: fichas apiladas + nota grapada ───── */}
        <section id="soluciones" aria-labelledby="soluciones-title" className={section}>
          <div className="border-t-2 border-(--ink) pt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 id="soluciones-title" className={`${serif} text-[clamp(2.6rem,6.6vw,6.25rem)] leading-[0.94] tracking-[-0.015em]`}>
                {sections.solutions}
              </h2>
              <Prompt cmd={`ls soluciones/   # ${solutions.length} fichas`} />
            </div>
          </div>
          <div className="mt-[clamp(2.5rem,5vw,4.5rem)]">
            <SolutionStack solutions={solutions} />
          </div>

          <aside
            aria-labelledby="complementario-title"
            className="relative mt-16 ml-auto max-w-xl rotate-[1.2deg] border border-(--ink) bg-(--card) px-6 pt-9 pb-7 shadow-[0_14px_30px_-24px_rgba(17,17,17,0.5)] motion-reduce:rotate-0 sm:px-8 lg:mt-4 lg:mr-[6%]"
          >
            <span aria-hidden="true" className="absolute top-3 left-1/2 h-[3px] w-14 -translate-x-1/2 -rotate-[4deg] bg-[#8E918B] shadow-[0_1px_0_#5F625C]" />
            <p className={`${mono} text-[13px] text-(--archive-ink)`}>{complementary.label}</p>
            <h3 id="complementario-title" className={`mt-3 ${serif} text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.02] text-balance`}>
              {complementary.name}
            </h3>
            <p className="mt-4 leading-[1.65]">{complementary.text}</p>
          </aside>
        </section>

        {/* ── Tecnología: lo que se ejecuta hoy frente a lo comentado ── */}
        <section id="tecnologia" aria-labelledby="tecnologia-title" className={section}>
          <SectionHead id="tecnologia" name={sections.technology} title={technology.title} intro={technology.intro} />
          <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="border-2 border-(--ink) bg-(--card) p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="size-3 bg-(--ink)" />
                <h3 className={`${serif} text-[clamp(1.9rem,3vw,2.6rem)] leading-none`}>{technology.today.label}</h3>
              </div>
              <ul className="mt-6 grid gap-4">
                {technology.today.items.map((t) => (
                  <li key={t} className="grid grid-cols-[1.5rem_1fr] gap-x-2 border-t border-(--ink) pt-4 leading-[1.6]">
                    <span aria-hidden="true" className={`${mono} text-[13px] leading-[1.6rem]`}>$</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Pending>{technology.today.pending}</Pending>
              </div>
            </div>

            <div className="border-2 border-dashed border-(--archive) p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="size-3 border border-(--archive)" />
                <h3 className={`${serif} text-[clamp(1.9rem,3vw,2.6rem)] leading-none text-(--archive-ink)`}>{technology.roadmap.label}</h3>
              </div>
              <ul className="mt-6 grid gap-4 text-(--archive-ink)">
                {technology.roadmap.items.map((t) => (
                  <li key={t} className="grid grid-cols-[1.5rem_1fr] gap-x-2 border-t border-dashed border-(--archive) pt-4 leading-[1.6]">
                    <span aria-hidden="true" className={`${mono} text-[13px] leading-[1.6rem]`}>//</span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className={`mt-7 ${mono} text-[13px] text-(--archive-ink)`}>
                <span aria-hidden="true"># </span>
                {technology.roadmap.note}
              </p>
            </div>
          </div>
        </section>

        {/* ── Investigación: el archivo como publicación ──── */}
        <section id="investigacion" aria-labelledby="investigacion-title" className={section}>
          <SectionHead id="investigacion" name={sections.research} title={research.title} intro={research.intro} />

          {/* Regla temporal del archivo */}
          <figure className="mt-[clamp(2.5rem,5vw,4.5rem)]">
            <figcaption className="sr-only">
              Cronología del archivo: {research.archive.map((a) => `${a.name}, ${a.years}`).join("; ")}; {research.lab.name}, {END}.
            </figcaption>
            <div aria-hidden="true" className="relative">
              <div className={`relative h-5 border-b border-(--ink) ${mono} text-[12px] text-(--archive-ink)`}>
                {Array.from({ length: span }, (_, i) => START + i).map((y) => (
                  <span
                    key={y}
                    className={`absolute top-0 border-l border-(--archive) pl-1 leading-none ${y % 2 === 0 ? "" : "max-md:hidden"}`}
                    style={{ left: `${pct(y)}%` }}
                  >
                    {y}
                  </span>
                ))}
              </div>
              <div className="grid gap-3 pt-4">
                {research.archive.map((a, i) => {
                  const [from, to] = years(a.years);
                  return (
                    <div key={a.name} className="relative h-6">
                      <span
                        className={`absolute top-1/2 h-3 -translate-y-1/2 ${i === 0 ? "bg-(--ink)" : "border border-(--ink) bg-(--card)"}`}
                        style={{ left: `${pct(from)}%`, width: `${pct(to + 1) - pct(from)}%` }}
                      />
                      <span className={`absolute top-1/2 -translate-y-1/2 pl-2 ${mono} text-[12px] whitespace-nowrap`} style={{ left: `${pct(to + 1)}%` }}>
                        {a.name}
                      </span>
                    </div>
                  );
                })}
                <div className="relative h-6">
                  <span className={`absolute top-1/2 -translate-y-1/2 pr-2 ${mono} text-[12px] whitespace-nowrap text-(--archive-ink)`} style={{ right: `${100 / span}%` }}>
                    {research.lab.name}
                  </span>
                  <span className="absolute top-1/2 right-0 h-3 -translate-y-1/2 border border-dashed border-(--ink)" style={{ width: `${100 / span}%` }} />
                </div>
              </div>
            </div>
          </figure>

          {/* Las dos cabeceras del archivo */}
          <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid lg:grid-cols-12">
            {research.archive.map((a, i) => {
              const dark = i === 1;
              return (
                <article
                  key={a.name}
                  aria-labelledby={`archivo-${i}`}
                  className={`flex flex-col border-(--ink) px-5 py-8 sm:px-8 sm:py-10 ${
                    dark ? "bg-(--ink) text-(--card) lg:col-span-5" : "border-2 bg-(--card) lg:col-span-7"
                  }`}
                >
                  <div className={`flex flex-wrap justify-between gap-x-4 gap-y-1 border-b pb-2 ${mono} text-[12px] ${dark ? "border-[#8A8C86] text-[#C9CBC5]" : "border-(--ink) text-(--archive-ink)"}`}>
                    <span>{host(a.url)}</span>
                    <span>{a.years}</span>
                  </div>
                  <h3
                    id={`archivo-${i}`}
                    className={`mt-6 ${serif} leading-[0.86] tracking-[-0.025em] break-words ${
                      dark ? "text-[clamp(2.75rem,6.4vw,5.5rem)] text-white" : "text-[clamp(3rem,8.6vw,8rem)]"
                    }`}
                  >
                    {a.name}
                  </h3>
                  <p className={`mt-6 max-w-[44ch] text-[1.05rem] leading-[1.65] ${dark ? "text-[#E3E4DF]" : ""}`}>{a.text}</p>
                  <div className="mt-auto pt-8">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-11 items-center gap-2 ${mono} text-[14px] underline decoration-1 underline-offset-[6px] hover:decoration-2 ${
                      dark ? "text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" : `hover:decoration-(--red) ${focusRing}`
                    }`}
                  >
                    Abrir el archivo de {a.name}
                    <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Índice de temas + próximo número */}
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-(--ink) pt-3">
                <h3 className={`${serif} text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none`}>Temas del archivo</h3>
                <Prompt cmd="grep -r tema archivo/" />
              </div>
              <ul className="mt-4">
                {research.topics.map((t) => (
                  <li key={t} className="flex items-baseline gap-4 border-b border-dotted border-(--archive) py-4">
                    <span aria-hidden="true" className={`${mono} text-[13px] text-(--archive-ink)`}>›</span>
                    <span className={`${serif} text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.05]`}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <article aria-labelledby="lab-title" className="self-start border-2 border-dashed border-(--ink) p-6 sm:p-8 lg:col-span-4 lg:col-start-9">
              <p className={`${mono} text-[13px] text-(--archive-ink)`}>Próximo número</p>
              <h3 id="lab-title" className={`mt-4 ${serif} text-[clamp(2.4rem,4vw,3.5rem)] leading-[0.95]`}>
                {research.lab.name}
              </h3>
              <p className="mt-4 leading-[1.6]">{research.lab.text}</p>
              <p aria-hidden="true" className={`mt-6 ${mono} text-[13px]`}>
                ~/statex/lab $ <Cursor />
              </p>
              <div className="mt-4">
                <Pending>{research.lab.pending}</Pending>
              </div>
            </article>
          </div>
        </section>

        {/* ── Sobre StateX: texto + registro ───────────────── */}
        <section id="sobre" aria-labelledby="sobre-title" className={section}>
          <SectionHead id="sobre" name={sections.about} title={about.title} />
          <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="max-w-[48ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.7]">{about.text}</p>
              <div className="mt-8">
                <Pending>{about.pending}</Pending>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Prompt cmd="git log --reverse --oneline" />
              <ol className="mt-3 border-t border-(--ink)">
                {about.timeline.map((t) => (
                  <li key={t.year} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 border-b border-(--ink) py-5 sm:grid-cols-[7rem_1fr]">
                    <time dateTime={t.year} className={`${serif} text-[clamp(2rem,3.4vw,3rem)] leading-none`}>
                      {t.year}
                    </time>
                    <span className="leading-[1.55]">{t.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Contacto: plancha negra a sangre ─────────────── */}
        <section id="contacto" aria-labelledby="contacto-title" className="scroll-mt-0 bg-(--ink) text-(--card)">
          <div className={`${gutter} pt-[clamp(4.5rem,11vw,10rem)] pb-[clamp(5rem,11vw,10rem)]`}>
            <SectionHead id="contacto" name={sections.contact} title={contact.title} dark />
            <div className="mt-6">
              <Pending dark id="contacto-pendiente">{contact.pending}</Pending>
            </div>
            <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-px bg-[#3A3B38] md:grid-cols-2">
              {[contact.primary, contact.secondary].map((v, i) => (
                <div key={v.label} className="flex flex-col bg-(--ink) py-8 md:px-8 md:first:pl-0">
                  <h3 className={`${serif} text-[clamp(1.9rem,3vw,2.6rem)] leading-[1] text-white`}>{v.label}</h3>
                  <p className="mt-4 max-w-[44ch] leading-[1.65] text-[#E3E4DF]">{v.text}</p>
                  <div className="mt-auto pt-8">
                  <button
                    type="button"
                    aria-describedby="contacto-pendiente"
                    className={`inline-flex min-h-14 items-center px-7 ${mono} text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      i === 0 ? "bg-(--red) text-white hover:bg-[#B81F18]" : "border border-[#C9CBC5] text-white hover:bg-white hover:text-(--ink)"
                    }`}
                  >
                    {v.cta}
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={`${gutter} grid gap-x-8 gap-y-3 py-8 pb-24 ${mono} text-[12px] text-(--archive-ink) md:grid-cols-[auto_1fr_auto_auto] md:items-baseline`}>
        <Wordmark blink={false} className="text-[1.5rem] text-(--ink)" />
        <span>{brand.tagline}</span>
        <span>© {footer.year} {brand.name}</span>
        <span>{footer.legal}</span>
      </footer>

      <LabBar current="g" />
    </div>
  );
}
