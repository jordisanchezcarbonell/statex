/*
 * Home de /preview/<identidad>: la misma home de producción (HomeSections) con el nombre de la identidad
 * en logotipo y textos, sin JSON-LD y con la barra para saltar entre identidades.
 */
import { HomeSections } from "./Home";
import type { Identity } from "./identities/types";
import { PreviewBar } from "./PreviewBar";
import { Shell } from "./Shell";

export function EvolvedHome({ identity }: { identity: Identity }) {
  return (
    <Shell identity={identity} after={<PreviewBar current={identity.key} />}>
      <HomeSections identity={identity} />
    </Shell>
  );
}
