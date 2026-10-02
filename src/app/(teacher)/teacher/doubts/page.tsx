"use client";

import { useState } from "react";
import { CheckCircle2, Clock, MessageCircleQuestion } from "lucide-react";
import { StatCard, EmptyState } from "@/components/common";
import { DoubtCard } from "@/components/doubts";
import { PageHeader } from "@/components/layout";
import { doubts as seedDoubts, subjectLabels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Doubt, SubjectKey } from "@/types";

const extra: Doubt[] = [
  {
    id: "DB-446",
    subject: "physics",
    topic: "Projectile Motion — Range",
    question: "If range is the same for θ and 90° − θ, why is time of flight different?",
    student: "Rohan Das",
    createdAt: "2026-09-25T09:40:00+05:30",
    status: "open",
    replies: [],
  },
  {
    id: "DB-447",
    subject: "physics",
    topic: "Work & Energy — Springs",
    question: "Why is the work done by a spring negative while compressing it by hand?",
    student: "Kabir Singh",
    createdAt: "2026-09-24T21:10:00+05:30",
    status: "open",
    replies: [],
  },
];

export default function TeacherDoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([...extra, ...seedDoubts]);
  const [subject, setSubject] = useState<SubjectKey | "all">("all");
  const [showResolved, setShowResolved] = useState(false);

  const visible = doubts.filter(
    (d) => (subject === "all" || d.subject === subject) && (showResolved || d.status !== "resolved"),
  );
  const open = doubts.filter((d) => d.status === "open").length;

  const update = (id: string, fn: (d: Doubt) => Doubt) =>
    setDoubts((prev) => prev.map((d) => (d.id === id ? fn(d) : d)));

  return (
    <div>
      <PageHeader title="Doubt queue" description="Answer student questions from your batches. Oldest first." />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Awaiting reply" value={String(open)} icon={MessageCircleQuestion} />
        <StatCard label="Your avg. response" value="3.4 hrs" hint="Target: under 6 hrs" trend="up" icon={Clock} />
        <StatCard label="Resolved (7d)" value="42" icon={CheckCircle2} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {(["all", "physics", "chemistry", "maths", "biology"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSubject(s)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              subject === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {s === "all" ? "All subjects" : subjectLabels[s]}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={showResolved} onChange={(e) => setShowResolved(e.target.checked)} />
          Show resolved
        </label>
      </div>

      {visible.length === 0 ? (
        <EmptyState title="Queue is clear" description="No doubts match these filters. Nice work!" icon={CheckCircle2} />
      ) : (
        <div className="space-y-3">
          {visible
            .slice()
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((doubt) => (
              <DoubtCard
                key={doubt.id}
                doubt={doubt}
                showStudent
                defaultOpen={doubt.status === "open"}
                onReply={(body) =>
                  update(doubt.id, (d) => ({
                    ...d,
                    status: "answered",
                    replies: [
                      ...d.replies,
                      { id: crypto.randomUUID(), author: "You", role: "teacher", body, createdAt: new Date().toISOString() },
                    ],
                  }))
                }
                onResolve={() => update(doubt.id, (d) => ({ ...d, status: "resolved" }))}
              />
            ))}
        </div>
      )}
    </div>
  );
}
