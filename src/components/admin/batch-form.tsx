"use client";

import { FormField, FormSelect } from "./form-fields";

export const programOptions = [
  "JEE Main + Advanced",
  "JEE Advanced",
  "NEET UG",
  "Foundation",
  "Crash Course",
].map((value) => ({ value, label: value }));

export type BatchFormValues = {
  name: string;
  program: string;
  mentor: string;
  schedule: string;
  students: number;
  status: string;
};

export function readBatchForm(formData: FormData): BatchFormValues | null {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return null;
  return {
    name,
    program: String(formData.get("program") ?? ""),
    mentor: String(formData.get("mentor") ?? "").trim() || "Unassigned",
    schedule: String(formData.get("schedule") ?? ""),
    students: Number(formData.get("students") ?? 0),
    status: String(formData.get("status") ?? "Upcoming"),
  };
}

type BatchFormProps = {
  defaultValues?: Partial<BatchFormValues>;
};

export function BatchForm({ defaultValues }: BatchFormProps) {
  return (
    <>
      <FormField
        label="Batch name"
        name="name"
        required
        placeholder="e.g. JEE 2028 — Batch B"
        defaultValue={defaultValues?.name}
      />
      <FormSelect
        label="Program"
        name="program"
        options={programOptions}
        defaultValue={defaultValues?.program}
      />
      <FormField
        label="Mentor"
        name="mentor"
        placeholder="e.g. Dr. Ananya Rao"
        defaultValue={defaultValues?.mentor}
      />
      <FormField
        label="Schedule"
        name="schedule"
        placeholder="Mon–Fri · 6:00–8:00 PM"
        defaultValue={defaultValues?.schedule}
      />
      <FormField
        label="Initial students"
        name="students"
        type="number"
        min={0}
        defaultValue={defaultValues?.students ?? 0}
      />
      <FormSelect
        label="Status"
        name="status"
        defaultValue={defaultValues?.status}
        options={[
          { value: "Upcoming", label: "Upcoming" },
          { value: "Active", label: "Active" },
        ]}
      />
    </>
  );
}
