import type { ReactNode } from "react";
import { muted } from "../../_site/ui";

// Piezas comunes de las guías: tipografía de lectura, secciones y tablas de ejemplos.

export const prose =
  "max-w-[68ch] text-[17px] leading-[1.7] text-(--h-ivory)/85 [&_h2]:mt-16 [&_h2]:mb-5 [&_h2]:text-[clamp(1.35rem,2.2vw,1.75rem)] [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:leading-[1.1] [&_h2]:tracking-[-0.015em] [&_h2]:text-(--h-ivory) [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:text-(--h-ivory) [&_p]:my-4 [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:my-4 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:my-2 [&_strong]:text-(--h-ivory) [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-(--h-ivory)";

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}

export function ExampleTable({ label, rows }: { label: string; rows: { scope: string; work: string; days: string; price: string }[] }) {
  return (
    <div className="mt-6 max-w-[68rem] overflow-x-auto" role="region" aria-label={label} tabIndex={0}>
      <table className="w-full min-w-[40rem] border-collapse text-left text-[15px]">
        <thead>
          <tr className={`text-[13px] ${muted}`}>
            <th scope="col" className="py-3 pr-6 font-normal">Caso</th>
            <th scope="col" className="py-3 pr-6 font-normal">Alcance</th>
            <th scope="col" className="py-3 pr-6 font-normal">Trabajo</th>
            <th scope="col" className="py-3 font-normal">Precio StateX</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.scope} className="border-t border-(--h-line)">
              <th scope="row" className="py-4 pr-6 align-top font-semibold">{e.scope}</th>
              <td className={`py-4 pr-6 align-top leading-[1.5] ${muted}`}>{e.work}</td>
              <td className="py-4 pr-6 align-top tabular-nums">{e.days}</td>
              <td className="py-4 align-top font-medium tabular-nums">{e.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
