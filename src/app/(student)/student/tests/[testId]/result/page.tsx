import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, CheckCircle2, Clock, Target, XCircle } from "lucide-react";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { ProgressRing } from "@/components/student";
import { QuestionRenderer } from "@/components/tests";
import { buttonVariants } from "@/components/ui/button";
import { sampleQuestions, subjectLabels, tests } from "@/lib/mock-data";
import { formatScore } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/student/tests/[testId]/result">): Promise<Metadata> {
  const { testId } = await params;
  const test = tests.find((t) => t.id === testId);
  return { title: test ? `Result · ${test.title}` : "Test result" };
}

const mockResponses: Record<string, string[]> = {
  q1: ["b"],
  q2: ["100"],
  q3: ["b"],
  q4: ["a", "c"],
  q5: ["c"],
  q6: [],
};

export default async function TestResultPage({
  params,
}: PageProps<"/student/tests/[testId]/result">) {
  const { testId } = await params;
  const test = tests.find((t) => t.id === testId);
  if (!test) notFound();

  const score = test.score ?? Math.round(test.totalMarks * 0.68);
  const percent = Math.round((score / test.totalMarks) * 100);

  const subjectBreakdown = test.subjects.map((subject, i) => {
    const total = Math.round(test.totalMarks / test.subjects.length);
    const got = Math.round(total * [0.74, 0.62, 0.7][i % 3]);
    return { subject, total, got, accuracy: [78, 64, 72][i % 3] };
  });

  const review = sampleQuestions.filter((q) => test.subjects.includes(q.subject));
  const correct = review.filter(
    (q) => JSON.stringify([...(mockResponses[q.id] ?? [])].sort()) === JSON.stringify([...q.correct].sort()),
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={test.title}
        description={`${test.exam} · Result published`}
        actions={
          <Link href="/student/tests" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Back to tests
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-6 text-center">
          <ProgressRing value={percent} size={128} strokeWidth={10} label="Score" />
          <p className="mt-4 font-heading text-2xl font-bold">{formatScore(score, test.totalMarks)}</p>
          <p className="text-sm text-muted-foreground">Overall score</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard label="All-India rank" value={`#${test.rank ?? 124}`} hint="Top 4% of 3,240 students" trend="up" icon={Award} />
          <StatCard label="Percentile" value="96.2" icon={Target} />
          <StatCard label="Accuracy" value="72%" hint="Correct ÷ attempted" icon={CheckCircle2} />
          <StatCard label="Time used" value={`${Math.round(test.durationMin * 0.9)} min`} hint={`of ${test.durationMin} min`} icon={Clock} />
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-background p-5">
        <h2 className="font-heading text-base font-semibold">Subject-wise breakdown</h2>
        <div className="mt-4 space-y-4">
          {subjectBreakdown.map((row) => (
            <div key={row.subject}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{subjectLabels[row.subject]}</span>
                <span className="text-muted-foreground">
                  {formatScore(row.got, row.total)} · {row.accuracy}% accuracy
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(row.got / row.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Solutions</h2>
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle2 className="size-4 text-emerald-600" /> {correct} correct</span>
            <span className="flex items-center gap-1"><XCircle className="size-4 text-red-600" /> {review.length - correct} incorrect / skipped</span>
          </p>
        </div>
        <div className="space-y-4">
          {review.map((q, i) => (
            <div key={q.id} className="rounded-2xl border border-border bg-background p-6">
              <QuestionRenderer question={q} index={i} value={mockResponses[q.id] ?? []} reviewMode />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
