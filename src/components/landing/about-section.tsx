import { Clock3, Focus, Smile, Trophy } from "lucide-react";

const highlights = [
  {
    icon: Focus,
    title: "Focused Learning",
    description: "Board + competitive exam prep aligned in one curriculum",
  },
  {
    icon: Clock3,
    title: "Time Saved",
    description:
      "Integrated school coaching or flexible independent batches — you choose",
  },
  {
    icon: Trophy,
    title: "Better Outcomes",
    description: "Students score higher in both boards and entrance exams",
  },
  {
    icon: Smile,
    title: "Reduced Stress",
    description: "One system, no juggling between multiple institutes",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          About EduBridge
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Reimagining How Students Prepare for Success
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          EduBridge Academy offers JEE and NEET preparation both integrated
          within partner schools and as independent coaching at our own centres.
          Whether you prefer in-school coaching or separate classes — we deliver
          stress-free, high-quality education.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl bg-[#f4f8ff] p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
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
