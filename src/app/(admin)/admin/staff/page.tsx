"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/common";
import { DataTable, StatusBadge, FormDialog, FormField, FormSelect } from "@/components/admin";
import { UserCog, BookOpen, Briefcase } from "lucide-react";

type Staff = {
  id: string;
  name: string;
  role: string;
  department: string;
  batches: number;
  email: string;
  status: string;
};

const initialStaff: Staff[] = [
  {
    id: "SF-01",
    name: "Dr. Ananya Rao",
    role: "Physics Faculty",
    department: "Academics",
    batches: 3,
    email: "ananya.rao@edubridge.in",
    status: "Active",
  },
  {
    id: "SF-02",
    name: "Dr. Vikram Shah",
    role: "Biology Faculty",
    department: "Academics",
    batches: 2,
    email: "vikram.shah@edubridge.in",
    status: "Active",
  },
  {
    id: "SF-03",
    name: "Prof. Neha Kapoor",
    role: "Mathematics Faculty",
    department: "Academics",
    batches: 4,
    email: "neha.kapoor@edubridge.in",
    status: "Active",
  },
  {
    id: "SF-04",
    name: "Rahul Verma",
    role: "Chemistry Faculty",
    department: "Academics",
    batches: 2,
    email: "rahul.verma@edubridge.in",
    status: "On leave",
  },
  {
    id: "SF-05",
    name: "Sneha Iyer",
    role: "Academic Coordinator",
    department: "Operations",
    batches: 0,
    email: "sneha.iyer@edubridge.in",
    status: "Active",
  },
  {
    id: "SF-06",
    name: "Amit Joshi",
    role: "Counsellor",
    department: "Mentoring",
    batches: 6,
    email: "amit.joshi@edubridge.in",
    status: "Active",
  },
];

export default function StaffPage() {
  const [staff, setStaff] = useState(initialStaff);
  const [open, setOpen] = useState(false);
  const faculty = staff.filter((s) => s.department === "Academics").length;

  return (
    <div>
      <PageHeader
        title="Staff"
        description="Faculty, coordinators, and mentoring team directory."
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Add staff member
          </Button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total staff" value={String(42 - 6 + staff.length)} icon={UserCog} />
        <StatCard label="Faculty" value={String(faculty)} icon={BookOpen} />
        <StatCard
          label="Support roles"
          value={String(staff.length - faculty)}
          icon={Briefcase}
        />
      </div>

      <DataTable
        data={staff}
        getRowKey={(row) => row.id}
        columns={[
          {
            key: "name",
            header: "Name",
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.id}</p>
              </div>
            ),
          },
          { key: "role", header: "Role", render: (row) => row.role },
          { key: "department", header: "Department", render: (row) => row.department },
          { key: "batches", header: "Batches", render: (row) => row.batches },
          {
            key: "email",
            header: "Email",
            render: (row) => (
              <span className="text-muted-foreground">{row.email}</span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <StatusBadge
                status={row.status}
                tone={row.status === "Active" ? "success" : "warning"}
              />
            ),
          },
        ]}
      />

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title="Add staff member"
        description="Add faculty or support staff to the directory."
        submitLabel="Add member"
        onSubmit={(formData) => {
          const name = String(formData.get("name") ?? "").trim();
          if (!name) return;
          const id = `SF-${String(staff.length + 1).padStart(2, "0")}`;
          const email =
            String(formData.get("email") ?? "").trim() ||
            `${name.toLowerCase().replace(/\s+/g, ".")}@edubridge.in`;
          setStaff((prev) => [
            {
              id,
              name,
              role: String(formData.get("role") ?? ""),
              department: String(formData.get("department") ?? "Academics"),
              batches: Number(formData.get("batches") ?? 0),
              email,
              status: String(formData.get("status") ?? "Active"),
            },
            ...prev,
          ]);
        }}
      >
        <FormField label="Full name" name="name" required placeholder="e.g. Meera Banerjee" />
        <FormField label="Role" name="role" required placeholder="e.g. Chemistry Faculty" />
        <FormSelect
          label="Department"
          name="department"
          options={[
            { value: "Academics", label: "Academics" },
            { value: "Operations", label: "Operations" },
            { value: "Mentoring", label: "Mentoring" },
          ]}
        />
        <FormField label="Email" name="email" type="email" placeholder="name@edubridge.in" />
        <FormField label="Assigned batches" name="batches" type="number" min={0} defaultValue={0} />
        <FormSelect
          label="Status"
          name="status"
          options={[
            { value: "Active", label: "Active" },
            { value: "On leave", label: "On leave" },
          ]}
        />
      </FormDialog>
    </div>
  );
}
