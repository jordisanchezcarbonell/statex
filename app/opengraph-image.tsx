import { ImageResponse } from "next/og";
import { brand, hero } from "./_site/content";

// Imagen para compartir la web (Open Graph): obsidiana, titular y la línea roja. Se genera en build.
export const alt = `${brand.name}: ${hero.lines.join(" ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B0D10", color: "#F2F0EA", padding: "72px 80px" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: "0.32em" }}>STATEX</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em", color: "#A8A39B" }}>{hero.lines[0].toUpperCase()}</div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em" }}>{hero.lines[1].toUpperCase()}</div>
          <div style={{ display: "flex", width: 140, height: 4, background: "#A83A35", marginTop: 44 }} />
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#A8A39B" }}>Auditoría de seguridad web y APIs · Exposición externa · Ingeniería segura</div>
      </div>
    ),
    size,
  );
}
