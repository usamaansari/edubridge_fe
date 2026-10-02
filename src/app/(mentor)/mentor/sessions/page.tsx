"use client";

import { useState } from "react";
import { CalendarCheck, Clock, NotebookPen, Star } from "lucide-react";
import { DataTable, FormDialog, FormField, FormSelect, FormTextarea, StatusBadge } from "@/components/admin";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { students } from "@/lib/mock-data";

type Session = {
  id: string;
  mentee: string;
  focus: string;
  when: string;
  mode: string;
  status: "Scheduled" | "Completed" | "Requested" | "Missed";
  notes?: string;
};

const initialSessions: Session[] = [
  { id: "MS-301", mentee: "Aarav Mehta", focus: "Mock #7 review & October plan", when: "Sat 27 Sep · 11:00 AM", mode: "Video call", status: "Scheduled" },
  { id: "MS-302", mentee: "Ananya Gupta", focus: "Attendance & study habits", when: "Fri 26 Sep · 6:00 PM", mode: "In person", status: "Requested" },
  { id: "MS-303", mentee: "Priya Sharma", focus: "NEET biology revision cadence", when: "Mon 29 Sep · 5:00 PM", mode: "Video call", status: "Scheduled" },
  { id: "MS-298", mentee: "Rohan Das", focus: "Thermodynamics weak spots", when: "Tue 23 Sep · 5:00 PM", mode: "Phone", status: "Completed", notes: "Agreed on 2 timed DPPs/week. Re-check in 10 days." },
  { id: "MS-296", mentee: "Kabir Singh", focus: "JEE Advanced paper strategy", when: "Sat 20 Sep · 10:00 AM", mode: "Video call", status: "Completed", notes: "Attempt order: Maths → Chem → Physics. Try in Mock #7." },
  { id: "MS-294", mentee: "Ananya Gupta", focus: "Fortnightly check-in", when: "Thu 18 Sep · 6:00 PM", mode: "Video call", status: "Missed" },
];

const tone = {
  Scheduled: "info",
  Completed: "success",
  Requested: "warning",
  Missed: "danger",
} as const;

type Modal = { kind: "new" } | { kind: "notes"; session: Session } | null;

export default function MentorSessionsPage() {
  const [sessions, setSessions] = useState(initialSessions);
  const [modal, setModal] = useState<Modal>(null);

  const upcoming = sessions.filter((s) => s.status === "Scheduled" || s.status === "Requested");

  return (
    <div>
      <PageHeader
        title="Sessions"
        description="Your 1:1 mentoring calendar and session notes."
        actions={<Button size="sm" onClick={() => setModal({ kind: "new" })}>Schedule session</Button>}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Upcoming" value={String(upcoming.length)} icon={CalendarCheck} />
        <StatCard label="Completed (30d)" value="18" icon={NotebookPen} />
        <StatCard label="Avg. duration" value="38 min" icon={Clock} />
        <StatCard label="Mentee rating" value="4.9" hint="From 42 reviews" icon={Star} />
      </div>

      <DataTable
        data={sessions}
        getRowKey={(s) => s.id}
        columns={[
          {
            key: "mentee",
            header: "Mentee",
            render: (s) => (
              <div>
                <p className="font-medium">{s.mentee}</p>
                <p className="text-xs text-muted-foreground">{s.focus}</p>
              </div>
            ),
          },
          { key: "when", header: "When", render: (s) => <span className="text-muted-foreground">{s.when}</span> },
          { key: "mode", header: "Mode", render: (s) => s.mode },
          { key: "status", header: "Status", render: (s) => <StatusBadge status={s.status} tone={tone[s.status]} /> },
          {
            key: "action",
            header: "",
            className: "text-right",
            render: (s) =>
              s.status === "Requested" ? (
                <Button
                  size="xs"
                  onClick={() => setSessions((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: "Scheduled" } : x)))}
                >
                  Confirm
                </Button>
              ) : (
                <Button variant="ghost" size="xs" onClick={() => setModal({ kind: "notes", session: s })}>
                  {s.notes ? "View notes" : "Add notes"}
                </Button>
              ),
          },
        ]}
      />

      <FormDialog
        open={modal?.kind === "new"}
        onOpenChange={(o) => !o && setModal(null)}
        title="Schedule a session"
        description="Invite a mentee to a 1:1 check-in."
        submitLabel="Schedule"
        onSubmit={(fd) =>
          setSessions((prev) => [
            {
              id: `MS-${310 + prev.length}`,
              mentee: String(fd.get("mentee")),
              focus: String(fd.get("focus") || "General check-in"),
              when: String(fd.get("when") || "To be confirmed"),
              mode: String(fd.get("mode")),
              status: "Scheduled",
            },
            ...prev,
          ])
        }
      >
        <FormSelect label="Mentee" name="mentee" options={students.map((s) => ({ value: s.name, label: s.name }))} />
        <FormField label="Focus" name="focus" placeholder="e.g. Mock test review" />
        <FormField label="Date & time" name="when" placeholder="e.g. Wed 1 Oct · 5:00 PM" required />
        <FormSelect label="Mode" name="mode" options={["Video call", "In person", "Phone"].map((v) => ({ value: v, label: v }))} />
      </FormDialog>

      <FormDialog
        open={modal?.kind === "notes"}
        onOpenChange={(o) => !o && setModal(null)}
        title={modal?.kind === "notes" ? `Notes · ${modal.session.mentee}` : "Notes"}
        description={modal?.kind === "notes" ? `${modal.session.focus} — ${modal.session.when}` : undefined}
        submitLabel="Save notes"
        onSubmit={(fd) => {
          if (modal?.kind !== "notes") return;
          const notes = String(fd.get("notes") ?? "");
          setSessions((prev) => prev.map((x) => (x.id === modal.session.id ? { ...x, notes } : x)));
        }}
      >
        <FormTextarea
          key={modal?.kind === "notes" ? modal.session.id : "none"}
          label="Session notes"
          name="notes"
          defaultValue={modal?.kind === "notes" ? modal.session.notes : ""}
          placeholder="Key takeaways, action items, follow-up date…"
        />
      </FormDialog>
    </div>
  );
}
