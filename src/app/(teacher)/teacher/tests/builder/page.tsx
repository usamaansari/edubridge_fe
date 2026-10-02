"use client";

import { useState } from "react";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { FormField, FormSelect } from "@/components/admin";
import { EmptyState } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { batches, sampleQuestions, subjectLabels } from "@/lib/mock-data";
import { testSchema, type QuestionInput } from "@/lib/validations/academics";
import { cn } from "@/lib/utils";
import type { QuestionType, SubjectKey } from "@/types";

type DraftQuestion = QuestionInput & { id: string };

const blankOptions = ["", "", "", ""];
const optionIds = ["a", "b", "c", "d"];

const seed: DraftQuestion[] = sampleQuestions.slice(0, 2).map((q) => ({
  id: q.id,
  subject: q.subject,
  type: q.type,
  text: q.text,
  options: q.options?.map((o) => o.text),
  correct: q.correct,
  marks: q.marks,
  negative: q.negative,
}));

export default function TestBuilderPage() {
  const [questions, setQuestions] = useState<DraftQuestion[]>(seed);
  const [type, setType] = useState<QuestionType>("single");
  const [subject, setSubject] = useState<SubjectKey>("physics");
  const [text, setText] = useState("");
  const [options, setOptions] = useState(blankOptions);
  const [correct, setCorrect] = useState<string[]>([]);
  const [numeric, setNumeric] = useState("");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);

  const addQuestion = () => {
    const q: DraftQuestion = {
      id: crypto.randomUUID(),
      subject,
      type,
      text: text.trim(),
      options: type === "numeric" ? undefined : options.map((o) => o.trim()),
      correct: type === "numeric" ? (numeric ? [numeric] : []) : correct,
      marks: 4,
      negative: type === "numeric" ? 0 : type === "multiple" ? 2 : 1,
    };
    if (!q.text || q.correct.length === 0 || (q.options && q.options.some((o) => !o))) {
      setErrors(["Fill in the question, every option, and mark the correct answer before adding."]);
      return;
    }
    setErrors([]);
    setQuestions((prev) => [...prev, q]);
    setText("");
    setOptions(blankOptions);
    setCorrect([]);
    setNumeric("");
  };

  const toggleCorrect = (id: string) =>
    setCorrect((prev) =>
      type === "single" ? [id] : prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div>
      <PageHeader
        title="Test builder"
        description="Assemble a chapter test or full mock and schedule it for your batches."
      />

      {published ? (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="size-4" /> Test scheduled. Students will see it under Tests at the scheduled time.
        </div>
      ) : null}

      <form
        className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const parsed = testSchema.safeParse({
            title: fd.get("title"),
            exam: fd.get("exam"),
            durationMin: Number(fd.get("durationMin")),
            scheduledAt: fd.get("scheduledAt"),
            batchIds: selectedBatches,
            questions,
          });
          if (!parsed.success) {
            setErrors([...new Set(parsed.error.issues.map((i) => i.message))]);
            setPublished(false);
            return;
          }
          setErrors([]);
          setPublished(true);
        }}
      >
        <aside className="h-fit space-y-4 rounded-2xl border border-border bg-background p-5 xl:sticky xl:top-24">
          <h2 className="font-heading text-base font-semibold">Test details</h2>
          <FormField label="Title" name="title" placeholder="e.g. Kinematics Chapter Test" />
          <FormSelect
            label="Exam pattern"
            name="exam"
            options={["Chapter test", "JEE Main", "JEE Advanced", "NEET"].map((v) => ({ value: v, label: v }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Duration (min)" name="durationMin" type="number" min={10} max={240} defaultValue={45} />
            <FormField label="Total marks" name="total" value={totalMarks} readOnly />
          </div>
          <FormField label="Schedule" name="scheduledAt" type="datetime-local" />
          <div>
            <p className="mb-2 text-sm font-medium text-foreground/80">Assign to batches</p>
            <div className="flex flex-wrap gap-1.5">
              {batches.map((b) => {
                const on = selectedBatches.includes(b.id);
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBatches((prev) => (on ? prev.filter((x) => x !== b.id) : [...prev, b.id]))}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-xs transition-colors",
                      on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted/50",
                    )}
                  >
                    {b.name}
                  </button>
                );
              })}
            </div>
          </div>
          {errors.length ? (
            <ul className="list-inside list-disc text-xs text-destructive">
              {errors.map((e) => <li key={e}>{e}</li>)}
            </ul>
          ) : null}
          <Button type="submit" className="w-full">Schedule test</Button>
        </aside>

        <div className="min-w-0 space-y-6">
          <section className="space-y-4 rounded-2xl border border-border bg-background p-5">
            <h2 className="font-heading text-base font-semibold">Add a question</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground/80">Subject</span>
                <select value={subject} onChange={(e) => setSubject(e.target.value as SubjectKey)} className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm">
                  {Object.entries(subjectLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground/80">Type</span>
                <select
                  value={type}
                  onChange={(e) => { setType(e.target.value as QuestionType); setCorrect([]); }}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                >
                  <option value="single">Single correct</option>
                  <option value="multiple">Multiple correct</option>
                  <option value="numeric">Numerical</option>
                </select>
              </label>
            </div>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground/80">Question</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                placeholder="Type the question statement"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"
              />
            </label>

            {type === "numeric" ? (
              <FormField label="Correct answer" name="numeric" value={numeric} onChange={(e) => setNumeric(e.target.value)} placeholder="e.g. 9.8" />
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground/80">Options <span className="font-normal text-muted-foreground">(click the letter to mark correct)</span></p>
                {optionIds.map((id, i) => (
                  <div key={id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCorrect(id)}
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center border text-xs font-semibold uppercase",
                        type === "single" ? "rounded-full" : "rounded-lg",
                        correct.includes(id) ? "border-emerald-500 bg-emerald-500 text-white" : "border-border",
                      )}
                    >
                      {id}
                    </button>
                    <input
                      value={options[i]}
                      onChange={(e) => setOptions((prev) => prev.map((o, j) => (j === i ? e.target.value : o)))}
                      placeholder={`Option ${id.toUpperCase()}`}
                      className="h-9 flex-1 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                <Plus /> Add question
              </Button>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-base font-semibold">
              Questions <span className="text-muted-foreground">({questions.length} · {totalMarks} marks)</span>
            </h2>
            {questions.length === 0 ? (
              <EmptyState title="No questions yet" description="Questions you add will be listed here." />
            ) : (
              <ol className="space-y-3">
                {questions.map((q, i) => (
                  <li key={q.id} className="flex gap-4 rounded-2xl border border-border bg-background p-4">
                    <span className="font-heading text-sm font-semibold text-muted-foreground">Q{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">{q.text}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {subjectLabels[q.subject]} · {q.type} · +{q.marks}/−{q.negative} · Answer: {q.correct.join(", ").toUpperCase()}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Remove question"
                      onClick={() => setQuestions((prev) => prev.filter((x) => x.id !== q.id))}
                    >
                      <Trash2 />
                    </Button>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </form>
    </div>
  );
}
