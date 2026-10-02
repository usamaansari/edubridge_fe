const leaders = [
  {
    initials: "ZN",
    name: "Dr. Zulkarnain",
    role: "Co-Founder & Academic Director",
    location: "Aligarh, Uttar Pradesh, India",
    summary:
      "Zulkarnain is an education leader focused on building curricula that unite board excellence with competitive exam readiness. He has guided academic design for foundation, JEE, and NEET pathways across partner schools and independent centres.",
    highlights: [
      "Built unified Boards + JEE/NEET frameworks for Classes 9–12",
      "Led faculty development programs across partner schools",
      "Specializes in concept-first teaching without rote learning",
    ],
    focus:
      "Passionate about reducing student burnout while improving outcomes in both school and entrance exams. Specializes in concept-first teaching without rote learning.",
  },
  {
    initials: "MU",
    name: "Muhammad Umair",
    role: "Co-Founder & Head of Mentorship",
    location: "Aligarh, Uttar Pradesh, India",
    summary:
      "Umair designs the mentorship engine behind EduBridge — one mentor per student, monthly reviews, and goal systems that keep learners accountable without overwhelming them.",
    highlights: [
      "Scaled personalised mentoring across 5000+ learners",
      "Created parent communication and progress frameworks",
      "Expert in exam psychology and time management coaching",
    ],
    focus:
      "Believes every rank improvement starts with clarity, consistency, and the right mentor relationship.",
  },
];

export function AboutTeam() {
  return (
    <section id="team" className="scroll-mt-20 bg-[#f7f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Leadership
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet Our Leaders
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Educators and operators building the future of integrated academic
            preparation
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="rounded-3xl border border-border bg-white p-7 shadow-sm sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-heading text-xl font-bold text-primary">
                  {leader.initials}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {leader.role}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Location: {leader.location}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                {leader.summary}
              </p>

              <ul className="mt-5 space-y-2">
                {leader.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-foreground"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
                {leader.focus}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
