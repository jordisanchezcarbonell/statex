import { Inter_Tight } from "next/font/google";
import { LabBar } from "../_shared/LabBar";
import { FieldStage } from "./_components/FieldStage";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import {
  AboutSection,
  ApproachSection,
  ContactSection,
  ProblemSection,
  ResearchSection,
  SiteFooter,
  SolutionsSection,
  TechnologySection,
} from "./_components/Sections";
import "./future.css";

export const metadata = { title: "Concept F" };

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-future",
});

export default function FutureSecurityPage() {
  return (
    <div
      id="top"
      className={`${interTight.variable} future-root min-h-screen bg-(--nieve) text-[18px] leading-[1.55] text-(--tinta) antialiased`}
    >
      <a
        href="#contenido"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-(--tinta) px-4 py-2 text-[14px] text-white focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Header />

      <main id="contenido">
        {/* Un único contexto WebGL detrás de hero, problema y enfoque: el fondo cambia de estado con el scroll. */}
        <FieldStage problemId="problema" approachId="enfoque">
          <Hero />
          <ProblemSection />
          <ApproachSection />
        </FieldStage>
        <SolutionsSection />
        <TechnologySection />
        <ResearchSection />
        <AboutSection />
        <ContactSection />
      </main>

      <SiteFooter />
      <LabBar current="f" />
    </div>
  );
}
