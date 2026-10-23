import type { CSSProperties, ReactNode } from "react";
import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import { approach, brand, hero, identity, problem, sampleAssets, solutions, technology } from "../../content";
import { BrandBoard } from "../../_shared/BrandBoard";
import s from "../e.module.css";

export const metadata = { title: "Concept E · Marca" };

const sans = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  variable: "--e-sans",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--e-mono",
  display: "swap",
});

const tokens = {
  "--e-concrete": "#EDEDE8",
  "--e-black": "#000000",
  "--e-lilac": "#C4B5FD",
  "--e-mint": "#86EFAC",
  "--e-cobalt": "#2E4BFF",
} as CSSProperties;

const d = s.display;
const mf = "font-[family-name:var(--e-mono)]";
const sh = "shadow-[6px_6px_0_0_#000]";
// Piezas a escala: tipografía en unidades de contenedor (cqw) para que escalen con su marco.
const cq = "[container-type:inline-size]";

/** Logotipo: "State" en Bricolage 800 y la X dentro de un bloque Lila con borde y sombra dura. */
function Logo({ dark = false, size = "text-[clamp(2.5rem,6vw,4.5rem)]" }: { dark?: boolean; size?: string }) {
  const shadow = dark ? "shadow-[0.09em_0.09em_0_0_#2E4BFF]" : "shadow-[0.09em_0.09em_0_0_#000]";
  return (
    <span className={`${d} ${size} inline-flex items-center gap-[0.08em] leading-none ${dark ? "text-white" : "text-black"}`}>
      <span>State</span>
      <span
        className={`inline-grid place-items-center border-[0.05em] border-black bg-[var(--e-lilac)] px-[0.12em] pb-[0.06em] pt-[0.02em] text-black ${shadow}`}
      >
        X
      </span>
    </span>
  );
}

function Symbol({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${d} inline-grid aspect-square place-items-center border-[0.06em] border-black bg-[var(--e-lilac)] leading-none text-black shadow-[0.1em_0.1em_0_0_#000] ${className}`}
    >
      X
    </span>
  );
}

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`${mf} inline-block border-2 border-black px-2 py-1 text-[13px] leading-none ${className}`}>{children}</span>;
}

const levelBg = { alto: "bg-[var(--e-lilac)]", medio: "bg-[var(--e-mint)]", bajo: "bg-white" } as const;

export default function MarcaE() {
  const typeSpecimen = (
    <div className="divide-y-[3px] divide-black text-black">
      {[
        {
          meta: "Display · Bricolage Grotesque 800, opsz 96, wdth 86, tracking −0,035em, interlineado 0,9",
          node: <p className={`${d} m-0 text-[clamp(2.2rem,5vw,4.75rem)]`}>{hero.title}</p>,
        },
        {
          meta: "Titular de sección · 800, hasta 5rem",
          node: <p className={`${d} m-0 text-[clamp(1.8rem,3.4vw,3.25rem)]`}>{problem.title}</p>,
        },
        {
          meta: "Titular de bloque · 800, 1,6rem",
          node: <p className={`${d} m-0 text-[1.6rem] leading-[1]`}>{solutions[0].name}</p>,
        },
        {
          meta: "Texto · Bricolage Grotesque 400, 17–19px, interlineado 1,55",
          node: <p className="m-0 max-w-[60ch] text-[18px] leading-[1.55]">{hero.body}</p>,
        },
        {
          meta: "Etiquetas puntuales · DM Mono 400, 13px",
          node: (
            <p className={`${mf} m-0 flex flex-wrap gap-3 text-[13px]`}>
              <span>{solutions[1].short}</span>
              <Chip className="bg-[var(--e-lilac)]">Nivel alto</Chip>
              <span>Ejemplo ilustrativo</span>
            </p>
          ),
        },
      ].map((r) => (
        <div key={r.meta} className="grid gap-3 p-6 sm:p-8">
          <span className={`${mf} text-[12px] text-zinc-700`}>{r.meta}</span>
          {r.node}
        </div>
      ))}
    </div>
  );

  const graphicSystem = (
    <div className="grid gap-0 bg-[var(--e-concrete)] text-black lg:grid-cols-2">
      {/* Bloques y sombras */}
      <figure className="m-0 border-b-[3px] border-black p-6 sm:p-8 lg:border-r-[3px]">
        <div className="flex flex-wrap items-start gap-6">
          <div className={`border-[3px] border-black bg-white px-5 py-4 font-bold ${sh}`}>Reposo</div>
          <div className="translate-x-[6px] translate-y-[6px] border-[3px] border-black bg-white px-5 py-4 font-bold">Pulsado</div>
          <div className={`border-[3px] border-black bg-[var(--e-cobalt)] px-5 py-4 font-bold text-white ${sh}`}>Acción</div>
        </div>
        <figcaption className="mt-8 text-[14px]">Borde negro de 3px y sombra dura 6px 6px 0. Al pulsar, el bloque se desplaza sobre su sombra.</figcaption>
      </figure>

      {/* Bento de bordes compartidos */}
      <figure className="m-0 border-b-[3px] border-black p-6 sm:p-8">
        <div aria-hidden="true" className="grid grid-cols-3 border-l-[3px] border-t-[3px] border-black">
          <div className="col-span-2 h-20 border-b-[3px] border-r-[3px] border-black bg-[var(--e-cobalt)]" />
          <div className="h-20 border-b-[3px] border-r-[3px] border-black bg-white" />
          <div className="h-20 border-b-[3px] border-r-[3px] border-black bg-[var(--e-lilac)]" />
          <div className="h-20 border-b-[3px] border-r-[3px] border-black bg-[var(--e-mint)]" />
          <div className="h-20 border-b-[3px] border-r-[3px] border-black bg-white" />
        </div>
        <figcaption className="mt-6 text-[14px]">Retícula de celdas con bordes compartidos: la celda principal en Cobalto y a doble ancho.</figcaption>
      </figure>

      {/* Paleta de estados */}
      <figure className="m-0 border-b-[3px] border-black p-6 sm:p-8 lg:border-b-0 lg:border-r-[3px]">
        <ul className="m-0 grid list-none gap-3 p-0">
          {sampleAssets.slice(0, 3).map((a) => (
            <li key={a.host} className="flex flex-wrap items-center justify-between gap-2 border-[3px] border-black bg-white px-4 py-3">
              <span className={`${mf} text-[14px]`}>{a.host}</span>
              <Chip className={levelBg[a.level]}>Nivel {a.level}</Chip>
            </li>
          ))}
        </ul>
        <figcaption className="mt-6 text-[14px]">Estados: Lila = nivel alto, Menta = medio, blanco = bajo. Siempre con texto, nunca solo color. Ejemplo ilustrativo.</figcaption>
      </figure>

      {/* Sólido frente a discontinuo */}
      <figure className="m-0 p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`border-[3px] border-black bg-[var(--e-mint)] p-4 ${sh}`}>
            <span className={`${d} text-[1.25rem]`}>{technology.today.label}</span>
          </div>
          <div className="border-[3px] border-dashed border-black p-4">
            <span className={`${d} text-[1.25rem]`}>{technology.roadmap.label}</span>
          </div>
        </div>
        <figcaption className="mt-6 text-[14px]">Línea sólida y sombra para lo que existe; borde discontinuo y sin sombra para la visión y los pendientes.</figcaption>
      </figure>
    </div>
  );

  const cardFront = (
    <div className={`${cq} flex h-full flex-col justify-between bg-[var(--e-concrete)] p-[7cqw] text-black`}>
      <Logo size="text-[11cqw]" />
      <p className={`${d} m-0 max-w-[20ch] text-[4.6cqw] leading-[1]`}>{brand.tagline}</p>
    </div>
  );

  const cardBack = (
    <div className={`${cq} flex h-full flex-col justify-between bg-[var(--e-lilac)] p-[7cqw] text-black`}>
      <div>
        <p className={`${d} m-0 text-[7cqw]`}>{identity.card.name}</p>
        <p className="m-0 mt-[1.5cqw] text-[3.6cqw]">{identity.card.role}</p>
      </div>
      <div className="flex items-end justify-between gap-[3cqw]">
        <div className={`${mf} grid gap-[1.2cqw] text-[3.2cqw] leading-none`}>
          <span>{identity.card.email}</span>
          <span>{identity.card.web}</span>
        </div>
        <Symbol className="w-[13cqw] bg-white text-[8cqw]" />
      </div>
    </div>
  );

  const deckCover = (
    <div className={`${cq} relative flex h-full flex-col justify-between overflow-hidden bg-[var(--e-concrete)] p-[5cqw] text-black`}>
      <div className="flex items-start justify-between">
        <Chip className="bg-white">{identity.deck.meta}</Chip>
        <Symbol className="w-[6cqw] text-[3.6cqw]" />
      </div>
      <div className="grid grid-cols-[1fr_auto] items-end gap-[4cqw]">
        <div>
          <p className={`${d} m-0 text-[15cqw] leading-[0.8]`}>{identity.deck.title}</p>
          <p className={`${d} m-0 mt-[2cqw] max-w-[22ch] text-[3.4cqw] leading-[1]`}>{identity.deck.subtitle}</p>
        </div>
        <div aria-hidden="true" className="flex w-[22cqw] flex-col gap-[1.2cqw]">
          {["bg-white", "bg-[var(--e-lilac)]", "bg-[var(--e-mint)]", "bg-[var(--e-cobalt)]"].map((c, i) => (
            <div
              key={c}
              style={{ marginLeft: `${[0, 3, 1, 4][i]}cqw` }}
              className={`h-[3.4cqw] border-[0.35cqw] border-black ${c} shadow-[0.6cqw_0.6cqw_0_0_#000]`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const report = (
    <div className={`${cq} flex h-full flex-col bg-white text-black`}>
      <div className="flex items-center justify-between border-b-[1cqw] border-black p-[7cqw]">
        <Logo size="text-[9cqw]" />
        <span className={`${mf} text-[3.4cqw]`}>Confidencial</span>
      </div>
      <div className="flex-1 bg-[var(--e-cobalt)] p-[7cqw] text-white">
        <p className={`${mf} m-0 text-[3.4cqw]`}>{solutions[0].name}</p>
        <p className={`${d} m-0 mt-[5cqw] text-[11cqw] leading-[0.9]`}>Informe de exposición externa</p>
        <p className={`${mf} m-0 mt-[5cqw] text-[3.4cqw]`}>ejemplo.com · 203.0.113.0/24</p>
      </div>
      <ol className="m-0 grid list-none grid-cols-5 border-t-[1cqw] border-black p-0">
        {approach.steps.map((st, i) => (
          <li
            key={st.name}
            className={`border-black p-[2cqw] text-[2.6cqw] font-bold leading-[1.1] ${i < 4 ? "border-r-[0.6cqw]" : ""} ${
              i === 1 ? "bg-[var(--e-mint)]" : "bg-[var(--e-concrete)]"
            }`}
          >
            <span className={`${d} block text-[7cqw] leading-none`}>{i + 1}</span>
            {st.name}
          </li>
        ))}
      </ol>
    </div>
  );

  const banner = (
    <div className={`${cq} flex h-full items-center justify-between gap-[3cqw] bg-[var(--e-mint)] px-[5cqw] text-black`}>
      <p className={`${d} m-0 max-w-[20ch] text-[3.6cqw] leading-[0.95]`}>{brand.tagline}</p>
      <div className="flex items-center gap-[2cqw]">
        <Logo size="text-[5cqw]" />
      </div>
    </div>
  );

  return (
    <div className={`${sans.variable} ${mono.variable}`} style={tokens}>
      <BrandBoard
        slug="e"
        logoLight={<Logo />}
        logoDark={<Logo dark />}
        symbol={<Symbol className="w-24 text-[3.75rem]" />}
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
          "Todo bloque lleva borde negro de 3px; la sombra dura (6px 6px 0) solo en lo que existe hoy o se puede pulsar.",
          "El borde discontinuo marca lo que aún no existe: visión de producto y huecos [Pendiente: …].",
          "Cobalto se reserva para la acción principal y una celda destacada por composición; Lila y Menta codifican estados y siempre van con texto.",
          "La X del logotipo es el único bloque permitido dentro de una palabra; nunca se usa como escudo ni candado.",
        ]}
      />
    </div>
  );
}
