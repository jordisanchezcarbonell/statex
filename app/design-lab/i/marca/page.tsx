import type { ReactNode } from "react";
import { approach, brand, hero, identity, principles, problem, sampleReport, solutions, technology } from "../../content";
import { BrandBoard } from "../../_shared/BrandBoard";
import { fontVars } from "../font";
import { ReportCover } from "../Report";
import { Wordmark, monoCls, serifCls, tokens } from "../ui";

export const metadata = { title: "Concept I · Marca" };

// Piezas a escala: tipografía en unidades de contenedor (cqw) para que escalen con su marco.
const cq = "[container-type:inline-size]";
const f = "font-(family-name:--i-sans)";
const ivory = `${f} bg-[#F5F2EC] text-[#33352F]`;
const dark = `${f} bg-[#33352F] text-[#F5F2EC]`;
const sub = "text-[#5C6356]";

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${cq} relative h-full overflow-hidden ${className}`}>{children}</div>;
}

/** Símbolo: la X en serif sobre grafito. */
function Symbol({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`${serifCls} inline-grid aspect-square place-items-center bg-[#33352F] leading-none text-[#F5F2EC] ${className}`}>
      X
    </span>
  );
}

export default function MarcaI() {
  const typeSpecimen = (
    <div className={`divide-y divide-[#33352F]/15 ${ivory}`}>
      {[
        { meta: "Display · Newsreader 400, opsz 72, tracking −0,02em, interlineado 1,02", node: <p className={`${serifCls} m-0 text-[clamp(2.2rem,4.6vw,4.5rem)] leading-[1.02] tracking-[-0.02em]`}>{hero.title}</p> },
        { meta: "Titular de sección · Newsreader 400, hasta 4rem", node: <p className={`${serifCls} m-0 text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.05]`}>{principles.title}</p> },
        { meta: "Titular de bloque · Newsreader 400, 1,6–2,1rem", node: <p className={`${serifCls} m-0 text-[1.75rem]`}>{solutions[1].name}</p> },
        { meta: "Texto · Inter 400, 17–19px, interlineado 1,65, Olive texto sobre Ivory", node: <p className={`m-0 max-w-[62ch] text-[18px] leading-[1.65] ${sub}`}>{problem.intro}</p> },
        { meta: "Artefactos · IBM Plex Mono 400, solo dentro del informe", node: <p className={`${monoCls} m-0 text-[14px]`}>{sampleReport.cover.scope} · {sampleReport.findings[0].id} · Riesgo {sampleReport.findings[0].level.toLowerCase()}</p> },
      ].map((r) => (
        <div key={r.meta} className="grid gap-3 p-6 sm:p-8">
          <span className={`text-[12px] ${sub}`}>{r.meta}</span>
          {r.node}
        </div>
      ))}
    </div>
  );

  const graphicSystem = (
    <div className={`grid lg:grid-cols-3 ${ivory}`}>
      <figure className="m-0 border-b border-[#33352F]/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
        <div className="mx-auto max-w-[14rem]"><ReportCover /></div>
        <figcaption className={`mt-2 text-[14px] ${sub}`}>El informe es la fotografía de producto: papel, márgenes amplios y datos ilustrativos.</figcaption>
      </figure>
      <figure className="m-0 border-b border-[#33352F]/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
        <ol className="m-0 grid list-none p-0">
          {approach.steps.slice(0, 3).map((s, i) => (
            <li key={s.name} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-[#33352F]/15 py-3 last:border-b">
              <span className={`${serifCls} text-[#777E70]`}>{String(i + 1).padStart(2, "0")}</span>
              <span><b className="font-medium">{s.name}</b><span className={`block text-[13px] ${sub}`}>{s.deliverable}</span></span>
            </li>
          ))}
        </ol>
        <figcaption className={`mt-6 text-[14px] ${sub}`}>Filetes de 1px, numeración en serif oliva y siempre el entregable. Sin iconos ni cajas.</figcaption>
      </figure>
      <figure className="m-0 p-6 sm:p-8">
        <div className="grid gap-6">
          <div className="border-t border-[#33352F] pt-3"><span className={`${serifCls} text-[1.3rem]`}>{technology.today.label}</span></div>
          <div className="border-t border-dashed border-[#777E70] pt-3"><span className={`${serifCls} text-[1.3rem] ${sub}`}>{technology.roadmap.label}</span></div>
        </div>
        <figcaption className={`mt-8 text-[14px] ${sub}`}>Filete grafito continuo para lo que existe; oliva discontinuo para visión y pendientes.</figcaption>
      </figure>
    </div>
  );

  const cardFront = (
    <Frame className={`${ivory} grid place-items-center`}>
      <Wordmark className="text-[3.4cqw]" />
    </Frame>
  );

  const cardBack = (
    <Frame className={`${dark} flex flex-col justify-between p-[7cqw]`}>
      <div>
        <p className={`${serifCls} m-0 text-[6cqw]`}>{identity.card.name}</p>
        <p className="m-0 mt-[1.5cqw] text-[3.2cqw] text-[#D9D0C3]">{identity.card.role}</p>
      </div>
      <div className="grid gap-[1.2cqw] text-[3cqw] text-[#D9D0C3]">
        <span>{identity.card.email}</span>
        <span>{identity.card.web}</span>
      </div>
    </Frame>
  );

  const deckCover = (
    <Frame className={`${ivory} grid grid-cols-[1.3fr_1fr] gap-[5cqw] p-[5cqw]`}>
      <div className="flex flex-col justify-between">
        <Wordmark className="text-[1.5cqw]" />
        <div>
          <p className={`${serifCls} m-0 max-w-[14ch] text-[5.6cqw] leading-[1.02] tracking-[-0.02em]`}>{identity.deck.subtitle}</p>
          <p className={`m-0 mt-[2cqw] text-[1.4cqw] ${sub}`}>{identity.deck.meta}</p>
        </div>
      </div>
      <div className="self-center bg-[#D9D0C3]/50 p-[3cqw]">
        <div className="aspect-[1/1.414] bg-[#FBFAF7] p-[2.5cqw] shadow-[0_1.5cqw_3cqw_-1.5cqw_rgba(51,53,47,0.35)]">
          <p className={`${monoCls} m-0 text-[1cqw] ${sub}`}>{sampleReport.cover.kind}</p>
          <p className={`${serifCls} m-0 mt-[1cqw] text-[2.6cqw] leading-[1.05]`}>{sampleReport.title}</p>
        </div>
      </div>
    </Frame>
  );

  const banner = (
    <Frame className={`${dark} flex items-center justify-between gap-[3cqw] px-[5cqw]`}>
      <p className={`${serifCls} m-0 max-w-[24ch] text-[2.8cqw] leading-[1.1]`}>{brand.tagline}</p>
      <Wordmark className="text-[1.4cqw]" />
    </Frame>
  );

  return (
    <div className={fontVars} style={tokens}>
      <BrandBoard
        slug="i"
        logoLight={<span className={`${f} text-[clamp(1rem,2vw,1.35rem)] text-[#33352F]`}><Wordmark /></span>}
        logoDark={<span className={`${f} text-[clamp(1rem,2vw,1.35rem)] text-[#F5F2EC]`}><Wordmark /></span>}
        symbol={<Symbol className="w-24 text-[3.5rem]" />}
        typeSpecimen={typeSpecimen}
        graphicSystem={graphicSystem}
        cardFront={cardFront}
        cardBack={cardBack}
        deckCover={deckCover}
        applications={[{ name: "Banner de LinkedIn", node: banner, ratio: "4 / 1" }]}
        notes={[
          "Serif solo en titulares y números; Inter para leer; la mono vive únicamente dentro del informe.",
          "Olive (#777E70) es acento grande o no textual; para texto pequeño, Olive texto (#5C6356).",
          "No hay rojo, dorado ni fotografía de estilo de vida. La imagen principal es el propio informe, con datos ilustrativos.",
          "El descriptor «Ciberseguridad» acompaña siempre al nombre para distinguir StateX de otras empresas homónimas.",
        ]}
      />
    </div>
  );
}
