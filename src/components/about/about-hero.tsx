import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustItems = [
  "Admissions Open 2026–27",
  "In-School & Independent Modes",
  "Boards + JEE/NEET Together",
];

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(9,102,255,0.16),_transparent_52%),linear-gradient(180deg,#eef5ff_0%,#ffffff_78%)]" />
      <div className="pointer-events-none absolute -left-24 top-16 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-32 size-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Transform Your Learning
        </p>
        <h1 className="animate-fade-up mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Where School Meets Success
        </h1>
        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          style={{ animationDelay: "80ms" }}
        >
          EduBridge Academy integrates Boards + JEE/NEET preparation into one
          smart system — inside partner schools or at our own centres — so
          students learn better without extra stress.
        </p>
        <div
          className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "140ms" }}
        >
          <Button size="lg" render={<a href="/contact" />}>
            Enroll Now
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" render={<a href="/contact" />}>
            Book a Demo
          </Button>
        </div>
        <ul
          className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          style={{ animationDelay: "200ms" }}
        >
          {trustItems.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
