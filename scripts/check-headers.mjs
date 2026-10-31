// Comprueba las cabeceras de seguridad de la web construida (next start). Lo usa el CI.
// Uso: node scripts/check-headers.mjs http://localhost:3200
// Sin dependencias: solo fetch de Node. Falla (exit 1) si falta o cambia alguna cabecera.

const base = (process.argv[2] ?? "http://localhost:3200").replace(/\/$/, "");

const common = {
  "x-content-type-options": (v) => v === "nosniff",
  "referrer-policy": (v) => v === "strict-origin-when-cross-origin",
  "x-frame-options": (v) => v === "SAMEORIGIN",
  "cross-origin-opener-policy": (v) => v === "same-origin",
  "permissions-policy": (v) => !!v && ["camera=()", "microphone=()", "geolocation=()"].every((p) => v.includes(p)),
  "content-security-policy": (v) =>
    !!v &&
    ["default-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'self'"].every((d) => v.includes(d)) &&
    !v.includes("unsafe-eval"),
  "x-powered-by": (v) => v === null, // poweredByHeader: false
};

const internal = { "x-robots-tag": (v) => typeof v === "string" && v.includes("noindex") };

const checks = [
  ["/", common],
  ["/servicios/auditoria-seguridad-web-api", common],
  ["/no-existe", common],
  ["/preview/statex", { ...common, ...internal }],
  ["/demo/agentes", { ...common, ...internal }],
];

let failed = 0;
for (const [path, rules] of checks) {
  const res = await fetch(base + path, { redirect: "manual" });
  for (const [name, ok] of Object.entries(rules)) {
    const value = res.headers.get(name);
    if (!ok(value)) {
      failed++;
      console.error(`✗ ${path} · ${name}: ${value === null ? "(ausente)" : value}`);
    }
  }
  console.log(`${path} → ${res.status}`);
}

if (failed) {
  console.error(`\n${failed} cabecera(s) incorrecta(s). Revisa next.config.ts.`);
  process.exit(1);
}
console.log("\nCabeceras de seguridad correctas.");
