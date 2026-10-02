import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-[#f7f9fc] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-primary px-6 py-12 text-primary-foreground sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 size-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Join the Future of Learning Today
            </h2>
            <p className="mt-4 text-base leading-7 text-primary-foreground/85 sm:text-lg">
              Give your child the advantage of integrated or independent coaching
              for JEE & NEET. Limited seats available for the upcoming academic
              session.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                render={<a href="/contact" />}
              >
                Enroll Now
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                render={<a href="/contact" />}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
