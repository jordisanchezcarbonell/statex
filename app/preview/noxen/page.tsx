import type { Metadata } from "next";
import { EvolvedHome } from "../../_site/EvolvedHome";
import { noxen as identity } from "../../_site/identities/noxen";

export const metadata: Metadata = {
  title: { absolute: `${identity.name} (preview)` },
  description: `Preview interna de identidad: ${identity.name}, ${identity.tagline}`,
};

export default function Preview() {
  return <EvolvedHome identity={identity} />;
}
