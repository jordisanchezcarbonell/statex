import Link from "next/link";
import { areas, servicesSection as t } from "./content";
import { OfferLink } from "./ContactForm";
import { caps, focus, muted } from "./ui";

const listItem = "grid grid-cols-[1rem_1fr] gap-3 leading-[1.5]";
const dash = <span aria-hidden="true" className="mt-[0.75em] h-px w-full bg-(--h-titanium)" />;

/** Los dos productos principales, con su precio publicado. */
export function Products({ data = areas }: { data?: typeof areas }) {
  return (
    <ul className="m-0 mt-16 grid list-none gap-px bg-(--h-line) p-0 lg:mt-20 lg:grid-cols-2">
      {data.products.map((p) => (
        <li key={p.id} className="flex flex-col bg-(--h-graphite) p-7 sm:p-10">
          <h3 className={`m-0 max-w-[18ch] text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.05] tracking-[-0.02em] text-balance ${caps}`}>{p.name}</h3>
          <p className="m-0 mt-5 max-w-[52ch] leading-[1.6] text-(--h-ivory)/85">{p.summary}</p>
          {p.lines.length > 0 && (
            <ul className="m-0 mt-6 grid list-none gap-3 p-0">
              {p.lines.map((x) => (
                <li key={x} className={listItem}>{dash}{x}</li>
              ))}
            </ul>
          )}
          {p.price && <p className="m-0 mt-6 text-[17px] font-medium tabular-nums">{p.price}</p>}
          {p.note && <p className={`m-0 mt-2 text-[14px] ${muted}`}>{p.note}</p>}
          <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 pt-8">
            <OfferLink interest={p.interest} className="bg-(--h-ivory) px-6 text-(--h-ink) hover:bg-white">
              {p.cta}
            </OfferLink>
            <Link href={p.link.href} className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 hover:border-(--h-red) ${focus}`}>
              {p.link.label}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Complementos en filas editoriales: qué es, qué incluye y por dónde empezar. */
export function Areas({ data = areas }: { data?: typeof areas }) {
  return (
    <ul className="m-0 mt-5 list-none border-b border-(--h-line) p-0">
      {data.items.map((a) => (
        <li key={a.id} className="group relative grid gap-10 border-t border-(--h-line) py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <span
            aria-hidden="true"
            className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-(--h-red) transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
          />
          <div className="lg:col-span-5">
            <p className={`m-0 text-[13px] ${muted}`}>{a.descriptor}</p>
            <h4 className={`m-0 mt-4 max-w-[14ch] text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.02] tracking-[-0.02em] text-balance ${caps}`}>
              {a.name}
            </h4>
            <p className="m-0 mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-(--h-ivory)/85">{a.summary}</p>
          </div>
          <div className="lg:col-span-4">
            <p className={`m-0 text-[14px] ${muted}`}>{data.includesLabel}</p>
            <ul className="m-0 mt-5 grid list-none gap-3 p-0">
              {a.lines.map((x) => (
                <li key={x} className={listItem}>{dash}{x}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className={`m-0 text-[14px] ${muted}`}>{data.entryLabel}</p>
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

/** Compromisos comunes y la puerta de entrada para quien no sabe por dónde empezar. */
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

      <aside aria-labelledby="h-empezar" className="mt-12 flex flex-col bg-(--h-graphite) p-7 sm:p-10">
        <h3 id="h-empezar" className="m-0 text-[1.25rem] font-semibold">{t.start.title}</h3>
        <p className={`m-0 mt-3 max-w-[56ch] leading-[1.6] ${muted}`}>{t.start.text}</p>
        <p className="m-0 mt-4 text-[17px] font-medium tabular-nums">{t.start.price}</p>
        <div className="pt-8">
          <OfferLink interest={t.start.interest} className="bg-(--h-ivory) px-6 text-(--h-ink) hover:bg-white">
            {t.start.cta}
          </OfferLink>
        </div>
      </aside>
    </>
  );
}
