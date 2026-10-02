import type { Metadata } from "next";
import {
  ProgramsHero,
  ProgramsIncluded,
  ProgramsPath,
  ProgramsShowcase,
} from "@/components/programs";
import { CtaSection, Footer, Header } from "@/components/landing";

export const metadata: Metadata = {
  title: "Programs | EduBridge Academy",
  description:
    "Explore EduBridge Academy programs for Foundation, JEE, NEET, crash courses, and scholarships — boards and entrance prep in one system.",
};

export default function ProgramsPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1">
        <ProgramsHero />
        <ProgramsPath />
        <ProgramsShowcase />
        <ProgramsIncluded />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
