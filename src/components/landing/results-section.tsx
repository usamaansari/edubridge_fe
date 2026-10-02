const metrics = [
  { value: "95%", label: "Board Pass Rate" },
  { value: "500+", label: "IIT/NIT Selections" },
  { value: "1200+", label: "Medical Selections" },
  { value: "50+", label: "State Toppers" },
];

const testimonials = [
  {
    quote:
      "EduBridge made it possible to focus on both boards and JEE without stress of attending seperate coaching classes. Truly life changing experience for me.",
    name: "Aarav Sharma",
    result: "JEE Advanced – AIR 342",
    school: "Delhi Public School",
  },
  {
    quote:
      "The integrated system saved me 3 hours daily. I could focus much better and even had time for my hobbies. Thankyou so much EduBridge team!",
    name: "Priya Patel",
    result: "NEET – AIR 1,205",
    school: "Ryan International",
  },
  {
    quote:
      "The AI analytics helped me to identify weak areas early on. My mentors guided me in every step of the way. Highly recomend to everyone.",
    name: "Rohan Gupta",
    result: "JEE Main – 99.2%ile",
    school: "Kendriya Vidyalaya",
  },
];

export function ResultsSection() {
  return (
    <section id="results" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Results & Testimonials
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Our Students Speak for Us
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl bg-[#f4f8ff] px-4 py-6 text-center"
            >
              <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="flex flex-col rounded-2xl border border-border bg-[#fafbfd] p-6"
            >
              <p className="flex-1 text-sm leading-7 text-muted-foreground">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="font-heading font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="mt-1 text-sm font-medium text-primary">
                  {item.result}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.school}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
