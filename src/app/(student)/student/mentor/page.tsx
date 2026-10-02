"use client";

import { useState } from "react";
import { CalendarClock, CheckCircle2, Circle, Mail, Phone, Video } from "lucide-react";
import { FormDialog, FormField, FormSelect, FormTextarea } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Session = { id: string; date: string; mode: string; agenda: string };

const initialGoals = [
  { id: "g1", text: "Finish Rotational Dynamics DPPs (3 sets)", done: true },
  { id: "g2", text: "Score 220+ in JEE Main Mock #7", done: false },
  { id: "g3", text: "Revise Chemical Equilibrium formula sheet", done: false },
  { id: "g4", text: "Sleep by 11 PM on weekdays", done: true },
];

const pastNotes = [
  {
    date: "18 Sep 2026",
    note: "Mock 6 improved by 3 points. Physics accuracy is dragging the total — slow down on rotation questions and draw FBDs first.",
  },
  {
    date: "04 Sep 2026",
    note: "Discussed exam anxiety. Agreed on a 10-minute review routine before each mock and one full rest day per week.",
  },
];

export default function StudentMentorPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [sessions, setSessions] = useState<Session[]>([
    { id: "s1", date: "Sat, 27 Sep · 11:00 AM", mode: "Video call", agenda: "Review Mock #7 and plan October revision" },
  ]);
  const [open, setOpen] = useState(false);
  const done = goals.filter((g) => g.done).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My mentor"
        description="Your 1:1 guide for study planning, exam strategy and wellbeing."
        actions={<Button size="sm" onClick={() => setOpen(true)}>Book a session</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="text-base font-semibold">SK</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-heading text-lg font-semibold">Sneha Kulkarni</p>
              <p className="text-sm text-muted-foreground">IIT Bombay alumna · 6 yrs mentoring</p>
            </div>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <p className="flex items-center gap-2 text-muted-foreground"><Mail className="size-4" /> sneha.k@edubridge.in</p>
            <p className="flex items-center gap-2 text-muted-foreground"><Phone className="size-4" /> Available Mon–Sat, 4–8 PM</p>
          </div>

          <h3 className="mt-6 text-sm font-semibold">Upcoming sessions</h3>
          <ul className="mt-3 space-y-2">
            {sessions.map((s) => (
              <li key={s.id} className="rounded-xl bg-primary/5 px-4 py-3">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <CalendarClock className="size-4 text-primary" /> {s.date}
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Video className="size-3.5" /> {s.mode} · {s.agenda}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold">This fortnight&apos;s goals</h2>
            <span className="text-xs text-muted-foreground">{done}/{goals.length} done</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(done / goals.length) * 100}%` }} />
          </div>
          <ul className="mt-4 space-y-1">
            {goals.map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => setGoals((prev) => prev.map((x) => (x.id === g.id ? { ...x, done: !x.done } : x)))}
                  className="flex w-full items-start gap-2.5 rounded-lg px-2 py-2 text-left text-sm hover:bg-muted/60"
                >
                  {g.done ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className={g.done ? "text-muted-foreground line-through" : undefined}>{g.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-background p-5">
          <h2 className="font-heading text-base font-semibold">Session notes</h2>
          <ol className="mt-4 space-y-4 border-l border-border pl-4">
            {pastNotes.map((n) => (
              <li key={n.date} className="relative">
                <span className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-primary" />
                <p className="text-xs font-medium text-muted-foreground">{n.date}</p>
                <p className="mt-1 text-sm leading-relaxed">{n.note}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title="Book a mentor session"
        description="Pick a slot and tell your mentor what you'd like to discuss."
        submitLabel="Request session"
        onSubmit={(fd) => {
          setSessions((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              date: String(fd.get("date") || "To be confirmed"),
              mode: String(fd.get("mode")),
              agenda: String(fd.get("agenda") || "General check-in"),
            },
          ]);
        }}
      >
        <FormField label="Preferred slot" name="date" placeholder="e.g. Tue, 30 Sep · 5:00 PM" required />
        <FormSelect
          label="Mode"
          name="mode"
          options={[
            { value: "Video call", label: "Video call" },
            { value: "In person", label: "In person" },
            { value: "Phone", label: "Phone" },
          ]}
        />
        <FormTextarea label="Agenda" name="agenda" placeholder="What would you like to talk about?" />
      </FormDialog>
    </div>
  );
}
