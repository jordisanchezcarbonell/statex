import Link from "next/link";
import { services, servicesSection as t } from "./content";
import { OfferLink } from "./ContactForm";
import { focus, muted } from "./ui";

const listItem = "grid grid-cols-[1rem_1fr] gap-3 leading-[1.5]";
const dash = <span aria-hidden="true" className="mt-[0.75em] h-px w-full bg-(--h-titanium)" />;

/** Tres servicios en filas editoriales: qué es, qué revisamos y qué recibes. La línea roja marca la fila activa. */
export function Services() {
  return (
    <>
      <ul className="m-0 mt-16 list-none border-b border-(--h-line) p-0 lg:mt-20">
        {services.map((s) => (
          <li key={s.id} className="group relative grid gap-10 border-t border-(--h-line) py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-(--h-red) transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
            />
            <div className="lg:col-span-5">
              <p className={`m-0 text-[13px] ${muted}`}>{s.short}</p>
              <h3 className="m-0 mt-4 max-w-[16ch] text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-balance">
                {s.name}
              </h3>
              <p className="m-0 mt-5 max-w-[42ch] text-[17px] leading-[1.6] text-(--h-ivory)/85">{s.summary}</p>
              {s.price && <p className="m-0 mt-5 text-[15px] tabular-nums">{s.price}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href={`/servicios/${s.slug}`}
                  className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 font-medium transition-colors hover:border-(--h-red) motion-reduce:transition-none ${focus}`}
                >
                  {t.more}
                  <span className="sr-only">: {s.name}</span>
                </Link>
                <OfferLink interest={s.id} className="text-(--h-ivory)/75 hover:text-(--h-ivory)">
                  {t.request}
                  <span className="sr-only"> {s.name.toLowerCase()}</span>
                </OfferLink>
              </div>
            </div>
            <div className="lg:col-span-4">
              <h4 className={`m-0 text-[14px] font-normal ${muted}`}>{s.scopeLabel}</h4>
              <ul className="m-0 mt-5 grid list-none gap-3 p-0">
                {s.scope.map((x) => (
                  <li key={x} className={listItem}>{dash}{x}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <h4 className={`m-0 text-[14px] font-normal ${muted}`}>{t.deliverablesLabel}</h4>
              <ul className="m-0 mt-5 grid list-none gap-3 p-0">
                {s.deliverables.map((x) => (
                  <li key={x} className={listItem}>{dash}{x}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <aside aria-labelledby="h-empezar" className="mt-12 grid gap-6 bg-(--h-graphite) p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-8">
          <h3 id="h-empezar" className="m-0 text-[1.25rem] font-semibold">{t.start.title}</h3>
          <p className={`m-0 mt-3 max-w-[64ch] leading-[1.6] ${muted}`}>{t.start.text}</p>
          <p className="m-0 mt-4 text-[15px] tabular-nums">{t.start.price}</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <OfferLink interest={t.start.interest} className="bg-(--h-ivory) px-6 text-(--h-ink) hover:bg-white">
            {t.start.cta}
          </OfferLink>
        </div>
      </aside>
    </>
  );
}
