import type { ReactNode } from "react";
import { Geist, JetBrains_Mono } from "next/font/google";
import { BrandBoard } from "../../_shared/BrandBoard";
import { LabBar } from "../../_shared/LabBar";
import { brand, hero, identity, sampleAssets } from "../../content";
import { asciiGlobe, asciiHorizon } from "../globe";
import { CornerMarks, Wordmark } from "../marks";

export const metadata = { title: "Concept D · Marca" };

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jbm = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbm", display: "swap" });

const BG = "#0B0C0E";
const SURFACE = "#141619";
const FG = "#E8E6E3";
const MUTED = "#8A8F98";
const AMBER = "#FFB000";

const mono = "font-[family-name:var(--font-jbm)]";
const sans = "font-[family-name:var(--font-geist)]";

// Renders ASCII estáticos generados en el servidor con la misma matemática que el globo del hero.
const GLOBE_LG = asciiGlobe(64, 32, 0.9, 0.36);
const GLOBE_SM = asciiGlobe(44, 22, 2.4, 0.3);
const HORIZON_CARD = asciiHorizon(90, 12);
const HORIZON_REPORT = asciiHorizon(72, 16);

/** ASCII escalado al ancho del contenedor: `cols` columnas ocupan `widthPct` % del contenedor. */
function Ascii({ text, cols, widthPct, color, className = "" }: { text: string; cols: number; widthPct: number; color: string; className?: string }) {
  return (
    <pre
      aria-hidden="true"
      className={`${mono} m-0 whitespace-pre leading-[1.2] ${className}`}
      style={{ fontSize: `${(widthPct / (cols * 0.6)).toFixed(3)}cqw`, color }}
    >
      {text}
    </pre>
  );
}

function Cap({ n, children, color = MUTED }: { n: string; children: ReactNode; color?: string }) {
  return (
    <p className={`${mono} text-[11px] leading-5`} style={{ color }}>
      <span style={{ color: color === MUTED ? FG : BG }}>FIG. {n}</span>
      <span className="whitespace-pre">{"  "}</span>
      {children}
    </p>
  );
}

function Symbol({ size }: { size: number }) {
  return (
    <span
      className={`${sans} grid place-items-center font-semibold leading-none`}
      style={{ width: size, height: size, background: AMBER, color: BG, fontSize: size * 0.68, letterSpacing: "-0.04em" }}
    >
      <span className="translate-y-[0.03em]">X</span>
    </span>
  );
}

const typeSpecimen = (
  <div className="grid gap-0 md:grid-cols-[13rem_minmax(0,1fr)]" style={{ background: BG, color: FG }}>
    {[
      {
        spec: ["Display", "Geist 500", "clamp 40–96 px", "interletra −4 %"],
        node: (
          <p className={`${sans} max-w-[16ch] text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.04em]`}>{hero.title}</p>
        ),
      },
      {
        spec: ["Titular", "Geist 500", "22–30 px", "interletra −2,5 %"],
        node: <p className={`${sans} text-[22px] font-medium leading-tight tracking-[-0.025em]`}>External Attack Surface Assessment</p>,
      },
      {
        spec: ["Texto", "Geist 400", "15–17 px", "interlínea 1,6"],
        node: (
          <p className={`${sans} max-w-[60ch] text-[16px] leading-[1.6]`} style={{ color: MUTED }}>
            {hero.body}
          </p>
        ),
      },
      {
        spec: ["Datos", "JetBrains Mono 400", "11–13 px", "interlínea 1,75"],
        node: (
          <div className={`${mono} text-[13px] leading-[1.75]`}>
            <p style={{ color: FG }}>── 02 descubrimiento</p>
            <p>
              <span style={{ color: MUTED }}>{"nuevo".padEnd(14)}</span>
              <span className="whitespace-pre">staging.ejemplo.com (no inventariado)</span>
            </p>
          </div>
        ),
      },
    ].map((r) => (
      <div key={r.spec[0]} className="contents">
        <ul className={`${mono} border-t px-6 pt-6 text-[11px] leading-5 md:pb-6`} style={{ borderColor: "rgba(232,230,227,0.1)", color: MUTED }}>
          <li style={{ color: FG }}>{r.spec[0]}</li>
          {r.spec.slice(1).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="min-w-0 overflow-hidden px-6 pb-8 pt-4 md:border-t md:py-6" style={{ borderColor: "rgba(232,230,227,0.1)" }}>
          {r.node}
        </div>
      </div>
    ))}
  </div>
);

const graphicSystem = (
  <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(232,230,227,0.1)" }}>
    {/* ASCII / dither */}
    <div className="@container flex flex-col gap-4 p-6" style={{ background: BG }}>
      <div className="grid flex-1 place-items-center py-2">
        <Ascii text={GLOBE_SM} cols={44} widthPct={88} color="rgba(232,230,227,0.7)" />
      </div>
      <Cap n="A">Imagen en ASCII: tono por densidad de carácter, nunca fotografía.</Cap>
    </div>

    {/* Retícula con marcas de esquina */}
    <div className="flex flex-col gap-4 p-6" style={{ background: BG }}>
      <div
        className="relative aspect-[4/3] w-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,230,227,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,230,227,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <CornerMarks size={14} className="border-[rgba(232,230,227,0.6)]" />
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: AMBER }} />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2" style={{ background: AMBER }} />
        </span>
        <span className={`${mono} absolute bottom-3 left-4 text-[11px]`} style={{ color: MUTED }}>
          {sampleAssets[1].host}
        </span>
      </div>
      <Cap n="B">Retícula de 24 px. Las marcas de esquina encuadran figuras; la cruz ámbar señala el objetivo.</Cap>
    </div>

    {/* Estados y color */}
    <div className="flex flex-col gap-4 p-6" style={{ background: BG }}>
      <ul className={`${sans} grid flex-1 content-center gap-5 text-[14px]`}>
        <li className="grid gap-2">
          <span className="block h-0.5 w-full" style={{ background: AMBER }} />
          <span style={{ color: FG }}>Trazo continuo: disponible hoy</span>
        </li>
        <li className="grid gap-2">
          <span className="block h-0 w-full border-t-2 border-dashed" style={{ borderColor: MUTED }} />
          <span style={{ color: MUTED }}>Trazo discontinuo: visión, no disponible</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="h-3 w-3" style={{ background: AMBER }} />
          <span className="h-3 w-3 border" style={{ borderColor: FG }} />
          <span style={{ color: FG }}>Ámbar solo para cursor, foco y objetivo</span>
        </li>
      </ul>
      <Cap n="C">Convenciones de estado. El ámbar nunca supera un 5 % de la superficie.</Cap>
    </div>
  </div>
);

const cardFront = (
  <div className="@container relative flex h-full w-full flex-col justify-between overflow-hidden p-[7cqw]" style={{ background: BG }}>
    <Wordmark className="text-[9cqw]" />
    <p className={`${sans} relative z-10 max-w-[60%] text-[3.4cqw] leading-snug`} style={{ color: MUTED }}>
      {brand.tagline}
    </p>
    <div className="absolute -bottom-[2cqw] right-[-6cqw]">
      <Ascii text={HORIZON_CARD} cols={90} widthPct={70} color="rgba(232,230,227,0.28)" />
    </div>
  </div>
);

const cardBack = (
  <div className="@container relative flex h-full w-full flex-col justify-between p-[7cqw]" style={{ background: FG, color: BG }}>
    <dl className={`${mono} grid grid-cols-[auto_1fr] gap-x-[4cqw] gap-y-[1.6cqw] text-[3.3cqw] leading-tight`}>
      {(
        [
          ["nombre", identity.card.name],
          ["cargo", identity.card.role],
          ["email", identity.card.email],
          ["web", identity.card.web],
        ] as const
      ).map(([k, v]) => (
        <div key={k} className="contents">
          <dt style={{ color: "#4A4E55" }}>{k}</dt>
          <dd className="min-w-0 break-words">{v}</dd>
        </div>
      ))}
    </dl>
    <div className="flex items-end justify-between">
      <Wordmark tone="light" className="text-[5cqw]" />
      <span className={`${mono} text-[2.6cqw]`} style={{ color: "#4A4E55" }}>
        {brand.descriptor}
      </span>
    </div>
  </div>
);

const deckCover = (
  <div className="@container relative h-full w-full overflow-hidden" style={{ background: BG }}>
    <div className="absolute inset-[3.2cqw]">
      <CornerMarks size={14} className="border-[rgba(232,230,227,0.4)]" />
    </div>
    <div className="absolute right-[3cqw] top-1/2 -translate-y-1/2">
      <Ascii text={GLOBE_LG} cols={64} widthPct={50} color="rgba(232,230,227,0.75)" />
    </div>
    <div className="absolute bottom-[7cqw] left-[7cqw] top-[7cqw] flex max-w-[46%] flex-col justify-between">
      <span className={`${mono} text-[1.25cqw]`} style={{ color: MUTED }}>
        {identity.deck.meta}
      </span>
      <div>
        <p className={`${sans} text-[9cqw] font-semibold leading-[0.9] tracking-[-0.05em]`} style={{ color: FG }}>
          {identity.deck.title.slice(0, -1)}
          <span className="ml-[0.04em] inline-block px-[0.06em]" style={{ background: AMBER, color: BG }}>
            {identity.deck.title.slice(-1)}
          </span>
        </p>
        <p className={`${sans} mt-[2.4cqw] text-[2.3cqw] leading-snug`} style={{ color: FG }}>
          {identity.deck.subtitle}
        </p>
      </div>
      <span className={`${mono} text-[1.1cqw]`} style={{ color: MUTED }}>
        <span style={{ color: FG }}>FIG. 0</span>
        <span className="whitespace-pre">{"  "}</span>Globo ASCII renderizado. Superficie abstracta, no es un mapa.
      </span>
    </div>
  </div>
);

const reportCover = (
  <div className="@container relative flex h-full w-full flex-col overflow-hidden p-[9cqw]" style={{ background: "#F2F1EE", color: BG }}>
    <div className="flex items-start justify-between">
      <Wordmark tone="light" className="text-[6cqw]" />
      <span className={`${mono} text-[2.4cqw]`} style={{ color: "#4A4E55" }}>
        Ejemplo ilustrativo
      </span>
    </div>
    <div className="mt-[22cqw]">
      <p className={`${mono} text-[2.6cqw]`} style={{ color: "#4A4E55" }}>
        Informe de evaluación
      </p>
      <p className={`${sans} mt-[2cqw] text-[7.4cqw] font-medium leading-[1] tracking-[-0.04em]`}>Superficie de ataque externa</p>
      <p className={`${mono} mt-[4cqw] text-[3cqw]`}>ejemplo.com</p>
      <p className={`${mono} text-[3cqw]`}>203.0.113.0/24</p>
    </div>
    <div className="absolute inset-x-0 bottom-0 grid place-items-center">
      <Ascii text={HORIZON_REPORT} cols={72} widthPct={100} color="rgba(11,12,14,0.32)" />
    </div>
    <span className={`${mono} absolute bottom-[5cqw] left-[9cqw] px-[1cqw] text-[2.2cqw]`} style={{ background: "#F2F1EE", color: "#4A4E55" }}>
      [Pendiente: fecha y versión]
    </span>
  </div>
);

const readme = (
  <div className="@container relative flex h-full w-full items-center overflow-hidden" style={{ background: BG }}>
    <div className="absolute inset-[2.2cqw]">
      <CornerMarks size={10} className="border-[rgba(232,230,227,0.35)]" />
    </div>
    <div className="relative z-10 flex flex-col gap-[1.6cqw] pl-[6cqw]">
      <Wordmark className="text-[6.4cqw]" />
      <p className={`${sans} text-[2cqw]`} style={{ color: FG }}>
        {brand.tagline}
      </p>
      <p className={`${mono} text-[1.4cqw]`} style={{ color: MUTED }}>
        {brand.descriptor}
      </p>
    </div>
    <div className="absolute right-[4cqw] top-1/2 -translate-y-1/2">
      <Ascii text={GLOBE_SM} cols={44} widthPct={26} color="rgba(232,230,227,0.6)" />
    </div>
  </div>
);

export default function ConceptDBrandPage() {
  return (
    <div className={`${geist.variable} ${jbm.variable}`}>
      <BrandBoard
        slug="d"
        logoLight={<Wordmark tone="light" className="text-[clamp(2.5rem,5vw,4rem)]" />}
        logoDark={<Wordmark className="text-[clamp(2.5rem,5vw,4rem)]" />}
        symbol={
          <div className="flex items-end gap-5" aria-label="Símbolo de StateX en tres tamaños" role="img">
            <Symbol size={88} />
            <Symbol size={44} />
            <Symbol size={22} />
          </div>
        }
        typeSpecimen={typeSpecimen}
        graphicSystem={graphicSystem}
        cardFront={cardFront}
        cardBack={cardBack}
        deckCover={deckCover}
        applications={[
          { name: "Portada de informe (A4). Ejemplo ilustrativo sobre ejemplo.com.", node: reportCover, ratio: "1 / 1.414" },
          { name: "Cabecera de README en GitHub", node: readme, ratio: "3 / 1" },
        ]}
        notes={[
          "El logotipo es siempre texto: «State» en Geist semibold y la X dentro del bloque ámbar, como un cursor posado sobre el último carácter. No se separa ni se recolorea.",
          "El ámbar es una señal, no un fondo: cursor, foco, objetivo y CTA principal. Todo lo demás vive en la escala de grises cálidos.",
          "Las imágenes se construyen con ASCII generado a partir del mismo globo; no se usan fotografías de stock, candados ni escudos.",
          "Cada figura lleva marcas de esquina y un pie «FIG.»; si muestra datos, son de ejemplo.com o de rangos de documentación y lo dice.",
        ]}
      />
      <LabBar current="d" />
    </div>
  );
}
