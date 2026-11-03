import { ImageResponse } from "next/og";

export const alt = "StateX: un caso sintético WordPress con Visa VVAH y Claude, validado mediante HTTP independiente";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B0D10", color: "#F2F0EA", padding: "64px 72px" }}>
      <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.26em" }}>STATEX · INVESTIGACIÓN</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.08 }}>WordPress con IA</div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 43, lineHeight: 1.15, color: "#A8A39B" }}>Un parche con Visa VVAH y Claude</div>
        <div style={{ display: "flex", width: 120, height: 4, background: "#A83A35", marginTop: 30 }} />
      </div>
      <div style={{ display: "flex", fontSize: 25 }}>Caso sintético · Validación HTTP independiente · Límites explícitos</div>
    </div>,
    size,
  );
}
