const steps = [
  {
    step: "1",
    title: "Choose Your Mode",
    description:
      "School-integrated or independent coaching — pick what suits you",
  },
  {
    step: "2",
    title: "Structured Timetable",
    description: "Well-planned schedule for boards + competitive prep",
  },
  {
    step: "3",
    title: "Daily Learning",
    description: "Board + competitive content delivered together",
  },
  {
    step: "4",
    title: "Weekly Tests",
    description: "Regular assessments to track progress",
  },
  {
    step: "5",
    title: "Performance Tracking",
    description: "AI-powered analytics and smart feedback",
  },
  {
    step: "6",
    title: "Success",
    description: "Excel in boards, JEE, and NEET with confidence",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          How It Works
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your Journey to Academic Excellence
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative overflow-hidden rounded-2xl border border-border bg-[#fafbfd] p-6"
            >
              <span className="font-heading text-5xl font-bold text-primary/75">
                {item.step}
              </span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
