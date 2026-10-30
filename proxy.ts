import { NextResponse, type NextRequest } from "next/server";
import { onCloudflare } from "./app/_site/runtime";

// Protección opcional de las rutas internas (/preview/* y /demo/*). Siempre son noindex.
// - Sin PREVIEW_USER ni PREVIEW_PASSWORD (decisión 2026-10-26): previews abiertas, también en Vercel.
//   El comprobador de exposición (/demo/exposicion) se desactiva solo si no hay credenciales (ver scan.ts).
// - Con ambas definidas: autenticación básica (HTTP Basic sobre HTTPS) en /preview y /demo.
// - En Cloudflare Workers (docs/cloudflare-workers.md) solo se publica la web corporativa: /preview,
//   /demo y /design-lab responden 404 sin depender de credenciales.
export function proxy(request: NextRequest) {
  if (onCloudflare()) return new NextResponse("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  if (request.nextUrl.pathname.startsWith("/design-lab")) return NextResponse.next();

  const user = process.env.PREVIEW_USER;
  const pass = process.env.PREVIEW_PASSWORD;
  if (!user || !pass) return NextResponse.next();

  const auth = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = auth.split(" ");
  if (scheme === "Basic" && encoded) {
    let decoded = "";
    try {
      decoded = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0))); // UTF-8
    } catch {}
    const i = decoded.indexOf(":");
    if (i > 0 && safeEqual(decoded.slice(0, i), user) && safeEqual(decoded.slice(i + 1), pass)) return NextResponse.next();
  }
  return new NextResponse("Autenticación necesaria", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Previews", charset="UTF-8"', "Cache-Control": "no-store" },
  });
}

// Comparación en tiempo constante (respecto al contenido) para no filtrar la credencial por tiempos.
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

// /demo incluye el comprobador de exposición, que hace peticiones salientes: protegerlo evita que quede
// como proxy anónimo. Si PREVIEW_USER/PREVIEW_PASSWORD no están definidas, la propia acción se desactiva.
export const config = {
  matcher: ["/preview", "/preview/:path*", "/demo", "/demo/:path*", "/design-lab", "/design-lab/:path*"],
};
