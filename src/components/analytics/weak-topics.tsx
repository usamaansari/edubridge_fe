import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";

type WeakTopicsProps = {
  topics: { name: string; subject: string; score: number; href?: string }[];
  title?: string;
};

export function WeakTopics({ topics, title = "Focus areas" }: WeakTopicsProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center gap-2">
        <TrendingDown className="size-4 text-destructive" />
        <h2 className="font-heading text-base font-semibold">{title}</h2>
      </div>
      <ul className="mt-4 space-y-3">
        {topics.map((topic) => (
          <li key={`${topic.subject}-${topic.name}`}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium">{topic.name}</p>
                <p className="text-xs text-muted-foreground">{topic.subject}</p>
              </div>
              {topic.href ? (
                <Link
                  href={topic.href}
                  className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Revise <ArrowRight className="size-3" />
                </Link>
              ) : (
                <span className="text-xs font-semibold text-destructive">{topic.score}%</span>
              )}
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-destructive/70"
                style={{ width: `${topic.score}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
