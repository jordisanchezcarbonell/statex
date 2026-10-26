import { NextResponse, type NextRequest } from "next/server";

// Protección de las previews de identidad (/preview/*), que muestran nombres de marca aún no registrados.
// - Con PREVIEW_USER y PREVIEW_PASSWORD definidas: autenticación básica (HTTP Basic sobre HTTPS).
// - Sin ellas: abiertas en local (dev o `next start`) y cerradas (404) en cualquier despliegue de Vercel.
export function proxy(request: NextRequest) {
  const user = process.env.PREVIEW_USER;
  const pass = process.env.PREVIEW_PASSWORD;
  if (!user || !pass) return process.env.VERCEL ? new NextResponse(null, { status: 404 }) : NextResponse.next();

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

export const config = { matcher: ["/preview", "/preview/:path*"] };
