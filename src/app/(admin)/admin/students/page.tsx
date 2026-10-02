"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/common";
import { DataTable, StatusBadge, FormDialog, FormField, FormSelect, FormTextarea } from "@/components/admin";
import { Users, UserPlus, UserCheck } from "lucide-react";

type Student = {
  id: string;
  name: string;
  class: string;
  batch: string;
  phone: string;
  feeStatus: string;
  attendance: string;
};

const initialStudents: Student[] = [
  {
    id: "ST-2041",
    name: "Aarav Mehta",
    class: "11",
    batch: "JEE 2027 — Batch A",
    phone: "+91 98765 43210",
    feeStatus: "Paid",
    attendance: "92%",
  },
  {
    id: "ST-2042",
    name: "Priya Sharma",
    class: "12",
    batch: "NEET 2026 — Evening",
    phone: "+91 98123 45678",
    feeStatus: "Partial",
    attendance: "88%",
  },
  {
    id: "ST-2043",
    name: "Kabir Singh",
    class: "12",
    batch: "JEE 2026 — Elite",
    phone: "+91 97654 32109",
    feeStatus: "Paid",
    attendance: "96%",
  },
  {
    id: "ST-2044",
    name: "Ananya Gupta",
    class: "10",
    batch: "Class 11 Foundation",
    phone: "+91 99001 12233",
    feeStatus: "Due",
    attendance: "81%",
  },
  {
    id: "ST-2045",
    name: "Rohan Das",
    class: "11",
    batch: "JEE 2027 — Batch A",
    phone: "+91 91234 56780",
    feeStatus: "Paid",
    attendance: "90%",
  },
  {
    id: "ST-2046",
    name: "Ishita Nair",
    class: "12",
    batch: "NEET 2026 — Evening",
    phone: "+91 99887 76655",
    feeStatus: "Scholarship",
    attendance: "94%",
  },
  {
    id: "ST-2047",
    name: "Dev Patel",
    class: "9",
    batch: "Class 11 Foundation",
    phone: "+91 90011 22334",
    feeStatus: "Paid",
    attendance: "85%",
  },
];

type Modal = "import" | "add" | null;

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [newThisMonth, setNewThisMonth] = useState(36);
  const [modal, setModal] = useState<Modal>(null);

  return (
    <div>
      <PageHeader
        title="Students"
        description="Enrolment, attendance, and fee status across all batches."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setModal("import")}>
              Import CSV
            </Button>
            <Button size="sm" onClick={() => setModal("add")}>
              Add student
            </Button>
          </>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total students" value={String(1248 - 7 + students.length)} icon={Users} />
        <StatCard
          label="New this month"
          value={String(newThisMonth)}
          hint="+8 vs last month"
          trend="up"
          icon={UserPlus}
        />
        <StatCard label="Avg. attendance" value="89%" icon={UserCheck} />
      </div>

      <DataTable
        data={students}
        getRowKey={(row) => row.id}
        columns={[
          {
            key: "name",
            header: "Student",
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.id}</p>
              </div>
            ),
          },
          { key: "class", header: "Class", render: (row) => row.class },
          { key: "batch", header: "Batch", render: (row) => row.batch },
          {
            key: "phone",
            header: "Phone",
            render: (row) => (
              <span className="text-muted-foreground">{row.phone}</span>
            ),
          },
          {
            key: "feeStatus",
            header: "Fees",
            render: (row) => (
              <StatusBadge
                status={row.feeStatus}
                tone={
                  row.feeStatus === "Paid" || row.feeStatus === "Scholarship"
                    ? "success"
                    : row.feeStatus === "Partial"
                      ? "warning"
                      : "danger"
                }
              />
            ),
          },
          {
            key: "attendance",
            header: "Attendance",
            render: (row) => row.attendance,
          },
        ]}
      />

      <FormDialog
        open={modal === "add"}
        onOpenChange={(open) => !open && setModal(null)}
        title="Add student"
        description="Create a student record and attach them to a batch."
        submitLabel="Add student"
        onSubmit={(formData) => {
          const name = String(formData.get("name") ?? "").trim();
          if (!name) return;
          const id = `ST-${2040 + students.length + 1}`;
          setStudents((prev) => [
            {
              id,
              name,
              class: String(formData.get("class") ?? ""),
              batch: String(formData.get("batch") ?? ""),
              phone: String(formData.get("phone") ?? ""),
              feeStatus: String(formData.get("feeStatus") ?? "Due"),
              attendance: "—",
            },
            ...prev,
          ]);
          setNewThisMonth((n) => n + 1);
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
        <FormSelect
          label="Fee status"
          name="feeStatus"
          options={[
            { value: "Due", label: "Due" },
            { value: "Paid", label: "Paid" },
            { value: "Partial", label: "Partial" },
            { value: "Scholarship", label: "Scholarship" },
          ]}
        />
      </FormDialog>

      <FormDialog
        open={modal === "import"}
        onOpenChange={(open) => !open && setModal(null)}
        title="Import students"
        description="Paste CSV rows (name, class, batch, phone) to add multiple students."
        submitLabel="Import"
        onSubmit={(formData) => {
          const raw = String(formData.get("csv") ?? "").trim();
          if (!raw) return;
          const batchDefault = String(formData.get("batch") ?? "Class 11 Foundation");
          const rows = raw
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line, index) => {
              const [name, klass, batch, phone] = line.split(",").map((p) => p.trim());
              return {
                id: `ST-IMP-${Date.now()}-${index}`,
                name: name || `Imported ${index + 1}`,
                class: klass || "11",
                batch: batch || batchDefault,
                phone: phone || "—",
                feeStatus: "Due",
                attendance: "—",
              } satisfies Student;
            });
          setStudents((prev) => [...rows, ...prev]);
          setNewThisMonth((n) => n + rows.length);
        }}
      >
        <FormSelect
          label="Default batch"
          name="batch"
          options={[
            { value: "JEE 2027 — Batch A", label: "JEE 2027 — Batch A" },
            { value: "NEET 2026 — Evening", label: "NEET 2026 — Evening" },
            { value: "Class 11 Foundation", label: "Class 11 Foundation" },
          ]}
        />
        <FormTextarea
          label="CSV rows"
          name="csv"
          required
          placeholder={"Riya Kapoor, 11, JEE 2027 — Batch A, +91 90000 11111\nDev Shah, 12, NEET 2026 — Evening, +91 90000 22222"}
        />
      </FormDialog>
    </div>
  );
}
