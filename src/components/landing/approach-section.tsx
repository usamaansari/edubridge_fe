import {
  Check,
  GitMerge,
  Layers2,
  RefreshCw,
  School,
  X,
} from "lucide-react";

const pillars = [
  {
    icon: Layers2,
    title: "Flexible Modes",
    description:
      "Choose in-school integrated coaching or attend at our centres",
  },
  {
    icon: RefreshCw,
    title: "No Duplication",
    description: "Unified syllabus — no studying same topics twice",
  },
  {
    icon: GitMerge,
    title: "Seamless Learning",
    description: "Smooth transition between board and competitive prep",
  },
  {
    icon: School,
    title: "School + Independent",
    description: "Partner with schools or join our standalone batches",
  },
];

const comparisons = [
  {
    traditional: "Separate coaching classes",
    edubridge: "Integrated or flexible batches",
  },
  {
    traditional: "2-3 hours of extra travel daily",
    edubridge: "In-school or nearby centres",
  },
  {
    traditional: "Duplicate topics & content",
    edubridge: "Unified curriculum",
  },
  {
    traditional: "High stress & burnout",
    edubridge: "Balanced learning",
  },
  {
    traditional: "₹2-3 Lakhs/year extra",
    edubridge: "Affordable pricing",
  },
];

export function ApproachSection() {
  return (
    <section className="bg-[#f7f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Our Unique Approach
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          School + Coaching = One Smart System
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          Traditional coaching makes students choose between school and
          competition prep. We offer two paths — integrated coaching within your
          school, or independent coaching at our centres. Either way, you get the
          best of both worlds.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
          <div className="border-b border-border bg-[#f4f8ff] px-6 py-4">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Traditional vs EduBridge
            </h3>
          </div>
          <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Traditional
              </p>
              <ul className="space-y-3">
                {comparisons.map((row) => (
                  <li key={row.traditional} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <X className="size-3.5" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {row.traditional}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary/[0.03] p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
                EduBridge
              </p>
              <ul className="space-y-3">
                {comparisons.map((row) => (
                  <li key={row.edubridge} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {row.edubridge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
