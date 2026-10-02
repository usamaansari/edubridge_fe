import { ArrowRight } from "lucide-react";

const programs = [
  {
    id: "foundation",
    badge: "Class 9–10",
    title: "Foundation Program",
    description:
      "Build strong conceptual base for competitive exams while acing school boards",
  },
  {
    id: "jee",
    badge: "Class 11–12",
    title: "JEE Preparation",
    description:
      "Comprehensive IIT-JEE Main & Advanced coaching integrated with school curriculum",
  },
  {
    id: "neet",
    badge: "Class 11–12",
    title: "NEET Preparation",
    description:
      "Biology-focused medical entrance prep alongside board preparation",
  },
  {
    id: "crash",
    badge: "3–6 Months",
    title: "Crash Courses",
    description:
      "Intensive revision and test series for last-minute exam preparation",
  },
  {
    id: "scholarships",
    badge: "All Classes",
    title: "Scholarship Programs",
    description:
      "Merit-based scholarships for deserving students with financial assistance",
  },
];

export function ProgramsShowcase() {
  return (
    <section id="programs" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Programs Offered
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose Your Path to Success
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Structured programs designed for every stage of your academic journey
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.id}
              id={program.id}
              className="group flex scroll-mt-28 flex-col rounded-2xl border border-border bg-[#fafbfd] p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
            >
              <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {program.badge}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
                {program.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                {program.description}
              </p>
              <a
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5"
              >
                Learn More
                <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
