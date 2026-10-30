"use server";

import { headers } from "next/headers";
import { contactForm } from "../_site/content";
import { contactFormEnabled, onCloudflare } from "../_site/runtime";
import { readContact, validateContact, type ContactValues, type FieldErrors } from "../_site/validate";

// Envío del formulario de contacto.
// - Valida en servidor con las mismas reglas que el navegador (app/_site/validate.ts).
// - Antiabuso sin dependencias: campo trampa "website", envíos demasiado rápidos tras pintar el
//   formulario y límite por IP en memoria. En los dos primeros casos no se envía nada y se responde
//   con un error genérico: nunca se muestra éxito si no se ha enviado un correo.
//   El límite en memoria es por instancia (orientativo en serverless); uno global necesitaría un
//   almacén externo (ver docs/pendientes.md).
// - Envía con la API REST de Resend. Si el formulario está desactivado o faltan las variables de
//   entorno devuelve "not-configured" antes de procesar nada.
//   Variables: CONTACT_FORM_ENABLED, RESEND_API_KEY, CONTACT_TO, CONTACT_FROM (ver .env.example).

export type ContactState = {
  status: "idle" | "ok" | "invalid" | "error" | "not-configured" | "rate-limited";
  fieldErrors?: FieldErrors;
  // Valores enviados: React 19 vacía el formulario tras la acción; con esto se repueblan si hay error.
  values?: ContactValues;
};

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.delete(ip);
  hits.set(ip, recent);
  // Cota de memoria: se descartan las IP más antiguas (Map conserva el orden de inserción).
  while (hits.size > 5000) hits.delete(hits.keys().next().value!);
  return false;
}

// Quita saltos de línea y caracteres de control: evita inyectar líneas falsas en el correo.
const oneLine = (s: string) => s.replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, " ");

export async function sendContact(_prev: ContactState, data: FormData): Promise<ContactState> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!contactFormEnabled() || !key || !to) return { status: "not-configured" };

  const website = data.get("website");
  const renderedAt = Number(data.get("t"));
  if (typeof website === "string" && website) return { status: "error" };
  // Demasiado rápido para una persona: no se envía y se pide repetir (nunca un falso éxito a quien
  // pudiera ser real). Sin JavaScript la marca llega vacía y no se aplica.
  const input = readContact(data);
  const { values } = input;
  if (renderedAt > 0 && Date.now() - renderedAt < MIN_FILL_MS) return { status: "error", values };

  const fieldErrors = validateContact(input);
  if (Object.keys(fieldErrors).length) return { status: "invalid", fieldErrors, values };

  // En Vercel, x-vercel-forwarded-for y x-real-ip los fija el borde; x-forwarded-for es el último recurso.
  // En Cloudflare Workers solo cf-connecting-ip es fiable: las otras las puede enviar el cliente.
  const h = await headers();
  const forwarded = onCloudflare()
    ? h.get("cf-connecting-ip")
    : (h.get("x-vercel-forwarded-for") ?? h.get("x-real-ip") ?? h.get("x-forwarded-for"));
  const ip = (forwarded ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return { status: "rate-limited", values };

  const service = contactForm.serviceOptions.find((o) => o.value === values.service)?.label ?? values.service;
  const text = [
    `Nombre: ${oneLine(values.name)}`,
    `Empresa: ${oneLine(values.company)}`,
    `Email: ${oneLine(values.email)}`,
    `Web: ${values.url ? oneLine(values.url) : "(no indicada)"}`,
    `Servicio: ${service}`,
    "",
    values.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "StateX <onboarding@resend.dev>",
        to: [to],
        reply_to: values.email,
        subject: `Nueva solicitud (${oneLine(service)}): ${oneLine(values.company)}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) return { status: "ok" };
    console.error(`contact: Resend respondió ${res.status}`); // sin cuerpo ni datos personales
    return { status: "error", values };
  } catch {
    console.error("contact: fallo de red al enviar");
    return { status: "error", values };
  }
}
