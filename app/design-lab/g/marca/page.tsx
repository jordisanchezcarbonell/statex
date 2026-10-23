import type { ReactNode } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import { BrandBoard } from "../../_shared/BrandBoard";
import { approach, brand, hero, identity, research, sections, solutions, technology } from "../../content";
import { Cursor, Wordmark, mono, serif, tokens } from "../parts";

export const metadata = { title: "Concept G · Marca" };

const fSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--f-serif" });
const fMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono" });
const fSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-sans" });

/* ── Logotipo y símbolo ─────────────────────────────── */

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="text-center">
      <Wordmark blink={false} className={`text-[clamp(3.5rem,7vw,5.5rem)] ${dark ? "text-white" : "text-(--ink)"}`} />
      <p className={`mt-4 ${mono} text-[12px] ${dark ? "text-[#C9CBC5]" : "text-(--archive-ink)"}`}>{brand.descriptor}</p>
    </div>
  );
}

function Mark({ size }: { size: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center bg-(--ink)"
      style={{ width: size, height: size }}
    >
      <span className={`${serif} leading-none text-white`} style={{ fontSize: size * 0.62 }}>
        X<Cursor blink={false} />
      </span>
    </span>
  );
}

function BrandSymbol() {
  return (
    <div className="flex flex-col items-center gap-5">
      <Mark size={112} />
      <div className="flex items-end gap-3" aria-hidden="true">
        <Mark size={48} />
        <Mark size={32} />
        <Mark size={16} />
      </div>
      <p className={`${mono} text-[12px] text-(--archive-ink)`}>Avatar, favicon y perfiles</p>
    </div>
  );
}

/* ── Muestra tipográfica ────────────────────────────── */

function TypeRow({ meta, children }: { meta: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-(--ink) py-6 first:border-t-0 first:pt-0 md:grid-cols-[13rem_1fr] md:gap-8">
      <p className={`${mono} text-[12px] text-(--archive-ink)`}>{meta}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function TypeSpecimen() {
  return (
    <div className="bg-(--paper) p-6 text-(--ink) sm:p-10">
      <TypeRow meta="Instrument Serif 400, titular, 0,9 de interlínea">
        <p className={`${serif} text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.02em] text-balance`}>{hero.title}</p>
      </TypeRow>
      <TypeRow meta="Instrument Serif 400, sección y titular editorial">
        <p className={`${serif} text-[1.9rem] leading-none`}>{sections.research}</p>
        <p className={`mt-3 ${serif} text-[clamp(1.9rem,3.4vw,3rem)] leading-[0.95]`}>{research.title}</p>
      </TypeRow>
      <TypeRow meta="IBM Plex Sans 400, texto, 17 px / 1,65">
        <p className="max-w-[60ch] font-(family-name:--f-sans) text-[17px] leading-[1.65]">{hero.body}</p>
      </TypeRow>
      <TypeRow meta="IBM Plex Mono 400–500, prompts y metadatos, 12–13 px">
        <p className={`${mono} text-[13px]`}>~/statex $ cd investigacion</p>
        <p className={`mt-1 ${mono} text-[13px] text-(--archive-ink)`}>// {technology.roadmap.label}</p>
        <p className={`mt-1 ${mono} text-[13px]`}>soluciones/{solutions[0].id}</p>
      </TypeRow>
    </div>
  );
}

/* ── Sistema gráfico ────────────────────────────────── */

function Tile({ name, rule, children }: { name: string; rule: string; children: ReactNode }) {
  return (
    <figure className="flex flex-col border-(--ink) bg-(--paper) p-6">
      <div aria-hidden="true" className="grid min-h-[9.5rem] place-items-center">
        <div className="w-full">{children}</div>
      </div>
      <figcaption className="mt-5 border-t border-(--ink) pt-3">
        <b className={`${serif} text-[1.5rem] font-normal leading-none`}>{name}</b>
        <span className="mt-1.5 block text-[14px] leading-[1.5] text-(--archive-ink)">{rule}</span>
      </figcaption>
    </figure>
  );
}

function GraphicSystem() {
  return (
    <div className="grid gap-px bg-(--ink) text-(--ink) sm:grid-cols-2 lg:grid-cols-3">
      <Tile name="Barras de censura" rule="Tapan el titular y se retiran una sola vez. Nunca ocultan información real; sin JS o con movimiento reducido no existen.">
        <div className="grid gap-2">
          <span className={`relative block w-fit ${serif} text-[2.6rem] leading-[0.95]`}>
            Encontramos
            <span className="absolute inset-y-[0.12em] right-[-0.06em] left-[45%] bg-(--ink)" />
          </span>
          <span className={`relative block w-fit ${serif} text-[2.6rem] leading-[0.95]`}>
            lo que expones
            <span className="absolute inset-y-[0.12em] left-[-0.06em] w-[22%] bg-(--ink)" />
          </span>
        </div>
      </Tile>

      <Tile name="Fichas" rule="Cada solución es una ficha con su ruta en la pestaña. Se apilan con el scroll; las perforaciones son el único adorno.">
        <div className="mx-auto max-w-[17rem] -rotate-[1.2deg] border border-(--ink) bg-(--card) shadow-[0_1px_0_var(--ink)]">
          <div className={`flex items-center gap-2 border-b border-(--ink) px-3 py-1.5 ${mono} text-[11px]`}>
            <span className="size-2 bg-(--red)" />
            soluciones/{solutions[1].id}
          </div>
          <p className={`px-3 pt-3 pb-4 ${serif} text-[1.6rem] leading-[0.95]`}>{solutions[1].name}</p>
        </div>
      </Tile>

      <Tile name="Numeración" rule="Solo cuando el contenido es una secuencia: las fases del enfoque y la cronología. Nunca en listas sin orden.">
        <ol className="grid gap-1.5">
          {approach.steps.map((s, i) => (
            <li key={s.name} className="flex items-baseline gap-3">
              <span className={`${mono} text-[11px] text-(--archive-ink)`}>Fase {String(i + 1).padStart(2, "0")}</span>
              <span className={`${serif} text-[1.25rem] leading-none`}>{s.name}</span>
            </li>
          ))}
        </ol>
      </Tile>

      <Tile name="Retícula editorial" rule="Doce columnas. El titular ocupa ocho; la entradilla, cuatro, alineada a su base. Siempre alineado a la izquierda.">
        <div className="relative h-32">
          <div className="absolute inset-0 grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="bg-(--red)/10 outline -outline-offset-1 outline-(--red)/30" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-cols-12 items-end gap-1 p-0">
            <span className="col-span-8 h-[72%] bg-(--ink)" />
            <span className="col-span-4 h-[28%] bg-(--archive)" />
          </div>
        </div>
      </Tile>

      <Tile name="Prompts" rule="Cada orden señala algo real: el ancla de la sección, una carpeta, un fichero. Lo comentado con // aún no existe.">
        <div className={`grid gap-1.5 border border-(--ink) bg-(--card) p-3 ${mono} text-[12px]`}>
          <p>~/statex $ cd problema</p>
          <p>~/statex $ ls soluciones/</p>
          <p className="text-(--archive-ink)">// {technology.roadmap.items[0]}</p>
          <p>
            ~/statex/lab $ <Cursor blink={false} />
          </p>
        </div>
      </Tile>

      <Tile name="Huecos visibles" rule="Lo que falta se marca con un recuadro discontinuo y el texto [Pendiente: …]. Nunca se rellena con algo inventado.">
        <div className="grid justify-items-start gap-3">
          <span className={`border border-dashed border-(--archive) px-3 py-2 ${mono} text-[12px] text-(--archive-ink)`}>
            {research.lab.pending}
          </span>
          <span className={`border border-dashed border-(--archive) px-3 py-2 ${mono} text-[12px] text-(--archive-ink)`}>
            {identity.card.web}
          </span>
        </div>
      </Tile>
    </div>
  );
}

/* ── Tarjeta, deck y aplicaciones (escalan con container queries) ── */

function CardFront() {
  return (
    <div className="@container h-full">
      <div className="flex h-full flex-col justify-between bg-(--card) p-[7cqw] text-(--ink)">
        <Wordmark blink={false} className="text-[13cqw]" />
        <div>
          <p className={`${serif} text-[4.4cqw] leading-[1.1]`}>{brand.tagline}</p>
          <p className={`mt-[2cqw] border-t border-(--ink) pt-[1.6cqw] ${mono} text-[2.5cqw] text-(--archive-ink)`}>{brand.descriptor}</p>
        </div>
      </div>
    </div>
  );
}

function CardBack() {
  const rows: [string, string][] = [
    ["cargo", identity.card.role],
    ["email", identity.card.email],
    ["web", identity.card.web],
  ];
  return (
    <div className="@container h-full">
      <div className="flex h-full flex-col justify-between bg-(--ink) p-[7cqw] text-(--card)">
        <p className={`${mono} text-[2.6cqw] text-[#C9CBC5]`}>~/statex $ cat contacto</p>
        <div>
          <p className={`${serif} text-[8cqw] leading-none text-white`}>{identity.card.name}</p>
          <dl className={`mt-[3cqw] grid grid-cols-[auto_1fr] gap-x-[3cqw] gap-y-[1cqw] ${mono} text-[3cqw]`}>
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-[#C9CBC5]">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function DeckCover() {
  return (
    <div className="@container h-full">
      <div className="flex h-full flex-col bg-(--paper) p-[4.5cqw] text-(--ink)">
        <div className={`flex justify-between border-b-2 border-(--ink) pb-[0.8cqw] ${mono} text-[1.4cqw]`}>
          <span>{identity.deck.meta}</span>
          <span className="text-(--archive-ink)">~/statex $ open deck</span>
        </div>
        <div className="grid flex-1 grid-cols-12 items-end gap-[2cqw]">
          <div className="col-span-8">
            <Wordmark blink={false} className="text-[17cqw] leading-[0.8]" />
            <p className={`mt-[2cqw] ${serif} text-[3.8cqw] leading-[1.05]`}>{identity.deck.subtitle}</p>
          </div>
          <div aria-hidden="true" className="col-span-4 grid gap-[1.1cqw] pb-[1cqw]">
            {[92, 70, 84, 46].map((w) => (
              <span key={w} className="block h-[1.6cqw] bg-(--ink)" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <p className={`mt-[2.5cqw] border-t border-(--ink) pt-[0.8cqw] ${mono} text-[1.4cqw] text-(--archive-ink)`}>{brand.descriptor}</p>
      </div>
    </div>
  );
}

function ReportCover() {
  return (
    <div className="@container h-full">
      <div className="flex h-full flex-col bg-(--card) p-[8cqw] text-(--ink)">
        <div className={`flex justify-between border-b-2 border-(--ink) pb-[1.4cqw] ${mono} text-[2.6cqw]`}>
          <span>Informe</span>
          <span className="text-(--archive-ink)">Ejemplo ilustrativo</span>
        </div>
        <p className={`mt-[10cqw] ${serif} text-[11.5cqw] leading-[0.9] tracking-[-0.015em]`}>{solutions[0].name}</p>
        <dl className={`mt-[7cqw] grid grid-cols-[auto_1fr] gap-x-[4cqw] gap-y-[1.4cqw] ${mono} text-[2.8cqw]`}>
          <dt className="text-(--archive-ink)">objetivo</dt>
          <dd>ejemplo.com</dd>
          <dt className="text-(--archive-ink)">rango</dt>
          <dd>203.0.113.0/24</dd>
          <dt className="text-(--archive-ink)">fase</dt>
          <dd>{approach.steps[2].name}</dd>
        </dl>
        <div aria-hidden="true" className="mt-[7cqw] grid gap-[1.6cqw]">
          {[88, 64, 76].map((w) => (
            <span key={w} className="block h-[2.2cqw] bg-(--ink)" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-(--ink) pt-[2cqw]">
          <Wordmark blink={false} className="text-[7cqw]" />
          <span className={`border border-dashed border-(--archive) px-[1.6cqw] py-[0.8cqw] ${mono} text-[2.3cqw] text-(--archive-ink)`}>
            [Pendiente: fecha y versión]
          </span>
        </div>
      </div>
    </div>
  );
}

function LabHeader() {
  return (
    <div className="@container h-full">
      <div className="flex h-full flex-col bg-(--ink) p-[5cqw] text-(--card)">
        <div className={`flex justify-between border-b border-[#8A8C86] pb-[1cqw] ${mono} text-[1.9cqw] text-[#C9CBC5]`}>
          <span>~/statex/lab $ cat nota.md</span>
          <span>Ejemplo ilustrativo</span>
        </div>
        <p className={`mt-[3cqw] ${serif} text-[4.6cqw] leading-none text-white`}>
          {research.lab.name}
          <Cursor blink={false} className="ml-[0.1em]" />
        </p>
        <p className={`mt-auto max-w-[80%] ${serif} text-[7.4cqw] leading-[0.92] tracking-[-0.015em] text-white`}>{research.topics[0]}</p>
        <p className={`mt-[2.4cqw] ${mono} text-[1.9cqw] text-[#C9CBC5]`}>// {research.lab.text}</p>
      </div>
    </div>
  );
}

export default function ConceptEBrandPage() {
  return (
    <div style={tokens} className={`${fSerif.variable} ${fMono.variable} ${fSans.variable}`}>
      <BrandBoard
        slug="g"
        logoLight={<Logo />}
        logoDark={<Logo dark />}
        symbol={<BrandSymbol />}
        typeSpecimen={<TypeSpecimen />}
        graphicSystem={<GraphicSystem />}
        cardFront={<CardFront />}
        cardBack={<CardBack />}
        deckCover={<DeckCover />}
        applications={[
          { name: "Portada de informe (ejemplo ilustrativo)", node: <ReportCover />, ratio: "1 / 1.414" },
          { name: "Cabecera de artículo de StateX Lab (ejemplo ilustrativo)", node: <LabHeader />, ratio: "16 / 9" },
        ]}
        notes={[
          "El cursor rojo es el único color del logotipo. En pantalla parpadea cinco veces como máximo; en impreso y en el símbolo, siempre fijo.",
          "Las barras de censura solo se usan sobre titulares, se retiran una vez y nunca tapan información. Sin JS o con movimiento reducido no aparecen.",
          "Cada prompt nombra algo real (un ancla, una carpeta, un fichero). Si no señala nada, se quita. Lo que aún no existe se escribe comentado con //.",
          "El rojo señal no se usa en texto pequeño sobre papel (4,2:1). El texto secundario va en #575A54 (5,8:1 sobre #E9EAE6).",
        ]}
      />
    </div>
  );
}
