import type { Metadata } from "next";
import {
  AboutBenefits,
  AboutFeatures,
  AboutHero,
  AboutHowItWorks,
  AboutJourney,
  AboutMission,
  AboutTeam,
  AboutValues,
} from "@/components/about";
import { CtaSection, Footer, Header } from "@/components/landing";

export const metadata: Metadata = {
  title: "About Us | EduBridge Academy",
  description:
    "Learn how EduBridge Academy bridges school education and JEE/NEET success through integrated and independent coaching.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1">
        <AboutHero />
        <AboutFeatures />
        <AboutHowItWorks />
        <AboutBenefits />
        <AboutJourney />
        <AboutMission />
        <AboutTeam />
        <AboutValues />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
