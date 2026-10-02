import type { Metadata } from "next";
import Link from "next/link";
import { Bell, CalendarCheck, Target, Wallet } from "lucide-react";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { StudentCard } from "@/components/student";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import { findStudent } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Dashboard" };

const announcements = [
  { title: "Parent–teacher meeting", body: "Saturday, 4 October, 10 AM–1 PM at the academy. Slots open on the app from Monday.", date: "2 days ago" },
  { title: "JEE Main Mock #7 today", body: "Results will be shared by Sunday evening along with a detailed performance report.", date: "Today" },
  { title: "Diwali break", body: "Classes paused 20–23 October. Recorded lectures and DPPs will remain available.", date: "Last week" },
];

const recentActivity = [
  { label: "Attended Projectile Motion class", time: "Today, 5:30 PM" },
  { label: "Scored 36/48 in Chemical Bonding chapter test (Rank #12)", time: "12 Sep" },
  { label: "Doubt on torque answered by Dr. Ananya Rao", time: "Today, 12:05 PM" },
  { label: "Completed 3 Rotational Dynamics practice sets", time: "Yesterday" },
];

export default async function ParentDashboardPage() {
  const user = await getSession();
  const children = ["ST-2041", "ST-2044"].map(findStudent).filter((s) => s !== null);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${user?.name.split(" ")[0] ?? "Parent"}`}
        description="A clear view of your child's progress, attendance and fees."
        actions={
          <Link href="/parent/fees" className={buttonVariants({ size: "sm" })}>
            Pay fees
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Attendance (30d)" value="92%" hint="2 classes missed" icon={CalendarCheck} />
        <StatCard label="Latest mock" value="212/300" hint="+9 vs previous" trend="up" icon={Target} />
        <StatCard label="Next fee due" value="₹24,000" hint="Due 15 Oct 2026" icon={Wallet} />
        <StatCard label="Unread updates" value="3" icon={Bell} />
      </div>

      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold">Your children</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {children.map((child) => (
            <StudentCard key={child.id} student={child} href={`/parent/performance/${child.id}`} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-background p-5">
          <h2 className="font-heading text-base font-semibold">Recent activity</h2>
          <ul className="mt-4 space-y-3">
            {recentActivity.map((a) => (
              <li key={a.label} className="flex items-start justify-between gap-4 text-sm">
                <span>{a.label}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-border bg-background p-5">
          <h2 className="font-heading text-base font-semibold">Announcements</h2>
          <ul className="mt-4 space-y-4">
            {announcements.map((a) => (
              <li key={a.title}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium">{a.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.date}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{a.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
