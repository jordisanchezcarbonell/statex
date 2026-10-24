import { approach, offers, sampleReport as r } from "../content";
import { Wordmark, monoCls, serifCls } from "./ui";

// Hojas del informe de ejemplo. Todo es ilustrativo (ejemplo.com, RFC 5737).
// Escalan con su marco mediante unidades de contenedor (cqw).
const sheet =
  "aspect-[1/1.414] w-full bg-(--i-paper) text-(--i-graphite) shadow-[0_1px_1px_rgba(51,53,47,0.06),0_24px_48px_-24px_rgba(51,53,47,0.35)]";
const meta = `${monoCls} text-[2.7cqw] leading-[1.5]`;
const levelTone: Record<string, string> = { Alta: "bg-(--i-graphite)", Media: "bg-(--i-olive)", Baja: "bg-(--i-sand)" };

function Head({ page }: { page?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-(--i-line) pb-[3cqw]">
      <span className="text-[3cqw]"><Wordmark descriptor={false} /></span>
      <span className={`${meta} text-(--i-olive-text)`}>{page ?? r.cover.classification}</span>
    </div>
  );
}

/** Portada: la imagen del hero. Dos hojas apiladas que se enderezan al pasar el cursor. */
export function ReportCover() {
  return (
    <figure className="group m-0 mx-auto w-full max-w-[24rem]">
      <div className="relative [container-type:inline-size]">
      <div aria-hidden="true" className={`${sheet} absolute inset-0 translate-x-[4%] translate-y-[3%] rotate-[3deg] transition-transform duration-700 ease-out group-hover:rotate-[1.5deg] motion-reduce:transition-none`} />
      <div className={`${sheet} relative flex -rotate-[1.2deg] flex-col p-[8cqw] transition-transform duration-700 ease-out group-hover:rotate-0 motion-reduce:transition-none`}>
        <Head />
        <div className="mt-auto">
          <p className={`${meta} m-0 text-(--i-olive-text)`}>{offers.items[0].name}</p>
          <p className={`${serifCls} m-0 mt-[3cqw] text-[10cqw] leading-[1] tracking-[-0.02em]`}>{r.cover.kind}</p>
          <dl className={`${meta} m-0 mt-[7cqw] grid grid-cols-[auto_1fr] gap-x-[4cqw] gap-y-[1cqw] border-t border-(--i-line) pt-[4cqw]`}>
            <dt className="text-(--i-olive-text)">Alcance</dt>
            <dd className="m-0">{r.cover.scope}</dd>
            <dt className="text-(--i-olive-text)">Edición</dt>
            <dd className="m-0">{r.cover.version}</dd>
            <dt className="text-(--i-olive-text)">Hallazgos</dt>
            <dd className="m-0">{r.findings.length} verificados</dd>
          </dl>
        </div>
      </div>
      </div>
      <figcaption className="mt-8 text-[13px] text-(--i-olive-text)">{r.note}</figcaption>
    </figure>
  );
}

/** Tres páginas del informe en miniatura: resumen, hallazgo y plan. */
export function ReportPages() {
  const counts = ["Alta", "Media", "Baja"].map((l) => ({ l, n: r.findings.filter((f) => f.level === l).length }));
  const f = r.findings[0];

  return (
    <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-3 lg:gap-10">
      <li className="[container-type:inline-size]">
        <div className={`${sheet} relative flex flex-col p-[9cqw]`} aria-hidden="true">
          <Head page="p. 2" />
          <p className={`${serifCls} m-0 mt-[8cqw] text-[8cqw] leading-[1.05]`}>{r.pages[0]}</p>
          <ul className={`${meta} m-0 mt-[8cqw] grid list-none gap-[3cqw] p-0`}>
            {counts.map((c) => (
              <li key={c.l} className="grid grid-cols-[1fr_auto] items-center gap-[3cqw] border-b border-(--i-line) pb-[2cqw]">
                <span className="flex items-center gap-[2cqw]"><span className={`size-[2.6cqw] ${levelTone[c.l]}`} />Riesgo {c.l.toLowerCase()}</span>
                <span className="tabular-nums">{c.n}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-[2cqw]">
            {[92, 78, 85, 40].map((w) => <span key={w} className="h-[1.4cqw] bg-(--i-sand)/70" style={{ width: `${w}%` }} />)}
          </div>
        </div>
        <p className="m-0 mt-5 text-[15px]">{r.pages[0]}</p>
      </li>
      <li className="[container-type:inline-size]">
        <div className={`${sheet} relative flex flex-col p-[9cqw]`} aria-hidden="true">
          <Head page="p. 7" />
          <p className={`${meta} m-0 mt-[8cqw] text-(--i-olive-text)`}>{f.id} · Riesgo {f.level.toLowerCase()}</p>
          <p className={`${serifCls} m-0 mt-[2cqw] text-[7cqw] leading-[1.08]`}>{f.title}</p>
          <p className={`${meta} m-0 mt-[4cqw]`}>{f.host}</p>
          <div className={`${meta} mt-[6cqw] bg-(--i-graphite) p-[4cqw] text-(--i-ivory)`}>
            <span className="block">GET / HTTP/1.1</span>
            <span className="block">Host: {f.host}</span>
            <span className="block text-(--i-sand)">→ 200 OK · sin autenticación</span>
          </div>
          <div className="mt-auto grid gap-[2cqw]">
            {[88, 70, 94].map((w) => <span key={w} className="h-[1.4cqw] bg-(--i-sand)/70" style={{ width: `${w}%` }} />)}
          </div>
        </div>
        <p className="m-0 mt-5 text-[15px]">{r.pages[1]}</p>
      </li>
      <li className="[container-type:inline-size]">
        <div className={`${sheet} relative flex flex-col p-[9cqw]`} aria-hidden="true">
          <Head page="p. 12" />
          <p className={`${serifCls} m-0 mt-[8cqw] text-[8cqw] leading-[1.05]`}>{r.pages[2]}</p>
          <ol className={`${meta} m-0 mt-[6cqw] grid list-none gap-[3cqw] p-0`}>
            {r.findings.map((x, i) => (
              <li key={x.id} className="grid grid-cols-[auto_1fr] gap-[3cqw] border-b border-(--i-line) pb-[2cqw]">
                <span className="tabular-nums text-(--i-olive-text)">{i + 1}.</span>
                <span>{x.id} · {x.host}</span>
              </li>
            ))}
          </ol>
          <p className={`${meta} m-0 mt-auto text-(--i-olive-text)`}>Siguiente paso: {approach.steps.at(-1)!.deliverable.toLowerCase()}</p>
        </div>
        <p className="m-0 mt-5 text-[15px]">{r.pages[2]}</p>
      </li>
    </ul>
  );
}
