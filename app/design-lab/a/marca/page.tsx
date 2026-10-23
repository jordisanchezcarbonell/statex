import type { CSSProperties, ReactNode } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { approach, brand, hero, identity, problem, sampleAssets, sections, solutions, technology } from "../../content";
import { BrandBoard } from "../../_shared/BrandBoard";
import { CellRule, Logo, StepGlyph, XGlyph, XMatrix } from "../Mark";
import { A } from "../x";

export const metadata = { title: "Concept A · Marca" };

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-a",
  display: "swap",
});

const tokens = {
  "--ink": A.ink,
  "--gray": A.gray,
  "--line": A.line,
  "--teal": A.teal,
  "--teal-on-ink": A.tealOnInk,
  "--gray-on-ink": A.grayOnInk,
} as CSSProperties;

const ff = "font-(family-name:--font-a)";

// Celdas en acento: un barrido diagonal que recorre un brazo de la X (patrón de portadas).
const sweep = new Set(["3-3", "4-4", "4-5", "5-5", "5-4", "6-6", "14-5", "15-4", "15-5"]);
const reportAccent = new Set(["2-17", "3-16", "11-8", "16-3", "17-17"]);

function Panel({ caption, children, className = "" }: { caption: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`flex flex-col border-(--line) bg-white p-6 ${className}`}>
      <div className="grid flex-1 place-items-center py-6">{children}</div>
      <figcaption className="border-t border-(--line) pt-3 text-[14px] leading-snug text-(--gray)">{caption}</figcaption>
    </figure>
  );
}

// Patrón determinista de módulos en distintos estados (fondos de deck y portadas).
const patternStates = Array.from({ length: 24 }, (_, i) => ((i * 7 + 3) % 11) % 6);

export default function MarcaA() {
  const typeSpecimen = (
    <div className={`${ff} divide-y divide-(--line) text-(--ink)`}>
      {[
        {
          meta: "Display, 800, hasta 7rem, interlineado 0,92, tracking −0,045em",
          node: (
            <p className="text-[clamp(2.2rem,4.6vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-balance">
              {hero.title}
            </p>
          ),
        },
        {
          meta: "Titular de sección, 800, 4,75rem, tracking −0,042em",
          node: <p className="text-[clamp(1.75rem,3vw,3.25rem)] font-extrabold leading-[0.96] tracking-[-0.042em]">{problem.title}</p>,
        },
        {
          meta: "Subtítulo, 700, 22px, tracking −0,025em",
          node: (
            <p className="text-[22px] font-bold tracking-[-0.025em]">
              <span className="mr-2 text-(--gray)">1</span>
              {approach.steps[0].name}
            </p>
          ),
        },
        {
          meta: "Texto, 400, 18–20px, interlineado 1,55, en Gris",
          node: <p className="max-w-[52ch] text-[18px] leading-[1.55] text-(--gray)">{hero.body}</p>,
        },
        {
          meta: "Nombre de sección, 600, 15px, con la celda turquesa",
          node: (
            <p className="flex items-center gap-2.5 text-[15px] font-semibold">
              <span aria-hidden="true" className="size-2 bg-(--teal)" />
              {sections.problem}
            </p>
          ),
        },
      ].map((row) => (
        <div key={row.meta} className="grid gap-3 p-6 sm:p-8 lg:grid-cols-[14rem_1fr] lg:gap-8">
          <p className="text-[13px] leading-snug text-(--gray)">{row.meta}</p>
          {row.node}
        </div>
      ))}
    </div>
  );

  const graphicSystem = (
    <div className={`${ff} grid gap-px bg-(--line) text-(--ink) sm:grid-cols-2 lg:grid-cols-3`}>
      <Panel caption="El módulo: matriz 5×5; las diagonales forman la X y la celda central es el único acento.">
        <XMatrix n={5} half={0} grid={A.line} dots={false} accent={new Set(["2-2"])} className="w-36" />
      </Panel>
      <Panel caption="Escala: la misma regla a 5, 9 y 20 celdas. A 20 el trazo tiene tres celdas de ancho.">
        <div className="flex items-end gap-5">
          <XMatrix n={5} half={0} grid={null} className="w-10" />
          <XMatrix n={9} half={0} grid={A.line} className="w-20" />
          <XMatrix n={20} grid={A.line} className="w-36" />
        </div>
      </Panel>
      <Panel caption="Iconografía del método: la X se completa paso a paso y termina en turquesa.">
        <ol className="flex flex-wrap justify-center gap-4">
          {approach.steps.map((s, i) => (
            <li key={s.name} className="grid justify-items-center gap-2 text-[12px] font-medium text-(--gray)">
              <StepGlyph step={i + 1} className="size-9" />
              {s.name}
            </li>
          ))}
        </ol>
      </Panel>
      <Panel caption="Divisor y línea temporal: una fila de celdas; una celda por año, rellena si hay hito.">
        <div className="grid w-full max-w-72 gap-6">
          <CellRule />
          <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1">
            {Array.from({ length: 15 }, (_, i) => (
              <span
                key={i}
                className={`aspect-square ${i === 14 ? "bg-(--teal)" : [0, 1, 6].includes(i) ? "bg-(--ink)" : "border border-(--line)"}`}
              />
            ))}
          </div>
        </div>
      </Panel>
      <Panel caption="Estados: lleno es lo que existe hoy; discontinuo, lo que todavía no existe; turquesa, un activo revelado.">
        <div className="grid gap-3 text-[14px]">
          <span className="flex items-center gap-3 font-semibold">
            <span className="size-3.5 bg-(--teal)" aria-hidden="true" />
            {technology.today.label}
          </span>
          <span className="flex items-center gap-3 border border-dashed border-(--gray) px-3 py-2 font-semibold">
            <span className="size-3.5 border-2 border-(--gray)" aria-hidden="true" />
            {technology.roadmap.label}
          </span>
          <span className="self-start bg-(--teal) px-2 py-1 text-white">
            <b className="block text-[12px]">{sampleAssets[2].host}</b>
            <span className="block text-[11px]">Ejemplo ilustrativo</span>
          </span>
        </div>
      </Panel>
      <Panel caption="Patrón: módulos en distintos estados para fondos de presentación. Nunca detrás de texto pequeño.">
        <div className="grid grid-cols-6 gap-2" aria-hidden="true">
          {patternStates.map((st, i) =>
            st === 0 ? (
              <XGlyph key={i} className="size-8 text-(--ink)" />
            ) : (
              <StepGlyph key={i} step={Math.min(st, 4)} className="size-8" />
            ),
          )}
        </div>
      </Panel>
    </div>
  );

  const cardFront = (
    <div className={`${ff} @container relative h-full overflow-hidden bg-white text-(--ink)`}>
      <XMatrix n={20} grid={A.line} accent={sweep} className="absolute top-[-22%] right-[-18%] w-[56%]" />
      <div className="absolute bottom-[9%] left-[7%] grid gap-[2cqw]">
        <Logo className="text-[11cqw]" />
        <p className="max-w-[24ch] text-[2.6cqw] font-medium text-(--gray)">{brand.tagline}</p>
      </div>
    </div>
  );

  const cardBack = (
    <div className={`${ff} @container relative flex h-full flex-col justify-between bg-(--ink) p-[7%] text-white`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[6.5cqw] leading-none font-extrabold tracking-[-0.04em]">{identity.card.name}</p>
          <p className="mt-[1.6cqw] text-[3cqw] text-(--gray-on-ink)">{identity.card.role}</p>
        </div>
        <XGlyph className="size-[7cqw] text-white" center={A.tealOnInk} />
      </div>
      <div className="grid gap-[1cqw] border-t border-white/20 pt-[3cqw] text-[3cqw]">
        <p>{identity.card.email}</p>
        <p className="text-(--teal-on-ink)">{identity.card.web}</p>
      </div>
    </div>
  );

  const deckCover = (
    <div className={`${ff} @container relative h-full overflow-hidden bg-white text-(--ink)`}>
      <div className="absolute inset-y-0 left-[6%] flex w-[52%] flex-col justify-center">
        <Logo className="text-[15cqw]" />
        <p className="mt-[3cqw] max-w-[22ch] text-[3.4cqw] leading-[1.1] font-bold tracking-[-0.03em]">{identity.deck.subtitle}</p>
      </div>
      <XMatrix n={20} grid={A.line} accent={sweep} className="absolute top-[9%] right-[5%] h-[82%] w-auto" />
      <div className="absolute inset-x-[6%] bottom-[6%] flex items-end justify-between gap-4 text-[1.5cqw] text-(--gray)">
        <span>{identity.deck.meta}</span>
        <span>{brand.descriptor}</span>
      </div>
    </div>
  );

  const reportCover = (
    <div className={`${ff} @container relative flex h-full flex-col bg-white p-[8%] text-(--ink)`}>
      <div className="flex items-center justify-between text-[3.4cqw] text-(--gray)">
        <Logo className="text-[6cqw] text-(--ink)" />
        <span>Ejemplo ilustrativo</span>
      </div>
      <CellRule className="mt-[6cqw]" />
      <p className="mt-[10cqw] text-[4cqw] font-semibold text-(--teal)">Informe de evaluación</p>
      <p lang="en" className="mt-[2cqw] text-[10cqw] leading-[0.94] font-extrabold tracking-[-0.045em]">
        {solutions[0].name}
      </p>
      <dl className="mt-[7cqw] grid grid-cols-[auto_1fr] gap-x-[4cqw] gap-y-[1.5cqw] text-[3.3cqw]">
        <dt className="text-(--gray)">Alcance</dt>
        <dd>ejemplo.com, 203.0.113.0/24</dd>
        <dt className="text-(--gray)">Organización</dt>
        <dd>[Pendiente: organización]</dd>
        <dt className="text-(--gray)">Fecha</dt>
        <dd>[Fecha]</dd>
      </dl>
      <XMatrix n={20} grid={A.line} accent={reportAccent} className="mt-auto ml-auto w-[48%]" />
    </div>
  );

  const banner = (
    <div className={`${ff} @container relative h-full overflow-hidden bg-(--ink) text-white`}>
      {/* El avatar de LinkedIn tapa la esquina inferior izquierda: esa zona queda solo con retícula. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#2A2D33 0.9px, transparent 1px)",
          backgroundSize: "1.4cqw 1.4cqw",
        }}
      />
      <div className="absolute top-1/2 left-[34%] w-[44%] -translate-y-1/2">
        <p className="text-[3.6cqw] leading-[1] font-extrabold tracking-[-0.04em]">{brand.tagline}</p>
        <p className="mt-[1.2cqw] text-[1.5cqw] text-(--gray-on-ink)">{brand.descriptor}</p>
      </div>
      <XMatrix n={20} on="#FFFFFF" grid="#2A2D33" accent={sweep} accentColor={A.tealOnInk} className="absolute top-[12%] right-[4%] h-[76%] w-auto" />
    </div>
  );

  return (
    <div style={tokens} className={hanken.variable}>
      <BrandBoard
        slug="a"
        logoLight={<Logo className={`${ff} text-[clamp(3rem,7vw,5.5rem)] text-(--ink)`} />}
        logoDark={<Logo className={`${ff} text-[clamp(3rem,7vw,5.5rem)] text-white`} center={A.tealOnInk} />}
        symbol={
          <div className="grid justify-items-center gap-6">
            <div className="grid size-28 place-items-center bg-(--ink)">
              <XGlyph className="size-14 text-white" center={A.tealOnInk} />
            </div>
            <div className="flex items-end gap-3" aria-hidden="true">
              {[48, 32, 16].map((s) => (
                <div key={s} className="grid place-items-center bg-(--ink)" style={{ width: s, height: s }}>
                  <XGlyph className="h-[56%] w-[56%] text-white" center={A.tealOnInk} />
                </div>
              ))}
            </div>
          </div>
        }
        typeSpecimen={typeSpecimen}
        graphicSystem={graphicSystem}
        cardFront={cardFront}
        cardBack={cardBack}
        deckCover={deckCover}
        applications={[
          { name: "Portada de informe de seguridad (A4, ejemplo ilustrativo)", node: reportCover, ratio: "1 / 1.414" },
          { name: "Banner de LinkedIn (la esquina inferior izquierda queda libre para el avatar)", node: banner, ratio: "4 / 1" },
        ]}
        notes={[
          "Una sola familia, Hanken Grotesk: 800 para titulares con tracking negativo, 400–600 para todo lo demás. La tensión viene del tamaño, no de mezclar fuentes.",
          "El turquesa es el único acento y se reserva para la celda central del logotipo, lo revelado y lo completado. Sobre Tinta se usa #4FB3A5 para mantener AA.",
          "El borde discontinuo significa siempre «todavía no existe»: visión de producto, pendientes y huecos por confirmar.",
          "La X de celdas es decorativa: cualquier dato que muestre (activos, años) tiene que estar también en texto.",
        ]}
      />
    </div>
  );
}
