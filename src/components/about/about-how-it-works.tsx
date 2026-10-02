const steps = [
  {
    step: "1",
    title: "Choose Your Mode",
    description:
      "Pick school-integrated coaching or independent batches at our centres — whichever fits your lifestyle.",
  },
  {
    step: "2",
    title: "Follow the System",
    description:
      "Learn through a structured timetable that blends board syllabus with competitive exam preparation.",
  },
  {
    step: "3",
    title: "Track & Succeed",
    description:
      "Weekly tests, mentorship, and AI analytics guide you to stronger boards and entrance exam results.",
  },
];

export function AboutHowItWorks() {
  return (
    <section className="bg-[#f7f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            How It Works
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get Started in Three Steps
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            A simple path from enrollment to academic excellence
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-border bg-white p-8 text-center shadow-sm"
            >
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary font-heading text-xl font-bold text-primary-foreground">
                {item.step}
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
