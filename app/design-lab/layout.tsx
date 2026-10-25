import type { Metadata } from "next";

// El design lab es un archivo interno de exploración: nunca se indexa.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
