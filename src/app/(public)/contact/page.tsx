import type { Metadata } from "next";
import {
  ContactChannels,
  ContactFormSection,
  ContactHero,
} from "@/components/contact";
import { Footer, Header } from "@/components/landing";

export const metadata: Metadata = {
  title: "Contact | EduBridge Academy",
  description:
    "Get in touch with EduBridge Academy for admissions, demos, scholarships, and school partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1">
        <ContactHero />
        <ContactChannels />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
