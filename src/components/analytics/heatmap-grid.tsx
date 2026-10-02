import { cn } from "@/lib/utils";

type HeatmapGridProps = {
  rows: { subject: string; topics: { name: string; score: number }[] }[];
};

function cellClass(score: number) {
  if (score >= 80) return "bg-emerald-500 text-white";
  if (score >= 65) return "bg-emerald-200 text-emerald-900";
  if (score >= 50) return "bg-amber-200 text-amber-900";
  return "bg-red-300 text-red-950";
}

export function HeatmapGrid({ rows }: HeatmapGridProps) {
  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.subject}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {row.subject}
          </p>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
            {row.topics.map((topic) => (
              <div
                key={topic.name}
                title={`${topic.name}: ${topic.score}%`}
                className={cn("rounded-lg px-2.5 py-2", cellClass(topic.score))}
              >
                <p className="truncate text-xs font-medium">{topic.name}</p>
                <p className="text-sm font-bold">{topic.score}%</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
        {[
          ["bg-red-300", "< 50%"],
          ["bg-amber-200", "50–64%"],
          ["bg-emerald-200", "65–79%"],
          ["bg-emerald-500", "80%+"],
        ].map(([color, label]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={cn("size-3 rounded", color)} /> {label}
          </span>
        ))}
      </div>
    </div>
  );
}
