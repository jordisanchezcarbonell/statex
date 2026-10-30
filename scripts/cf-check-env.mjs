// OpenNext incrusta en el Worker las variables de .env, .env.production y .env.local
// (.open-next/cloudflare/next-env.mjs). Antes de desplegar se comprueba que no haya ninguna secreta:
// solo se admiten las públicas de la web; los secretos van con `wrangler secret put`.
import { pathToFileURL } from "node:url";

const allowed = (k) => k.startsWith("NEXT_PUBLIC_") || k === "SITE_INDEXABLE" || k === "CONTACT_FORM_ENABLED";
const env = await import(pathToFileURL(".open-next/cloudflare/next-env.mjs").href);
const leaked = Object.values(env).flatMap((vars) => Object.keys(vars ?? {})).filter((k) => !allowed(k));

if (leaked.length) {
  console.error(`cf-check-env: el bundle incluye variables no públicas (${[...new Set(leaked)].join(", ")}).`);
  console.error("Quítalas de los archivos .env* y súbelas con `npx wrangler secret put`.");
  process.exit(1);
}
console.log("cf-check-env: sin secretos en el bundle.");
