import Link from "next/link";
import { CalendarClock, Clock, FileQuestion, Trophy } from "lucide-react";
import { StatusBadge } from "@/components/admin/data-table";
import { buttonVariants } from "@/components/ui/button";
import { subjectLabels } from "@/lib/mock-data";
import { formatDateTime, formatScore } from "@/lib/utils";
import type { Test } from "@/types";

type TestCardProps = {
  test: Test;
  basePath?: string;
};

const statusMeta = {
  live: { label: "Live now", tone: "danger" as const },
  upcoming: { label: "Upcoming", tone: "info" as const },
  completed: { label: "Completed", tone: "success" as const },
};

export function TestCard({ test, basePath = "/student/tests" }: TestCardProps) {
  const meta = statusMeta[test.status];

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-background p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-primary">{test.exam}</p>
          <h3 className="mt-1 font-heading text-base font-semibold leading-snug">
            {test.title}
          </h3>
        </div>
        <StatusBadge status={meta.label} tone={meta.tone} />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {test.subjects.map((s) => subjectLabels[s]).join(" · ")}
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-3.5" />
          <dd>{test.durationMin} min</dd>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <FileQuestion className="size-3.5" />
          <dd>{test.questionCount} Qs</dd>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Trophy className="size-3.5" />
          <dd>{test.totalMarks} marks</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        {test.status === "completed" && test.score !== undefined ? (
          <p className="text-sm">
            <span className="font-heading text-lg font-bold">
              {formatScore(test.score, test.totalMarks)}
            </span>
            {test.rank ? (
              <span className="ml-2 text-muted-foreground">Rank #{test.rank}</span>
            ) : null}
          </p>
        ) : (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarClock className="size-3.5" />
            {formatDateTime(test.scheduledAt)}
          </p>
        )}

        {test.status === "completed" ? (
          <Link
            href={`${basePath}/${test.id}/result`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View result
          </Link>
        ) : test.status === "live" ? (
          <Link href={`${basePath}/${test.id}/attempt`} className={buttonVariants({ size: "sm" })}>
            Start test
          </Link>
        ) : (
          <span className={buttonVariants({ variant: "secondary", size: "sm" })} aria-disabled>
            Not started
          </span>
        )}
      </div>
    </div>
  );
}
