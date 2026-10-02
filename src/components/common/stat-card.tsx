import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
};

export function StatCard({ label, value, hint, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon ? (
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-heading text-2xl font-bold tracking-tight">{value}</p>
      {hint ? (
        <p
          className={cn(
            "mt-1.5 text-xs",
            trend === "up" && "text-emerald-600",
            trend === "down" && "text-destructive",
            (!trend || trend === "neutral") && "text-muted-foreground",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
