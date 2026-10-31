// Convierte los resultados por dominio en cifras agregadas y anónimas (lo único que se publica).
// Uso: node research/estudio-agencias/agregar.mjs datos/resultados.json > resumen.md

import { readFile } from "node:fs/promises";

const { date, source, results } = JSON.parse(await readFile(process.argv[2], "utf8"));

const excluded = results.filter((r) => r.excluded);
const valid = results.filter((r) => !r.excluded);
const seg = { todas: valid, agencia: valid.filter((r) => r.segment === "agencia"), it: valid.filter((r) => r.segment === "it") };

const pct = (list, fn) => (list.length ? Math.round((100 * list.filter(fn).length) / list.length) : 0);
const core = ["hsts", "csp", "frame", "nosniff", "referrer", "permissions"];
const coreCount = (r) => core.filter((k) => r[k]).length;
const https = (l) => l.filter((r) => r.https);

const rows = [
  ["Responde por HTTPS", (l) => pct(l, (r) => r.https)],
  ["Redirige de HTTP a HTTPS", (l) => pct(l.filter((r) => r.httpRedirectsToHttps !== null), (r) => r.httpRedirectsToHttps)],
  ["Certificado TLS con error", (l) => pct(l, (r) => !!r.tlsError)],
  ["HSTS (sobre las que usan HTTPS)", (l) => pct(https(l), (r) => r.hsts)],
  ["Content-Security-Policy", (l) => pct(l, (r) => r.csp)],
  ["  · CSP sin 'unsafe-inline'/'unsafe-eval'", (l) => pct(l, (r) => r.csp && !r.cspUnsafe)],
  ["Protección contra clickjacking", (l) => pct(l, (r) => r.frame)],
  ["X-Content-Type-Options: nosniff", (l) => pct(l, (r) => r.nosniff)],
  ["Referrer-Policy", (l) => pct(l, (r) => r.referrer)],
  ["Permissions-Policy", (l) => pct(l, (r) => r.permissions)],
  ["Revela versión de servidor o framework", (l) => pct(l, (r) => r.versionDisclosed)],
  ["Cookies sin atributo Secure (sobre HTTPS)", (l) => pct(https(l), (r) => r.cookiesWithoutSecure)],
  ["Publica security.txt válido", (l) => pct(l, (r) => r.securityTxt)],
  ["Usa WordPress", (l) => pct(l, (r) => r.wordpress)],
  ["  · Muestra la versión de WordPress", (l) => pct(l.filter((r) => r.wordpress), (r) => r.wpGeneratorVersion)],
  ["Ninguna de las 6 cabeceras clave", (l) => pct(l, (r) => coreCount(r) === 0)],
  ["Las 6 cabeceras clave", (l) => pct(l, (r) => coreCount(r) === 6)],
];

const out = [];
out.push(`Fecha del análisis: ${date.slice(0, 10)} · Fuente de la muestra: ${source}`);
out.push(`Dominios únicos: ${results.length} · Analizados: ${valid.length} (agencias ${seg.agencia.length}, IT ${seg.it.length}) · Excluidos: ${excluded.length}`);
const why = {};
for (const r of excluded) why[r.excluded] = (why[r.excluded] ?? 0) + 1;
out.push(`Exclusiones: ${Object.entries(why).map(([k, v]) => `${k} ${v}`).join(", ")}`);
out.push("");
out.push("| Indicador | Todas | Agencias | IT |");
out.push("|---|---:|---:|---:|");
for (const [label, fn] of rows) out.push(`| ${label} | ${fn(seg.todas)} % | ${fn(seg.agencia)} % | ${fn(seg.it)} % |`);
out.push("");
out.push("Cabeceras clave (HSTS, CSP, clickjacking, nosniff, Referrer-Policy, Permissions-Policy) por web:");
out.push("");
out.push("| Nº de cabeceras | Webs | % |");
out.push("|---:|---:|---:|");
for (let n = 0; n <= 6; n++) {
  const c = valid.filter((r) => coreCount(r) === n).length;
  out.push(`| ${n} | ${c} | ${Math.round((100 * c) / valid.length)} % |`);
}
const sorted = valid.map(coreCount).sort((a, b) => a - b);
out.push("");
out.push(`Mediana de cabeceras clave por web: ${sorted[Math.floor(sorted.length / 2)]} de 6.`);
console.log(out.join("\n"));
