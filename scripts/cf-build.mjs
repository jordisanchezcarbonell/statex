// Build para Cloudflare Workers con solo la web corporativa (docs/cloudflare-workers.md).
// Aparta app/demo, app/preview y app/design-lab mientras construye: así ni su HTML prerenderizado ni su
// código (p. ej. la acción del comprobador) llegan al Worker. Siempre las devuelve a su sitio, también si
// el build falla o se interrumpe. No ejecutar con `npm run dev` abierto.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, rmdirSync } from "node:fs";

const internal = ["demo", "preview", "design-lab"];
const parked = ".cf-excluded";

function restore() {
  for (const dir of internal) if (existsSync(`${parked}/${dir}`)) renameSync(`${parked}/${dir}`, `app/${dir}`);
  if (existsSync(parked)) rmdirSync(parked);
}

restore(); // por si una ejecución anterior se cortó sin restaurar
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => (restore(), process.exit(130)));

let status = 1;
try {
  mkdirSync(parked);
  for (const dir of internal) renameSync(`app/${dir}`, `${parked}/${dir}`);
  status = spawnSync("npx", ["opennextjs-cloudflare", "build"], { stdio: "inherit" }).status ?? 1;
} finally {
  restore();
}
if (status === 0) status = spawnSync("node", ["scripts/cf-check-env.mjs"], { stdio: "inherit" }).status ?? 1;
process.exit(status);
