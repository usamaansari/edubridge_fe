import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, Target, TrendingUp, Users } from "lucide-react";
import { DataTable, StatusBadge } from "@/components/admin";
import { HeatmapGrid, ScoreChart, WeakTopics } from "@/components/analytics";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { batches, findBatch, students, topicMastery } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/teacher/batch/[batchId]/analytics">): Promise<Metadata> {
  const { batchId } = await params;
  return { title: `Analytics · ${findBatch(batchId)?.name ?? "Batch"}` };
}

const batchTrend = [
  { label: "Wk 33", value: 61 },
  { label: "Wk 34", value: 63 },
  { label: "Wk 35", value: 62 },
  { label: "Wk 36", value: 66 },
  { label: "Wk 37", value: 65 },
  { label: "Wk 38", value: 68 },
];

export default async function BatchAnalyticsPage({
  params,
}: PageProps<"/teacher/batch/[batchId]/analytics">) {
  const { batchId } = await params;
  const batch = findBatch(batchId);
  if (!batch) notFound();

  const roster = [...students].sort((a, b) => b.avgScore - a.avgScore);

  return (
    <div className="space-y-6">
      <PageHeader title={batch.name} description="Batch performance, topic mastery and students who need support." />

      <div className="flex flex-wrap gap-1.5">
        {batches.map((b) => (
          <Link
            key={b.id}
            href={`/teacher/batch/${b.id}/analytics`}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              b.id === batch.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {b.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Students" value={String(batch.students)} icon={Users} />
        <StatCard label="Avg. score" value={`${batch.avgScore}%`} hint="+3 pts in 6 weeks" trend="up" icon={Target} />
        <StatCard label="Attendance" value={`${batch.attendance}%`} icon={CalendarCheck} />
        <StatCard label="Test participation" value="94%" hint="Last 4 tests" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-border bg-background p-5 xl:col-span-2">
          <h2 className="font-heading text-base font-semibold">Weekly test average</h2>
          <div className="mt-4">
            <ScoreChart data={batchTrend} />
          </div>
        </section>
        <WeakTopics
          title="Batch-wide weak topics"
          topics={[
            { name: "Chemical Equilibrium", subject: "Chemistry", score: 38 },
            { name: "Rotation", subject: "Physics", score: 42 },
            { name: "Probability", subject: "Maths", score: 45 },
            { name: "Electrostatics", subject: "Physics", score: 55 },
          ]}
        />
      </div>

      <section className="rounded-2xl border border-border bg-background p-5">
        <h2 className="mb-4 font-heading text-base font-semibold">Topic mastery</h2>
        <HeatmapGrid rows={topicMastery} />
      </section>

      <section>
        <h2 className="mb-4 font-heading text-base font-semibold">Student roster</h2>
        <DataTable
          data={roster}
          getRowKey={(s) => s.id}
          columns={[
            {
              key: "name",
              header: "Student",
              render: (s) => (
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.id}</p>
                </div>
              ),
            },
            { key: "avg", header: "Avg. score", render: (s) => `${s.avgScore}%` },
            { key: "att", header: "Attendance", render: (s) => `${s.attendance}%` },
            { key: "weak", header: "Weak topics", render: (s) => <span className="text-muted-foreground">{s.weakTopics.slice(0, 2).join(", ")}</span> },
            {
              key: "flag",
              header: "Status",
              render: (s) =>
                s.avgScore < 60 || s.attendance < 85 ? (
                  <StatusBadge status="Needs support" tone="danger" />
                ) : s.avgScore >= 80 ? (
                  <StatusBadge status="Top performer" tone="success" />
                ) : (
                  <StatusBadge status="On track" tone="info" />
                ),
            },
          ]}
        />
      </section>
    </div>
  );
}
