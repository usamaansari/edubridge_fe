"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Wallet } from "lucide-react";
import { FeeTable, FormDialog, FormSelect, type FeeRecord } from "@/components/admin";
import { StatCard } from "@/components/common";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";

const initialFees: FeeRecord[] = [
  { id: "INV-9012", student: "Aarav Mehta", batch: "JEE 2027 — Batch A", amount: "₹24,000", dueDate: "15 Oct 2026", method: "—", status: "Pending" },
  { id: "INV-8841", student: "Aarav Mehta", batch: "JEE 2027 — Batch A", amount: "₹24,000", dueDate: "15 Sep 2026", method: "UPI", status: "Paid" },
  { id: "INV-8620", student: "Aarav Mehta", batch: "JEE 2027 — Batch A", amount: "₹24,000", dueDate: "15 Aug 2026", method: "Card", status: "Paid" },
  { id: "INV-8843", student: "Ananya Gupta", batch: "Class 11 Foundation", amount: "₹18,000", dueDate: "10 Sep 2026", method: "—", status: "Overdue" },
  { id: "INV-8410", student: "Ananya Gupta", batch: "Class 11 Foundation", amount: "₹18,000", dueDate: "10 Aug 2026", method: "UPI", status: "Paid" },
];

export default function ParentFeesPage() {
  const [fees, setFees] = useState(initialFees);
  const [paying, setPaying] = useState<FeeRecord | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const outstanding = fees.filter((f) => f.status !== "Paid" && f.status !== "Waived");

  return (
    <div>
      <PageHeader
        title="Fees & payments"
        description="Invoices, receipts and upcoming dues for your children."
      />

      {notice ? (
        <p className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          <CheckCircle2 className="size-4" /> {notice}
        </p>
      ) : null}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Outstanding" value={`${outstanding.length} invoice${outstanding.length === 1 ? "" : "s"}`} icon={Wallet} />
        <StatCard label="Paid this year" value="₹1,68,000" icon={CheckCircle2} />
        <StatCard
          label="Overdue"
          value={String(fees.filter((f) => f.status === "Overdue").length)}
          hint="Late fee applies after 7 days"
          trend="down"
          icon={AlertCircle}
        />
      </div>

      <FeeTable
        fees={fees}
        renderAction={(fee) =>
          fee.status === "Paid" ? (
            <Button variant="ghost" size="xs">Receipt</Button>
          ) : (
            <Button size="xs" onClick={() => setPaying(fee)}>Pay now</Button>
          )
        }
      />

      <FormDialog
        open={paying !== null}
        onOpenChange={(open) => !open && setPaying(null)}
        title={`Pay ${paying?.amount ?? ""}`}
        description={paying ? `${paying.id} · ${paying.student} · due ${paying.dueDate}` : undefined}
        submitLabel="Confirm payment"
        onSubmit={(fd) => {
          if (!paying) return;
          const method = String(fd.get("method"));
          setFees((prev) => prev.map((f) => (f.id === paying.id ? { ...f, status: "Paid", method } : f)));
          setNotice(`Payment for ${paying.id} recorded via ${method}. A receipt has been emailed.`);
        }}
      >
        <FormSelect
          label="Payment method"
          name="method"
          options={["UPI", "Card", "Net banking"].map((v) => ({ value: v, label: v }))}
        />
      </FormDialog>
    </div>
  );
}
