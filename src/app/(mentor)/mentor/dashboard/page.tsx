import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CalendarCheck, Handshake, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { StudentCard } from "@/components/student";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import { students } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Dashboard" };

const upcoming = [
  { time: "Fri 26 Sep · 6:00 PM", mentee: "Ananya Gupta", focus: "Attendance & study habits", studentId: "ST-2044" },
  { time: "Sat 27 Sep · 11:00 AM", mentee: "Aarav Mehta", focus: "Mock #7 review", studentId: "ST-2041" },
  { time: "Mon 29 Sep · 5:00 PM", mentee: "Priya Sharma", focus: "NEET biology revision", studentId: "ST-2042" },
];

export default async function MentorDashboardPage() {
  const user = await getSession();
  const atRisk = students.filter((s) => s.avgScore < 60 || s.attendance < 85);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user?.name.split(" ")[0] ?? "Mentor"}`}
        description="Keep your mentees on track — progress, alerts and upcoming check-ins."
        actions={
          <Link href="/mentor/sessions" className={buttonVariants({ size: "sm" })}>
            View sessions
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Mentees" value={String(students.length)} icon={Handshake} />
        <StatCard label="Sessions this week" value={String(upcoming.length)} icon={CalendarCheck} />
        <StatCard label="Avg. mentee growth" value="+6 pts" hint="Last 6 weeks" trend="up" icon={TrendingUp} />
        <StatCard label="Needs attention" value={String(atRisk.length)} hint="Low score or attendance" trend="down" icon={AlertTriangle} />
      </div>

      {atRisk.length ? (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-amber-900">
            <AlertTriangle className="size-4" /> Alerts
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-amber-900">
            {atRisk.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3">
                <span>
                  <span className="font-medium">{s.name}</span> — avg. {s.avgScore}%, attendance {s.attendance}%, streak {s.streak} day(s)
                </span>
                <Link href={`/mentor/students/${s.id}`} className="shrink-0 text-xs font-semibold underline">
                  Open profile
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2">
          <h2 className="mb-4 font-heading text-lg font-semibold">My mentees</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {students.map((s) => (
              <StudentCard key={s.id} student={s} href={`/mentor/students/${s.id}`} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold">Upcoming check-ins</h2>
          <ul className="space-y-3">
            {upcoming.map((u) => (
              <li key={u.time} className="rounded-2xl border border-border bg-background p-4">
                <p className="text-xs font-medium text-primary">{u.time}</p>
                <Link href={`/mentor/students/${u.studentId}`} className="mt-1 block font-medium hover:underline">
                  {u.mentee}
                </Link>
                <p className="text-sm text-muted-foreground">{u.focus}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
