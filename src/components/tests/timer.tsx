"use client";

import { Timer as TimerIcon } from "lucide-react";
import { useCountdown } from "@/hooks/use-countdown";
import { cn, formatDuration } from "@/lib/utils";

type TimerProps = {
  durationSec: number;
  onExpire?: () => void;
  className?: string;
};

export function Timer({ durationSec, onExpire, className }: TimerProps) {
  const remaining = useCountdown(durationSec, onExpire);
  const warning = remaining <= 300;

  return (
    <div
      role="timer"
      aria-live="off"
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-sm font-semibold tabular-nums",
        warning ? "bg-red-50 text-red-600" : "bg-muted text-foreground",
        className,
      )}
    >
      <TimerIcon className="size-4" />
      {formatDuration(remaining)}
    </div>
  );
}
