import type { Metadata } from "next";
import {
  FeaturesCategories,
  FeaturesGrid,
  FeaturesHero,
  FeaturesHighlight,
} from "@/components/features";
import { CtaSection, Footer, Header } from "@/components/landing";

export const metadata: Metadata = {
  title: "Features | EduBridge Academy",
  description:
    "Explore EduBridge Academy features — dual preparation, mentorship, AI analytics, hybrid learning, parent updates, career guidance, and more.",
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1">
        <FeaturesHero />
        <FeaturesCategories />
        <FeaturesGrid />
        <FeaturesHighlight />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
