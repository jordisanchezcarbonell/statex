import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { brand, site, studies, team } from "../../_site/content";
import { JsonLd, Shell } from "../../_site/Shell";
import { display, focus, muted, wrap } from "../../_site/ui";
import { HeadersStudy } from "../_content/cabeceras-2026";

// Estudios propios: datos reales, metodología publicada y resultados solo agregados.
// Su metadato vive en studies de app/_site/content.ts.
const bodies: Record<string, ComponentType> = {
  "cabeceras-de-seguridad-2026": HeadersStudy,
};

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = studies.find((x) => x.slug === slug);
  if (!s) return {};
  const path = `/investigacion/${s.slug}`;
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: path },
    openGraph: { title: s.title, description: s.description, url: path, type: "article", locale: site.locale, siteName: brand.name, publishedTime: s.published },
  };
}

export default async function StudyPage({ params }: Props) {
  const { slug } = await params;
  const s = studies.find((x) => x.slug === slug);
  const Body = s && bodies[s.slug];
  if (!s || !Body) notFound();
  const url = `${site.url}/investigacion/${s.slug}`;
  const authors = team.founders.map((f) => f.name).join(" y ");
  const date = new Date(`${s.published}T12:00:00Z`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Report",
      headline: s.title,
      description: s.description,
      url,
      datePublished: s.published,
      inLanguage: "es",
      author: team.founders.map((f) => ({ "@type": "Person", name: f.name, sameAs: f.links.map((l) => l.url) })),
      publisher: { "@type": "Organization", name: brand.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: "Investigación", item: `${site.url}/investigacion` },
        { "@type": "ListItem", position: 3, name: s.title, item: url },
      ],
    },
  ];

  return (
    <Shell base="/">
      <JsonLd data={jsonLd} />
      <article aria-labelledby="h-estudio" className="pb-[clamp(5rem,10vw,8rem)] pt-36 sm:pt-44">
        <div className={wrap}>
          <nav aria-label="Ruta de navegación">
            <ol className={`m-0 flex list-none flex-wrap gap-x-2 p-0 text-[14px] ${muted}`}>
              <li><Link href="/" className={`hover:text-(--h-ivory) ${focus}`}>Inicio</Link> /</li>
              <li><Link href="/investigacion" className={`hover:text-(--h-ivory) ${focus}`}>Investigación</Link> /</li>
              <li aria-current="page" className="text-(--h-ivory)/85">{s.short}</li>
            </ol>
          </nav>
          <p className={`m-0 mt-10 text-[14px] ${muted}`}>Estudio</p>
          <h1 id="h-estudio" className={`${display} m-0 mt-3 max-w-[22ch] text-[clamp(2rem,4.8vw,4rem)]`}>{s.title}</h1>
          <span aria-hidden="true" className="mt-10 block h-0.5 w-24 bg-(--h-red)" />
          <p className={`m-0 mt-8 text-[14px] ${muted}`}>
            Por {authors} · <time dateTime={s.published}>{date}</time>
            {s.pdf && (
              <>
                {" · "}
                <a href={s.pdf} className={`underline underline-offset-4 hover:text-(--h-ivory) ${focus}`}>Resumen en PDF</a>
              </>
            )}
          </p>

          <div className="mt-12">
            <Body />
          </div>

          <aside aria-labelledby="h-estudio-cta" className="mt-20 grid gap-6 bg-(--h-graphite) p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-8">
              <h2 id="h-estudio-cta" className="m-0 text-[1.35rem] font-semibold">¿Quieres saber cómo están tus webs?</h2>
              <p className={`m-0 mt-3 max-w-[60ch] leading-[1.6] ${muted}`}>
                Cuéntanos qué quieres revisar y te enviamos una propuesta cerrada en 48 horas laborables. Cualquier revisión empieza con una autorización firmada por el titular de cada web.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link href="/#contacto" className={`inline-flex min-h-12 items-center bg-(--h-ivory) px-6 font-medium text-(--h-ink) hover:bg-white ${focus}`}>
                Solicitar evaluación
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </Shell>
  );
}
