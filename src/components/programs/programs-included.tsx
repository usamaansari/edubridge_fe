import {
  Brain,
  LineChart,
  MessageCircle,
  School,
  Users,
  BookOpenCheck,
} from "lucide-react";

const inclusions = [
  {
    icon: School,
    title: "Two learning modes",
    description: "In-school integrated batches or independent centre coaching.",
  },
  {
    icon: BookOpenCheck,
    title: "Unified curriculum",
    description: "Boards and entrance topics taught once, applied twice.",
  },
  {
    icon: Users,
    title: "Personal mentorship",
    description: "Monthly one-on-ones with goal setting and accountability.",
  },
  {
    icon: LineChart,
    title: "Performance analytics",
    description: "Weekly tests with clear strengths, gaps, and next actions.",
  },
  {
    icon: MessageCircle,
    title: "Doubt support",
    description: "Live clinics plus app/WhatsApp help when stuck mid-topic.",
  },
  {
    icon: Brain,
    title: "Exam temperament",
    description: "Mocks, timing drills, and strategy that reduce exam-day stress.",
  },
];

export function ProgramsIncluded() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Across Every Program
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What every EduBridge student gets
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            The same support system wraps around Foundation, JEE, NEET, and crash
            cohorts.
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {inclusions.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
