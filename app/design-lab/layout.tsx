import type { Metadata } from "next";
import { notFound } from "next/navigation";

// El design lab es un archivo interno de exploración: nunca se indexa y no existe en producción
// (VERCEL_ENV=production redirige a la home en next.config.ts; este 404 es la red de seguridad).
// Sigue disponible en local y en los despliegues de preview.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  if (process.env.VERCEL_ENV === "production") notFound();
  return children;
}
