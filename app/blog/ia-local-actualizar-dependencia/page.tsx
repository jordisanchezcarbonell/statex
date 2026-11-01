import type { Metadata } from "next";
import Link from "next/link";
import { brand, site } from "../../_site/content";
import { JsonLd, Shell } from "../../_site/Shell";
import { display, focus, muted, wrap } from "../../_site/ui";
import { localAiPost as post } from "../content";
import { Article } from "./Article";

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  authors: [{ name: post.author }],
  alternates: { canonical: post.path },
  openGraph: { title: post.title, description: post.description, url: post.path, type: "article", locale: site.locale, siteName: brand.name, authors: [post.author] },
  twitter: { card: "summary_large_image", title: post.title, description: post.description },
};

export default function LocalAiArticle() {
  return (
    <Shell base="/">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description,
        author: { "@type": "Person", name: post.author }, publisher: { "@type": "Organization", name: brand.name, url: site.url },
        inLanguage: "es", dateCreated: post.date, mainEntityOfPage: `${site.url}${post.path}`, url: `${site.url}${post.path}` }} />
      <article aria-labelledby="post-title" className="pb-28 pt-36 sm:pt-44">
        <div className={wrap}>
          <nav aria-label="Ruta de navegación" className={`text-sm ${muted}`}><Link href="/" className={focus}>Inicio</Link> / <Link href="/blog" className={focus}>Blog</Link> / <span aria-current="page">IA local y dependencias</span></nav>
          <h1 id="post-title" className={`${display} mb-0 mt-10 max-w-[26ch] text-[clamp(2rem,4.8vw,4rem)]`}>{post.title}</h1>
          <span aria-hidden="true" className="mt-10 block h-0.5 w-24 bg-(--h-red)" />
          <p className={`mt-8 text-sm ${muted}`}>Por {post.author} · <time dateTime={post.date}>{post.dateLabel}</time> · Laboratorio</p>
          <Article />
          <Link href="/blog" className={`mt-16 inline-flex min-h-11 items-center border-b border-(--h-line) ${focus}`}>Volver al blog</Link>
        </div>
      </article>
    </Shell>
  );
}
