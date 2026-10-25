import { report as r, type Severity } from "./content";
import { Wordmark, focus, muted } from "./ui";

// Informe de demostración: una hoja de papel marfil sobre la obsidiana. Es contenido real (texto
// legible y accesible), no una imagen. Todos los datos son ficticios y así se indica dos veces.
// La severidad se codifica con texto y marcas en tinta, nunca solo con color: el rojo queda
// reservado a la línea roja de la cabecera del documento.

const LEVELS: Severity[] = ["Alta", "Media", "Baja"];
const bars: Record<Severity, number> = { Alta: 3, Media: 2, Baja: 1 };

function SeverityMark({ level }: { level: Severity }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span aria-hidden="true" className="inline-flex gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-3 w-1.5 ${i < bars[level] ? "bg-(--h-ink)" : "bg-(--h-paper-line)"}`} />
        ))}
      </span>
      {level}
    </span>
  );
}

const label = "m-0 text-[13px] font-medium uppercase tracking-[0.08em] text-(--h-stone)";

export function Report() {
  const [lead, ...rest] = r.findings;
  const counts = LEVELS.map((l) => ({ l, n: r.findings.filter((f) => f.severity === l).length }));

  return (
    <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3">
        <h3 className={`m-0 text-[14px] font-normal ${muted}`}>{r.contentsLabel}</h3>
        <ul className="m-0 mt-5 grid list-none gap-3 p-0">
          {r.contents.map((c) => (
            <li key={c} className="grid grid-cols-[1rem_1fr] gap-3 leading-[1.5]">
              <span aria-hidden="true" className="mt-[0.75em] h-px w-full bg-(--h-titanium)" />
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid justify-items-start gap-1">
          <a href={r.full.href} className={`inline-flex min-h-11 items-center border-b border-(--h-ivory)/40 font-medium hover:border-(--h-red) ${focus}`}>
            {r.full.label}
          </a>
          <a href={r.full.pdf} download className={`inline-flex min-h-11 items-center text-[15px] text-(--h-ivory)/75 hover:text-(--h-ivory) ${focus}`}>
            {r.full.pdfLabel}<span className={`ml-2 text-[13px] ${muted}`}>({r.full.meta})</span>
          </a>
        </div>
        <p className={`m-0 mt-8 max-w-[34ch] text-[13px] leading-[1.6] ${muted}`}>{r.note}</p>
      </div>

      <article
        aria-labelledby="h-informe-doc"
        className="bg-(--h-ivory) p-6 text-(--h-ink) shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-10 lg:col-span-9 xl:p-14"
      >
        {/* Cabecera del documento */}
        <header className="flex flex-wrap items-center justify-between gap-3 pb-5">
          <span className="text-[13px]"><Wordmark /></span>
          <span className="border border-(--h-ink) px-2 py-1 text-[13px] font-medium uppercase tracking-[0.08em]">{r.demo}</span>
        </header>
        <span aria-hidden="true" className="block h-0.5 w-full bg-(--h-red)" />

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className={label}>{r.doc.edition}</p>
            <h3 id="h-informe-doc" className="m-0 mt-3 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-balance">
              {r.doc.kind}
            </h3>
            <p className="m-0 mt-3 font-mono text-[13px] text-(--h-stone)">{r.doc.scope}</p>
          </div>
          <dl className="m-0 grid grid-cols-3 gap-px bg-(--h-paper-line) text-center">
            {counts.map((c) => (
              <div key={c.l} className="bg-(--h-ivory) px-4 py-2 sm:px-5">
                <dt className="text-[13px] text-(--h-stone)">{c.l}</dt>
                <dd className="m-0 text-[1.75rem] font-light leading-tight tabular-nums">{c.n}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Resumen ejecutivo */}
        <section aria-labelledby="h-informe-resumen" className="mt-10 grid gap-3 border-t border-(--h-paper-line) pt-6 md:grid-cols-[11rem_1fr] md:gap-8">
          <h4 id="h-informe-resumen" className={label}>{r.doc.summaryLabel}</h4>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.6]">{r.doc.summary}</p>
        </section>

        {/* Inventario de hallazgos */}
        <section aria-labelledby="h-informe-hallazgos" className="mt-10 border-t border-(--h-paper-line) pt-6">
          <h4 id="h-informe-hallazgos" className={label}>{r.doc.findingsLabel}</h4>
          {/* Tabla en pantallas medianas; en móvil, una lista con etiquetas visibles (la tabla no se reformatea). */}
          <table className="mt-4 hidden w-full border-collapse text-left text-[15px] sm:table">
            <thead>
              <tr className="text-[13px] text-(--h-stone)">
                <th scope="col" className="py-2 pr-4 font-normal">ID</th>
                <th scope="col" className="py-2 pr-4 font-normal">Hallazgo</th>
                <th scope="col" className="py-2 pr-4 font-normal">Severidad</th>
                <th scope="col" className="py-2 font-normal">{r.doc.priorityLabel}</th>
              </tr>
            </thead>
            <tbody>
              {r.findings.map((f) => (
                <tr key={f.id} className="border-t border-(--h-paper-line)">
                  <td className="py-3 pr-4 align-top font-mono text-[13px] tabular-nums">{f.id}</td>
                  <td className="py-3 pr-4 align-top">
                    <span className="block font-medium leading-[1.35]">{f.title}</span>
                    <span className="mt-1 block font-mono text-[13px] text-(--h-stone)">{f.target}</span>
                  </td>
                  <td className="py-3 pr-4 align-top"><SeverityMark level={f.severity} /></td>
                  <td className="py-3 align-top text-(--h-stone)">{f.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="m-0 mt-4 list-none p-0 sm:hidden">
            {r.findings.map((f) => (
              <li key={f.id} className="border-t border-(--h-paper-line) py-4">
                <p className="m-0 font-medium leading-[1.35]"><span className="font-mono text-[13px] tabular-nums">{f.id}</span> · {f.title}</p>
                <p className="m-0 mt-1 font-mono text-[13px] text-(--h-stone)">{f.target}</p>
                <dl className="m-0 mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[14px]">
                  <div className="flex gap-2"><dt className="text-(--h-stone)">Severidad</dt><dd className="m-0"><SeverityMark level={f.severity} /></dd></div>
                  <div className="flex gap-2"><dt className="text-(--h-stone)">{r.doc.priorityLabel}</dt><dd className="m-0">{f.priority}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* Detalle de un hallazgo */}
        <section aria-labelledby="h-informe-detalle" className="mt-10 border-t border-(--h-paper-line) pt-6">
          <h4 id="h-informe-detalle" className={label}>{r.doc.detailLabel} · {lead.id}</h4>
          <p className="m-0 mt-3 text-[1.15rem] font-semibold leading-[1.3]">{lead.title}</p>
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2">
            <figure className="m-0">
              <figcaption className="text-[13px] text-(--h-stone)">{r.doc.evidenceLabel}</figcaption>
              {/* Desplazable en horizontal: enfocable para poder recorrerlo con teclado. */}
              <pre tabIndex={0} role="region" aria-label={r.doc.evidenceLabel} className={`m-0 mt-2 overflow-x-auto bg-(--h-ink) p-4 font-mono text-[13px] leading-[1.7] text-(--h-ivory) ${focus} focus-visible:outline-(--h-ink)`}>
                {lead.evidence?.join("\n")}
              </pre>
            </figure>
            <dl className="m-0 grid content-start gap-5">
              <div>
                <dt className="text-[13px] text-(--h-stone)">{r.doc.impactLabel}</dt>
                <dd className="m-0 mt-1 leading-[1.55]">{lead.impact}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-(--h-stone)">{r.doc.fixLabel}</dt>
                <dd className="m-0 mt-1 leading-[1.55]">{lead.fix}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-(--h-stone)">{r.doc.priorityLabel}</dt>
                <dd className="m-0 mt-1"><SeverityMark level={lead.severity} /> · {lead.priority}</dd>
              </div>
            </dl>
          </div>
          <p className="m-0 mt-8 text-[13px] text-(--h-stone)">
            {rest.length} hallazgos más en el informe · {r.demo}
          </p>
        </section>
      </article>
    </div>
  );
}
