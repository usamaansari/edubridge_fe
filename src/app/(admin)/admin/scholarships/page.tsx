"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/common";
import { DataTable, StatusBadge, FormDialog, FormField, FormSelect } from "@/components/admin";
import { Award, Percent, Users } from "lucide-react";

type Scholarship = {
  id: string;
  student: string;
  program: string;
  amount: string;
  awardedOn: string;
  validTill: string;
  status: string;
};

const initialScholarships: Scholarship[] = [
  {
    id: "SCH-12",
    student: "Ishita Nair",
    program: "Merit 100%",
    amount: "Full tuition",
    awardedOn: "02 Aug 2026",
    validTill: "Mar 2027",
    status: "Active",
  },
  {
    id: "SCH-13",
    student: "Kabir Singh",
    program: "Merit 50%",
    amount: "₹60,000 / yr",
    awardedOn: "18 Aug 2026",
    validTill: "Mar 2027",
    status: "Active",
  },
  {
    id: "SCH-14",
    student: "Meera Joshi",
    program: "Need-based",
    amount: "₹40,000 / yr",
    awardedOn: "01 Sep 2026",
    validTill: "Mar 2027",
    status: "Active",
  },
  {
    id: "SCH-15",
    student: "Arjun Reddy",
    program: "Sibling discount",
    amount: "₹15,000 / yr",
    awardedOn: "05 Sep 2026",
    validTill: "Mar 2027",
    status: "Pending docs",
  },
  {
    id: "SCH-09",
    student: "Sana Khan",
    program: "Merit 25%",
    amount: "₹30,000 / yr",
    awardedOn: "12 Jan 2026",
    validTill: "Jun 2026",
    status: "Expired",
  },
];

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState(initialScholarships);
  const [open, setOpen] = useState(false);
  const active = scholarships.filter((s) => s.status === "Active").length;

  return (
    <div>
      <PageHeader
        title="Scholarships"
        description="Merit and need-based awards linked to student accounts."
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Award scholarship
          </Button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active awards" value={String(active)} icon={Award} />
        <StatCard label="Avg. waiver" value="38%" icon={Percent} />
        <StatCard label="Beneficiaries" value={String(scholarships.length)} icon={Users} />
      </div>

      <DataTable
        data={scholarships}
        getRowKey={(row) => row.id}
        columns={[
          {
            key: "id",
            header: "ID",
            render: (row) => <span className="font-medium">{row.id}</span>,
          },
          { key: "student", header: "Student", render: (row) => row.student },
          { key: "program", header: "Program", render: (row) => row.program },
          { key: "amount", header: "Value", render: (row) => row.amount },
          {
            key: "awardedOn",
            header: "Awarded",
            render: (row) => (
              <span className="text-muted-foreground">{row.awardedOn}</span>
            ),
          },
          { key: "validTill", header: "Valid till", render: (row) => row.validTill },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <StatusBadge
                status={row.status}
                tone={
                  row.status === "Active"
                    ? "success"
                    : row.status === "Pending docs"
                      ? "warning"
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
        title="Award scholarship"
        description="Create a new scholarship award for a student."
        submitLabel="Award"
        onSubmit={(formData) => {
          const student = String(formData.get("student") ?? "").trim();
          if (!student) return;
          const id = `SCH-${12 + scholarships.length}`;
          setScholarships((prev) => [
            {
              id,
              student,
              program: String(formData.get("program") ?? ""),
              amount: String(formData.get("amount") ?? ""),
              awardedOn: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
              validTill: String(formData.get("validTill") ?? "Mar 2027"),
              status: String(formData.get("status") ?? "Active"),
            },
            ...prev,
          ]);
        }}
      >
        <FormField label="Student" name="student" required placeholder="e.g. Riya Kapoor" />
        <FormSelect
          label="Program"
          name="program"
          options={[
            { value: "Merit 100%", label: "Merit 100%" },
            { value: "Merit 50%", label: "Merit 50%" },
            { value: "Merit 25%", label: "Merit 25%" },
            { value: "Need-based", label: "Need-based" },
            { value: "Sibling discount", label: "Sibling discount" },
          ]}
        />
        <FormField label="Value" name="amount" required placeholder="e.g. ₹40,000 / yr" />
        <FormField label="Valid till" name="validTill" defaultValue="Mar 2027" />
        <FormSelect
          label="Status"
          name="status"
          options={[
            { value: "Active", label: "Active" },
            { value: "Pending docs", label: "Pending docs" },
          ]}
        />
      </FormDialog>
    </div>
  );
}
