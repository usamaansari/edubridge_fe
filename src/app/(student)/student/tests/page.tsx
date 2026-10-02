"use client";

import { useState } from "react";
import { Award, ClipboardList, Target } from "lucide-react";
import { EmptyState, StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { TestCard } from "@/components/tests";
import { tests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { TestStatus } from "@/types";

const tabs: { id: TestStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
];

export default function StudentTestsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const visible = tab === "all" ? tests : tests.filter((t) => t.status === tab);
  const completed = tests.filter((t) => t.status === "completed");
  const bestRank = Math.min(...completed.map((t) => t.rank ?? Infinity));

  return (
    <div>
      <PageHeader
        title="Tests"
        description="Full-length mocks and chapter tests aligned to your JEE/NEET plan."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Tests attempted" value={String(completed.length + 14)} icon={ClipboardList} />
        <StatCard label="Avg. accuracy" value="68%" hint="+5% over last 30 days" trend="up" icon={Target} />
        <StatCard label="Best rank" value={`#${bestRank}`} hint="Chemical Bonding CT" icon={Award} />
      </div>

      <div className="mb-6 inline-flex rounded-xl bg-muted p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
              tab === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState title="No tests here" description="Check back later — new tests are scheduled every week." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      )}
    </div>
  );
}
