import type { Metadata, Viewport } from "next";
import { EvolvedHome } from "../../_site/EvolvedHome";
import { vantis as identity } from "../../_site/identities/vantis";

export const metadata: Metadata = {
  title: { absolute: `${identity.name} · ${identity.direction} (preview)` },
  description: `Preview interna de identidad: ${identity.name}, ${identity.tagline}`,
};
export const viewport: Viewport = { themeColor: identity.themeColor, colorScheme: "dark" };

export default function Preview() {
  return <EvolvedHome identity={identity} />;
}
