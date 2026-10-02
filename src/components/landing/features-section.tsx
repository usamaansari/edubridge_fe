import {
  Activity,
  ArrowRight,
  BookMarked,
  Brain,
  FlaskConical,
  GraduationCap,
  Handshake,
  HeartPulse,
  LineChart,
  MessageCircle,
  MonitorPlay,
  Sparkles,
  UserRound,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Dual Preparation System",
    points: [
      "Boards + JEE/NEET aligned curriculum",
      "NCERT + advanced problem-solving",
      "Answer writing practice for boards",
      "Concept clarity for competitive exams",
    ],
  },
  {
    icon: UserRound,
    title: "Personalized Mentorship",
    points: [
      "One mentor per student",
      "Monthly one-on-one sessions",
      "Goal setting and academic guidance",
      "Continuous progress monitoring",
    ],
  },
  {
    icon: LineChart,
    title: "AI-Based Performance Analytics",
    points: [
      "Weekly tests and assessments",
      "Detailed performance reports",
      "Strength and weakness analysis",
      "Smart recommendations for improvement",
    ],
  },
  {
    icon: Activity,
    title: "Daily Practice System",
    points: [
      "Daily Practice Problems (DPP)",
      "Topic-wise assignments",
      "Consistent learning approach",
      "Progressive difficulty levels",
    ],
  },
  {
    icon: MessageCircle,
    title: "Doubt Solving System",
    points: [
      "Dedicated doubt sessions",
      "Instant solving via app or WhatsApp",
      "Small group doubt discussions",
      "24/7 academic support",
    ],
  },
  {
    icon: BookMarked,
    title: "Study Material",
    points: [
      "NCERT-based modules",
      "Advanced JEE/NEET sheets",
      "Previous Year Questions (PYQs)",
      "Structured and progressive content",
    ],
  },
  {
    icon: FlaskConical,
    title: "Lab & Concept Learning",
    points: [
      "Practical Physics & Chemistry integration",
      "Experiments and simulations",
      "Concept-based teaching",
      "No rote learning approach",
    ],
  },
  {
    icon: MonitorPlay,
    title: "Hybrid Learning",
    points: [
      "Offline + Online access",
      "Recorded lectures",
      "Revision anytime system",
      "Digital study resources",
    ],
  },
  {
    icon: Handshake,
    title: "Parent Communication",
    points: [
      "Monthly detailed reports",
      "Parent-teacher meetings",
      "Transparent performance tracking",
      "Regular updates via app",
    ],
  },
  {
    icon: HeartPulse,
    title: "Stress & Time Management",
    points: [
      "Workshops on exam stress",
      "Focus and productivity techniques",
      "Student well-being support",
      "Mindfulness sessions",
    ],
  },
  {
    icon: Brain,
    title: "Career Guidance",
    points: [
      "JEE/NEET counselling support",
      "College selection guidance",
      "Career awareness sessions",
      "Alumni mentoring network",
    ],
  },
  {
    icon: Sparkles,
    title: "Scholarship Support",
    points: [
      "Merit-based fee waivers",
      "Financial assistance programs",
      "Performance-linked rewards",
      "Equal opportunity access",
    ],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-[#f7f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Why EduBridge
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Everything a Student Needs to Excel
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          A comprehensive ecosystem designed for academic excellence
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2.5"
          >
            View all features
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
