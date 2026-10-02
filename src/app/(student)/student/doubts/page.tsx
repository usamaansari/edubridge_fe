"use client";

import { useState } from "react";
import { EmptyState } from "@/components/common";
import { DoubtCard, LatexEditor } from "@/components/doubts";
import { FormSelect, FormField } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { doubts as initialDoubts, subjectLabels } from "@/lib/mock-data";
import { doubtSchema } from "@/lib/validations/academics";
import { cn } from "@/lib/utils";
import type { Doubt, DoubtStatus } from "@/types";

const filters: { id: DoubtStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Awaiting reply" },
  { id: "answered", label: "Answered" },
  { id: "resolved", label: "Resolved" },
];

export default function StudentDoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>(initialDoubts);
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);

  const visible = filter === "all" ? doubts : doubts.filter((d) => d.status === filter);

  return (
    <div>
      <PageHeader
        title="Doubts"
        description="Ask anything — faculty reply with step-by-step explanations."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="order-2 min-w-0 xl:order-1">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <EmptyState title="Nothing here yet" description="Doubts you post will show up in this list." />
          ) : (
            <div className="space-y-3">
              {visible.map((doubt) => (
                <DoubtCard
                  key={doubt.id}
                  doubt={doubt}
                  onReply={(body) =>
                    setDoubts((prev) =>
                      prev.map((d) =>
                        d.id === doubt.id
                          ? {
                              ...d,
                              replies: [
                                ...d.replies,
                                { id: crypto.randomUUID(), author: "You", role: "student", body, createdAt: new Date().toISOString() },
                              ],
                            }
                          : d,
                      ),
                    )
                  }
                  onResolve={() =>
                    setDoubts((prev) => prev.map((d) => (d.id === doubt.id ? { ...d, status: "resolved" } : d)))
                  }
                />
              ))}
            </div>
          )}
        </div>

        <form
          className="order-1 h-fit space-y-4 rounded-2xl border border-border bg-background p-5 xl:sticky xl:top-24 xl:order-2"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const parsed = doubtSchema.safeParse({
              subject: form.get("subject"),
              topic: form.get("topic"),
              question,
            });
            if (!parsed.success) {
              setError(parsed.error.issues[0].message);
              return;
            }
            setError(null);
            setDoubts((prev) => [
              {
                id: `DB-${450 + prev.length}`,
                ...parsed.data,
                student: "You",
                createdAt: new Date().toISOString(),
                status: "open",
                replies: [],
              },
              ...prev,
            ]);
            setQuestion("");
            e.currentTarget.reset();
          }}
        >
          <div>
            <h2 className="font-heading text-base font-semibold">Ask a new doubt</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Be specific — mention the question number or concept.</p>
          </div>
          <FormSelect
            label="Subject"
            name="subject"
            options={Object.entries(subjectLabels).map(([value, label]) => ({ value, label }))}
          />
          <FormField label="Topic" name="topic" placeholder="e.g. Projectile Motion — Range" />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-foreground/80">Your question</span>
            <LatexEditor name="question" value={question} onChange={setQuestion} />
          </label>
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full">
            Post doubt
          </Button>
        </form>
      </div>
    </div>
  );
}
