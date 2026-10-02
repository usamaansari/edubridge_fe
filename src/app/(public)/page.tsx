import {
  AboutSection,
  ApproachSection,
  ContactSection,
  CtaSection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  HowItWorksSection,
  PartnersSection,
  ProgramsSection,
  ResultsSection,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ApproachSection />
        <ProgramsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PartnersSection />
        <ResultsSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
