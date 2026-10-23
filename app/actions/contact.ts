"use server";

// Envío del formulario de contacto.
// - Valida en servidor (nunca confiar en el cliente).
// - Campo trampa "website" contra bots: si viene relleno, se finge éxito y no se envía nada.
// - Envía con la API REST de Resend (sin dependencias). Si faltan las variables de entorno,
//   devuelve "not-configured" para que la web lo diga claramente en lugar de fallar en silencio.
//   Variables: RESEND_API_KEY, CONTACT_TO, CONTACT_FROM (ver .env.example).

export type ContactState = {
  status: "idle" | "ok" | "error" | "not-configured";
  fieldErrors?: Partial<Record<"name" | "company" | "email" | "interest" | "message" | "consent", string>>;
  // Valores enviados: React 19 vacía el formulario tras la acción; con esto se repueblan si hay error.
  values?: Record<"name" | "company" | "email" | "role" | "interest" | "message", string>;
};

const INTERESTS = new Set(["evaluacion-inicial", "auditoria-web", "arquitectura", "otra", "colaboracion"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(data: FormData, key: string, max: number) {
  const v = data.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function sendContact(_prev: ContactState, data: FormData): Promise<ContactState> {
  if (field(data, "website", 200)) return { status: "ok" };

  const name = field(data, "name", 120);
  const company = field(data, "company", 160);
  const email = field(data, "email", 200);
  const role = field(data, "role", 120);
  const interest = field(data, "interest", 40);
  const message = field(data, "message", 4000);
  const consent = data.get("consent") === "on";

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Indica tu nombre.";
  if (!company) fieldErrors.company = "Indica tu empresa.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Revisa el email.";
  if (!INTERESTS.has(interest)) fieldErrors.interest = "Elige una opción.";
  if (message.length < 10) fieldErrors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  if (!consent) fieldErrors.consent = "Necesitamos tu consentimiento para responderte.";
  const values = { name, company, email, role, interest, message };
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors, values };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return { status: "not-configured", values };

  const text = [
    `Nombre: ${name}`,
    `Empresa: ${company}`,
    `Email: ${email}`,
    `Cargo: ${role || "-"}`,
    `Interés: ${interest}`,
    "",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "StateX <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Nueva solicitud (${interest}): ${company.replace(/[\r\n]+/g, " ")}`,
        text,
      }),
    });
    return res.ok ? { status: "ok" } : { status: "error", values };
  } catch {
    return { status: "error", values };
  }
}
