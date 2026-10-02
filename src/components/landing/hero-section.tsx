import Image from "next/image";
import { ArrowRight, BookOpen, School } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "5000+", label: "Students" },
  { value: "50+", label: "Partner Schools" },
  { value: "95%", label: "Success Rate" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(9,102,255,0.14),_transparent_55%),linear-gradient(180deg,#f4f8ff_0%,#ffffff_72%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="animate-fade-up">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Admissions Open 2026–27
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground ring-1 ring-border">
              In-School & Independent Batches
            </span>
          </div>

          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            EduBridge Academy
          </p>
          <h1 className="mt-3 max-w-xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Where School Meets Success
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Integrated preparation for Boards + JEE/NEET — within your school or
            at our own centres. One system, complete success.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <a
              href="#programs"
              className="group flex items-start gap-3 rounded-2xl border border-border bg-white/80 p-4 transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <School className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  In-School Coaching
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                  Integrated within partner schools
                </span>
              </span>
            </a>
            <a
              href="#programs"
              className="group flex items-start gap-3 rounded-2xl border border-border bg-white/80 p-4 transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Independent Coaching
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                  At our own centres, flexible timings
                </span>
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" render={<a href="/contact" />}>
              Enroll Now
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" render={<a href="/contact" />}>
              Book a Demo
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/80 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up relative" style={{ animationDelay: "120ms" }}>
          <div className="animate-float-soft relative overflow-hidden rounded-[1.75rem] bg-primary/5 shadow-[0_30px_80px_-40px_rgba(9,102,255,0.55)] ring-1 ring-primary/10">
            <Image
              src="/images/hero-classroom.png"
              alt="Smart classroom with students using digital tools"
              width={1408}
              height={768}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
