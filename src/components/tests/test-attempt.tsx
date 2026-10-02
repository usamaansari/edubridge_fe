"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { FormDialog } from "@/components/admin/form-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTestAttemptStore } from "@/store/test-attempt-store";
import type { Question, Test } from "@/types";
import { QuestionRenderer } from "./question-renderer";
import { Timer } from "./timer";

type TestAttemptProps = {
  test: Test;
  questions: Question[];
};

export function TestAttempt({ test, questions }: TestAttemptProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {
    currentIndex,
    answers,
    flagged,
    visited,
    start,
    goTo,
    answer,
    clear,
    toggleFlag,
    markVisited,
    reset,
  } = useTestAttemptStore();

  const question = questions[currentIndex];

  useEffect(() => {
    start(test.id);
  }, [start, test.id]);

  useEffect(() => {
    if (question) markVisited(question.id);
  }, [question, markVisited]);

  const answeredCount = questions.filter((q) => answers[q.id]?.length).length;

  const submit = () => {
    reset();
    router.push(`/student/tests/${test.id}/result`);
  };

  if (!question) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background px-5 py-3">
          <div className="min-w-0">
            <p className="truncate font-heading font-semibold">{test.title}</p>
            <p className="text-xs text-muted-foreground">
              {answeredCount}/{questions.length} answered · {test.totalMarks} marks
            </p>
          </div>
          <Timer durationSec={test.durationMin * 60} onExpire={submit} />
        </div>

        <div className="rounded-2xl border border-border bg-background p-6">
          <QuestionRenderer
            key={question.id}
            question={question}
            index={currentIndex}
            value={answers[question.id] ?? []}
            onChange={(value) => (value.length ? answer(question.id, value) : clear(question.id))}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toggleFlag(question.id)}>
              <Flag className={cn(flagged[question.id] && "fill-amber-400 text-amber-500")} />
              {flagged[question.id] ? "Flagged" : "Flag for review"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => clear(question.id)}>
              Clear response
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => goTo(currentIndex - 1)}
            >
              <ChevronLeft /> Previous
            </Button>
            {currentIndex < questions.length - 1 ? (
              <Button size="sm" onClick={() => goTo(currentIndex + 1)}>
                Save & next <ChevronRight />
              </Button>
            ) : (
              <Button size="sm" onClick={() => setConfirmOpen(true)}>
                Submit test
              </Button>
            )}
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-border bg-background p-5">
          <p className="text-sm font-semibold">Question palette</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {questions.map((q, i) => (
              <button
                key={q.id}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-lg border text-xs font-semibold transition-colors",
                  i === currentIndex && "ring-2 ring-primary ring-offset-1",
                  answers[q.id]?.length
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : visited[q.id]
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-border text-muted-foreground",
                )}
              >
                {i + 1}
                {flagged[q.id] ? (
                  <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-amber-400" />
                ) : null}
              </button>
            ))}
          </div>
          <ul className="mt-5 space-y-1.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><span className="size-3 rounded bg-emerald-500" /> Answered</li>
            <li className="flex items-center gap-2"><span className="size-3 rounded border border-red-300 bg-red-50" /> Visited, not answered</li>
            <li className="flex items-center gap-2"><span className="size-3 rounded border border-border" /> Not visited</li>
            <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-amber-400" /> Flagged for review</li>
          </ul>
        </div>
        <Button className="w-full" onClick={() => setConfirmOpen(true)}>
          Submit test
        </Button>
      </aside>

      <FormDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Submit test?"
        description={`You have answered ${answeredCount} of ${questions.length} questions. You can't change answers after submitting.`}
        submitLabel="Submit"
        onSubmit={submit}
      >
        <p className="text-sm text-muted-foreground">
          {questions.length - answeredCount > 0
            ? `${questions.length - answeredCount} question(s) are unanswered.`
            : "All questions answered — good luck!"}
        </p>
      </FormDialog>
    </div>
  );
}
