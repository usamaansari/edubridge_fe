"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/common";
import { DataTable, StatusBadge, FormDialog, FormField, FormSelect } from "@/components/admin";
import { Building2, MapPin, Users } from "lucide-react";

type Organisation = {
  id: string;
  name: string;
  city: string;
  students: number;
  contact: string;
  plan: string;
  status: string;
};

const initialOrgs: Organisation[] = [
  {
    id: "ORG-01",
    name: "Greenfield Public School",
    city: "Pune",
    students: 186,
    contact: "principal@greenfield.edu",
    plan: "School integration",
    status: "Active",
  },
  {
    id: "ORG-02",
    name: "Horizon Junior College",
    city: "Mumbai",
    students: 242,
    contact: "admin@horizonjc.in",
    plan: "Partner campus",
    status: "Active",
  },
  {
    id: "ORG-03",
    name: "St. Mary's High School",
    city: "Bengaluru",
    students: 98,
    contact: "office@stmarys.edu",
    plan: "Pilot",
    status: "Onboarding",
  },
  {
    id: "ORG-04",
    name: "City Science Academy",
    city: "Hyderabad",
    students: 154,
    contact: "ops@cityscience.org",
    plan: "School integration",
    status: "Active",
  },
  {
    id: "ORG-05",
    name: "Lakeview International",
    city: "Chennai",
    students: 0,
    contact: "admissions@lakeview.edu",
    plan: "Demo",
    status: "Lead",
  },
];

export default function OrganisationsPage() {
  const [orgs, setOrgs] = useState(initialOrgs);
  const [open, setOpen] = useState(false);
  const cities = new Set(orgs.map((o) => o.city)).size;
  const partnerStudents = orgs.reduce((sum, o) => sum + o.students, 0);

  return (
    <div>
      <PageHeader
        title="Organisations"
        description="Partner schools and colleges running EduBridge programs."
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Add organisation
          </Button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Partners" value={String(orgs.length)} icon={Building2} />
        <StatCard label="Cities" value={String(cities)} icon={MapPin} />
        <StatCard
          label="Partner students"
          value={partnerStudents.toLocaleString("en-IN")}
          icon={Users}
        />
      </div>

      <DataTable
        data={orgs}
        getRowKey={(row) => row.id}
        columns={[
          {
            key: "name",
            header: "Organisation",
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.id}</p>
              </div>
            ),
          },
          { key: "city", header: "City", render: (row) => row.city },
          { key: "students", header: "Students", render: (row) => row.students },
          {
            key: "contact",
            header: "Contact",
            render: (row) => (
              <span className="text-muted-foreground">{row.contact}</span>
            ),
          },
          { key: "plan", header: "Plan", render: (row) => row.plan },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <StatusBadge
                status={row.status}
                tone={
                  row.status === "Active"
                    ? "success"
                    : row.status === "Onboarding"
                      ? "info"
                      : "warning"
                }
              />
            ),
          },
        ]}
      />

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title="Add organisation"
        description="Register a partner school or college."
        submitLabel="Add organisation"
        onSubmit={(formData) => {
          const name = String(formData.get("name") ?? "").trim();
          if (!name) return;
          const id = `ORG-${String(orgs.length + 1).padStart(2, "0")}`;
          setOrgs((prev) => [
            {
              id,
              name,
              city: String(formData.get("city") ?? ""),
              students: Number(formData.get("students") ?? 0),
              contact: String(formData.get("contact") ?? ""),
              plan: String(formData.get("plan") ?? "Demo"),
              status: String(formData.get("status") ?? "Lead"),
            },
            ...prev,
          ]);
        }}
      >
        <FormField label="Organisation name" name="name" required placeholder="e.g. Riverside High" />
        <FormField label="City" name="city" required placeholder="e.g. Delhi" />
        <FormField label="Contact email" name="contact" type="email" placeholder="admin@school.edu" />
        <FormField label="Students" name="students" type="number" min={0} defaultValue={0} />
        <FormSelect
          label="Plan"
          name="plan"
          options={[
            { value: "Demo", label: "Demo" },
            { value: "Pilot", label: "Pilot" },
            { value: "School integration", label: "School integration" },
            { value: "Partner campus", label: "Partner campus" },
          ]}
        />
        <FormSelect
          label="Status"
          name="status"
          options={[
            { value: "Lead", label: "Lead" },
            { value: "Onboarding", label: "Onboarding" },
            { value: "Active", label: "Active" },
          ]}
        />
      </FormDialog>
    </div>
  );
}
