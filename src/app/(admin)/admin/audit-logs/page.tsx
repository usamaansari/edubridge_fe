"use client";

import { useMemo, useState } from "react";
import { Download, Search, ShieldAlert, ShieldCheck, Activity } from "lucide-react";
import { DataTable, StatusBadge } from "@/components/admin";
import { EmptyState, StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import type { Tone } from "@/types";

type Severity = "info" | "warning" | "critical";

type AuditLog = {
  id: string;
  at: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  organisation: string;
  ip: string;
  severity: Severity;
};

const logs: AuditLog[] = [
  { id: "AL-90412", at: "25 Sep 2026, 13:42", actor: "Meera Pillai", role: "Centre Admin", action: "fee.waived", target: "INV-8846 (Ishita Nair)", organisation: "EduBridge Pune", ip: "103.21.44.12", severity: "warning" },
  { id: "AL-90411", at: "25 Sep 2026, 13:10", actor: "Dr. Ananya Rao", role: "Teacher", action: "test.published", target: "JEE Main Full Mock #7", organisation: "EduBridge Pune", ip: "103.21.44.40", severity: "info" },
  { id: "AL-90410", at: "25 Sep 2026, 12:58", actor: "system", role: "System", action: "auth.login_failed ×5", target: "rohan.das@example.com", organisation: "EduBridge Pune", ip: "45.118.7.201", severity: "critical" },
  { id: "AL-90409", at: "25 Sep 2026, 11:30", actor: "Vikram Nair", role: "Super Admin", action: "organisation.plan_changed", target: "Sunrise School, Nashik → Growth", organisation: "Sunrise School", ip: "49.36.12.9", severity: "warning" },
  { id: "AL-90408", at: "25 Sep 2026, 10:05", actor: "Meera Pillai", role: "Centre Admin", action: "student.created", target: "ST-2048 (Riya Kapoor)", organisation: "EduBridge Pune", ip: "103.21.44.12", severity: "info" },
  { id: "AL-90407", at: "24 Sep 2026, 19:22", actor: "Vikram Nair", role: "Super Admin", action: "role.granted", target: "Arjun Menon → Centre Admin", organisation: "Greenfield Academy", ip: "49.36.12.9", severity: "critical" },
  { id: "AL-90406", at: "24 Sep 2026, 17:48", actor: "Prof. Neha Kapoor", role: "Teacher", action: "content.deleted", target: "Limits — Old notes.pdf", organisation: "EduBridge Pune", ip: "103.21.44.51", severity: "warning" },
  { id: "AL-90405", at: "24 Sep 2026, 16:02", actor: "Meera Pillai", role: "Centre Admin", action: "batch.updated", target: "NEET 2026 — Evening (time slot)", organisation: "EduBridge Pune", ip: "103.21.44.12", severity: "info" },
  { id: "AL-90404", at: "24 Sep 2026, 09:15", actor: "system", role: "System", action: "export.generated", target: "Fee ledger — Aug 2026", organisation: "Greenfield Academy", ip: "—", severity: "info" },
];

const severityTone: Record<Severity, Tone> = { info: "info", warning: "warning", critical: "danger" };

export default function AuditLogsPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<Severity | "all">("all");
  const debounced = useDebounce(query);

  const filtered = useMemo(
    () =>
      logs.filter(
        (l) =>
          (severity === "all" || l.severity === severity) &&
          `${l.actor} ${l.action} ${l.target} ${l.organisation}`.toLowerCase().includes(debounced.toLowerCase()),
      ),
    [debounced, severity],
  );

  const exportCsv = () => {
    const header = "id,at,actor,role,action,target,organisation,ip,severity";
    const rows = filtered.map((l) =>
      [l.id, l.at, l.actor, l.role, l.action, l.target, l.organisation, l.ip, l.severity]
        .map((v) => `"${v.replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="Audit logs"
        description="Every sensitive action across organisations. Retained for 365 days."
        actions={
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download /> Export CSV
          </Button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Events (24h)" value="1,284" icon={Activity} />
        <StatCard label="Warnings (24h)" value="37" icon={ShieldCheck} />
        <StatCard label="Critical (24h)" value="4" hint="2 failed-login bursts" trend="down" icon={ShieldAlert} />
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search actor, action, target or organisation"
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"
          />
        </label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity | "all")}
          className="h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
        >
          <option value="all">All severities</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No matching events" description="Adjust the search or severity filter." />
      ) : (
        <DataTable
          data={filtered}
          getRowKey={(l) => l.id}
          columns={[
            { key: "at", header: "Time", render: (l) => <span className="whitespace-nowrap text-muted-foreground">{l.at}</span> },
            {
              key: "actor",
              header: "Actor",
              render: (l) => (
                <div>
                  <p className="font-medium">{l.actor}</p>
                  <p className="text-xs text-muted-foreground">{l.role}</p>
                </div>
              ),
            },
            { key: "action", header: "Action", render: (l) => <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{l.action}</code> },
            { key: "target", header: "Target", render: (l) => l.target },
            { key: "org", header: "Organisation", render: (l) => <span className="text-muted-foreground">{l.organisation}</span> },
            { key: "ip", header: "IP", render: (l) => <span className="font-mono text-xs text-muted-foreground">{l.ip}</span> },
            { key: "severity", header: "Severity", render: (l) => <StatusBadge status={l.severity} tone={severityTone[l.severity]} /> },
          ]}
        />
      )}
    </div>
  );
}
