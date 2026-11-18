import type { Metadata } from "next";
import { LegalPage } from "../_legal/LegalPage";

export const metadata: Metadata = { title: "Política de cookies" };

// Refleja el estado real de la web: sin cookies ni trackers (ver CLAUDE.md). Si eso cambia, esta página también.
export default function Cookies() {
  return (
    <LegalPage title="Política de cookies" updated="24 de octubre de 2026">
      <p>Esta web no usa cookies ni tecnologías similares para analítica, publicidad o seguimiento. Por eso no te muestro ningún aviso de cookies.</p>

      <h2>Qué no hago</h2>
      <ul>
        <li>No uso herramientas de analítica (como Google Analytics) ni píxeles de redes sociales.</li>
        <li>No cargo fuentes, vídeos ni scripts de terceros: las tipografías se sirven desde mi propio dominio.</li>
        <li>No guardo información en tu navegador para reconocerte en otras visitas.</li>
      </ul>
      <p>La única excepción es la sección interna de diseño (<code>/design-lab</code>): recuerda en tu navegador (almacenamiento local) qué propuestas habías elegido comparar. Ese dato no sale de tu dispositivo, no te identifica y puedes borrarlo desde los ajustes del navegador.</p>

      <h2>Si esto cambia</h2>
      <p>Si algún día añado cookies que no sean estrictamente necesarias, actualizaré esta página y te pediré el consentimiento antes de instalarlas.</p>
    </LegalPage>
  );
}
