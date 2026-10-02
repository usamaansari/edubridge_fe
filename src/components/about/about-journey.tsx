import Image from "next/image";

const stats = [
  { value: "1 System", label: "Boards + Entrance Prep" },
  { value: "2 Modes", label: "School & Independent" },
  { value: "5000+", label: "Students Supported" },
  { value: "50+", label: "Partner Schools" },
];

const highlights = [
  "Integrated school coaching",
  "Flexible independent batches",
  "AI-guided performance tracking",
];

export function AboutJourney() {
  return (
    <section className="bg-[#f7f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Our Journey
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Reimagining How Students Prepare
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="space-y-4 text-base leading-7 text-muted-foreground">
              <p>
                EduBridge Academy was founded with a clear vision: end the
                conflict between school boards and competitive exams. Traditional
                coaching was too fragmented, too stressful, and too time-consuming
                for most students.
              </p>
              <p>
                By combining board preparation with JEE/NEET coaching into one
                smart system, we help students learn once and succeed twice —
                whether through partner schools or our independent centres.
              </p>
              <p>
                Today, EduBridge supports thousands of learners with mentorship,
                analytics, and a unified curriculum designed for clearer concepts
                and healthier academic routines.
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-white px-3 py-4 text-center shadow-sm"
                >
                  <p className="font-heading text-lg font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] bg-primary/5 shadow-[0_30px_80px_-40px_rgba(9,102,255,0.45)] ring-1 ring-primary/10">
            <Image
              src="/images/hero-classroom.png"
              alt="Team collaboration and innovation in EduBridge classrooms"
              width={1408}
              height={768}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
