import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck, ClipboardList, MessageSquareQuote, Target } from "lucide-react";
import { DataTable, StatusBadge } from "@/components/admin";
import { HeatmapGrid, ScoreChart, WeakTopics } from "@/components/analytics";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { StreakBadge } from "@/components/student";
import { findStudent, scoreTrend, tests, topicMastery } from "@/lib/mock-data";
import { formatDate, formatScore } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/parent/performance/[studentId]">): Promise<Metadata> {
  const { studentId } = await params;
  return { title: `Performance · ${findStudent(studentId)?.name ?? "Student"}` };
}

const attendance = [
  { month: "June", value: 95 },
  { month: "July", value: 91 },
  { month: "August", value: 89 },
  { month: "September", value: 92 },
];

export default async function ParentPerformancePage({
  params,
}: PageProps<"/parent/performance/[studentId]">) {
  const { studentId } = await params;
  const student = findStudent(studentId);
  if (!student) notFound();

  const completed = tests.filter((t) => t.status === "completed");

  return (
    <div className="space-y-6">
      <PageHeader
        title={student.name}
        description={`Class ${student.className} · ${student.batch} · ${student.target} aspirant`}
        actions={<StreakBadge days={student.streak} />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Average score" value={`${student.avgScore}%`} hint="Across all tests" icon={Target} />
        <StatCard label="Attendance" value={`${student.attendance}%`} hint="This term" icon={CalendarCheck} />
        <StatCard label="Tests taken" value="16" hint="2 upcoming this week" icon={ClipboardList} />
        <StatCard label="Batch rank" value="#7 / 42" hint="Up 3 places" trend="up" icon={Target} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-border bg-background p-5 xl:col-span-2">
          <h2 className="font-heading text-base font-semibold">Mock test progress</h2>
          <div className="mt-4">
            <ScoreChart data={scoreTrend} />
          </div>
        </section>
        <WeakTopics
          title="Needs attention"
          topics={student.weakTopics.map((name, i) => ({ name, subject: student.target === "JEE" ? ["Physics", "Chemistry", "Maths"][i % 3] : ["Biology", "Chemistry", "Physics"][i % 3], score: 40 + i * 6 }))}
        />
      </div>

      <section className="rounded-2xl border border-border bg-background p-5">
        <h2 className="mb-4 font-heading text-base font-semibold">Subject mastery</h2>
        <HeatmapGrid rows={topicMastery} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-heading text-base font-semibold">Recent test results</h2>
          <DataTable
            data={completed}
            getRowKey={(t) => t.id}
            columns={[
              { key: "title", header: "Test", render: (t) => <span className="font-medium">{t.title}</span> },
              { key: "date", header: "Date", render: (t) => formatDate(t.scheduledAt) },
              { key: "score", header: "Score", render: (t) => formatScore(t.score ?? 0, t.totalMarks) },
              { key: "rank", header: "Rank", render: (t) => <StatusBadge status={`#${t.rank}`} tone="info" /> },
            ]}
          />
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-background p-5">
            <h2 className="font-heading text-base font-semibold">Monthly attendance</h2>
            <ul className="mt-4 space-y-3">
              {attendance.map((a) => (
                <li key={a.month}>
                  <div className="flex justify-between text-sm">
                    <span>{a.month}</span>
                    <span className="font-medium">{a.value}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${a.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-primary/[0.03] p-5">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <MessageSquareQuote className="size-4 text-primary" /> Mentor&apos;s note
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {student.name.split(" ")[0]} is consistent and asks good questions. The next step is
              accuracy under time pressure — we&apos;re adding two timed practice sets per week on
              weaker topics. — Sneha Kulkarni
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
