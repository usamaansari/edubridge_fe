import { Building2, Sparkles, Users } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Accessible to All",
    description:
      "Whether you prefer in-school coaching or independent batches, EduBridge adapts to every student’s schedule, pace, and learning style.",
  },
  {
    icon: Building2,
    title: "School Partnership Ready",
    description:
      "Built to work with leading schools — unified calendars, shared academic goals, and seamless classroom integration.",
  },
  {
    icon: Sparkles,
    title: "Proven Outcomes",
    description:
      "Higher board scores, stronger entrance ranks, and healthier routines — without the burnout of juggling multiple institutes.",
  },
];

export function AboutBenefits() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Benefits
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for Students, Trusted by Schools
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Whether you are a student, parent, or school leader, EduBridge fits
            your goals
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {benefits.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-[#f4f8ff] p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
