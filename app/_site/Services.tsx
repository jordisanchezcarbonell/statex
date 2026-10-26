import Link from "next/link";
import { areas, servicesSection as t } from "./content";
import { OfferLink } from "./ContactForm";
import { caps, focus, muted } from "./ui";

const listItem = "grid grid-cols-[1rem_1fr] gap-3 leading-[1.5]";
const dash = <span aria-hidden="true" className="mt-[0.75em] h-px w-full bg-(--h-titanium)" />;

/** Tres áreas en filas editoriales: qué es, qué incluye y por dónde empezar (servicios con precio). */
export function Areas({ data = areas }: { data?: typeof areas }) {
  return (
    <ul className="m-0 mt-16 list-none border-b border-(--h-line) p-0 lg:mt-20">
      {data.items.map((a) => (
        <li key={a.id} className="group relative grid gap-10 border-t border-(--h-line) py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <span
            aria-hidden="true"
            className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-(--h-red) transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
          />
          <div className="lg:col-span-5">
            <p className={`m-0 text-[13px] ${muted}`}>{a.descriptor}</p>
            <h3 lang="en" className={`m-0 mt-4 max-w-[14ch] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.02] tracking-[-0.02em] text-balance ${caps}`}>
              {a.name}
            </h3>
            <p className="m-0 mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-(--h-ivory)/85">{a.summary}</p>
          </div>
          <div className="lg:col-span-4">
            <h4 className={`m-0 text-[14px] font-normal ${muted}`}>{data.includesLabel}</h4>
            <ul className="m-0 mt-5 grid list-none gap-3 p-0">
              {a.lines.map((x) => (
                <li key={x} className={listItem}>{dash}{x}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className={`m-0 text-[14px] font-normal ${muted}`}>{data.entryLabel}</h4>
            <ul className="m-0 mt-5 grid list-none gap-5 p-0">
              {a.entries.map((s) => (
                <li key={s.id}>
                  <Link href={`/servicios/${s.slug}`} className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 font-medium transition-colors hover:border-(--h-red) motion-reduce:transition-none ${focus}`}>
                    {s.name}
                  </Link>
                  {s.price && <p className={`m-0 mt-1 text-[14px] tabular-nums ${muted}`}>{s.price}</p>}
                </li>
              ))}
              {a.entries.length === 0 && (
                <li>
                  <OfferLink interest={t.start.interest} className="border-b border-(--h-ivory)/40 hover:border-(--h-red)">
                    {t.start.cta}
                  </OfferLink>
                  <p className={`m-0 mt-1 text-[14px] tabular-nums ${muted}`}>{t.start.price}</p>
                </li>
              )}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Compromisos comunes y las dos puertas de entrada (evaluación inicial y pack para agencias). */
export function ServiceExtras() {
  return (
    <>
      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <h3 className={`m-0 text-[14px] font-normal lg:col-span-3 ${muted}`}>{t.commitmentsLabel}</h3>
        <ul className="m-0 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
          {t.commitments.map((c) => (
            <li key={c.name} className="border-t border-(--h-line) pt-5">
              <p className="m-0 font-semibold">{c.name}</p>
              <p className={`m-0 mt-2 text-[15px] leading-[1.55] ${muted}`}>{c.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Dos puertas de entrada: quien no sabe por dónde empezar y las agencias */}
      <div className="mt-12 grid gap-px bg-(--h-line) lg:grid-cols-2">
        {[
          { id: "h-empezar", ...t.start, note: undefined as string | undefined, sample: undefined as { label: string; href: string } | undefined },
          { id: "h-agencias", ...t.agencies },
        ].map((b) => (
          <aside key={b.id} aria-labelledby={b.id} className="flex flex-col bg-(--h-graphite) p-7 sm:p-10">
            <h3 id={b.id} className="m-0 text-[1.25rem] font-semibold">{b.title}</h3>
            <p className={`m-0 mt-3 max-w-[56ch] leading-[1.6] ${muted}`}>{b.text}</p>
            <p className="m-0 mt-4 text-[17px] font-medium tabular-nums">{b.price}</p>
            {b.note && <p className={`m-0 mt-2 text-[14px] ${muted}`}>{b.note}</p>}
            <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 pt-8">
              <OfferLink interest={b.interest} className="bg-(--h-ivory) px-6 text-(--h-ink) hover:bg-white">
                {b.cta}
              </OfferLink>
              {b.sample && (
                <a href={b.sample.href} className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 hover:border-(--h-red) ${focus}`}>
                  {b.sample.label}
                </a>
              )}
            </div>
          </aside>
        ))}
      </div>
    </>
  );
}
