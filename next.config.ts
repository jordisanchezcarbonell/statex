import type { NextConfig } from "next";

// Cabeceras de seguridad básicas: una web de ciberseguridad debe predicar con el ejemplo.
// SAMEORIGIN (no DENY) porque el comparador /design-lab previsualiza las propuestas en iframes propios.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
