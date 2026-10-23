import { redirect } from "next/navigation";

// Fase de exploración: la home aún no existe; todo pasa por el design lab.
export default function Home() {
  redirect("/design-lab");
}
