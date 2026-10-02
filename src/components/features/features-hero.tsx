import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(9,102,255,0.16),_transparent_52%),linear-gradient(180deg,#eef5ff_0%,#ffffff_78%)]" />
      <div className="pointer-events-none absolute -left-24 top-16 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-32 size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
        <p className="animate-fade-up font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Edu<span className="text-primary">Bridge</span> Academy
        </p>
        <p
          className="animate-fade-up mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary"
          style={{ animationDelay: "40ms" }}
        >
          Why EduBridge
        </p>
        <h1
          className="animate-fade-up mt-3 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Everything a Student Needs to Excel
        </h1>
        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          A comprehensive ecosystem designed for academic excellence
        </p>
        <div
          className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "160ms" }}
        >
          <Button size="lg" render={<a href="#features" />}>
            Explore Features
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" render={<a href="/contact" />}>
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
