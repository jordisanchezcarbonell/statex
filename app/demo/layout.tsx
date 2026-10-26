import type { Metadata } from "next";
import type { ReactNode } from "react";

// Demos internas: nunca indexables (además de X-Robots-Tag en next.config.ts y el Disallow de robots.ts).
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children;
}
