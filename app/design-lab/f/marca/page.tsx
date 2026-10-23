import type { ReactNode } from "react";
import { Inter_Tight } from "next/font/google";
import { BrandBoard } from "../../_shared/BrandBoard";
import { brand, identity, sampleAssets } from "../../content";
import { IsoDefs, Isolines } from "../_components/Isolines";
import { LensMark } from "../_components/LensMark";
import "../future.css";

export const metadata = { title: "Concept F · Marca" };

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-future",
});

// Sin WebGL en esta página: todas las isolíneas son renders SVG estáticos calculados en el servidor.

const darkLines = ["var(--hielo)", "var(--lavanda)", "var(--hielo)", "var(--lavanda)", "var(--violeta)"];
const faintDark = ["rgb(191 230 255 / 0.35)", "rgb(185 168 255 / 0.35)", "rgb(191 230 255 / 0.6)", "rgb(185 168 255 / 0.35)", "rgb(122 92 255 / 0.5)"];

function Wordmark({ tone, className = "" }: { tone: "light" | "dark"; className?: string }) {
  return (
    <span className={`ff inline-flex items-center gap-[0.28em] font-semibold leading-none tracking-[-0.05em] ${tone === "light" ? "text-(--tinta)" : "text-white"} ${className}`}>
      <LensMark tone={tone} className="size-[0.92em]" />
      {brand.name}
    </span>
  );
}

/** Lente estática: recorta la capa del atacante (fondo tinta + isolíneas densas) en un círculo. */
function Lens({ x, y, r, align = "xMidYMid", children }: { x: string; y: string; r: string; align?: string; children?: ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-(--tinta)" style={{ clipPath: `circle(${r} at ${x} ${y})` }}>
        <Isolines variant="dense" colors={darkLines} align={align} className="absolute inset-0 h-full w-full" />
        {children}
      </div>
      <div
        aria-hidden="true"
        className="absolute rounded-full border border-(--hielo)"
        style={{ left: `calc(${x} - ${r})`, top: `calc(${y} - ${r})`, width: `calc(${r} * 2)`, height: `calc(${r} * 2)` }}
      />
    </>
  );
}

const typeSpecimen = (
  <div className="ff grid gap-6 p-6 text-(--tinta) sm:p-10">
    <p className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.055em]">Lo que no ves también está expuesto.</p>
    <p className="max-w-[24ch] text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.03em] text-(--cobalto)">
      De la exposición al riesgo reducido.
    </p>
    <p className="max-w-[60ch] text-[18px] leading-[1.55] text-(--gris)">
      StateX identifica la superficie de ataque externa de tu organización, verifica qué es realmente explotable y te ayuda a reducir el riesgo con un plan priorizado.
    </p>
    <dl className="grid gap-x-8 gap-y-2 border-t border-(--tinta)/10 pt-5 text-[14px] text-(--gris) sm:grid-cols-4">
      <div><dt className="font-semibold text-(--tinta)">Display</dt><dd>600, -0,055em, 0,95</dd></div>
      <div><dt className="font-semibold text-(--tinta)">Entradilla</dt><dd>500, -0,03em, 1,12</dd></div>
      <div><dt className="font-semibold text-(--tinta)">Texto</dt><dd>400, 18/1,55</dd></div>
      <div><dt className="font-semibold text-(--tinta)">Datos</dt><dd className="tabular-nums">staging.ejemplo.com 203.0.113.14</dd></div>
    </dl>
  </div>
);

const graphicSystem = (
  <div className="ff grid gap-px bg-zinc-300 lg:grid-cols-3">
    <figure className="bg-(--nieve)">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Isolines className="absolute inset-0 h-full w-full" />
      </div>
      <figcaption className="p-4 text-[14px] text-(--gris)">
        <b className="block text-(--tinta)">Isolíneas</b>
        Curvas de nivel de tres ondas que interfieren: la misma fórmula del shader de la web.
      </figcaption>
    </figure>
    <figure className="bg-(--nieve)">
      <div className="@container relative aspect-[16/10] overflow-hidden">
        <Isolines className="absolute inset-0 h-full w-full" />
        <Lens x="58%" y="48%" r="24cqw">
          {sampleAssets.slice(1, 3).map((a, i) => (
            <span
              key={a.host}
              className="absolute rounded bg-(--tinta)/85 px-[1.4cqw] py-[0.8cqw] text-[3cqw] font-semibold text-white ring-1 ring-(--hielo)/30"
              style={{ left: i ? "50%" : "40%", top: i ? "58%" : "36%" }}
            >
              {a.host}
            </span>
          ))}
        </Lens>
      </div>
      <figcaption className="p-4 text-[14px] text-(--gris)">
        <b className="block text-(--tinta)">Lente</b>
        Un círculo que revela la capa del atacante: fondo tinta, líneas más densas, activos expuestos. Ejemplo ilustrativo.
      </figcaption>
    </figure>
    <figure className="bg-(--nieve)">
      <div className="grid aspect-[16/10] grid-rows-[1fr_auto] gap-3 p-4">
        <div className="rounded-lg bg-[linear-gradient(90deg,#F7F8FB_0%,#BFE6FF_34%,#2C4BFF_70%,#7A5CFF_100%)] ring-1 ring-inset ring-(--tinta)/10" />
        <ul className="grid grid-cols-3 gap-2 text-[12px] text-(--gris)">
          <li>
            <span className="block h-12 rounded-md bg-(--nieve) ring-1 ring-(--tinta)/10" style={{ backgroundImage: "repeating-radial-gradient(circle at 80% 30%, transparent 0 6px, rgb(44 75 255 / 0.35) 6px 7px)" }} />
            <span className="mt-1 block">Señal (hero)</span>
          </li>
          <li>
            <span className="block h-12 rounded-md bg-(--tinta)" style={{ backgroundImage: "repeating-radial-gradient(circle at 20% 80%, transparent 0 4px, rgb(191 230 255 / 0.3) 4px 5px), repeating-radial-gradient(circle at 90% 10%, transparent 0 5px, rgb(185 168 255 / 0.3) 5px 6px)" }} />
            <span className="mt-1 block">Caos (problema)</span>
          </li>
          <li>
            <span className="block h-12 rounded-md bg-(--nieve) ring-1 ring-(--tinta)/10" style={{ backgroundImage: "repeating-linear-gradient(170deg, transparent 0 8px, rgb(44 75 255 / 0.3) 8px 9px)" }} />
            <span className="mt-1 block">Orden (enfoque)</span>
          </li>
        </ul>
      </div>
      <figcaption className="p-4 text-[14px] text-(--gris)">
        <b className="block text-(--tinta)">Gradiente y estados</b>
        Nieve, hielo, cobalto y violeta solo como rampa de las líneas. El fondo cambia de estado con el contenido.
      </figcaption>
    </figure>
  </div>
);

const cardFront = (
  <div className="ff @container relative h-full overflow-hidden bg-(--tinta) text-white">
    <Isolines colors={faintDark} align="xMaxYMid" className="absolute inset-y-0 right-0 h-full w-[70%] [mask-image:linear-gradient(90deg,transparent,black_45%)]" />
    <div className="relative flex h-full flex-col justify-between p-[7cqw]">
      <Wordmark tone="dark" className="text-[9cqw]" />
      <p className="max-w-[24ch] text-[3.4cqw] leading-snug text-white/85">{brand.tagline}</p>
    </div>
  </div>
);

const cardBack = (
  <div className="ff @container relative h-full overflow-hidden bg-(--nieve) text-(--tinta)">
    <Isolines className="absolute inset-0 h-full w-full opacity-40" align="xMaxYMid" />
    <Lens x="86%" y="20%" r="15cqw" align="xMaxYMid" />
    <div className="relative flex h-full flex-col justify-end gap-[1.2cqw] p-[7cqw]">
      <p className="text-[6cqw] font-semibold leading-none tracking-[-0.04em]">{identity.card.name}</p>
      <p className="text-[3.4cqw] text-(--gris)">{identity.card.role}</p>
      <div className="mt-[3cqw] grid gap-[0.6cqw] text-[3.2cqw] tabular-nums">
        <p>{identity.card.email}</p>
        <p className="text-(--cobalto)">{identity.card.web}</p>
      </div>
    </div>
  </div>
);

const deckCover = (
  <div className="ff @container relative h-full overflow-hidden bg-(--nieve) text-(--tinta)">
    <Isolines align="xMaxYMid" className="absolute inset-0 h-full w-full [mask-image:linear-gradient(100deg,transparent_15%,black_60%)]" />
    <Lens x="72%" y="42%" r="15cqw" align="xMaxYMid">
      <span className="absolute left-[64%] top-[36%] rounded bg-(--tinta)/85 px-[0.8cqw] py-[0.4cqw] text-[1.4cqw] font-semibold text-white ring-1 ring-(--hielo)/30">
        {sampleAssets[1].host}
      </span>
      <span className="absolute left-[70%] top-[50%] rounded bg-(--tinta)/85 px-[0.8cqw] py-[0.4cqw] text-[1.4cqw] font-semibold text-white ring-1 ring-(--hielo)/30">
        {sampleAssets[3].host}
      </span>
    </Lens>
    <div className="relative flex h-full flex-col justify-between p-[5cqw]">
      <LensMark className="size-[4cqw]" />
      <div>
        <p className="text-[13cqw] font-semibold leading-[0.9] tracking-[-0.06em]">{identity.deck.title}</p>
        <p className="mt-[1.6cqw] max-w-[22ch] text-[3cqw] font-medium leading-[1.12] tracking-[-0.03em] text-(--cobalto)">
          {identity.deck.subtitle}
        </p>
        <p className="mt-[3cqw] text-[1.5cqw] text-(--gris)">{identity.deck.meta}</p>
      </div>
    </div>
  </div>
);

const reportCover = (
  <div className="ff @container relative h-full overflow-hidden bg-(--nieve) text-(--tinta)">
    <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">
      <Isolines align="xMidYMid" className="absolute inset-0 h-full w-full" />
      <Lens x="60%" y="52%" r="22cqw">
        <span className="absolute left-[46%] top-[46%] rounded bg-(--tinta)/85 px-[1.6cqw] py-[0.8cqw] text-[3.2cqw] font-semibold text-white ring-1 ring-(--hielo)/30">
          {sampleAssets[1].host}
        </span>
      </Lens>
    </div>
    <div className="absolute inset-x-0 bottom-0 flex h-[42%] flex-col justify-between border-t border-(--tinta)/10 bg-white p-[7cqw]">
      <div>
        <p className="text-[7.4cqw] font-semibold leading-[1] tracking-[-0.05em]">Evaluación de la superficie de ataque externa</p>
        <p className="mt-[3cqw] text-[3.2cqw] tabular-nums text-(--gris)">Alcance: *.ejemplo.com, 203.0.113.0/24</p>
        <p className="text-[3.2cqw] text-(--gris)">Organización: [Pendiente]</p>
      </div>
      <div className="flex items-end justify-between gap-4">
        <Wordmark tone="light" className="text-[5cqw]" />
        <p className="text-[2.8cqw] text-(--cobalto)">Ejemplo ilustrativo</p>
      </div>
    </div>
  </div>
);

const linkedinBanner = (
  <div className="ff @container relative h-full overflow-hidden bg-(--tinta) text-white">
    <Isolines colors={faintDark} align="xMinYMid" className="absolute inset-y-0 left-0 h-full w-[60%] [mask-image:linear-gradient(90deg,black_40%,transparent)]" />
    <div className="relative flex h-full flex-col items-end justify-center gap-[1cqw] px-[4cqw] text-right">
      <p className="text-[3.6cqw] font-semibold leading-[1] tracking-[-0.04em]">{brand.tagline}</p>
      <p className="text-[1.6cqw] text-(--hielo)">{brand.descriptor}</p>
    </div>
  </div>
);

export default function FutureBrandPage() {
  return (
    <div className={`${interTight.variable} future-root`}>
      <IsoDefs />
      <BrandBoard
        slug="f"
        logoLight={<Wordmark tone="light" className="text-[clamp(2.75rem,6vw,4.5rem)]" />}
        logoDark={<Wordmark tone="dark" className="text-[clamp(2.75rem,6vw,4.5rem)]" />}
        symbol={
          <div className="flex items-end gap-5">
            <LensMark className="size-24" />
            <LensMark className="size-12" />
            <LensMark className="size-6" />
          </div>
        }
        typeSpecimen={typeSpecimen}
        graphicSystem={graphicSystem}
        cardFront={cardFront}
        cardBack={cardBack}
        deckCover={deckCover}
        applications={[
          { name: "Portada de informe (A4)", node: reportCover, ratio: "1 / 1.414" },
          { name: "Banner de LinkedIn", node: linkedinBanner, ratio: "4 / 1" },
        ]}
        notes={[
          "La web usa un único shader vivo; las piezas estáticas usan este render SVG de las isolíneas, calculado con la misma fórmula.",
          "La lente es el gesto de marca: un círculo por pieza que muestra la capa del atacante, nunca encima de un titular.",
          "Detrás del texto las líneas se atenúan: como máximo un 26 % de mezcla sobre nieve y un 34 % sobre tinta, para mantener AA.",
          "Cobalto y violeta son color de línea y de acento; los textos largos van en tinta, gris o blanco.",
        ]}
      />
    </div>
  );
}
