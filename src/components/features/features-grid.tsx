import {
  Activity,
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
  type LucideIcon,
} from "lucide-react";

type Feature = {
  id: string;
  icon: LucideIcon;
  title: string;
  points: string[];
};

const learningFeatures: Feature[] = [
  {
    id: "dual-preparation",
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
    id: "daily-practice",
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
    id: "study-material",
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
    id: "lab-concept",
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
    id: "hybrid-learning",
    icon: MonitorPlay,
    title: "Hybrid Learning",
    points: [
      "Offline + Online access",
      "Recorded lectures",
      "Revision anytime system",
      "Digital study resources",
    ],
  },
];

const progressFeatures: Feature[] = [
  {
    id: "mentorship",
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
    id: "analytics",
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
    id: "doubt-solving",
    icon: MessageCircle,
    title: "Doubt Solving System",
    points: [
      "Dedicated doubt sessions",
      "Instant solving via app or WhatsApp",
      "Small group doubt discussions",
      "24/7 academic support",
    ],
  },
];

const supportFeatures: Feature[] = [
  {
    id: "parent-communication",
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
    id: "stress-management",
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
    id: "career-guidance",
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
    id: "scholarship-support",
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

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article
      id={feature.id}
      className="group flex scroll-mt-28 flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition group-hover:scale-105">
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
  );
}

function FeatureGroup({
  id,
  eyebrow,
  title,
  description,
  features,
  tone = "muted",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: Feature[];
  tone?: "muted" | "white";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-20 ${
        tone === "muted" ? "bg-[#f7f9fc]" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesGrid() {
  return (
    <div id="features">
      <FeatureGroup
        id="learning"
        eyebrow="Learning Systems"
        title="How students learn every day"
        description="Curriculum, practice, labs, and hybrid access that keep boards and entrance prep moving together."
        features={learningFeatures}
        tone="muted"
      />
      <FeatureGroup
        id="progress"
        eyebrow="Progress & Mentorship"
        title="Guidance that adapts to each student"
        description="Mentors, analytics, and doubt support so improvement stays visible and actionable."
        features={progressFeatures}
        tone="white"
      />
      <FeatureGroup
        id="support"
        eyebrow="Support Ecosystem"
        title="Care beyond the classroom"
        description="Parents, well-being, careers, and scholarships — the network around every learner."
        features={supportFeatures}
        tone="muted"
      />
    </div>
  );
}
