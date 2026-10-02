import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, ClipboardList, MessageCircleQuestion, Target } from "lucide-react";
import { WeakTopics } from "@/components/analytics";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { ProgressRing, StreakBadge } from "@/components/student";
import { TestCard } from "@/components/tests";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import { doubts, subjects, tests } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Dashboard" };

const todaysClasses = [
  { time: "4:00 PM", title: "Projectile Motion — Live class", teacher: "Dr. Ananya Rao", room: "Hall A" },
  { time: "5:30 PM", title: "Chemical Bonding — Doubt clinic", teacher: "Rahul Verma", room: "Online" },
  { time: "7:00 PM", title: "Definite Integrals — Practice", teacher: "Prof. Neha Kapoor", room: "Hall B" },
];

export default async function StudentDashboardPage() {
  const user = await getSession();
  const firstName = user?.name.split(" ")[0] ?? "there";
  const overall = Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length);
  const openDoubts = doubts.filter((d) => d.status !== "resolved").length;
  const upcoming = tests.filter((t) => t.status !== "completed").slice(0, 2);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Good afternoon, ${firstName}`}
        description="Here's where you stand today. Small, consistent steps add up."
        actions={
          <>
            <StreakBadge days={14} />
            <Link href="/student/tests" className={buttonVariants({ size: "sm" })}>
              Go to tests
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Syllabus covered" value={`${overall}%`} hint="+4% this week" trend="up" icon={BookOpenCheck} />
        <StatCard label="Avg. mock score" value="71%" hint="+3 pts vs last mock" trend="up" icon={Target} />
        <StatCard label="Tests this month" value="6" hint="2 upcoming" icon={ClipboardList} />
        <StatCard label="Open doubts" value={String(openDoubts)} hint="Avg. reply in 3.8 hrs" icon={MessageCircleQuestion} />
      </div>

      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold">Continue learning</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => {
            const next =
              subject.chapters.flatMap((c) => c.topics).find((t) => !t.completed) ??
              subject.chapters[0].topics[0];
            return (
              <Link
                key={subject.id}
                href={`/student/learn/${subject.id}/${next.id}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/40"
              >
                <ProgressRing value={subject.progress} size={60} strokeWidth={6} label={subject.name} />
                <div className="min-w-0">
                  <p className="font-medium">{subject.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">Up next: {next.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">Upcoming tests</h2>
            <Link href="/student/tests" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>

          <h2 className="mb-4 mt-8 font-heading text-lg font-semibold">Today&apos;s classes</h2>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-background">
            {todaysClasses.map((c) => (
              <li key={c.title} className="flex items-center gap-4 px-5 py-4">
                <span className="w-16 shrink-0 font-heading text-sm font-semibold text-primary">{c.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.teacher}</p>
                </div>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{c.room}</span>
              </li>
            ))}
          </ul>
        </section>

        <WeakTopics
          topics={[
            { name: "Rotational Dynamics", subject: "Physics", score: 42, href: "/student/learn/physics/torque-and-angular-momentum" },
            { name: "Chemical Equilibrium", subject: "Chemistry", score: 38 },
            { name: "Probability", subject: "Mathematics", score: 45 },
            { name: "Electrostatics", subject: "Physics", score: 55 },
          ]}
        />
      </div>
    </div>
  );
}
