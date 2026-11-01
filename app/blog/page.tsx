import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "../_site/Shell";
import { display, focus, muted, wrap } from "../_site/ui";
import { localAiPost as post } from "./content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Experimentos y decisiones de ingeniería de seguridad, con resultados observados y límites explícitos.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog · StateX", description: "Experimentos y decisiones de ingeniería de seguridad.", url: "/blog", type: "website" },
};

export default function BlogPage() {
  return (
    <Shell base="/">
      <section className="pb-28 pt-36 sm:pt-44" aria-labelledby="blog-title">
        <div className={wrap}>
          <h1 id="blog-title" className={`${display} m-0 text-[clamp(3rem,8vw,7rem)]`}>Blog</h1>
          <p className={`mt-8 max-w-[54ch] text-xl leading-relaxed ${muted}`}>Experimentos de seguridad y decisiones de ingeniería. Qué probamos, qué observamos y qué queda sin demostrar.</p>
          <div className="mt-16 max-w-[68rem] border-t border-(--h-line)">
            <article className="py-9">
              <p className={`m-0 text-sm ${muted}`}>Laboratorio · <time dateTime={post.date}>{post.dateLabel}</time></p>
              <h2 className="mb-4 mt-4 max-w-[38ch] text-[clamp(1.5rem,3vw,2.6rem)] font-semibold leading-tight tracking-tight">
                <Link href={post.path} className={`underline decoration-transparent underline-offset-8 hover:decoration-(--h-red) ${focus}`}>{post.title}</Link>
              </h2>
              <p className={`max-w-[64ch] leading-relaxed ${muted}`}>{post.description}</p>
              <p className={`mt-6 text-sm ${muted}`}>Por {post.author}</p>
            </article>
          </div>
        </div>
      </section>
    </Shell>
  );
}
