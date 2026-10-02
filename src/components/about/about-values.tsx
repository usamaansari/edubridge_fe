import { HeartHandshake, Lightbulb, Scale } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously refine how school and competitive prep can work as one system — from AI analytics to smarter timetables.",
    detail:
      "Innovation at EduBridge means practical improvements that save time, reduce stress, and improve learning outcomes every term.",
  },
  {
    icon: Scale,
    title: "Accessibility",
    description:
      "High-quality JEE/NEET preparation should not depend on long travel or unaffordable multi-institute setups.",
    detail:
      "Through school partnerships and flexible centre batches, we make serious preparation available to more students and families.",
  },
  {
    icon: HeartHandshake,
    title: "Student Success",
    description:
      "We measure impact by healthier routines, clearer concepts, and stronger performance in boards and entrance exams.",
    detail:
      "Your child’s progress is our north star — from mentorship sessions to parent updates and scholarship support.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            What Drives Us
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Core Values
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            The principles that guide everything we build for students, parents,
            and schools
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-border bg-[#fafbfd] p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <value.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {value.description}
              </p>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-foreground/80">
                {value.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
