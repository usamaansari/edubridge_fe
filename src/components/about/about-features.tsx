import {
  BookOpen,
  Brain,
  LineChart,
  MessageCircle,
  School,
  UserRound,
} from "lucide-react";

const features = [
  {
    icon: School,
    title: "In-School Coaching",
    description:
      "Integrated preparation inside partner schools so students save travel time and stay aligned with their academic calendar.",
  },
  {
    icon: BookOpen,
    title: "Independent Batches",
    description:
      "Flexible centre-based coaching for students who prefer dedicated after-school learning with expert faculty.",
  },
  {
    icon: Brain,
    title: "Unified Curriculum",
    description:
      "Boards + JEE/NEET content delivered together — no duplicated topics, no conflicting teaching styles.",
  },
  {
    icon: UserRound,
    title: "Personal Mentorship",
    description:
      "One mentor per student with monthly one-on-ones, goal setting, and continuous academic guidance.",
  },
  {
    icon: LineChart,
    title: "AI Performance Analytics",
    description:
      "Weekly tests, detailed reports, and smart recommendations that highlight strengths and weak areas early.",
  },
  {
    icon: MessageCircle,
    title: "Doubt Support System",
    description:
      "Dedicated doubt sessions plus instant help via app or WhatsApp so learning never stalls.",
  },
];

export function AboutFeatures() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Features
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Excel
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            A complete academic ecosystem designed for Classes 9–12 and beyond
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border bg-[#fafbfd] p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
