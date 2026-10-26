import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

// CSP sin nonce para mantener las páginas estáticas: Next.js inserta scripts inline (carga de RSC),
// así que script-src necesita 'unsafe-inline'. Lo demás, solo mismo origen: sin terceros en runtime
// (fuentes auto-hospedadas con next/font; el envío a Resend ocurre en el servidor).
// En desarrollo React necesita 'unsafe-eval' y el recargado en caliente usa WebSocket.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${dev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

// Cabeceras de seguridad básicas: una web de ciberseguridad debe predicar con el ejemplo.
// SAMEORIGIN / frame-ancestors 'self' (no DENY / 'none') porque el comparador /design-lab previsualiza las propuestas en iframes propios.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  // Sin popups ni OAuth: aislar el contexto de navegación no rompe nada.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Rutas internas (previews de identidad y demos): fuera de buscadores aunque la web pase a ser indexable.
      { source: "/preview/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
      { source: "/demo/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
    ];
  },
};

export default nextConfig;
