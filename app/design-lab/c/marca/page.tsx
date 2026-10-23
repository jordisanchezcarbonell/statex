import type { CSSProperties, ReactNode } from "react";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { brand, hero, identity, problem, sampleAssets, sections, solutions } from "../../content";
import { BrandBoard } from "../../_shared/BrandBoard";
import { Composition, Glyph, XMark } from "../Composition";
import { Wordmark, display } from "../Wordmark";
import {
  GLYPH_NAME,
  KIND_NAME,
  STAGE_IDS,
  X_MARK,
  stageComposition,
  type Composition as Comp,
  type GlyphId,
  type Ink,
  type Kind,
  type StageId,
} from "../pieces";

export const metadata = { title: "Concept C · Marca" };

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--c-display",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--c-text", display: "swap" });

const tokens = {
  "--paper": "#F1F3EF",
  "--ink": "#17161C",
  "--sage": "#A9CBB6",
  "--apricot": "#F3A877",
  "--lilac": "#C3B2F2",
  "--petrol": "#14524F",
  "--ink-soft": "#46454F",
  "--paper-soft": "#C9CCC6",
} as CSSProperties;

const one = (k: Kind, c: Ink, r = 0): Comp => ({ g: 1, p: [{ k, c, x: 0, y: 0, r }] });
const label = "text-[13px] font-semibold text-(--ink)";
const conceptGlyphs: GlyphId[] = ["exposicion", "verificacion", "prioridad", "reduccion", "investigacion"];

const stageMeta: Record<StageId, { bg: string; text: string; caption: string }> = {
  problema: { bg: "bg-(--ink)", text: "text-(--paper)", caption: "Piezas dispersas" },
  enfoque: { bg: "bg-(--paper)", text: "text-(--ink)", caption: "Piezas alineándose" },
  soluciones: { bg: "bg-(--lilac)", text: "text-(--ink)", caption: "La X completa" },
  tecnologia: { bg: "bg-(--sage)", text: "text-(--ink)", caption: "En construcción" },
  investigacion: { bg: "bg-(--petrol)", text: "text-(--paper)", caption: "Apiladas como libros" },
  sobre: { bg: "bg-(--apricot)", text: "text-(--ink)", caption: "Línea temporal" },
};
const stageTitle: Record<StageId, string> = {
  problema: sections.problem,
  enfoque: sections.approach,
  soluciones: sections.solutions,
  tecnologia: sections.technology,
  investigacion: sections.research,
  sobre: sections.about,
};

export default function ConceptCMarca() {
  return (
    <div style={tokens} className={`${bricolage.variable} ${hanken.variable}`}>
      <BrandBoard
        slug="c"
        logoLight={<Wordmark className="text-[clamp(3.25rem,8vw,6.5rem)] text-(--ink)" />}
        logoDark={<Wordmark tone="dark" className="text-[clamp(3.25rem,8vw,6.5rem)] text-(--paper)" />}
        symbol={<Symbol />}
        typeSpecimen={<TypeSpecimen />}
        graphicSystem={<GraphicSystem />}
        cardFront={<CardFront />}
        cardBack={<CardBack />}
        deckCover={<DeckCover />}
        applications={[
          { name: "Portada de informe (A4)", node: <ReportCover />, ratio: "1 / 1.414" },
          { name: "Banner de LinkedIn", node: <LinkedInBanner />, ratio: "4 / 1" },
          { name: "Señalética de stand en un evento", node: <EventWall />, ratio: "16 / 9" },
        ]}
        notes={[
          "Las piezas solo se colocan sobre la retícula: posiciones en celdas o medias celdas y giros de 90°. El giro libre se reserva para el desorden (el problema, lo que aún no está construido).",
          "La X son siempre cuatro cuartos de círculo enfrentados. En fondo oscuro, el cuarto Petróleo pasa a Papel; nunca se dibuja la X con trazo ni con una tipografía.",
          "Los pasteles son superficies y piezas, nunca texto sobre Papel. El texto va en Tinta o Petróleo; sobre Tinta y Petróleo, en Papel.",
          "Cada concepto tiene su pictograma; un pictograma acompaña siempre a un texto que dice lo mismo, nunca lo sustituye.",
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Symbol() {
  return (
    <div className="grid justify-items-center gap-6">
      <Composition comp={X_MARK()} grid gridColor="#17161C" className="w-36" />
      <div aria-hidden="true" className="flex items-end gap-4">
        <span className="grid size-12 place-items-center rounded-[0.3rem] bg-(--ink)">
          <XMark tone="dark" gap={0.06} className="size-8" />
        </span>
        <XMark gap={0.06} className="size-8" />
        <XMark gap={0.08} className="size-4" />
      </div>
    </div>
  );
}

function TypeSpecimen() {
  return (
    <div className="grid gap-8 p-6 text-(--ink) sm:p-10 xl:grid-cols-[auto_minmax(0,1fr)]">
      <div>
        <p aria-hidden="true" className={`${display} text-[clamp(6rem,14vw,11rem)] leading-[0.8] font-extrabold tracking-[-0.04em]`}>
          Aa
        </p>
        <p className="mt-4 text-[13px] text-zinc-600">Bricolage Grotesque, 700–800, opsz 96, wdth 86</p>
        <p className="text-[13px] text-zinc-600">Hanken Grotesk, 400–600</p>
      </div>
      <div className="grid content-start gap-6">
        <p className={`${display} max-w-[17ch] text-[clamp(2rem,4vw,3.5rem)] leading-[0.92] font-extrabold tracking-[-0.035em]`}>
          {hero.title}
        </p>
        <p className={`${display} max-w-[20ch] text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[0.95] font-bold tracking-[-0.03em]`}>
          {problem.title}
        </p>
        <p className="max-w-[36rem] font-(family-name:--c-text) text-[1.1875rem] leading-[1.55] text-(--ink-soft)">{hero.body}</p>
        <p className="flex items-center gap-2.5 font-(family-name:--c-text) text-[1.0625rem] font-semibold">
          <Composition comp={one("q", "petrol")} className="size-4" />
          {sections.problem}
        </p>
      </div>
    </div>
  );
}

function Cell({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="grid content-start gap-3">
      <div className="grid aspect-square place-items-center rounded-[0.3rem] border border-(--ink)/15 bg-white/60 p-[18%]">{children}</div>
      <figcaption className={label}>{caption}</figcaption>
    </figure>
  );
}

function Plus() {
  return (
    <span aria-hidden="true" className="text-[1.5rem] leading-none font-semibold text-(--ink-soft)">
      +
    </span>
  );
}

function Combo({ parts, result, caption }: { parts: Comp[]; result: Comp; caption: string }) {
  return (
    <figure className="grid gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {parts.map((p, i) => (
          <span key={i} className="contents">
            {i > 0 && <Plus />}
            <Composition comp={p} className="size-10" />
          </span>
        ))}
        <span aria-hidden="true" className="text-[1.5rem] leading-none font-semibold text-(--ink-soft)">
          =
        </span>
        <Composition comp={result} className="size-16" />
      </div>
      <figcaption className="text-[14px] text-(--ink-soft)">{caption}</figcaption>
    </figure>
  );
}

function GraphicSystem() {
  const kinds: [Kind, Ink][] = [
    ["q", "petrol"],
    ["s", "apricot"],
    ["r", "lilac"],
    ["t", "sage"],
  ];
  return (
    <div className="grid gap-12 bg-(--paper) p-6 text-(--ink) sm:p-10">
      <div className="grid gap-4">
        <h3 className={`${display} text-[1.5rem] font-bold`}>Cuatro piezas, una retícula</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {kinds.map(([k, c]) => (
            <Cell key={k} caption={KIND_NAME[k]}>
              <Composition comp={one(k, c)} grid gridColor="#17161C" className="w-full" />
            </Cell>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className={`${display} text-[1.5rem] font-bold`}>Combinaciones</h3>
        <div className="grid gap-8 sm:grid-cols-2">
          <Combo
            parts={[one("q", "petrol", 0), one("q", "apricot", 90), one("q", "lilac", 180), one("q", "sage", 270)]}
            result={X_MARK()}
            caption="Cuatro cuartos de círculo enfrentados forman la X."
          />
          <Combo
            parts={[one("t", "sage", 0), one("t", "petrol", 180)]}
            result={{ g: 1, p: [{ k: "t", c: "sage", x: 0, y: 0 }, { k: "t", c: "petrol", x: 0, y: 0, r: 180 }] }}
            caption="Dos triángulos encajan en un cuadrado: verificación."
          />
          <Combo
            parts={[one("s", "apricot", 0), one("s", "ink", 180)]}
            result={{ g: 1, p: [{ k: "s", c: "apricot", x: 0, y: 0 }, { k: "s", c: "ink", x: 0, y: 0, r: 180 }] }}
            caption="Dos semicírculos cierran un círculo: un hito."
          />
          <Combo
            parts={[one("r", "lilac"), one("s", "lilac", 90)]}
            result={{ g: 2, p: [{ k: "r", c: "lilac", x: 0, y: 0.5 }, { k: "s", c: "lilac", x: 1, y: 0.5, r: 90 }] }}
            caption="Cuadrado y semicírculo hacen un lomo de libro: investigación."
          />
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className={`${display} text-[1.5rem] font-bold`}>Pictogramas por concepto</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {conceptGlyphs.map((g) => (
            <Cell key={g} caption={GLYPH_NAME[g]}>
              <Glyph id={g} className="w-full" />
            </Cell>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className={`${display} text-[1.5rem] font-bold`}>Recomposición en la web</h3>
        <p className="max-w-[44rem] text-[15px] text-(--ink-soft)">
          Las mismas diez piezas cambian de posición y color al pasar de una sección a otra. Cada estado tiene en cuenta su fondo.
        </p>
        <ol role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {STAGE_IDS.map((id) => (
            <li key={id} className={`${stageMeta[id].bg} ${stageMeta[id].text} rounded-[0.3rem] p-4`}>
              <Composition comp={stageComposition(id)} className="w-full" />
              <p className="mt-4 text-[13px] font-semibold">{stageTitle[id]}</p>
              <p className="text-[13px]">{stageMeta[id].caption}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* --- Tarjeta digital ------------------------------------------------ */

function CardFront() {
  return (
    <div className="@container relative h-full w-full overflow-hidden bg-(--paper) text-(--ink)">
      <div className="absolute top-[9cqw] left-[8cqw]">
        <Wordmark className="text-[9cqw]" />
      </div>
      <p className="absolute bottom-[8cqw] left-[8cqw] max-w-[42cqw] text-[2.6cqw] leading-snug font-medium">{brand.descriptor}</p>
      <div className="absolute -right-[9cqw] -bottom-[16cqw] w-[58cqw]">
        <XMark gap={0.03} className="w-full" />
      </div>
    </div>
  );
}

function CardBack() {
  const c = identity.card;
  return (
    <div className="@container relative h-full w-full overflow-hidden bg-(--petrol) text-(--paper)">
      <div className="absolute top-[8cqw] right-[8cqw] w-[12cqw]">
        <XMark tone="dark" gap={0.06} className="w-full" />
      </div>
      <div className="absolute bottom-[8cqw] left-[8cqw] grid gap-[1.2cqw]">
        <p className={`${display} text-[6.5cqw] leading-none font-bold`}>{c.name}</p>
        <p className="text-[3cqw] text-(--paper-soft)">{c.role}</p>
        <p className="mt-[2cqw] text-[3cqw]">{c.email}</p>
        <p className="text-[3cqw]">{c.web}</p>
      </div>
      <div className="absolute top-[8cqw] left-[8cqw] flex gap-[1.5cqw]">
        <Composition comp={one("s", "sage")} className="w-[5cqw]" />
        <Composition comp={one("r", "apricot")} className="w-[5cqw]" />
        <Composition comp={one("t", "lilac")} className="w-[5cqw]" />
      </div>
    </div>
  );
}

/* --- Pitch deck ----------------------------------------------------- */

function DeckCover() {
  const d = identity.deck;
  return (
    <div className="@container relative grid h-full w-full grid-cols-[62fr_38fr] overflow-hidden bg-(--ink) text-(--paper)">
      <div className="relative flex flex-col justify-between p-[5cqw]">
        <p className="text-[1.5cqw] text-(--paper-soft)">{d.meta}</p>
        <div>
          <p>
            <Wordmark tone="dark" className="text-[11cqw]" />
          </p>
          <p className={`${display} mt-[2cqw] max-w-[20ch] text-[3.2cqw] leading-[1.05] font-bold`}>{d.subtitle}</p>
        </div>
      </div>
      <div className="bg-(--lilac)" />
      {/* La X cruza la costura entre los dos bloques de color. */}
      <div className="absolute top-1/2 left-[62%] w-[34cqw] -translate-x-1/2 -translate-y-1/2">
        <Composition comp={X_MARK(["paper", "apricot", "petrol", "sage"])} gap={0.03} className="w-full" />
      </div>
    </div>
  );
}

/* --- Aplicaciones ---------------------------------------------------- */

function ReportCover() {
  const asset = sampleAssets[0];
  return (
    <div className="@container relative h-full w-full overflow-hidden bg-(--paper) text-(--ink)">
      <div className="absolute top-[8cqw] left-[8cqw]">
        <Wordmark className="text-[8cqw]" />
      </div>
      <div className="absolute top-[20cqw] -left-[8cqw] w-[56cqw]">
        <Glyph id="exposicion" className="w-full" />
      </div>
      <div className="absolute right-[8cqw] bottom-[17cqw] left-[8cqw]">
        <p className={`${display} max-w-[14ch] text-[8.5cqw] leading-[0.95] font-extrabold tracking-[-0.03em]`}>{solutions[0].name}</p>
        <p className="mt-[3cqw] text-[3.6cqw] font-semibold">{asset.host.replace(/^www\./, "")}</p>
        <p className="mt-[2cqw] inline-block rounded-[0.3cqw] border-[0.35cqw] border-dashed border-(--ink) px-[2cqw] py-[0.8cqw] text-[2.8cqw]">
          Ejemplo ilustrativo
        </p>
      </div>
      <div aria-hidden="true" className="absolute right-0 bottom-0 left-0 grid h-[12cqw] grid-cols-6">
        <div className="bg-(--petrol)" />
        <div className="bg-(--sage)" />
        <div className="rounded-tr-full bg-(--apricot)" />
        <div className="bg-(--lilac)" />
        <div className="rounded-tl-full bg-(--ink)" />
        <div className="bg-(--petrol)" />
      </div>
    </div>
  );
}

function LinkedInBanner() {
  return (
    <div className="@container relative flex h-full w-full items-center overflow-hidden bg-(--sage) text-(--ink)">
      <div className="pl-[4cqw]">
        <Wordmark className="text-[6.5cqw]" />
        <p className={`${display} mt-[1.2cqw] max-w-[30ch] text-[2.2cqw] leading-tight font-bold`}>{brand.tagline}</p>
      </div>
      <div className="absolute top-1/2 right-[-2cqw] flex -translate-y-1/2 gap-[1.6cqw]">
        {conceptGlyphs.map((g) => (
          <Glyph key={g} id={g} remap={{ sage: "paper" }} className="w-[9cqw]" />
        ))}
      </div>
    </div>
  );
}

function EventWall() {
  return (
    <div className="@container relative h-full w-full overflow-hidden bg-(--petrol) text-(--paper)">
      <div className="absolute top-[-10cqw] left-[-12cqw] w-[56cqw]">
        <XMark tone="dark" gap={0.025} className="w-full" />
      </div>
      <div className="absolute top-[9cqw] right-[6cqw] left-[50cqw]">
        <Wordmark tone="dark" className="text-[9.5cqw]" />
        <p className={`${display} mt-[2cqw] text-[3cqw] leading-[1.05] font-bold`}>{brand.descriptor}</p>
      </div>
      {/* Zócalo del stand: una fila de piezas sobre la línea de suelo. */}
      <div aria-hidden="true" className="absolute right-0 bottom-0 left-0 flex h-[8cqw] items-end bg-(--ink) px-[6cqw]">
        <div className="flex -translate-y-[8cqw] gap-[1cqw]">
          {(
            [
              ["s", "apricot", 0],
              ["r", "sage", 0],
              ["q", "lilac", 270],
              ["t", "paper", 0],
              ["s", "sage", 0],
              ["r", "apricot", 0],
              ["q", "paper", 270],
            ] as [Kind, Ink, number][]
          ).map(([k, c, r], i) => (
            <Composition key={i} comp={one(k, c, r)} className="w-[5cqw]" />
          ))}
        </div>
      </div>
      <p className="absolute right-[6cqw] bottom-[2.6cqw] text-[1.8cqw] text-(--paper-soft)">{brand.tagline}</p>
    </div>
  );
}
