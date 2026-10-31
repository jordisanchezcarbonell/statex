// Estudio de seguridad de webs de agencias y empresas digitales (análisis pasivo).
//
// Uso:
//   node research/estudio-agencias/escanear.mjs <osm.json> <salida.json>
//
// Qué hace por cada dominio (lo mismo que ve cualquier visitante, nada más):
//   1. Lee /robots.txt y se salta la web si prohíbe el acceso a todo ("Disallow: /" para "*").
//   2. Visita la home por https:// y por http:// (para ver si redirige a HTTPS).
//   3. Lee /.well-known/security.txt (RFC 9116), un fichero público pensado para esto.
// No envía formularios, no prueba rutas, no escanea puertos ni intenta acceder a nada.
// Sin dependencias: fetch de Node 22. Concurrencia baja y un solo dominio por petición.
//
// Los resultados por dominio NO se publican (datos/ está en .gitignore): el estudio solo usa
// cifras agregadas y anónimas.

import { readFile, writeFile } from "node:fs/promises";
import { lookup } from "node:dns/promises";

const UA = "StateX-estudio/1.0 (estudio agregado de cabeceras de seguridad; https://statex.jordisanchezweb.es)";
const TIMEOUT_MS = 10_000;
const CONCURRENCY = 6;

// Dominios que no son la web propia de la empresa (redes sociales, directorios, constructores con dominio compartido).
const NOT_OWN_SITE = /(^|\.)(facebook|instagram|linkedin|twitter|x|google|youtube|tiktok|wa\.me|linktr\.ee|business\.site)\.(com|me|ee|site)$/i;

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("Uso: node escanear.mjs <osm.json> <salida.json>");
  process.exit(1);
}

function segment(tags) {
  const kind = tags.office ?? tags.craft;
  return kind === "it" ? "it" : "agencia";
}

function hostOf(raw) {
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return u.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

// No visitar nada que resuelva a redes privadas o reservadas (un dato de OSM podría apuntar ahí).
function privateIp(ip) {
  if (ip.includes(":")) return /^(::1|fc|fd|fe80|::ffff:(10|127|192\.168|169\.254)\.)/i.test(ip);
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224;
}

async function get(url, { body = false } = {}) {
  try {
    const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS) });
    const text = body ? (await res.text()).slice(0, 200_000) : (await res.body?.cancel(), "");
    return { ok: true, status: res.status, url: res.url, headers: res.headers, text };
  } catch (err) {
    const code = err?.cause?.code ?? err?.name ?? "error";
    return { ok: false, error: String(code) };
  }
}

function robotsBlocksAll(txt) {
  let applies = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    if (/^user-agent:/i.test(line)) applies = line.split(":")[1].trim() === "*";
    else if (applies && /^disallow:\s*\/\s*$/i.test(line)) return true;
  }
  return false;
}

async function analyse(host) {
  const r = { host };
  try {
    const { address } = await lookup(host);
    if (privateIp(address)) return { ...r, excluded: "ip-privada" };
  } catch {
    return { ...r, excluded: "sin-dns" };
  }

  const robots = await get(`https://${host}/robots.txt`, { body: true });
  if (robots.ok && robots.status === 200 && robotsBlocksAll(robots.text)) return { ...r, excluded: "robots" };

  // Muchas webs solo tienen certificado para www.: se prueba también antes de concluir que el TLS falla.
  let https = await get(`https://${host}/`, { body: true });
  if (!https.ok) {
    const www = await get(`https://www.${host}/`, { body: true });
    if (www.ok) https = www;
  }
  const http = await get(`http://${host}/`);
  if (!https.ok && !(http.ok && http.status < 500)) return { ...r, excluded: "sin-respuesta", error: https.error };

  const main = https.ok ? https : http;
  const h = (n) => main.headers.get(n);
  const finalHttps = main.url.startsWith("https://");
  const csp = h("content-security-policy") ?? "";
  const banner = [h("server"), h("x-powered-by")].filter(Boolean).join(" ");
  const cookies = main.headers.getSetCookie?.() ?? [];

  const sec = finalHttps ? await get(new URL("/.well-known/security.txt", main.url).toString(), { body: true }) : { ok: false };
  const securityTxt =
    sec.ok && sec.status === 200 && (sec.headers.get("content-type") ?? "").includes("text/plain") && /^contact:/im.test(sec.text);

  return {
    ...r,
    status: main.status,
    tlsError: !https.ok && /CERT|SSL|TLS|ERR_TLS|UNABLE_TO|SELF_SIGNED|EPROTO/i.test(https.error ?? "") ? https.error : null,
    https: finalHttps,
    httpRedirectsToHttps: http.ok ? http.url.startsWith("https://") : null,
    hsts: finalHttps && !!h("strict-transport-security"),
    csp: !!csp,
    cspUnsafe: !!csp && /unsafe-inline|unsafe-eval/i.test(csp),
    frame: !!h("x-frame-options") || /frame-ancestors/i.test(csp),
    nosniff: (h("x-content-type-options") ?? "").toLowerCase().includes("nosniff"),
    referrer: !!h("referrer-policy"),
    permissions: !!h("permissions-policy"),
    versionDisclosed: /\d+\.\d+/.test(banner),
    wordpress: /wp-content|wp-includes/i.test(main.text),
    wpGeneratorVersion: /<meta[^>]+generator[^>]+WordPress \d/i.test(main.text),
    cookiesWithoutSecure: finalHttps && cookies.some((c) => !/;\s*secure/i.test(c)),
    securityTxt,
  };
}

const elements = JSON.parse(await readFile(input, "utf8")).elements;
const byHost = new Map();
for (const e of elements) {
  const host = hostOf(e.tags.website ?? e.tags["contact:website"] ?? "");
  if (!host || NOT_OWN_SITE.test(host) || byHost.has(host)) continue;
  byHost.set(host, segment(e.tags));
}

const hosts = [...byHost.keys()];
const results = [];
let next = 0;
async function worker() {
  while (next < hosts.length) {
    const host = hosts[next++];
    const res = await analyse(host);
    results.push({ ...res, segment: byHost.get(host) });
    if (results.length % 25 === 0) console.error(`${results.length}/${hosts.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

await writeFile(output, JSON.stringify({ date: new Date().toISOString(), source: "OpenStreetMap (ODbL)", results }, null, 2));
console.error(`Hecho: ${results.length} dominios → ${output}`);
