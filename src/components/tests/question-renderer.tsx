"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { subjectLabels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

type QuestionRendererProps = {
  question: Question;
  index: number;
  value: string[];
  onChange?: (value: string[]) => void;
  reviewMode?: boolean;
};

const typeLabel = {
  single: "Single correct",
  multiple: "One or more correct",
  numeric: "Numerical answer",
};

export function QuestionRenderer({
  question,
  index,
  value,
  onChange,
  reviewMode = false,
}: QuestionRendererProps) {
  const toggle = (optionId: string) => {
    if (!onChange || reviewMode) return;
    if (question.type === "single") {
      onChange([optionId]);
    } else {
      onChange(
        value.includes(optionId)
          ? value.filter((v) => v !== optionId)
          : [...value, optionId],
      );
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-foreground">Question {index + 1}</span>
        <span className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground">
          {subjectLabels[question.subject]}
        </span>
        <span className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground">
          {typeLabel[question.type]}
        </span>
        <span className="ml-auto text-muted-foreground">
          +{question.marks}
          {question.negative ? ` / −${question.negative}` : ""}
        </span>
      </div>

      <p className="mt-4 text-base leading-relaxed">{question.text}</p>

      {question.type === "numeric" ? (
        <input
          type="text"
          inputMode="decimal"
          value={value[0] ?? ""}
          readOnly={reviewMode}
          onChange={(e) => onChange?.(e.target.value ? [e.target.value] : [])}
          placeholder="Enter your answer"
          className="mt-5 h-11 w-full max-w-xs rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"
        />
      ) : (
        <div className="mt-5 grid gap-2.5">
          {question.options?.map((option) => {
            const selected = value.includes(option.id);
            const correct = question.correct.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggle(option.id)}
                aria-pressed={selected}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  !reviewMode && selected && "border-primary bg-primary/5",
                  !reviewMode && !selected && "border-border hover:bg-muted/50",
                  reviewMode && correct && "border-emerald-300 bg-emerald-50",
                  reviewMode && selected && !correct && "border-red-300 bg-red-50",
                  reviewMode && !selected && !correct && "border-border",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center border text-xs font-semibold uppercase",
                    question.type === "single" ? "rounded-full" : "rounded-md",
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                  )}
                >
                  {option.id}
                </span>
                <span className="flex-1">{option.text}</span>
                {reviewMode && correct ? <CheckCircle2 className="size-4 text-emerald-600" /> : null}
                {reviewMode && selected && !correct ? (
                  <XCircle className="size-4 text-red-600" />
                ) : null}
              </button>
            );
          })}
        </div>
      )}

      {reviewMode && question.explanation ? (
        <div className="mt-5 rounded-xl bg-muted/60 px-4 py-3 text-sm">
          <p className="font-medium">Solution</p>
          <p className="mt-1 text-muted-foreground">{question.explanation}</p>
          {question.type === "numeric" ? (
            <p className="mt-1 text-muted-foreground">
              Correct answer: <span className="font-medium text-foreground">{question.correct[0]}</span>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
