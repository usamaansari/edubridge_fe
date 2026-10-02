"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { StatusBadge, FormDialog, FormField, FormSelect } from "@/components/admin";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type Cell = {
  subject: string;
  batch: string;
  room: string;
  tone?: "primary" | "muted";
} | null;

const initialGrid: Cell[][] = [
  [
    { subject: "Maths", batch: "JEE Elite", room: "Hall C", tone: "primary" },
    { subject: "Physics", batch: "JEE 2027 A", room: "Hall A" },
    { subject: "Biology", batch: "NEET Eve", room: "Lab 2", tone: "primary" },
    { subject: "Chemistry", batch: "Foundation", room: "Lab 1" },
  ],
  [
    { subject: "Physics", batch: "JEE Elite", room: "Hall C", tone: "primary" },
    null,
    { subject: "Chemistry", batch: "NEET Eve", room: "Lab 1" },
    { subject: "Maths", batch: "JEE 2027 A", room: "Hall A", tone: "primary" },
  ],
  [
    { subject: "Chemistry", batch: "JEE Elite", room: "Lab 1" },
    { subject: "Biology", batch: "Foundation", room: "Lab 2" },
    { subject: "Physics", batch: "NEET Eve", room: "Hall B", tone: "primary" },
    { subject: "Maths", batch: "JEE 2027 A", room: "Hall A" },
  ],
  [
    null,
    { subject: "Maths", batch: "JEE 2027 A", room: "Hall A", tone: "primary" },
    { subject: "Doubt clinic", batch: "Mixed", room: "Online" },
    { subject: "Biology", batch: "NEET Eve", room: "Lab 2", tone: "primary" },
  ],
  [
    { subject: "Mock test", batch: "JEE Elite", room: "Hall C", tone: "primary" },
    { subject: "Chemistry", batch: "Foundation", room: "Lab 1" },
    { subject: "Physics", batch: "NEET Eve", room: "Hall B" },
    null,
  ],
  [
    { subject: "Revision", batch: "JEE Elite", room: "Hall C" },
    null,
    { subject: "Test series", batch: "NEET Eve", room: "Hall B", tone: "primary" },
    { subject: "Foundation lab", batch: "Class 11", room: "Lab 2" },
  ],
];

const slots = [
  "7:00–9:00 AM",
  "10:00–12:00 PM",
  "4:00–6:00 PM",
  "6:00–8:00 PM",
];

type Modal = "print" | "edit" | null;

export default function TimetablePage() {
  const [grid, setGrid] = useState(initialGrid);
  const [modal, setModal] = useState<Modal>(null);
  const [printNote, setPrintNote] = useState<string | null>(null);
  const sessionCount = grid.flat().filter(Boolean).length;

  return (
    <div>
      <PageHeader
        title="Timetable"
        description="Weekly class grid across halls and online rooms."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setModal("print")}>
              Print
            </Button>
            <Button size="sm" onClick={() => setModal("edit")}>
              Edit timetable
            </Button>
          </>
        }
      />

      {printNote ? (
        <p className="mb-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
          {printNote}
        </p>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-2">
        <StatusBadge status="This week · 15–20 Sep" tone="info" />
        <StatusBadge status={`${sessionCount} sessions scheduled`} tone="neutral" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">
                Slot
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-3 py-3 text-left font-medium text-muted-foreground"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, slotIndex) => (
              <tr key={slot} className="border-b border-border last:border-0">
                <td className="whitespace-nowrap px-3 py-3 font-medium text-muted-foreground">
                  {slot}
                </td>
                {days.map((day, dayIndex) => {
                  const cell = grid[dayIndex][slotIndex];
                  return (
                    <td key={`${day}-${slot}`} className="px-2 py-2 align-top">
                      {cell ? (
                        <div
                          className={
                            cell.tone === "primary"
                              ? "rounded-xl bg-primary/10 px-3 py-2"
                              : "rounded-xl bg-muted/60 px-3 py-2"
                          }
                        >
                          <p className="font-medium">{cell.subject}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {cell.batch} · {cell.room}
                          </p>
                        </div>
                      ) : (
                        <div className="h-14 rounded-xl border border-dashed border-border/80" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FormDialog
        open={modal === "edit"}
        onOpenChange={(open) => !open && setModal(null)}
        title="Edit timetable"
        description="Place or replace a class in a day/slot."
        submitLabel="Save class"
        onSubmit={(formData) => {
          const dayIndex = Number(formData.get("day"));
          const slotIndex = Number(formData.get("slot"));
          const subject = String(formData.get("subject") ?? "").trim();
          if (!subject || Number.isNaN(dayIndex) || Number.isNaN(slotIndex)) return;
          setGrid((prev) => {
            const next = prev.map((col) => [...col]);
            next[dayIndex][slotIndex] = {
              subject,
              batch: String(formData.get("batch") ?? ""),
              room: String(formData.get("room") ?? ""),
              tone: "primary",
            };
            return next;
          });
        }}
      >
        <FormSelect
          label="Day"
          name="day"
          options={days.map((day, index) => ({
            value: String(index),
            label: day,
          }))}
        />
        <FormSelect
          label="Slot"
          name="slot"
          options={slots.map((slot, index) => ({
            value: String(index),
            label: slot,
          }))}
        />
        <FormField label="Subject / title" name="subject" required placeholder="e.g. Physics" />
        <FormField label="Batch" name="batch" required placeholder="e.g. JEE 2027 A" />
        <FormField label="Room" name="room" required placeholder="e.g. Hall A" />
      </FormDialog>

      <FormDialog
        open={modal === "print"}
        onOpenChange={(open) => !open && setModal(null)}
        title="Print timetable"
        description="Prepare a printable weekly timetable."
        submitLabel="Print"
        onSubmit={(formData) => {
          const scope = String(formData.get("scope") ?? "All batches");
          setPrintNote(`Print job queued for ${scope} · ${sessionCount} sessions.`);
        }}
      >
        <FormSelect
          label="Scope"
          name="scope"
          options={[
            { value: "All batches", label: "All batches" },
            { value: "JEE only", label: "JEE only" },
            { value: "NEET only", label: "NEET only" },
            { value: "Foundation only", label: "Foundation only" },
          ]}
        />
        <FormSelect
          label="Layout"
          name="layout"
          options={[
            { value: "Weekly grid", label: "Weekly grid" },
            { value: "By batch", label: "By batch" },
          ]}
        />
      </FormDialog>
    </div>
  );
}
