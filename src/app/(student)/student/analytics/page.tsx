import type { Metadata } from "next";
import { Award, Clock, Target, TrendingUp } from "lucide-react";
import { HeatmapGrid, ScoreChart, WeakTopics } from "@/components/analytics";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { scoreTrend, topicMastery } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Analytics" };

const subjectStats = [
  { name: "Physics", accuracy: 64, attempted: 412, avgTime: "2m 10s" },
  { name: "Chemistry", accuracy: 73, attempted: 388, avgTime: "1m 25s" },
  { name: "Mathematics", accuracy: 69, attempted: 356, avgTime: "2m 40s" },
];

export default function StudentAnalyticsPage() {
  const weakest = topicMastery
    .flatMap((row) => row.topics.map((t) => ({ ...t, subject: row.subject })))
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map((t) => ({ name: t.name, subject: t.subject, score: t.score }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance analytics"
        description="Track your trend across mocks and see exactly which topics need attention."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Latest mock" value="71%" hint="+3 pts vs previous" trend="up" icon={TrendingUp} />
        <StatCard label="Predicted percentile" value="95.8" hint="JEE Main" icon={Award} />
        <StatCard label="Overall accuracy" value="68%" icon={Target} />
        <StatCard label="Study time (7d)" value="31 hrs" hint="Goal: 35 hrs" icon={Clock} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-border bg-background p-5 xl:col-span-2">
          <h2 className="font-heading text-base font-semibold">Mock test trend</h2>
          <p className="text-xs text-muted-foreground">Percentage score across your last six full mocks</p>
          <div className="mt-4">
            <ScoreChart data={scoreTrend} />
          </div>
        </section>
        <WeakTopics topics={weakest} title="Weakest topics" />
      </div>

      <section className="rounded-2xl border border-border bg-background p-5">
        <h2 className="font-heading text-base font-semibold">Topic mastery heatmap</h2>
        <p className="mb-4 text-xs text-muted-foreground">Based on accuracy in tests and practice over the last 60 days</p>
        <HeatmapGrid rows={topicMastery} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {subjectStats.map((s) => (
          <div key={s.name} className="rounded-2xl border border-border bg-background p-5">
            <p className="font-medium">{s.name}</p>
            <p className="mt-3 font-heading text-3xl font-bold">{s.accuracy}%</p>
            <p className="text-xs text-muted-foreground">accuracy</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Questions</dt>
                <dd className="font-medium">{s.attempted}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Avg. time / Q</dt>
                <dd className="font-medium">{s.avgTime}</dd>
              </div>
            </dl>
          </div>
        ))}
      </section>
    </div>
  );
}
