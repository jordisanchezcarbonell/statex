import type { Metadata } from "next";
import Link from "next/link";
import { studies } from "../_site/content";
import { Shell } from "../_site/Shell";
import { display, focus, muted, wrap } from "../_site/ui";

export const metadata: Metadata = {
  title: "Investigación",
  description: "Estudios propios de StateX sobre seguridad web, con datos reales, metodología publicada y resultados agregados.",
  alternates: { canonical: "/investigacion" },
};

export default function ResearchIndex() {
  return (
    <Shell base="/">
      <section aria-labelledby="h-investigacion" className="pb-[clamp(5rem,10vw,8rem)] pt-36 sm:pt-44">
        <div className={wrap}>
          <h1 id="h-investigacion" className={`${display} m-0 max-w-[18ch] text-[clamp(2.2rem,5.6vw,5rem)]`}>Investigación</h1>
          <span aria-hidden="true" className="mt-10 block h-0.5 w-24 bg-(--h-red)" />
          <p className="m-0 mt-10 max-w-[56ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.55] text-(--h-ivory)/85">
            Estudios con datos reales y metodología publicada. Solo publicamos cifras agregadas: nunca resultados de una web concreta.
          </p>
          <ul className="m-0 mt-14 grid max-w-[68rem] list-none gap-0 p-0">
            {studies.map((s) => (
              <li key={s.slug} className="border-t border-(--h-line)">
                <Link href={`/investigacion/${s.slug}`} className={`group block py-7 ${focus}`}>
                  <span className={`block text-[14px] tabular-nums ${muted}`}>
                    <time dateTime={s.published}>{new Date(`${s.published}T12:00:00Z`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</time>
                  </span>
                  <span className="mt-2 block text-[clamp(1.2rem,2vw,1.6rem)] font-semibold leading-[1.25] underline decoration-transparent underline-offset-8 group-hover:decoration-(--h-red)">{s.title}</span>
                  <span className={`mt-3 block max-w-[64ch] leading-[1.6] ${muted}`}>{s.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}
