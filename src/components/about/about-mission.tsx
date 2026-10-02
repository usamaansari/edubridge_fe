import { Check } from "lucide-react";

const missionPoints = [
  "Align Boards + JEE/NEET in one curriculum",
  "Reduce travel, duplication, and academic stress",
  "Give every student personal mentorship and clear goals",
];

const visionPoints = [
  "Become India’s most trusted school–coaching bridge",
  "Partner with schools nationwide for integrated prep",
  "Make high-quality entrance coaching accessible to all",
];

export function AboutMission() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Our Foundation
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Mission & Vision
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Driving balanced preparation and democratizing access to quality
            competitive coaching
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-border bg-[#f4f8ff] p-8">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Our Mission
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              To empower students to prepare for school boards and entrance exams
              through one smart system — integrated in partner schools or
              delivered through flexible independent batches — so learning stays
              focused, affordable, and stress-free.
            </p>
            <ul className="mt-6 space-y-3">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-border bg-white p-8 shadow-sm">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Our Vision
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              To become the national standard for integrated academic excellence
              — where every student, regardless of location or schedule, can
              access sophisticated preparation without choosing between school
              and coaching.
            </p>
            <ul className="mt-6 space-y-3">
              {visionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
