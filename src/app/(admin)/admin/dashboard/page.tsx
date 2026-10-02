"use client";

import { useState } from "react";
import {
  Users,
  GraduationCap,
  Wallet,
  MessageCircleQuestion,
  TrendingUp,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/common";
import { DataTable, StatusBadge, FormDialog, FormField, FormSelect, FormTextarea } from "@/components/admin";

type Activity = {
  id: string;
  event: string;
  detail: string;
  time: string;
  status: string;
  tone: "success" | "warning" | "info" | "neutral" | "danger";
};

type Session = {
  id: string;
  title: string;
  batch: string;
  time: string;
  room: string;
};

const initialActivity: Activity[] = [
  {
    id: "1",
    event: "New student enrolled",
    detail: "Aarav Mehta joined JEE 2027 — Batch A",
    time: "12 min ago",
    status: "Enrolled",
    tone: "success",
  },
  {
    id: "2",
    event: "Fee payment received",
    detail: "₹24,000 from Priya Sharma",
    time: "1 hr ago",
    status: "Paid",
    tone: "success",
  },
  {
    id: "3",
    event: "Doubt escalated",
    detail: "Physics — Rotational Dynamics (Class 11)",
    time: "2 hrs ago",
    status: "Open",
    tone: "warning",
  },
  {
    id: "4",
    event: "Batch schedule updated",
    detail: "NEET 2026 — Evening slot moved to 5:30 PM",
    time: "Yesterday",
    status: "Updated",
    tone: "info",
  },
  {
    id: "5",
    event: "Scholarship awarded",
    detail: "Merit 50% — Kabir Singh (JEE Advanced)",
    time: "Yesterday",
    status: "Awarded",
    tone: "info",
  },
];

const initialSessions: Session[] = [
  {
    id: "1",
    title: "Organic Chemistry — Alcohols",
    batch: "NEET 2026 A",
    time: "Today, 4:00 PM",
    room: "Lab 2",
  },
  {
    id: "2",
    title: "Mechanics — Work & Energy",
    batch: "JEE 2027 B",
    time: "Today, 6:00 PM",
    room: "Hall A",
  },
  {
    id: "3",
    title: "Mock Test Review",
    batch: "JEE 2026 Elite",
    time: "Tomorrow, 10:00 AM",
    room: "Hall C",
  },
  {
    id: "4",
    title: "Mentor Check-in",
    batch: "Class 11 Mixed",
    time: "Tomorrow, 2:00 PM",
    room: "Online",
  },
];

type Modal = "export" | "student" | null;

export default function DashboardPage() {
  const [activity, setActivity] = useState(initialActivity);
  const [sessions] = useState(initialSessions);
  const [studentCount, setStudentCount] = useState(1248);
  const [modal, setModal] = useState<Modal>(null);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Snapshot of academy activity across batches, fees, and mentoring."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setModal("export")}>
              Export report
            </Button>
            <Button size="sm" onClick={() => setModal("student")}>
              Add student
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active students"
          value={studentCount.toLocaleString("en-IN")}
          hint="+36 this month"
          trend="up"
          icon={Users}
        />
        <StatCard
          label="Running batches"
          value="18"
          hint="3 starting next week"
          trend="neutral"
          icon={GraduationCap}
        />
        <StatCard
          label="Fees collected"
          value="₹42.6L"
          hint="+12% vs last month"
          trend="up"
          icon={Wallet}
        />
        <StatCard
          label="Open doubts"
          value="47"
          hint="8 overdue"
          trend="down"
          icon={MessageCircleQuestion}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-5">
        <section className="xl:col-span-3">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold">Recent activity</h2>
          </div>
          <DataTable
            data={activity}
            getRowKey={(row) => row.id}
            columns={[
              {
                key: "event",
                header: "Event",
                render: (row) => (
                  <div>
                    <p className="font-medium">{row.event}</p>
                    <p className="text-xs text-muted-foreground">{row.detail}</p>
                  </div>
                ),
              },
              {
                key: "time",
                header: "When",
                render: (row) => (
                  <span className="text-muted-foreground">{row.time}</span>
                ),
              },
              {
                key: "status",
                header: "Status",
                render: (row) => (
                  <StatusBadge status={row.status} tone={row.tone} />
                ),
              },
            ]}
          />
        </section>

        <section className="xl:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <CalendarClock className="size-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold">Upcoming sessions</h2>
          </div>
          <ul className="divide-y divide-border rounded-2xl border border-border">
            {sessions.map((session) => (
              <li key={session.id} className="px-4 py-3.5">
                <p className="font-medium">{session.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {session.batch} · {session.time} · {session.room}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FormDialog
        open={modal === "export"}
        onOpenChange={(open) => !open && setModal(null)}
        title="Export report"
        description="Choose what to include in the overview export."
        submitLabel="Export"
        onSubmit={(formData) => {
          const range = String(formData.get("range") ?? "30d");
          const format = String(formData.get("format") ?? "PDF");
          setActivity((prev) => [
            {
              id: `exp-${Date.now()}`,
              event: "Report exported",
              detail: `${format} overview · last ${range}`,
              time: "Just now",
              status: "Exported",
              tone: "info",
            },
            ...prev,
          ]);
        }}
      >
        <FormSelect
          label="Date range"
          name="range"
          defaultValue="30d"
          options={[
            { value: "7d", label: "Last 7 days" },
            { value: "30d", label: "Last 30 days" },
            { value: "90d", label: "Last 90 days" },
          ]}
        />
        <FormSelect
          label="Format"
          name="format"
          defaultValue="PDF"
          options={[
            { value: "PDF", label: "PDF" },
            { value: "CSV", label: "CSV" },
            { value: "XLSX", label: "Excel" },
          ]}
        />
        <FormTextarea
          label="Notes"
          name="notes"
          placeholder="Optional note for the export log"
        />
      </FormDialog>

      <FormDialog
        open={modal === "student"}
        onOpenChange={(open) => !open && setModal(null)}
        title="Add student"
        description="Enrol a student and show them in recent activity."
        submitLabel="Add student"
        onSubmit={(formData) => {
          const name = String(formData.get("name") ?? "").trim();
          const batch = String(formData.get("batch") ?? "");
          if (!name) return;
          setStudentCount((n) => n + 1);
          setActivity((prev) => [
            {
              id: `st-${Date.now()}`,
              event: "New student enrolled",
              detail: `${name} joined ${batch}`,
              time: "Just now",
              status: "Enrolled",
              tone: "success",
            },
            ...prev,
          ]);
        }}
      >
        <FormField label="Full name" name="name" required placeholder="e.g. Riya Kapoor" />
        <FormField label="Class" name="class" required placeholder="e.g. 11" />
        <FormSelect
          label="Batch"
          name="batch"
          options={[
            { value: "JEE 2027 — Batch A", label: "JEE 2027 — Batch A" },
            { value: "NEET 2026 — Evening", label: "NEET 2026 — Evening" },
            { value: "JEE 2026 — Elite", label: "JEE 2026 — Elite" },
            { value: "Class 11 Foundation", label: "Class 11 Foundation" },
          ]}
        />
        <FormField label="Phone" name="phone" type="tel" placeholder="+91 …" />
      </FormDialog>
    </div>
  );
}
