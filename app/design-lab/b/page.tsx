import { DM_Mono, DM_Sans } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { LabBar } from "../_shared/LabBar";
import {
  about,
  brand,
  complementary,
  contact,
  cta,
  footer,
  hero,
  research,
  sections,
  technology,
} from "../content";
import { Header } from "./_components/Header";
import { Wordmark } from "./_components/Logo";
import { ProblemApproach } from "./_components/ProblemApproach";
import { SectionHeading } from "./_components/SectionHeading";
import { SolutionTabs } from "./_components/SolutionTabs";
import { TodayVisual, VisionVisual } from "./_components/StaticVisuals";
import { SurfaceGraph } from "./_components/SurfaceGraph";
import { btnGhost, btnPrimary, mono, ring, ringDark, shell, tokens } from "./_components/ui";

export const metadata = { title: "Concept B" };

const sans = DM_Sans({ subsets: ["latin", "latin-ext"], axes: ["opsz"], display: "swap", variable: "--f-sans" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--f-mono" });

const pending = `inline-flex max-w-full items-center rounded-md border border-dashed border-(--muted)/50 px-2.5 py-1 text-[13px] text-(--muted) ${mono}`;

// Línea de tiempo del archivo: años reales de content.ts.
const FIRST = 2012;
const LAST = 2026;
const SPAN = LAST - FIRST + 1;
const years = (r: string) => {
  const [a, b] = r.split("–").map((s) => Number(s.trim()));
  return { from: a, to: b || a };
};
const axis = [2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];

export default function ConceptB() {
  return (
    <div
      style={tokens}
      className={`${sans.variable} ${dmMono.variable} min-h-screen overflow-x-clip bg-white font-(family-name:--f-sans) text-[16px] text-(--navy) antialiased selection:bg-(--sky)/25`}
    >
      <a
        href="#contenido"
        className={`fixed top-3 left-3 z-[60] -translate-y-24 rounded-lg bg-(--navy) px-4 py-2.5 text-[14px] font-semibold text-white focus:translate-y-0 ${ringDark}`}
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        {/* Hero */}
        <section id="inicio" aria-labelledby="b-hero" className="scroll-mt-20 bg-(--fog)">
          <div
            className={`${shell} grid items-center gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-[minmax(0,4.6fr)_minmax(0,7.4fr)] lg:gap-12 lg:pt-24 lg:pb-28 xl:gap-16`}
          >
            <div className="min-w-0">
              <h1
                id="b-hero"
                className="max-w-[16ch] text-[clamp(2.4rem,1.4rem+3.6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-(--navy) lg:text-[clamp(2.4rem,0.6rem+2.9vw,3.9rem)]"
              >
                {hero.title}
              </h1>
              <p className="mt-7 max-w-[50ch] text-[18px] leading-relaxed text-(--muted) sm:text-[19px]">{hero.body}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#contacto" className={btnPrimary}>
                  {cta.primary}
                </a>
                <a href="#soluciones" className={btnGhost}>
                  {cta.explore}
                </a>
              </div>
            </div>
            <SurfaceGraph />
          </div>
        </section>

        <ProblemApproach />

        {/* Soluciones */}
        <section id="soluciones" aria-labelledby="b-soluciones" className="scroll-mt-20 bg-(--fog) py-20 sm:py-24 lg:py-32">
          <div className={shell}>
            <SectionHeading id="b-soluciones" label={sections.solutions} className="mb-12 lg:mb-16" />
            <SolutionTabs />

            <div className="mt-10 grid gap-4 border-t border-(--edge) pt-8 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-10">
              <p className="text-[14px] font-medium text-(--muted)">{complementary.label}</p>
              <div>
                <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{complementary.name}</h3>
                <p className="mt-2 max-w-[60ch] text-[16px] leading-relaxed text-(--muted)">{complementary.text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnología */}
        <section id="tecnologia" aria-labelledby="b-tecnologia" className="scroll-mt-20 py-20 sm:py-24 lg:py-32">
          <div className={shell}>
            <SectionHeading id="b-tecnologia" label={sections.technology} title={technology.title} intro={technology.intro} />

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
              <article aria-labelledby="b-hoy" className="flex flex-col rounded-[18px] border border-(--line) bg-white">
                <div className="border-b border-(--line) p-6 sm:p-8">
                  <h3 id="b-hoy" className="inline-flex items-center gap-2.5 text-[15px] font-semibold">
                    <span aria-hidden="true" className="size-2.5 rounded-full bg-(--sky-ink)" />
                    {technology.today.label}
                  </h3>
                  <div className="mt-6 rounded-xl bg-(--fog) px-4 py-5">
                    <TodayVisual />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
                  <ul className="grid gap-4">
                    {technology.today.items.map((t) => (
                      <li key={t} className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 text-[16px] leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.55em] size-2 rounded-[2px] bg-(--navy)" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto">
                    <span className={pending}>{technology.today.pending}</span>
                  </p>
                </div>
              </article>

              <article
                aria-labelledby="b-vision"
                className="flex flex-col rounded-[18px] border-[1.5px] border-dashed border-(--muted)/45 bg-(--fog)/50"
              >
                <div className="border-b border-dashed border-(--muted)/35 p-6 sm:p-8">
                  <h3
                    id="b-vision"
                    className="inline-flex items-center gap-2.5 rounded-full border border-dashed border-(--muted)/60 px-3 py-1 text-[15px] font-semibold text-(--muted)"
                  >
                    <span aria-hidden="true" className="size-2.5 rounded-full border-[1.5px] border-dashed border-(--muted)" />
                    {technology.roadmap.label}
                  </h3>
                  <div className="mt-6 rounded-xl border border-dashed border-(--muted)/30 px-4 py-5 opacity-50">
                    <VisionVisual />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
                  <ul className="grid gap-4 text-(--muted)">
                    {technology.roadmap.items.map((t) => (
                      <li key={t} className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 text-[16px] leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.55em] size-2 rounded-[2px] border border-dashed border-(--muted)" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-l-2 border-(--navy) pl-3 text-[15px] font-medium text-(--navy)">
                    {technology.roadmap.note}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Investigación */}
        <section id="investigacion" aria-labelledby="b-investigacion" className="scroll-mt-20 bg-(--fog) py-20 sm:py-24 lg:py-32">
          <div className={shell}>
            <SectionHeading id="b-investigacion" label={sections.research} title={research.title} intro={research.intro} />

            <div className="mt-14 overflow-hidden rounded-[18px] border border-(--line) bg-white">
              {/* Eje de años (solo escritorio; en móvil cada fila muestra sus años) */}
              <div
                aria-hidden="true"
                className="hidden border-b border-(--line) md:grid md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]"
              >
                <span className="px-6 py-3 text-[12px] font-medium text-(--muted) lg:px-8">Proyecto</span>
                <span className="relative mr-6 h-10 lg:mr-8">
                  {axis.map((y) => (
                    <span
                      key={y}
                      className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11.5px] text-(--muted) ${mono}`}
                      style={{ left: `${((y - FIRST + 0.5) / SPAN) * 100}%` }}
                    >
                      {y}
                    </span>
                  ))}
                </span>
              </div>

              <ul>
                {research.archive.map((a, i) => {
                  const { from, to } = years(a.years);
                  return (
                    <li
                      key={a.name}
                      className="grid gap-4 border-b border-(--line) px-6 py-7 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-0 md:px-0 md:py-0 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]"
                    >
                      <div className="md:px-6 md:py-7 lg:px-8">
                        <h3 className="text-[19px] font-semibold tracking-[-0.015em]">
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 rounded-sm text-(--sky-ink) underline decoration-(--sky-ink)/35 underline-offset-4 hover:decoration-(--sky-ink) ${ring}`}
                          >
                            {a.name}
                            <ArrowUpRight size={16} aria-hidden="true" />
                            <span className="sr-only">(se abre en una pestaña nueva)</span>
                          </a>
                        </h3>
                        <p className={`mt-1 text-[13px] text-(--navy) ${mono}`}>{a.years}</p>
                        <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-(--muted)">{a.text}</p>
                      </div>
                      <Track>
                        <span
                          className={`absolute top-1/2 h-3 -translate-y-1/2 rounded-full ${i === 0 ? "bg-(--navy)" : "bg-(--navy)/55"}`}
                          style={{ left: `${((from - FIRST) / SPAN) * 100}%`, width: `${((to - from + 1) / SPAN) * 100}%` }}
                        />
                      </Track>
                    </li>
                  );
                })}
                <li className="grid gap-4 px-6 py-7 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-0 md:px-0 md:py-0 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
                  <div className="md:px-6 md:py-7 lg:px-8">
                    <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{research.lab.name}</h3>
                    <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-(--muted)">{research.lab.text}</p>
                    <p className="mt-4">
                      <span className={pending}>{research.lab.pending}</span>
                    </p>
                  </div>
                  <Track>
                    <span
                      className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-(--sky-ink) bg-white"
                      style={{ left: `${((LAST - FIRST) / SPAN) * 100}%`, width: `${(1 / SPAN) * 100}%` }}
                    />
                  </Track>
                </li>
              </ul>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-10">
              <h3 className="text-[14px] font-medium text-(--muted)">Temas del archivo</h3>
              <ul className="flex flex-wrap gap-2">
                {research.topics.map((t) => (
                  <li key={t} className="rounded-full border border-(--edge) bg-white px-3.5 py-1.5 text-[14px]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Sobre StateX */}
        <section id="sobre" aria-labelledby="b-sobre" className="scroll-mt-20 py-20 sm:py-24 lg:py-32">
          <div className={`${shell} grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20`}>
            <div>
              <SectionHeading id="b-sobre" label={sections.about} title={about.title} />
              <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-(--muted)">{about.text}</p>
              <p className="mt-8">
                <span className={pending}>{about.pending}</span>
              </p>
            </div>
            <ol className="relative self-end">
              <span aria-hidden="true" className="absolute top-3 bottom-3 left-[5px] w-px bg-(--line)" />
              {about.timeline.map((t, i) => {
                const last = i === about.timeline.length - 1;
                return (
                  <li key={t.year} className="relative grid grid-cols-[1.5rem_4.5rem_minmax(0,1fr)] items-baseline gap-2 py-4">
                    <span
                      aria-hidden="true"
                      className={`relative top-[1px] size-[11px] self-center rounded-full ring-2 ${last ? "bg-(--sky) ring-(--sky-ink)" : "bg-white ring-(--navy)"}`}
                    />
                    <span className={`text-[17px] font-medium ${mono}`}>{t.year}</span>
                    <span className={`text-[16px] leading-relaxed ${last ? "font-semibold text-(--navy)" : "text-(--muted)"}`}>{t.text}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" aria-labelledby="b-contacto" className="scroll-mt-20 bg-(--navy) py-20 text-white sm:py-24 lg:py-32">
          <div className={shell}>
            <SectionHeading id="b-contacto" label={sections.contact} title={contact.title} tone="dark" />
            <div className="mt-14 grid border-t border-white/15 md:grid-cols-2">
              {[contact.primary, contact.secondary].map((r, i) => (
                <div
                  key={r.label}
                  className={`flex flex-col gap-6 py-10 ${i === 0 ? "md:pr-10 lg:pr-16" : "border-t border-white/15 md:border-t-0 md:border-l md:pl-10 lg:pl-16"}`}
                >
                  <div>
                    <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{r.label}</h3>
                    <p className="mt-3 max-w-[44ch] text-[17px] leading-relaxed text-[#C3CADB]">{r.text}</p>
                  </div>
                  <div className="mt-auto">
                    <button
                      type="button"
                      aria-describedby="b-contacto-pendiente"
                      className={
                        i === 0
                          ? `inline-flex min-h-12 items-center rounded-[10px] bg-(--sky) px-6 text-[16px] font-semibold text-(--navy) transition-colors hover:bg-[#6AA6FF] ${ringDark}`
                          : `inline-flex min-h-12 items-center rounded-[10px] border border-white/40 px-6 text-[16px] font-semibold text-white transition-colors hover:border-white ${ringDark}`
                      }
                    >
                      {r.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p
              id="b-contacto-pendiente"
              className={`mt-4 inline-flex rounded-md border border-dashed border-white/45 px-2.5 py-1 text-[13px] text-[#C3CADB] ${mono}`}
            >
              {contact.pending}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-(--navy) pt-12 pb-28 text-[#C3CADB]">
        <div className={`${shell} flex flex-col gap-6 md:flex-row md:items-end md:justify-between`}>
          <div>
            <Wordmark tone="dark" className="text-[28px]" />
            <p className="mt-3 text-[15px]">{brand.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 text-[14px] md:items-end">
            <p>
              © {footer.year} {brand.name}
            </p>
            <p className={`text-[13px] ${mono}`}>{footer.legal}</p>
          </div>
        </div>
      </footer>

      <LabBar current="b" />
    </div>
  );
}

function Track({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className="relative h-8 md:mr-6 md:h-auto lg:mr-8">
      <span
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, var(--line) 1px, transparent 1px)",
          backgroundSize: `${100 / SPAN}% 100%`,
        }}
      />
      {children}
    </div>
  );
}
