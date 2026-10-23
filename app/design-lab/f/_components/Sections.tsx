import { ExternalLink } from "lucide-react";
import {
  about,
  approach,
  brand,
  contact,
  footer,
  problem,
  research,
  sections,
  technology,
} from "../../content";
import { ApproachSteps } from "./ApproachSteps";
import { LensMark } from "./LensMark";
import { SolutionBento } from "./SolutionBento";

export const shell = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
const pending =
  "inline-flex max-w-full rounded-lg border border-dashed px-3 py-1.5 text-[14px] leading-snug";
const pendingLight = `${pending} border-(--cobalto)/45 bg-white/70 text-(--cobalto)`;
const pendingDark = `${pending} border-(--hielo)/45 bg-(--tinta)/60 text-(--hielo)`;

function SectionHead({
  id,
  title,
  lead,
  intro,
  dark = false,
}: {
  id: string;
  title: string;
  lead: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
      <h2
        id={id}
        className={`text-[clamp(2.75rem,7.4vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.055em] lg:col-span-12 ${
          dark ? "text-white" : "text-(--tinta)"
        }`}
      >
        {title}
      </h2>
      <p
        className={`max-w-[22ch] text-[clamp(1.5rem,2.8vw,2.375rem)] font-medium leading-[1.12] tracking-[-0.03em] [text-wrap:balance] lg:col-span-7 ${
          dark ? "text-(--lavanda)" : "text-(--cobalto)"
        }`}
      >
        {lead}
      </p>
      {intro && (
        <p
          className={`max-w-[44ch] text-[17px] leading-[1.6] sm:text-[18px] lg:col-span-5 lg:self-end ${
            dark ? "text-white/85" : "text-(--gris)"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ───────────── #problema: sobre el campo caótico (oscuro) ───────────── */

export function ProblemSection() {
  return (
    <section
      id="problema"
      aria-labelledby="f-problem-title"
      className="f-dark scroll-mt-16 bg-(--tinta) pb-28 pt-36 text-white group-data-[gl=ready]/stage:bg-transparent md:pb-40 md:pt-44"
    >
      <div className={shell}>
        <SectionHead id="f-problem-title" title={sections.problem} lead={problem.title} intro={problem.intro} dark />
        <ul className="mt-16 grid gap-3 sm:grid-cols-2 md:mt-24 lg:gap-4">
          {problem.risks.map((r) => (
            <li
              key={r.name}
              className="rounded-2xl border border-white/12 bg-(--tinta)/80 p-6 backdrop-blur-[2px] sm:p-8"
            >
              <h3 className="text-[clamp(1.25rem,1.8vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-white">
                {r.name}
              </h3>
              <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.6] text-white/80">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── #enfoque: sobre el campo ordenado (claro) ───────────── */

export function ApproachSection() {
  return (
    <section
      id="enfoque"
      aria-labelledby="f-approach-title"
      className="scroll-mt-16 bg-(--nieve) pb-28 pt-36 group-data-[gl=ready]/stage:bg-transparent md:pb-40 md:pt-44"
    >
      <div className={shell}>
        <SectionHead id="f-approach-title" title={sections.approach} lead={approach.title} intro={approach.intro} />
        <div className="mt-16 md:mt-24">
          <ApproachSteps />
        </div>
      </div>
    </section>
  );
}

/* ───────────── #soluciones ───────────── */

export function SolutionsSection() {
  return (
    <section
      id="soluciones"
      aria-labelledby="f-solutions-title"
      className="scroll-mt-16 border-t border-(--tinta)/8 bg-(--nieve) py-24 md:py-36"
    >
      <div className={shell}>
        <h2
          id="f-solutions-title"
          className="mb-12 text-[clamp(2.75rem,7.4vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-(--tinta) md:mb-16"
        >
          {sections.solutions}
        </h2>
        <SolutionBento />
      </div>
    </section>
  );
}

/* ───────────── #tecnologia: suelo firme frente a curvas aún sin trazar ───────────── */

export function TechnologySection() {
  return (
    <section
      id="tecnologia"
      aria-labelledby="f-tech-title"
      className="scroll-mt-16 border-t border-(--tinta)/8 bg-white py-24 md:py-36"
    >
      <div className={shell}>
        <SectionHead id="f-tech-title" title={sections.technology} lead={technology.title} intro={technology.intro} />

        <div className="mt-16 grid gap-4 md:mt-24 lg:grid-cols-2">
          {/* Disponible hoy: sólido, relleno, sin ambigüedad. */}
          <div className="rounded-[24px] border border-(--tinta)/12 bg-(--nieve) p-6 sm:p-10">
            <h3 className="flex items-center gap-3 text-[22px] font-semibold tracking-[-0.025em] text-(--tinta)">
              <span aria-hidden="true" className="size-3 rounded-full bg-(--cobalto)" />
              {technology.today.label}
            </h3>
            <ul className="mt-8 grid gap-5">
              {technology.today.items.map((it) => (
                <li key={it} className="flex gap-4 border-t border-(--tinta)/10 pt-5 text-[17px] leading-[1.55] text-(--tinta)">
                  <span aria-hidden="true" className="mt-[0.55em] h-[2px] w-5 shrink-0 bg-(--cobalto)" />
                  {it}
                </li>
              ))}
            </ul>
            <p className={`${pendingLight} mt-8`}>{technology.today.pending}</p>
          </div>

          {/* Visión: contorno discontinuo, curvas de nivel aún sin trazar. */}
          <div className="relative isolate overflow-hidden rounded-[24px] border-2 border-dashed border-(--violeta)/45 p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_100%_0%,black,transparent_70%)]"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle at 100% 0%, transparent 0 22px, rgb(122 92 255 / 0.28) 22px 23px)",
              }}
            />
            <h3 className="flex items-center gap-3 text-[22px] font-semibold tracking-[-0.025em] text-(--tinta)">
              <span aria-hidden="true" className="size-3 rounded-full border-2 border-dashed border-(--violeta)" />
              {technology.roadmap.label}
            </h3>
            <ul className="mt-8 grid gap-5">
              {technology.roadmap.items.map((it) => (
                <li key={it} className="flex gap-4 border-t border-dashed border-(--violeta)/35 pt-5 text-[17px] leading-[1.55] text-(--gris)">
                  <span aria-hidden="true" className="mt-[0.55em] h-0 w-5 shrink-0 border-t-2 border-dotted border-(--violeta)" />
                  {it}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[15px] font-medium text-[#5b3fe0]">{technology.roadmap.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── #investigacion: archivo real ───────────── */

export function ResearchSection() {
  return (
    <section
      id="investigacion"
      aria-labelledby="f-research-title"
      className="scroll-mt-16 border-t border-(--tinta)/8 bg-(--nieve) py-24 md:py-36"
    >
      <div className={shell}>
        <SectionHead id="f-research-title" title={sections.research} lead={research.title} intro={research.intro} />

        <ul className="mt-16 border-b border-(--tinta)/12 md:mt-24">
          {research.archive.map((a) => (
            <li
              key={a.name}
              className="grid gap-x-10 gap-y-4 border-t border-(--tinta)/12 py-8 md:py-10 lg:grid-cols-12 lg:items-baseline"
            >
              <h3 className="text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-none tracking-[-0.05em] text-(--tinta) lg:col-span-5">
                {a.name}
              </h3>
              <p className="text-[17px] font-medium tabular-nums text-(--cobalto) lg:col-span-2">{a.years}</p>
              <p className="max-w-[48ch] text-[16px] leading-[1.6] text-(--gris) lg:col-span-3">{a.text}</p>
              <p className="lg:col-span-2 lg:text-right">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--tinta)/20 px-4 text-[15px] font-medium text-(--tinta) transition-colors hover:border-(--tinta) hover:bg-white"
                >
                  Abrir {a.name}
                  <ExternalLink aria-hidden="true" className="size-4" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-(--tinta)">Temas del archivo</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {research.topics.map((t) => (
                <li key={t} className="rounded-full border border-(--tinta)/12 bg-white px-4 py-2 text-[15px] text-(--tinta)">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="f-dark relative isolate overflow-hidden rounded-[24px] bg-(--tinta) p-6 text-white sm:p-8 lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_100%_100%,black,transparent_70%)]"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle at 100% 100%, transparent 0 15px, rgb(191 230 255 / 0.22) 15px 16px), repeating-radial-gradient(circle at 70% 120%, transparent 0 17px, rgb(185 168 255 / 0.2) 17px 18px)",
              }}
            />
            <h3 className="text-[24px] font-semibold tracking-[-0.03em]">{research.lab.name}</h3>
            <p className="mt-2 text-[16px] text-white/85">{research.lab.text}</p>
            <p className={`${pendingDark} mt-6`}>{research.lab.pending}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── #sobre: texto + línea temporal ───────────── */

export function AboutSection() {
  const last = about.timeline.length - 1;
  return (
    <section id="sobre" aria-labelledby="f-about-title" className="scroll-mt-16 border-t border-(--tinta)/8 bg-white py-24 md:py-36">
      <div className={shell}>
        <SectionHead id="f-about-title" title={sections.about} lead={about.title} intro={about.text} />

        <ol className="relative mt-16 grid gap-0 md:mt-24 lg:grid-cols-4">
          {about.timeline.map((t, i) => (
            <li key={t.year} className="relative border-l border-(--tinta)/15 pb-10 pl-8 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-10">
              <span
                aria-hidden="true"
                className={`absolute -left-[7px] top-1 size-3.5 rounded-full lg:-top-[7px] lg:left-0 ${
                  i === last ? "bg-[linear-gradient(135deg,var(--cobalto),var(--violeta))]" : "border-2 border-(--cobalto) bg-white"
                }`}
              />
              <p className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums text-(--tinta)">
                {t.year}
              </p>
              <p className="mt-3 max-w-[30ch] text-[16px] leading-[1.55] text-(--gris)">{t.text}</p>
            </li>
          ))}
        </ol>
        <p className={`${pendingLight} mt-6`}>{about.pending}</p>
      </div>
    </section>
  );
}

/* ───────────── #contacto ───────────── */

export function ContactSection() {
  const routes = [contact.primary, contact.secondary];
  return (
    <section id="contacto" aria-labelledby="f-contact-title" className="scroll-mt-16 bg-white pb-24 md:pb-32">
      <div className={shell}>
        <div className="rounded-[32px] bg-[linear-gradient(120deg,var(--cobalto),var(--violeta)_35%,rgb(122_92_255/0.15)_70%,rgb(44_75_255/0.5))] p-px md:rounded-[44px]">
          <div className="f-dark relative isolate overflow-hidden rounded-[31px] bg-(--tinta) px-6 py-16 sm:px-10 md:rounded-[43px] md:px-16 md:py-24">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_85%_15%,black,transparent_65%)]"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle at 92% 8%, transparent 0 21px, rgb(44 75 255 / 0.35) 21px 22px), repeating-radial-gradient(circle at 70% 40%, transparent 0 23px, rgb(122 92 255 / 0.28) 23px 24px)",
              }}
            />
            <h2
              id="f-contact-title"
              className="text-[clamp(2.75rem,7.4vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white"
            >
              {sections.contact}
            </h2>
            <p className="mt-6 max-w-[22ch] text-[clamp(1.5rem,2.8vw,2.375rem)] font-medium leading-[1.12] tracking-[-0.03em] text-(--lavanda) [text-wrap:balance]">
              {contact.title}
            </p>

            <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
              {routes.map((r, i) => (
                <li key={r.label} className="flex flex-col rounded-[22px] border border-white/14 bg-white/[0.04] p-6 sm:p-8">
                  <h3 className="text-[22px] font-semibold tracking-[-0.025em] text-white">{r.label}</h3>
                  <p className="mt-3 max-w-[40ch] flex-1 text-[16px] leading-[1.6] text-white/85">{r.text}</p>
                  <button
                    type="button"
                    aria-describedby="f-contact-pending"
                    className={`mt-8 inline-flex min-h-12 cursor-pointer items-center self-start rounded-full px-6 text-[16px] font-medium transition-colors duration-300 ${
                      i === 0
                        ? "bg-white text-(--tinta) hover:bg-(--hielo)"
                        : "border border-white/35 text-white hover:border-white hover:bg-white/10"
                    }`}
                  >
                    {r.cta}
                  </button>
                </li>
              ))}
            </ul>
            <p id="f-contact-pending" className={`${pendingDark} mt-8`}>
              {contact.pending}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-(--tinta)/8 bg-white pb-28 pt-10">
      <div className={`${shell} flex flex-col gap-3 text-[14px] text-(--gris) md:flex-row md:items-center md:justify-between`}>
        <p className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.04em] text-(--tinta)">
          <LensMark className="size-5" />
          {brand.name}
        </p>
        <p>{brand.tagline}</p>
        <p>
          © {footer.year} {brand.name}
        </p>
        <p>{footer.legal}</p>
      </div>
    </footer>
  );
}
