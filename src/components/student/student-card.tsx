import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { StudentSummary } from "@/types";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./progress-ring";
import { StreakBadge } from "./streak-badge";

type StudentCardProps = {
  student: StudentSummary;
  href?: string;
  className?: string;
};

export function StudentCard({ student, href, className }: StudentCardProps) {
  const initials = student.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  const body = (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-background p-5 transition-colors",
        href && "hover:border-primary/40 hover:bg-primary/[0.02]",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="size-10">
          <AvatarFallback className="text-sm font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{student.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            Class {student.className} · {student.batch}
          </p>
        </div>
        <StreakBadge days={student.streak} />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <ProgressRing value={student.avgScore} size={60} strokeWidth={6} label="Average score" />
        <dl className="grid flex-1 grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Avg. score</dt>
            <dd className="font-semibold">{student.avgScore}%</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Attendance</dt>
            <dd className="font-semibold">{student.attendance}%</dd>
          </div>
        </dl>
      </div>

      {student.weakTopics.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {student.weakTopics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700"
            >
              {topic}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );

  return href ? <Link href={href}>{body}</Link> : body;
}
