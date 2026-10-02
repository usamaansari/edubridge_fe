"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, FileText, PencilLine, PlayCircle, Search } from "lucide-react";
import { DataTable, StatusBadge } from "@/components/admin";
import { EmptyState } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { subjectLabels, subjects } from "@/lib/mock-data";
import type { ContentKind } from "@/types";

const kindIcon: Record<ContentKind, typeof PlayCircle> = {
  video: PlayCircle,
  pdf: FileText,
  practice: PencilLine,
};

const rows = subjects.flatMap((subject) =>
  subject.chapters.flatMap((chapter) =>
    chapter.topics.map((topic, i) => ({
      id: `${subject.id}-${topic.id}`,
      title: topic.title,
      kind: topic.kind,
      subject: subject.id,
      chapter: chapter.title,
      views: 120 + ((topic.title.length * 37) % 900),
      status: i % 4 === 3 ? "Draft" : "Published",
      updated: ["2 days ago", "Last week", "Yesterday", "3 hrs ago"][i % 4],
    })),
  ),
);

export default function TeacherContentPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<string>("all");
  const debounced = useDebounce(query);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (subject === "all" || r.subject === subject) &&
          `${r.title} ${r.chapter}`.toLowerCase().includes(debounced.toLowerCase()),
      ),
    [debounced, subject],
  );

  return (
    <div>
      <PageHeader
        title="Content library"
        description="Lectures, notes and practice sets you've published to your batches."
        actions={
          <Link href="/teacher/content/upload" className={buttonVariants({ size: "sm" })}>
            Upload content
          </Link>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or chapter"
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"
          />
        </label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
        >
          <option value="all">All subjects</option>
          {Object.entries(subjectLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No content matches" description="Try a different search or subject filter." />
      ) : (
        <DataTable
          data={filtered}
          getRowKey={(r) => r.id}
          columns={[
            {
              key: "title",
              header: "Title",
              render: (r) => {
                const Icon = kindIcon[r.kind];
                return (
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="font-medium">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.chapter}</p>
                    </div>
                  </div>
                );
              },
            },
            { key: "subject", header: "Subject", render: (r) => subjectLabels[r.subject] },
            { key: "kind", header: "Type", render: (r) => <span className="capitalize">{r.kind}</span> },
            {
              key: "views",
              header: "Views",
              render: (r) => (
                <span className="flex items-center gap-1 text-muted-foreground"><Eye className="size-3.5" /> {r.views}</span>
              ),
            },
            { key: "updated", header: "Updated", render: (r) => <span className="text-muted-foreground">{r.updated}</span> },
            {
              key: "status",
              header: "Status",
              render: (r) => <StatusBadge status={r.status} tone={r.status === "Published" ? "success" : "neutral"} />,
            },
          ]}
        />
      )}
    </div>
  );
}
