"use client";

import { useState } from "react";
import { BookOpen, ClipboardList, Handshake, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { cn } from "@/lib/utils";

type EventKind = "class" | "test" | "mentor";

type ScheduleEvent = {
  time: string;
  end: string;
  title: string;
  kind: EventKind;
  location: string;
  with?: string;
};

const week: { day: string; date: string; events: ScheduleEvent[] }[] = [
  {
    day: "Mon",
    date: "22",
    events: [
      { time: "4:00 PM", end: "5:30 PM", title: "Work, Energy & Power", kind: "class", location: "Hall A", with: "Dr. Ananya Rao" },
      { time: "6:00 PM", end: "7:00 PM", title: "Mole Concept revision", kind: "class", location: "Hall B", with: "Rahul Verma" },
    ],
  },
  {
    day: "Tue",
    date: "23",
    events: [{ time: "4:00 PM", end: "5:30 PM", title: "Sequences & Series", kind: "class", location: "Hall B", with: "Prof. Neha Kapoor" }],
  },
  {
    day: "Wed",
    date: "24",
    events: [
      { time: "4:00 PM", end: "5:30 PM", title: "Chemical Bonding II", kind: "class", location: "Lab 2", with: "Rahul Verma" },
      { time: "6:00 PM", end: "6:30 PM", title: "Fortnightly mentor check-in", kind: "mentor", location: "Online", with: "Sneha Kulkarni" },
    ],
  },
  {
    day: "Thu",
    date: "25",
    events: [
      { time: "9:00 AM", end: "12:00 PM", title: "JEE Main Full Mock #7", kind: "test", location: "Online" },
      { time: "4:00 PM", end: "5:30 PM", title: "Projectile Motion", kind: "class", location: "Hall A", with: "Dr. Ananya Rao" },
      { time: "7:00 PM", end: "8:00 PM", title: "Definite Integrals practice", kind: "class", location: "Hall B", with: "Prof. Neha Kapoor" },
    ],
  },
  { day: "Fri", date: "26", events: [{ time: "4:00 PM", end: "5:30 PM", title: "Rotational Dynamics I", kind: "class", location: "Hall A", with: "Dr. Ananya Rao" }] },
  {
    day: "Sat",
    date: "27",
    events: [
      { time: "11:00 AM", end: "11:45 AM", title: "Mentor session — Mock #7 review", kind: "mentor", location: "Video call", with: "Sneha Kulkarni" },
      { time: "5:00 PM", end: "5:45 PM", title: "Kinematics Chapter Test", kind: "test", location: "Online" },
    ],
  },
  { day: "Sun", date: "28", events: [] },
];

const kindMeta: Record<EventKind, { icon: typeof BookOpen; className: string; label: string }> = {
  class: { icon: BookOpen, className: "border-l-primary bg-primary/5", label: "Class" },
  test: { icon: ClipboardList, className: "border-l-red-500 bg-red-50", label: "Test" },
  mentor: { icon: Handshake, className: "border-l-emerald-500 bg-emerald-50", label: "Mentor" },
};

export default function StudentSchedulePage() {
  const [selected, setSelected] = useState("25");
  const day = week.find((d) => d.date === selected) ?? week[0];

  return (
    <div>
      <PageHeader title="Schedule" description="Week of 22–28 September 2026" />

      <div className="mb-6 grid grid-cols-7 gap-2">
        {week.map((d) => (
          <button
            key={d.date}
            type="button"
            onClick={() => setSelected(d.date)}
            className={cn(
              "flex flex-col items-center rounded-2xl border py-3 transition-colors",
              d.date === selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted/50",
            )}
          >
            <span className="text-xs opacity-80">{d.day}</span>
            <span className="font-heading text-lg font-bold">{d.date}</span>
            <span className="mt-1 flex gap-0.5">
              {d.events.map((e, i) => (
                <span
                  key={i}
                  className={cn(
                    "size-1.5 rounded-full",
                    d.date === selected ? "bg-primary-foreground" : e.kind === "test" ? "bg-red-500" : e.kind === "mentor" ? "bg-emerald-500" : "bg-primary",
                  )}
                />
              ))}
            </span>
          </button>
        ))}
      </div>

      {day.events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
          Rest day — nothing scheduled. Recharge!
        </div>
      ) : (
        <ul className="space-y-3">
          {day.events.map((e) => {
            const meta = kindMeta[e.kind];
            const Icon = meta.icon;
            return (
              <li key={e.title} className={cn("flex gap-4 rounded-2xl border border-l-4 border-border p-4", meta.className)}>
                <div className="w-24 shrink-0">
                  <p className="font-heading text-sm font-semibold">{e.time}</p>
                  <p className="text-xs text-muted-foreground">to {e.end}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-medium">
                    <Icon className="size-4 shrink-0" /> {e.title}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                    <span>{meta.label}</span>
                    {e.with ? <span>{e.with}</span> : null}
                    <span className="flex items-center gap-1"><MapPin className="size-3" /> {e.location}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
