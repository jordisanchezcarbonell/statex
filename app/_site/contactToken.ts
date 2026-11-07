import { createHmac, timingSafeEqual } from "node:crypto";

// Token de tiempo firmado por el servidor para el formulario de contacto.
// Sustituye la marca de tiempo que antes enviaba el cliente (falsificable): el instante lo emite
// /api/contact-token y va firmado con HMAC-SHA256. El cliente solo lo reenvía; no puede cambiarlo.
// Sin dependencias externas: node:crypto. Secreto: CONTACT_TOKEN_SECRET o, si no existe, RESEND_API_KEY.

const MIN_AGE_MS = 3_000; // menos de esto es un envío automático
const MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 h: margen de sobra para rellenar el formulario

function secret(): string {
  return process.env.CONTACT_TOKEN_SECRET ?? process.env.RESEND_API_KEY ?? "";
}

function signature(t: number, key: string): string {
  return createHmac("sha256", key).update(`contact-token:${t}`).digest("hex");
}

export function issueContactToken(now = Date.now()): string | null {
  const key = secret();
  if (!key) return null;
  return `${now}.${signature(now, key)}`;
}

export type ContactTokenCheck = "ok" | "missing" | "invalid" | "too-fast" | "expired";

export function verifyContactToken(token: string, now = Date.now()): ContactTokenCheck {
  const key = secret();
  if (!key || !token) return "missing";
  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) return "invalid";
  const raw = token.slice(0, dot);
  const given = token.slice(dot + 1);
  if (!/^\d{1,15}$/.test(raw)) return "invalid";
  const expected = signature(Number(raw), key);
  const a = Buffer.from(given, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return "invalid";
  const age = now - Number(raw);
  if (age < 0) return "invalid";
  if (age < MIN_AGE_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}
