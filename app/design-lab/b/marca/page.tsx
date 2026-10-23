import { DM_Mono, DM_Sans } from "next/font/google";
import { BrandBoard } from "../../_shared/BrandBoard";
import { brand, hero, identity, sampleAssets, solutions } from "../../content";
import { Wordmark, XMark } from "../_components/Logo";
import { LevelChip } from "../_components/level";
import { GraphMotif } from "../_components/StaticVisuals";
import { dotCanvas, mono, tokens } from "../_components/ui";

export const metadata = { title: "Concept B · Marca" };

const sans = DM_Sans({ subsets: ["latin", "latin-ext"], axes: ["opsz"], display: "swap", variable: "--f-sans" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--f-mono" });

const f = "font-(family-name:--f-sans)";

function Symbol() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-5">
      <span className="grid size-28 place-items-center rounded-[26px] bg-(--navy)">
        <XMark className="h-12 w-[2.83rem] text-white" gap="#0B1533" />
      </span>
      <span className="grid size-14 place-items-center rounded-[13px] bg-(--navy)">
        <XMark className="h-6 w-[1.42rem] text-white" gap="#0B1533" />
      </span>
      <span className="grid size-8 place-items-center rounded-[8px] bg-(--navy)">
        <XMark className="h-3.5 w-[0.83rem] text-white" gap="#0B1533" />
      </span>
    </div>
  );
}

function TypeSpecimen() {
  const asset = sampleAssets[1];
  return (
    <div className={`grid gap-8 p-6 sm:p-10 ${f} text-(--navy)`}>
      <div>
        <p className={`text-[12px] text-(--muted) ${mono}`}>DM Sans 600, 56/58, −0,045em</p>
        <p className="mt-2 max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.045em]">{hero.title}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className={`text-[12px] text-(--muted) ${mono}`}>DM Sans 600, 22/28, −0,02em</p>
          <p className="mt-2 text-[22px] leading-[1.25] font-semibold tracking-[-0.02em]">{solutions[0].name}</p>
          <p className={`mt-6 text-[12px] text-(--muted) ${mono}`}>DM Sans 400, 17/28</p>
          <p className="mt-2 max-w-[48ch] text-[17px] leading-relaxed text-(--muted)">{solutions[0].text}</p>
        </div>
        <div>
          <p className={`text-[12px] text-(--muted) ${mono}`}>DM Mono 400/500, 13, solo datos</p>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-(--line) bg-(--fog) px-4 py-3">
            <span className="size-3 shrink-0 rounded-full bg-(--signal) ring-2 ring-(--navy)" />
            <span className="min-w-0">
              <span className={`block text-[13px] font-medium ${mono}`}>{asset.host}</span>
              <span className="mt-1 flex items-center gap-2 text-[12px] text-(--muted)">
                {asset.kind}
                <LevelChip level={asset.level} withLabel />
              </span>
            </span>
          </div>
          <p className={`mt-3 flex flex-wrap gap-x-5 text-[13px] text-(--navy) ${mono}`}><span>203.0.113.0/24</span><span>198.51.100.0/24</span></p>
        </div>
      </div>
    </div>
  );
}

function GraphicSystem() {
  const tile = "flex flex-col gap-4 bg-white p-5";
  const cap = "text-[13px] leading-snug text-(--muted)";
  return (
    <div className={`grid gap-px bg-(--line) sm:grid-cols-2 lg:grid-cols-4 ${f} text-(--navy)`}>
      <div className={tile}>
        <div className="grid h-28 place-items-center rounded-lg" style={dotCanvas}>
          <div className="flex items-center gap-5">
            <span className="relative grid size-6 place-items-center rounded-full bg-(--navy)"><span className="size-2 rounded-full bg-(--sky)" /></span>
            <span className="size-3.5 rounded-full border-[1.75px] border-(--navy) bg-white" />
            <span className="size-3.5 rounded-full bg-(--signal) ring-2 ring-(--navy)" />
            <span className="size-3.5 rounded-full bg-white ring-2 ring-(--navy)" />
            <span className="size-3.5 rounded-full bg-(--fog) ring-2 ring-(--edge)" />
          </div>
        </div>
        <p className={cap}><b className="font-semibold text-(--navy)">Nodos.</b> Origen, agrupador y activo. El relleno codifica el nivel; el texto siempre lo repite.</p>
      </div>
      <div className={tile}>
        <div className="grid h-28 place-items-center rounded-lg" style={dotCanvas}>
          <svg viewBox="0 0 200 80" className="h-20 w-full" aria-hidden="true">
            <path d="M 10 60 C 70 60, 70 20, 130 20" fill="none" stroke="#B9C2D3" strokeWidth={1.5} />
            <path d="M 10 60 C 70 60, 80 60, 190 60" fill="none" stroke="#B9C2D3" strokeWidth={1.5} strokeDasharray="3 4" />
            <path d="M 10 40 C 70 40, 90 20, 190 20" fill="none" stroke="#3D8BFF" strokeWidth={2.5} strokeLinecap="round" />
          </svg>
        </div>
        <p className={cap}><b className="font-semibold text-(--navy)">Aristas.</b> Gris fino por defecto, azul para el camino seleccionado. Siempre curvas de Bézier horizontales.</p>
      </div>
      <div className={tile}>
        <div className="grid h-28 place-items-center rounded-lg" style={dotCanvas}>
          <span className="rounded-xl border-[1.5px] border-dashed border-(--sky) px-6 py-5 text-[12px] font-medium text-(--sky-ink)">Alcance autorizado</span>
        </div>
        <p className={cap}><b className="font-semibold text-(--navy)">Marcos.</b> Discontinuo azul para límites acordados; discontinuo gris para lo que aún es visión.</p>
      </div>
      <div className={tile}>
        <div className="flex h-28 overflow-hidden rounded-lg">
          <span className="w-[56%] bg-white ring-1 ring-(--line) ring-inset" />
          <span className="w-[26%] bg-(--fog)" />
          <span className="w-[12%] bg-(--navy)" />
          <span className="w-[5%] bg-(--sky)" />
          <span className="w-[1%] bg-(--signal)" />
        </div>
        <p className={cap}><b className="font-semibold text-(--navy)">Proporción de color.</b> Blanco y Niebla dominan. El amarillo es escaso a propósito: solo marca exposición.</p>
      </div>
    </div>
  );
}

function CardFront() {
  return (
    <div className={`@container relative flex size-full flex-col justify-between overflow-hidden bg-(--navy) p-[7cqw] ${f}`}>
      <GraphMotif tone="dark" className="absolute -right-[6%] -bottom-[18%] h-[95%] opacity-90" />
      <Wordmark tone="dark" className="relative text-[11cqw]" />
      <p className="relative max-w-[60%] text-[3.4cqw] leading-snug text-[#C3CADB]">{brand.tagline}</p>
    </div>
  );
}

function CardBack() {
  const c = identity.card;
  return (
    <div className={`@container flex size-full flex-col justify-between bg-white p-[7cqw] ${f} text-(--navy)`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[5.2cqw] leading-tight font-semibold tracking-[-0.03em]">{c.name}</p>
          <p className="mt-[1cqw] text-[3.4cqw] text-(--muted)">{c.role}</p>
        </div>
        <XMark className="h-[8cqw] w-[7.5cqw] text-(--navy)" />
      </div>
      <dl className={`grid grid-cols-[auto_1fr] gap-x-[3cqw] gap-y-[1.2cqw] text-[3cqw] ${mono}`}>
        <dt className="text-(--muted)">email</dt>
        <dd>{c.email}</dd>
        <dt className="text-(--muted)">web</dt>
        <dd>{c.web}</dd>
      </dl>
    </div>
  );
}

function DeckCover() {
  const d = identity.deck;
  return (
    <div className={`@container relative grid size-full grid-cols-[1.1fr_1fr] overflow-hidden bg-(--navy) ${f}`}>
      <div className="flex flex-col justify-between p-[5cqw]">
        <XMark className="h-[3.4cqw] w-[3.2cqw] text-white" gap="#0B1533" />
        <div>
          <p className="text-[9cqw] leading-[0.95] text-white">
            {d.title === brand.name ? <Wordmark tone="dark" /> : d.title}
          </p>
          <p className="mt-[1.8cqw] max-w-[28ch] text-[2.3cqw] leading-snug text-[#C3CADB]">{d.subtitle}</p>
        </div>
        <p className={`text-[1.35cqw] text-[#A9B3CC] ${mono}`}>{d.meta}</p>
      </div>
      <div className="relative border-l border-white/10" style={{ backgroundImage: "radial-gradient(#1F2B55 1px, transparent 1.4px)", backgroundSize: "2.2cqw 2.2cqw" }}>
        <GraphMotif tone="dark" showLabels className="absolute inset-[8%] size-[84%]" />
      </div>
    </div>
  );
}

function ReportCover() {
  return (
    <div className={`@container flex size-full flex-col bg-white p-[8cqw] ${f} text-(--navy)`}>
      <div className="flex items-center justify-between">
        <Wordmark className="text-[6cqw]" />
        <span className={`text-[2.6cqw] text-(--muted) ${mono}`}>Ejemplo ilustrativo</span>
      </div>
      <div className="mt-[14cqw] h-px bg-(--line)" />
      <p className={`mt-[4cqw] text-[3cqw] text-(--muted) ${mono}`}>Informe de evaluación</p>
      <p className="mt-[2cqw] text-[8.4cqw] leading-[1.02] font-semibold tracking-[-0.04em]">{solutions[0].name}</p>
      <p className={`mt-[4cqw] inline-flex self-start rounded border border-dashed border-(--muted)/50 px-[2cqw] py-[1cqw] text-[2.8cqw] text-(--muted) ${mono}`}>
        [Pendiente: organización y fecha]
      </p>
      <div className="mt-auto rounded-[3cqw] bg-(--fog) p-[4cqw]" style={dotCanvas}>
        <GraphMotif className="h-auto w-full" />
      </div>
    </div>
  );
}

function LinkedInBanner() {
  return (
    <div className={`@container relative flex size-full items-center overflow-hidden bg-(--navy) px-[5cqw] ${f}`}>
      <div className="relative z-10 max-w-[55%]">
        <Wordmark tone="dark" className="text-[4.2cqw]" />
        <p className="mt-[1.4cqw] text-[1.9cqw] leading-snug text-[#C3CADB]">{brand.tagline}</p>
      </div>
      <GraphMotif tone="dark" className="absolute top-[-10%] right-[2%] h-[120%]" />
    </div>
  );
}

export default function ConceptBBrand() {
  return (
    <div style={tokens} className={`${sans.variable} ${dmMono.variable}`}>
      <BrandBoard
        slug="b"
        logoLight={<Wordmark className="text-[clamp(3rem,7vw,5.5rem)]" />}
        logoDark={<Wordmark tone="dark" gap="#09090B" className="text-[clamp(3rem,7vw,5.5rem)]" />}
        symbol={<Symbol />}
        typeSpecimen={<TypeSpecimen />}
        graphicSystem={<GraphicSystem />}
        cardFront={<CardFront />}
        cardBack={<CardBack />}
        deckCover={<DeckCover />}
        applications={[
          { name: "Portada de informe", node: <ReportCover />, ratio: "1 / 1.414" },
          { name: "Banner de LinkedIn", node: <LinkedInBanner />, ratio: "4 / 1" },
        ]}
        notes={[
          "La X es un cruce de esquema: el trazo azul pasa por encima del marino con un corte del color de fondo. Indica siempre ese color al reproducirla (prop gap).",
          "El amarillo señal solo marca exposición (nivel alto, activo fuera de inventario). Nunca en logotipo, botones ni titulares.",
          "Toda interfaz con hosts o niveles lleva la etiqueta «Visualización conceptual / Ejemplo ilustrativo» y usa ejemplo.com o rangos de documentación.",
          "DM Mono se reserva para datos (hosts, años, niveles). Titulares en DM Sans 600 con tracking negativo; el texto en Azul cielo solo sobre Marino.",
        ]}
      />
    </div>
  );
}
