const stages = [
  {
    label: "Class 9–10",
    title: "Foundation Program",
    href: "#foundation",
  },
  {
    label: "Class 11–12",
    title: "JEE Preparation",
    href: "#jee",
  },
  {
    label: "Class 11–12",
    title: "NEET Preparation",
    href: "#neet",
  },
  {
    label: "3–6 Months",
    title: "Crash Courses",
    href: "#crash",
  },
  {
    label: "All Classes",
    title: "Scholarship Programs",
    href: "#scholarships",
  },
];

export function ProgramsPath() {
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Your Path
            </p>
            <p className="mt-2 max-w-md font-heading text-xl font-semibold text-foreground">
              Jump to the program that matches where you are today
            </p>
          </div>
          <nav
            aria-label="Program stages"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {stages.map((stage, index) => (
              <a
                key={stage.href}
                href={stage.href}
                className="group relative rounded-2xl border border-border bg-[#fafbfd] px-4 py-3 transition hover:border-primary/30 hover:bg-white hover:shadow-md"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} · {stage.label}
                </span>
                <span className="mt-1 block font-heading text-sm font-semibold text-foreground transition group-hover:text-primary">
                  {stage.title}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
