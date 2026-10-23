import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "StateX", template: "%s · StateX" },
  description: "StateX — conoce el estado real de tu exposición y verifica que lo corregido sigue corregido.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
