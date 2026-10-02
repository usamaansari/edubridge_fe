import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ClipboardCheck, MessageCircleQuestion, Users } from "lucide-react";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import { batches, doubts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

const todaysClasses = [
  { time: "4:00 PM", title: "Projectile Motion", batch: "JEE 2027 — Batch A", room: "Hall A" },
  { time: "6:00 PM", title: "Work & Energy — problem session", batch: "JEE 2027 — Batch B", room: "Hall A" },
  { time: "8:00 PM", title: "Rotational Dynamics — doubt clinic", batch: "JEE 2026 — Elite", room: "Online" },
];

const pendingReviews = [
  { title: "Kinematics Chapter Test", batch: "JEE 2027 — Batch A", due: "Publish by 27 Sep" },
  { title: "Laws of Motion DPP #4", batch: "Class 11 Foundation", due: "Review 18 submissions" },
];

export default async function TeacherDashboardPage() {
  const user = await getSession();
  const openDoubts = doubts.filter((d) => d.status === "open").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Hello, ${user?.name ?? "Faculty"}`}
        description="Your classes, content and student questions at a glance."
        actions={
          <>
            <Link href="/teacher/content/upload" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Upload content
            </Link>
            <Link href="/teacher/tests/builder" className={buttonVariants({ size: "sm" })}>
              Create test
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Students taught" value={String(batches.reduce((s, b) => s + b.students, 0))} hint={`${batches.length} batches`} icon={Users} />
        <StatCard label="Classes this week" value="14" hint="3 today" icon={BookOpen} />
        <StatCard label="Doubts awaiting you" value={String(openDoubts + 6)} hint="Oldest: 5 hrs" trend="down" icon={MessageCircleQuestion} />
        <StatCard label="Avg. batch score" value="70%" hint="+2 pts this month" trend="up" icon={ClipboardCheck} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2">
          <h2 className="mb-4 font-heading text-lg font-semibold">Today&apos;s classes</h2>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-background">
            {todaysClasses.map((c) => (
              <li key={c.title} className="flex items-center gap-4 px-5 py-4">
                <span className="w-16 shrink-0 font-heading text-sm font-semibold text-primary">{c.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.batch}</p>
                </div>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{c.room}</span>
              </li>
            ))}
          </ul>

          <h2 className="mb-4 mt-8 font-heading text-lg font-semibold">My batches</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {batches.map((b) => (
              <Link
                key={b.id}
                href={`/teacher/batch/${b.id}/analytics`}
                className="rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/40"
              >
                <p className="font-medium">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.students} students</p>
                <div className="mt-4 flex gap-6 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg. score</p>
                    <p className="font-semibold">{b.avgScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                    <p className="font-semibold">{b.attendance}%</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold">Doubt queue</h2>
              <Link href="/teacher/doubts" className="text-xs font-medium text-primary hover:underline">Open queue</Link>
            </div>
            <ul className="mt-4 space-y-3">
              {doubts.map((d) => (
                <li key={d.id} className="text-sm">
                  <p className="line-clamp-2 font-medium">{d.question}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{d.student} · {d.topic}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-border bg-background p-5">
            <h2 className="font-heading text-base font-semibold">Pending reviews</h2>
            <ul className="mt-4 space-y-3">
              {pendingReviews.map((r) => (
                <li key={r.title} className="rounded-xl bg-amber-50 px-4 py-3">
                  <p className="text-sm font-medium text-amber-900">{r.title}</p>
                  <p className="text-xs text-amber-700">{r.batch} · {r.due}</p>
                </li>
              ))}
            </ul>
            <Link href="/teacher/content" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full")}>
              Manage content
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
