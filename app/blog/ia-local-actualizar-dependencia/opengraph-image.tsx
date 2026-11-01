import { ImageResponse } from "next/og";

export const alt = "StateX: IA local, propuesta incompleta, cero acciones ejecutadas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between", background: "#0B0D10", color: "#F2F0EA", padding: "70px 80px" }}>
      <div style={{ display: "flex", fontSize: 30, letterSpacing: "0.28em" }}>STATEX · BLOG</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 65, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.025em" }}>
        <span>PROBAMOS UNA IA LOCAL.</span>
        <span>RECHAZAMOS SU PROPUESTA.</span>
        <div style={{ width: 140, height: 4, background: "#A83A35", marginTop: 35 }} />
      </div>
      <div style={{ fontSize: 26, color: "#A8A39B" }}>Dos pilotos · Cero acciones ejecutadas · Ningún parche de IA</div>
    </div>, size,
  );
}
