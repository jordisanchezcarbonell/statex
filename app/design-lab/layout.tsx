import type { Metadata } from "next";
import { notFound } from "next/navigation";

// El design lab es un archivo interno de exploración: nunca se indexa y no existe en producción
// (VERCEL_ENV=production devuelve 404). Sigue disponible en local y en los despliegues de preview.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  if (process.env.VERCEL_ENV === "production") notFound();
  return children;
}
