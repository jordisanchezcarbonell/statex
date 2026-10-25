import { contactForm } from "./content";

// Reglas del formulario de contacto, compartidas por el navegador (aviso inmediato) y el servidor
// (la única validación que cuenta: nunca se confía en el cliente).

export type ContactField = "name" | "email" | "company" | "service" | "message" | "consent";
export type ContactValues = Record<Exclude<ContactField, "consent">, string>;
export type FieldErrors = Partial<Record<ContactField, string>>;

export const LIMITS = { name: 120, email: 200, company: 160, service: 40, message: 4000 } as const;
const SERVICES = new Set(contactForm.serviceOptions.map((o) => o.value));
// Sin espacios ni caracteres que rompen una dirección (<>,;:"'()): el proveedor la rechazaría.
const EMAIL_RE = /^[^\s@<>(),;:"']+@[^\s@<>(),;:"']+\.[^\s@<>(),;:"']{2,}$/;

function text(data: FormData, key: keyof typeof LIMITS) {
  const v = data.get(key);
  return typeof v === "string" ? v.trim().slice(0, LIMITS[key]) : "";
}

export function readContact(data: FormData): { values: ContactValues; consent: boolean } {
  return {
    values: {
      name: text(data, "name"),
      email: text(data, "email"),
      company: text(data, "company"),
      service: text(data, "service"),
      message: text(data, "message"),
    },
    consent: data.get("consent") === "on",
  };
}

export function validateContact({ values: v, consent }: ReturnType<typeof readContact>): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name) e.name = "Indica tu nombre.";
  if (!EMAIL_RE.test(v.email)) e.email = "Revisa el email.";
  if (!v.company) e.company = "Indica tu empresa.";
  if (!SERVICES.has(v.service)) e.service = "Elige una opción.";
  if (v.message.length < 20) e.message = "Cuéntanos un poco más (mínimo 20 caracteres).";
  if (!consent) e.consent = "Necesitamos tu consentimiento para responderte.";
  return e;
}
