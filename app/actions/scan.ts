"use server";

import http from "node:http";
import https from "node:https";
import { lookup as dnsLookup } from "node:dns/promises";
import { headers } from "next/headers";
import { onCloudflare } from "../_site/runtime";

// Comprobador PASIVO de exposición (demo interna /demo/exposicion).
// Hace una petición GET a la URL indicada —lo mismo que ve cualquier visitante— y evalúa lo que la web
// expone en abierto: cabeceras de seguridad y pistas de tecnología. NO prueba vulnerabilidades, no rastrea,
// no manda formularios ni toca nada. Lee lo que cualquier visitante ve.
//
// Barreras (el propio comprobador hace peticiones salientes, así que se protege):
// - Solo se habilita si /demo está protegido con PREVIEW_USER/PREVIEW_PASSWORD (si no, se desactiva): así no
//   queda como proxy anónimo (ver proxy.ts).
// - Solo http/https y puertos 80/443. Rechaza localhost, IPs privadas, reservadas, de documentación, y los
//   rangos IPv6 especiales (anti-SSRF).
// - Anti-rebinding: se resuelve el nombre, se validan TODAS sus direcciones y se CONECTA a la IP ya validada
//   (lookup fijado), así la resolución no puede cambiar entre la comprobación y la conexión.
// - Redirecciones seguidas a mano (máx. 3), revalidando el destino; presupuesto total de tiempo; el cuerpo
//   no se lee (salvo los primeros 4 KB de security.txt) y la conexión se cierra en cuanto se tienen cabeceras.

export type CheckStatus = "ok" | "aviso" | "falta" | "info";
export type Check = { id: string; label: string; status: CheckStatus; detail: string };

export type ScanState = {
  status: "idle" | "ok" | "invalid" | "blocked" | "unreachable" | "rate-limited" | "disabled";
  message?: string;
  target?: string;
  httpStatus?: number;
  checks?: Check[];
};

const UA = "StateX-ExposureCheck/1.0 (+https://statex-two.vercel.app/demo/exposicion; comprobador pasivo)";
const PER_HOP_MS = 8000;
const TOTAL_MS = 12000;
const MAX_REDIRECTS = 3;
const SECTXT_MAX = 4096;
const RATE = { max: 8, windowMs: 10 * 60 * 1000, mapCap: 2000 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  if (recent.length >= RATE.max) return true; // no registramos el intento rechazado (evita bloqueo perpetuo)
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > RATE.mapCap) for (const [k, v] of hits) if (v.every((t) => now - t >= RATE.windowMs)) hits.delete(k);
  return false;
}

// ─── Clasificación de IP: solo se permite unicast global (público) ───────────
function ipv4Blocked(ip: string): boolean {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  const [a, b, c] = p;
  if (a === 0 || a === 10 || a === 127) return true; // this-host, privada, loopback
  if (a === 169 && b === 254) return true; // link-local (incl. 169.254.169.254, metadatos cloud)
  if (a === 172 && b >= 16 && b <= 31) return true; // privada
  if (a === 192 && b === 168) return true; // privada
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 192 && b === 0 && (c === 0 || c === 2)) return true; // IETF / doc TEST-NET-1
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
  if (a === 198 && b === 51 && c === 100) return true; // doc TEST-NET-2
  if (a === 203 && b === 0 && c === 113) return true; // doc TEST-NET-3
  if (a >= 224) return true; // multicast y reservado (224–255)
  return false;
}

// Expande una IPv6 a 8 grupos de 4 hex (admite "::" y IPv4 embebida al final). Devuelve null si no parsea.
function expandIpv6(input: string): string | null {
  let s = input.toLowerCase().replace(/^\[|\]$/g, "");
  const v4 = s.match(/(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const b = v4.slice(1).map(Number);
    if (b.some((n) => n > 255)) return null;
    const hex = ((b[0] << 8) | b[1]).toString(16).padStart(4, "0") + ":" + ((b[2] << 8) | b[3]).toString(16).padStart(4, "0");
    s = s.slice(0, v4.index) + hex;
  }
  const parts = s.split("::");
  if (parts.length > 2) return null;
  const head = parts[0] ? parts[0].split(":") : [];
  const tail = parts.length === 2 && parts[1] ? parts[1].split(":") : [];
  const groups = parts.length === 2 ? [...head, ...Array(8 - head.length - tail.length).fill("0"), ...tail] : head;
  if (groups.length !== 8) return null;
  const out: string[] = [];
  for (const g of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
    out.push(g.padStart(4, "0"));
  }
  return out.join(":");
}

function ipv6Blocked(addr: string): boolean {
  const full = expandIpv6(addr);
  if (!full) return true; // no parsea → bloquear
  const g = full.split(":");
  const first = parseInt(g[0], 16);
  if (full === "0000:0000:0000:0000:0000:0000:0000:0000") return true; // ::
  if (full === "0000:0000:0000:0000:0000:0000:0000:0001") return true; // ::1
  if ((first & 0xff00) === 0xff00) return true; // multicast ff00::/8
  if ((first & 0xffc0) === 0xfe80) return true; // link-local fe80::/10
  if ((first & 0xfe00) === 0xfc00) return true; // unique local fc00::/7
  if ((first & 0xffc0) === 0xfec0) return true; // site-local fec0::/10
  if (g[0] === "2001" && g[1] === "0db8") return true; // doc 2001:db8::/32
  if (g[0] === "2002") return true; // 6to4 2002::/16
  const last32 = (((parseInt(g[6], 16) << 16) | parseInt(g[7], 16)) >>> 0);
  const asV4 = [(last32 >>> 24) & 255, (last32 >>> 16) & 255, (last32 >>> 8) & 255, last32 & 255].join(".");
  if (g.slice(0, 5).every((x) => x === "0000") && g[5] === "ffff") return ipv4Blocked(asV4); // ::ffff:x mapeada
  if (g.slice(0, 6).every((x) => x === "0000")) return ipv4Blocked(asV4); // ::x compat (incl. discard/unspec ya cubiertos)
  if (g[0] === "0064" && g[1] === "ff9b" && g.slice(2, 6).every((x) => x === "0000")) return ipv4Blocked(asV4); // NAT64 64:ff9b::/96
  if ((first & 0xe000) !== 0x2000) return true; // fuera de 2000::/3 (unicast global) → bloquear
  return false;
}

function ipBlocked(address: string, family: number): boolean {
  return family === 6 ? ipv6Blocked(address) : ipv4Blocked(address);
}

// Resuelve y valida TODAS las direcciones; devuelve la primera validada para fijarla en la conexión.
async function validatedAddress(hostname: string): Promise<{ address: string; family: number } | null> {
  try {
    const addrs = await dnsLookup(hostname, { all: true, verbatim: true });
    if (addrs.length === 0) return null;
    for (const a of addrs) if (ipBlocked(a.address, a.family)) return null;
    return { address: addrs[0].address, family: addrs[0].family };
  } catch {
    return null;
  }
}

type Resp = { status: number; get: (name: string) => string | undefined; body?: string };

// Una petición GET con la IP validada fijada (lookup propio): cierra la ventana de DNS rebinding.
function request(u: URL, deadline: number, wantBody: boolean): Promise<Resp | null> {
  return new Promise(async (resolve) => {
    const ip = await validatedAddress(u.hostname);
    if (!ip) return resolve(null);
    const timeLeft = deadline - Date.now();
    if (timeLeft <= 0) return resolve(null);
    const isHttps = u.protocol === "https:";
    const lib = isHttps ? https : http;
    let settled = false;
    const done = (r: Resp | null) => {
      if (!settled) {
        settled = true;
        resolve(r);
      }
    };
    const req = lib.request(
      {
        host: u.hostname, // SNI y verificación de certificado contra el nombre real
        port: u.port ? Number(u.port) : isHttps ? 443 : 80,
        path: (u.pathname || "/") + (u.search || ""),
        method: "GET",
        headers: { "User-Agent": UA, Accept: "*/*" },
        timeout: Math.min(PER_HOP_MS, timeLeft),
        // Fija la conexión a la IP ya validada; no hay segunda resolución incontrolada.
        // node llama a lookup con { all } variable: se respetan ambos formatos de callback.
        lookup: ((_h: string, opts: { all?: boolean }, cb: (...a: unknown[]) => void) => {
          if (opts && opts.all) cb(null, [{ address: ip.address, family: ip.family }]);
          else cb(null, ip.address, ip.family);
        }) as never,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        const h = res.headers;
        const get = (name: string) => {
          const v = h[name.toLowerCase()];
          return Array.isArray(v) ? v.join(", ") : v;
        };
        if (!wantBody) {
          res.destroy();
          return done({ status, get });
        }
        let body = "";
        let bytes = 0;
        res.setEncoding("utf8");
        res.on("data", (c: string) => {
          bytes += Buffer.byteLength(c);
          if (body.length < SECTXT_MAX) body += c;
          if (bytes > SECTXT_MAX) res.destroy();
        });
        res.on("end", () => done({ status, get, body }));
        res.on("close", () => done({ status, get, body }));
        res.on("error", () => done({ status, get, body }));
      },
    );
    req.on("timeout", () => {
      req.destroy();
      done(null);
    });
    req.on("error", () => done(null));
    req.end();
  });
}

// Sigue redirecciones a mano, revalidando cada salto.
async function fetchFollowing(start: URL, deadline: number, wantBody: boolean): Promise<{ res: Resp; finalUrl: URL } | null> {
  let current = start;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    const res = await request(current, deadline, wantBody);
    if (!res) return null;
    if (res.status >= 300 && res.status < 400 && res.get("location")) {
      let next: URL;
      try {
        next = new URL(res.get("location")!, current);
      } catch {
        return null;
      }
      if ((next.protocol !== "http:" && next.protocol !== "https:") || (next.port && next.port !== "80" && next.port !== "443")) return null;
      current = next;
      continue;
    }
    return { res, finalUrl: current };
  }
  return null;
}

function parseTarget(raw: string): URL | null {
  const trimmed = raw.trim();
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  if (u.port && u.port !== "80" && u.port !== "443") return null;
  if (u.username || u.password) return null; // sin credenciales en la URL
  u.hash = "";
  return u;
}

// Limpia lo que refleja un servidor ajeno antes de mostrarlo (sin control, podría ser largo o con basura).
function clean(v: string | undefined, max = 100): string {
  if (!v) return "";
  // eslint-disable-next-line no-control-regex
  return v.replace(/[\u0000-\u001f\u007f-\u009f]/g, " ").trim().slice(0, max);
}

function assess(res: Resp, finalUrl: URL): Check[] {
  const https = finalUrl.protocol === "https:";
  const csp = res.get("content-security-policy");
  const checks: Check[] = [];

  checks.push({
    id: "https",
    label: "HTTPS",
    status: https ? "ok" : "aviso",
    detail: https ? "La web responde por HTTPS." : "La web no responde por HTTPS: el tráfico puede viajar sin cifrar.",
  });

  checks.push({
    id: "hsts",
    label: "Strict-Transport-Security (HSTS)",
    status: !https ? "info" : res.get("strict-transport-security") ? "ok" : "aviso",
    detail: !https
      ? "Solo aplica sobre HTTPS."
      : res.get("strict-transport-security")
        ? "Obliga al navegador a usar HTTPS en visitas posteriores."
        : "Falta: un primer acceso por HTTP podría degradarse (SSL stripping).",
  });

  if (csp) {
    const unsafe = /unsafe-inline|unsafe-eval/i.test(csp);
    checks.push({
      id: "csp",
      label: "Content-Security-Policy",
      status: unsafe ? "aviso" : "ok",
      detail: unsafe
        ? "Presente, pero permite scripts/estilos inline ('unsafe-inline'/'unsafe-eval'): un XSS no quedaría frenado."
        : "Presente: limita de dónde se cargan scripts y recursos.",
    });
  } else {
    checks.push({ id: "csp", label: "Content-Security-Policy", status: "aviso", detail: "Falta: sin CSP, un XSS tiene vía libre." });
  }

  const frame = res.get("x-frame-options") || (csp && /frame-ancestors/i.test(csp));
  checks.push({
    id: "frame",
    label: "Protección contra clickjacking",
    status: frame ? "ok" : "aviso",
    detail: frame ? "Define quién puede embeber la web (X-Frame-Options o frame-ancestors)." : "Falta X-Frame-Options o frame-ancestors en la CSP.",
  });

  const nosniff = (res.get("x-content-type-options") ?? "").toLowerCase().includes("nosniff");
  checks.push({
    id: "nosniff",
    label: "X-Content-Type-Options",
    status: nosniff ? "ok" : "falta",
    detail: nosniff ? "El navegador no adivina el tipo de contenido (nosniff)." : "Falta 'nosniff': el navegador podría interpretar un archivo como otro tipo.",
  });

  checks.push({
    id: "referrer",
    label: "Referrer-Policy",
    status: res.get("referrer-policy") ? "ok" : "aviso",
    detail: res.get("referrer-policy") ? "Controla qué URL se envía al salir de la web." : "Falta: por defecto puede filtrarse la URL completa a terceros.",
  });

  checks.push({
    id: "permissions",
    label: "Permissions-Policy",
    status: res.get("permissions-policy") ? "ok" : "info",
    detail: res.get("permissions-policy") ? "Restringe cámara, micrófono, geolocalización, etc." : "No definida: las APIs del navegador quedan según los valores por defecto.",
  });

  const leaks = [clean(res.get("server")), clean(res.get("x-powered-by"))].filter(Boolean);
  checks.push({
    id: "banner",
    label: "Exposición de tecnología",
    status: leaks.length ? "info" : "ok",
    detail: leaks.length ? `La web revela su stack en cabeceras: ${leaks.join(" · ")}.` : "No revela servidor ni framework en las cabeceras.",
  });

  return checks;
}

export async function scan(_prev: ScanState, formData: FormData): Promise<ScanState> {
  // En Cloudflare Workers, node:http no admite el lookup propio que fija la IP validada (anti DNS rebinding):
  // allí el comprobador no se ofrece (docs/cloudflare-workers.md).
  if (onCloudflare()) return { status: "disabled", message: "El comprobador no está disponible en este despliegue." };
  if (!process.env.PREVIEW_USER || !process.env.PREVIEW_PASSWORD)
    return { status: "disabled", message: "El comprobador está desactivado. Se habilita protegiendo /demo con PREVIEW_USER y PREVIEW_PASSWORD." };

  const ip = await clientIp();
  if (rateLimited(ip)) return { status: "rate-limited", message: "Has hecho muchas comprobaciones seguidas. Espera unos minutos." };

  const target = parseTarget(String(formData.get("url") ?? ""));
  if (!target) return { status: "invalid", message: "Introduce una URL válida (http o https, puerto 80 o 443, sin credenciales)." };

  if (!(await validatedAddress(target.hostname)))
    return { status: "blocked", message: "Esa dirección es local, privada o reservada. El comprobador solo mira sitios públicos." };

  const deadline = Date.now() + TOTAL_MS;
  const main = await fetchFollowing(target, deadline, false);
  if (!main) return { status: "unreachable", message: "No se pudo leer esa web (no responde, tarda demasiado o redirige fuera de lo permitido)." };

  const checks = assess(main.res, main.finalUrl);

  // security.txt (RFC 9116): se cuenta solo si es text/plain con una línea Contact: (evita falsos positivos de soft-404).
  const sec = await fetchFollowing(new URL("/.well-known/security.txt", main.finalUrl.origin), deadline, true);
  const validSecTxt =
    !!sec && sec.res.status === 200 && (sec.res.get("content-type") ?? "").toLowerCase().includes("text/plain") && /^contact:/im.test(sec.res.body ?? "");
  checks.push({
    id: "securitytxt",
    label: "security.txt",
    status: validSecTxt ? "ok" : "info",
    detail: validSecTxt ? "Publica un canal para avisar de fallos de seguridad (RFC 9116)." : "No publica /.well-known/security.txt válido: no hay un contacto claro para reportar fallos.",
  });

  return { status: "ok", target: clean(main.finalUrl.toString(), 200), httpStatus: main.res.status, checks };
}

async function clientIp(): Promise<string> {
  const h = await headers();
  // Solo se confía en la cabecera de Vercel cuando corremos en Vercel; si no, es falsificable.
  const raw = (process.env.VERCEL ? h.get("x-vercel-forwarded-for") : null) ?? h.get("x-forwarded-for") ?? "";
  return raw.split(",")[0].trim() || "unknown";
}
