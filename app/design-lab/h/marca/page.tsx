import type { ReactNode } from "react";
import { approach, brand, hero, identity, principles, problem, sampleAssets, solutions, technology } from "../../content";
import { BrandBoard } from "../../_shared/BrandBoard";
import { inter } from "../../../_site/font";
import { Wordmark, display, tokens } from "../../../_site/ui";

export const metadata = { title: "Concept H · Marca" };

// Piezas a escala: tipografía en unidades de contenedor (cqw) para que escalen con su marco.
const cq = "[container-type:inline-size]";
const f = "font-(family-name:--h-sans)";
const dark = `${f} bg-[#0B0D10] text-[#F2F0EA]`;
const ti = "text-[#A8A39B]";

/** Símbolo: la X sola sobre su línea roja. */
function Symbol({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`${f} relative inline-grid aspect-square place-items-center bg-[#0B0D10] font-semibold leading-none text-[#F2F0EA] ${className}`}>
      <span className="relative">
        X
        <span className="absolute -bottom-[0.16em] inset-x-0 h-[0.07em] bg-[#A83A35]" />
      </span>
    </span>
  );
}

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${cq} relative h-full overflow-hidden ${dark} ${className}`}>{children}</div>;
}

export default function MarcaH() {
  const typeSpecimen = (
    <div className={`divide-y divide-white/10 ${dark}`}>
      {[
        { meta: "Display · Inter 600, opsz 32, mayúsculas, tracking −0,025em, interlineado 0,98", node: <p className={`${display} m-0 text-[clamp(2rem,4.4vw,4.25rem)]`}>{hero.title}</p> },
        { meta: "Titular de sección · Inter 600, mayúsculas, hasta 4,25rem", node: <p className={`${display} m-0 text-[clamp(1.6rem,3vw,2.75rem)]`}>{principles.title}</p> },
        { meta: "Titular de bloque · Inter 600, 1,1–1,6rem", node: <p className="m-0 text-[1.4rem] font-semibold uppercase tracking-[-0.015em]">{solutions[0].name}</p> },
        { meta: "Texto · Inter 400, 17–19px, interlineado 1,6, Titanio sobre Obsidiana", node: <p className={`m-0 max-w-[62ch] text-[18px] leading-[1.6] ${ti}`}>{problem.intro}</p> },
        { meta: "Cifras · Inter 200, tabulares, tracking −0,04em", node: <p className={`m-0 flex gap-8 text-[3.5rem] font-extralight leading-none tabular-nums tracking-[-0.04em] ${ti}`}>{["01", "02", "03", "04", "05"].map((n) => <span key={n}>{n}</span>)}</p> },
      ].map((r) => (
        <div key={r.meta} className="grid gap-3 p-6 sm:p-8">
          <span className={`text-[12px] ${ti}`}>{r.meta}</span>
          {r.node}
        </div>
      ))}
    </div>
  );

  const graphicSystem = (
    <div className={`grid lg:grid-cols-3 ${dark}`}>
      <figure className="m-0 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
        <div aria-hidden="true" className="grid h-40 content-center gap-6">
          <div className="h-px bg-white/15"><div className="h-px w-[62%] bg-[#A83A35]" /></div>
          <div className="h-0.5 w-24 bg-[#A83A35]" />
          <div className="relative h-16 bg-[#20242A]"><span className="absolute inset-x-0 top-0 h-0.5 bg-[#A83A35]" /></div>
        </div>
        <figcaption className={`mt-6 text-[14px] ${ti}`}>La línea roja: avance, firma y foco. Nunca es fondo ni texto; un solo trazo por encuadre, además de la X del logotipo.</figcaption>
      </figure>
      <figure className="m-0 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
        <ul className="m-0 grid list-none gap-0 p-0 text-[14px]">
          {sampleAssets.slice(0, 4).map((a) => (
            <li key={a.host} className="flex justify-between gap-4 border-t border-white/10 py-3 last:border-b">
              <span>{a.host}</span>
              <span className={ti}>Riesgo {a.level}</span>
            </li>
          ))}
        </ul>
        <figcaption className={`mt-6 text-[14px] ${ti}`}>Datos en filas con filetes de 1px, sin cajas ni iconos. Ejemplo ilustrativo (ejemplo.com, RFC 5737).</figcaption>
      </figure>
      <figure className="m-0 p-6 sm:p-8">
        <div className="grid gap-6">
          <div className="border-t-2 border-[#F2F0EA] pt-3 text-[14px] font-semibold uppercase">{technology.today.label}</div>
          <div className={`border-t-2 border-dashed border-[#A8A39B]/60 pt-3 text-[14px] font-semibold uppercase ${ti}`}>{technology.roadmap.label}</div>
        </div>
        <figcaption className={`mt-8 text-[14px] ${ti}`}>Filete marfil continuo para lo que existe; discontinuo y atenuado para visión y pendientes.</figcaption>
      </figure>
    </div>
  );

  const cardFront = (
    <Frame className="grid place-items-center">
      <Wordmark className="text-[6cqw]" />
    </Frame>
  );

  const cardBack = (
    <Frame className="flex flex-col justify-between p-[7cqw]">
      <div>
        <p className="m-0 text-[5cqw] font-semibold uppercase">{identity.card.name}</p>
        <p className={`m-0 mt-[1.5cqw] text-[3.4cqw] ${ti}`}>{identity.card.role}</p>
      </div>
      <div className="flex items-end justify-between">
        <div className={`grid gap-[1.2cqw] text-[3cqw] ${ti}`}>
          <span>{identity.card.email}</span>
          <span>{identity.card.web}</span>
        </div>
        <span className="h-[0.4cqw] w-[14cqw] bg-[#A83A35]" aria-hidden="true" />
      </div>
    </Frame>
  );

  const deckCover = (
    <Frame className="flex flex-col justify-between p-[5cqw]">
      <div className="flex items-center justify-between">
        <Wordmark className="text-[1.8cqw]" />
        <span className={`text-[1.4cqw] ${ti}`}>{identity.deck.meta}</span>
      </div>
      <div>
        <p className={`${display} m-0 max-w-[16ch] text-[6cqw]`}>{identity.deck.subtitle}</p>
        <span aria-hidden="true" className="mt-[3cqw] block h-[0.25cqw] w-[10cqw] bg-[#A83A35]" />
      </div>
    </Frame>
  );

  const report = (
    <Frame className="flex flex-col p-[8cqw]">
      <div className="flex items-center justify-between">
        <Wordmark className="text-[3.2cqw]" />
        <span className={`text-[2.8cqw] ${ti}`}>Confidencial</span>
      </div>
      <div className="mt-auto">
        <p className={`m-0 text-[3cqw] ${ti}`}>{solutions[0].name}</p>
        <p className={`${display} m-0 mt-[3cqw] text-[9cqw]`}>Informe de exposición externa</p>
        <span aria-hidden="true" className="mt-[5cqw] block h-[0.5cqw] w-[18cqw] bg-[#A83A35]" />
        <p className={`m-0 mt-[5cqw] text-[3cqw] ${ti}`}>ejemplo.com · 203.0.113.0/24 · {approach.steps.map((s) => s.name).join(", ")}</p>
      </div>
    </Frame>
  );

  const banner = (
    <Frame className="flex items-center justify-between gap-[3cqw] px-[5cqw]">
      <p className={`${display} m-0 max-w-[22ch] text-[2.6cqw]`}>{brand.tagline}</p>
      <Wordmark className="text-[1.8cqw]" />
    </Frame>
  );

  return (
    <div className={inter.variable} style={tokens}>
      <BrandBoard
          slug="h"
          logoLight={<span className={`${f} text-[clamp(1.5rem,3.4vw,2.5rem)] text-[#0B0D10]`}><Wordmark /></span>}
          logoDark={<span className={`${f} text-[clamp(1.5rem,3.4vw,2.5rem)] text-[#F2F0EA]`}><Wordmark /></span>}
          symbol={<Symbol className="w-24 text-[3rem]" />}
          typeSpecimen={typeSpecimen}
          graphicSystem={graphicSystem}
          cardFront={cardFront}
          cardBack={cardBack}
          deckCover={deckCover}
          applications={[
            { name: "Portada de informe técnico (A4, datos ilustrativos)", node: report, ratio: "1 / 1.414" },
            { name: "Banner de LinkedIn", node: banner, ratio: "4 / 1" },
          ]}
          notes={[
            "El rojo es una línea, no un color de superficie: un único trazo por encuadre (además de la X del logotipo) marca avance, foco o firma.",
            "Titulares siempre en mayúsculas y con frases cortas; el texto corrido en Titanio, nunca en mayúsculas.",
            "Sin iconos, sin cajas con sombra, sin degradados decorativos: filetes de 1px y mucho espacio negro.",
            "La X del logotipo es la única letra subrayada; nunca se convierte en escudo, candado ni símbolo de alerta.",
          ]}
        />
    </div>
  );
}
