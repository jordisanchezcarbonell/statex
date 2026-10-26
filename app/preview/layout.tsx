import type { Metadata } from "next";
import type { ReactNode } from "react";

// Previews de identidad de marca: internas, nunca indexables (además de la cabecera X-Robots-Tag de
// next.config.ts, el Disallow de robots.ts y la protección opcional de proxy.ts).
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children;
}
