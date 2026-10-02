"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/common";
import { BatchForm, DataTable, FormDialog, StatusBadge, readBatchForm } from "@/components/admin";
import { GraduationCap, Users, Clock } from "lucide-react";

type Batch = {
  id: string;
  name: string;
  program: string;
  students: number;
  mentor: string;
  schedule: string;
  status: string;
};

const initialBatches: Batch[] = [
  {
    id: "B-101",
    name: "JEE 2027 — Batch A",
    program: "JEE Main + Advanced",
    students: 42,
    mentor: "Dr. Ananya Rao",
    schedule: "Mon–Sat · 6:00–8:00 PM",
    status: "Active",
  },
  {
    id: "B-102",
    name: "NEET 2026 — Evening",
    program: "NEET UG",
    students: 38,
    mentor: "Dr. Vikram Shah",
    schedule: "Mon–Fri · 5:30–7:30 PM",
    status: "Active",
  },
  {
    id: "B-103",
    name: "JEE 2026 — Elite",
    program: "JEE Advanced",
    students: 24,
    mentor: "Prof. Neha Kapoor",
    schedule: "Daily · 7:00–10:00 AM",
    status: "Active",
  },
  {
    id: "B-104",
    name: "Class 11 Foundation",
    program: "Foundation",
    students: 56,
    mentor: "Rahul Verma",
    schedule: "Tue–Thu · 4:00–6:00 PM",
    status: "Active",
  },
  {
    id: "B-105",
    name: "NEET 2027 — Morning",
    program: "NEET UG",
    students: 0,
    mentor: "Unassigned",
    schedule: "Starts 1 Oct · 7:00–9:00 AM",
    status: "Upcoming",
  },
  {
    id: "B-098",
    name: "JEE 2025 — Crash",
    program: "Crash Course",
    students: 31,
    mentor: "Sneha Iyer",
    schedule: "Completed",
    status: "Archived",
  },
];

export default function BatchesPage() {
  const [batches, setBatches] = useState(initialBatches);
  const [open, setOpen] = useState(false);
  const activeCount = batches.filter((b) => b.status === "Active").length;
  const enrolled = batches.reduce((sum, b) => sum + b.students, 0);

  return (
    <div>
      <PageHeader
        title="Batches"
        description="Manage coaching batches, mentors, and seating capacity."
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Create batch
          </Button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active batches" value={String(activeCount)} icon={GraduationCap} />
        <StatCard label="Total enrolled" value={enrolled.toLocaleString("en-IN")} icon={Users} />
        <StatCard
          label="Avg. batch size"
          value={String(activeCount ? Math.round(enrolled / activeCount) : 0)}
          icon={Clock}
        />
      </div>

      <DataTable
        data={batches}
        getRowKey={(row) => row.id}
        columns={[
          {
            key: "name",
            header: "Batch",
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.id}</p>
              </div>
            ),
          },
          { key: "program", header: "Program", render: (row) => row.program },
          { key: "students", header: "Students", render: (row) => row.students },
          { key: "mentor", header: "Mentor", render: (row) => row.mentor },
          {
            key: "schedule",
            header: "Schedule",
            render: (row) => (
              <span className="text-muted-foreground">{row.schedule}</span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <StatusBadge
                status={row.status}
                tone={
                  row.status === "Active"
                    ? "success"
                    : row.status === "Upcoming"
                      ? "info"
                      : "neutral"
                }
              />
            ),
          },
        ]}
      />

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title="Create batch"
        description="Add a new coaching batch to the academy roster."
        submitLabel="Create batch"
        onSubmit={(formData) => {
          const values = readBatchForm(formData);
          if (!values) return;
          const id = `B-${100 + batches.length + 1}`;
          setBatches((prev) => [{ id, ...values }, ...prev]);
        }}
      >
        <BatchForm />
      </FormDialog>
    </div>
  );
}
