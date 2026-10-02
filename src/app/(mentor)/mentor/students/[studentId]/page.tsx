import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, Mail, Phone, Target, TrendingUp } from "lucide-react";
import { ScoreChart, WeakTopics } from "@/components/analytics";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { ProgressRing, StreakBadge } from "@/components/student";
import { buttonVariants } from "@/components/ui/button";
import { findStudent, scoreTrend, students } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/mentor/students/[studentId]">): Promise<Metadata> {
  const { studentId } = await params;
  return { title: findStudent(studentId)?.name ?? "Mentee" };
}

const timeline = [
  { date: "23 Sep", text: "Session — agreed on 2 timed DPPs per week for weak topics." },
  { date: "18 Sep", text: "Mock #6: 212/300 (+9). Physics accuracy up to 64%." },
  { date: "09 Sep", text: "Parent call — discussed sleep schedule and screen time." },
  { date: "04 Sep", text: "Session — exam anxiety; introduced 10-minute pre-mock routine." },
];

const subjectProgress = [
  { name: "Physics", value: 62 },
  { name: "Chemistry", value: 48 },
  { name: "Maths", value: 71 },
];

export default async function MenteeProfilePage({
  params,
}: PageProps<"/mentor/students/[studentId]">) {
  const { studentId } = await params;
  const student = findStudent(studentId);
  if (!student) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={student.name}
        description={`Class ${student.className} · ${student.batch} · ${student.target}`}
        actions={
          <>
            <StreakBadge days={student.streak} />
            <Link href="/mentor/sessions" className={buttonVariants({ size: "sm" })}>
              Schedule session
            </Link>
          </>
        }
      />

      <div className="flex flex-wrap gap-1.5">
        {students.map((s) => (
          <Link
            key={s.id}
            href={`/mentor/students/${s.id}`}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              s.id === student.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {s.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Average score" value={`${student.avgScore}%`} icon={Target} />
        <StatCard label="Attendance" value={`${student.attendance}%`} icon={CalendarCheck} />
        <StatCard label="6-week change" value="+13 pts" trend="up" hint="From 58% to 71%" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-border bg-background p-5 xl:col-span-2">
          <h2 className="font-heading text-base font-semibold">Mock score trend</h2>
          <div className="mt-4">
            <ScoreChart data={scoreTrend} />
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-background p-5">
          <h2 className="font-heading text-base font-semibold">Syllabus progress</h2>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {subjectProgress.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <ProgressRing value={s.value} size={64} strokeWidth={6} label={s.name} />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Parent contact</p>
            <p className="flex items-center gap-2"><Phone className="size-4" /> +91 98765 43210</p>
            <p className="flex items-center gap-2"><Mail className="size-4" /> parent.{student.id.toLowerCase()}@example.com</p>
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <WeakTopics
          title="Weak topics"
          topics={student.weakTopics.map((name, i) => ({ name, subject: ["Physics", "Chemistry", "Maths"][i % 3], score: 38 + i * 7 }))}
        />
        <section className="rounded-2xl border border-border bg-background p-5">
          <h2 className="font-heading text-base font-semibold">Mentoring timeline</h2>
          <ol className="mt-4 space-y-4 border-l border-border pl-4">
            {timeline.map((t) => (
              <li key={t.date} className="relative">
                <span className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-primary" />
                <p className="text-xs font-medium text-muted-foreground">{t.date}</p>
                <p className="mt-0.5 text-sm">{t.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
