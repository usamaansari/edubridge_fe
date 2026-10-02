import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type StreakBadgeProps = {
  days: number;
  className?: string;
};

export function StreakBadge({ days, className }: StreakBadgeProps) {
  const hot = days >= 7;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        hot ? "bg-orange-50 text-orange-600" : "bg-muted text-muted-foreground",
        className,
      )}
      title={`${days}-day study streak`}
    >
      <Flame className={cn("size-3.5", hot && "fill-orange-400")} />
      {days} day{days === 1 ? "" : "s"}
    </span>
  );
}
