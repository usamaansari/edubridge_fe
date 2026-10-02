import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "Boards + JEE/NEET in one system",
  "Mentorship with measurable progress",
  "Practice, doubts, and materials covered",
  "Parents stay informed every month",
];

export function FeaturesHighlight() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-[#eef5ff] via-white to-[#f7f9fc] px-6 py-10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-10 top-0 size-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Built as One System
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Features that work together — not as add-ons
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                From dual preparation to scholarships, every piece of the
                EduBridge ecosystem is designed to reduce stress and raise
                outcomes together.
              </p>
              <div className="mt-7">
                <Button size="lg" render={<a href="/programs" />}>
                  View Programs
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-white/80 px-4 py-3 ring-1 ring-border/70 backdrop-blur-sm"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm leading-6 font-medium text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
