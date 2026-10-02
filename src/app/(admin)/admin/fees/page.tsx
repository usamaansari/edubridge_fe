"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/common";
import { FeeTable, FormDialog, FormField, FormSelect, FormTextarea, type FeeRecord } from "@/components/admin";
import { Wallet, CircleDollarSign, AlertCircle } from "lucide-react";

const initialFees: FeeRecord[] = [
  {
    id: "INV-8841",
    student: "Aarav Mehta",
    batch: "JEE 2027 — Batch A",
    amount: "₹24,000",
    dueDate: "15 Sep 2026",
    method: "UPI",
    status: "Paid",
  },
  {
    id: "INV-8842",
    student: "Priya Sharma",
    batch: "NEET 2026 — Evening",
    amount: "₹12,000",
    dueDate: "20 Sep 2026",
    method: "—",
    status: "Partial",
  },
  {
    id: "INV-8843",
    student: "Ananya Gupta",
    batch: "Class 11 Foundation",
    amount: "₹18,000",
    dueDate: "10 Sep 2026",
    method: "—",
    status: "Overdue",
  },
  {
    id: "INV-8844",
    student: "Kabir Singh",
    batch: "JEE 2026 — Elite",
    amount: "₹30,000",
    dueDate: "01 Sep 2026",
    method: "NEFT",
    status: "Paid",
  },
  {
    id: "INV-8845",
    student: "Rohan Das",
    batch: "JEE 2027 — Batch A",
    amount: "₹24,000",
    dueDate: "25 Sep 2026",
    method: "—",
    status: "Pending",
  },
  {
    id: "INV-8846",
    student: "Ishita Nair",
    batch: "NEET 2026 — Evening",
    amount: "₹0",
    dueDate: "—",
    method: "Scholarship",
    status: "Waived",
  },
];

type Modal = "download" | "payment" | null;

export default function FeesPage() {
  const [fees, setFees] = useState(initialFees);
  const [modal, setModal] = useState<Modal>(null);
  const [ledgerNote, setLedgerNote] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Fees"
        description="Collections, pending dues, and invoice tracking."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setModal("download")}>
              Download ledger
            </Button>
            <Button size="sm" onClick={() => setModal("payment")}>
              Record payment
            </Button>
          </>
        }
      />

      {ledgerNote ? (
        <p className="mb-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
          {ledgerNote}
        </p>
      ) : null}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Collected (MTD)"
          value="₹42.6L"
          hint="+12% vs last month"
          trend="up"
          icon={Wallet}
        />
        <StatCard label="Pending" value="₹8.4L" icon={CircleDollarSign} />
        <StatCard
          label="Overdue"
          value="₹1.9L"
          hint="14 invoices"
          trend="down"
          icon={AlertCircle}
        />
      </div>

      <FeeTable fees={fees} />

      <FormDialog
        open={modal === "payment"}
        onOpenChange={(open) => !open && setModal(null)}
        title="Record payment"
        description="Log a fee payment against a student invoice."
        submitLabel="Record payment"
        onSubmit={(formData) => {
          const student = String(formData.get("student") ?? "").trim();
          const amount = String(formData.get("amount") ?? "").trim();
          if (!student || !amount) return;
          const id = `INV-${8840 + fees.length + 1}`;
          setFees((prev) => [
            {
              id,
              student,
              batch: String(formData.get("batch") ?? ""),
              amount: amount.startsWith("₹") ? amount : `₹${amount}`,
              dueDate: String(formData.get("dueDate") ?? "—"),
              method: String(formData.get("method") ?? "UPI"),
              status: String(formData.get("status") ?? "Paid"),
            },
            ...prev,
          ]);
        }}
      >
        <FormField label="Student" name="student" required placeholder="e.g. Aarav Mehta" />
        <FormSelect
          label="Batch"
          name="batch"
          options={[
            { value: "JEE 2027 — Batch A", label: "JEE 2027 — Batch A" },
            { value: "NEET 2026 — Evening", label: "NEET 2026 — Evening" },
            { value: "JEE 2026 — Elite", label: "JEE 2026 — Elite" },
            { value: "Class 11 Foundation", label: "Class 11 Foundation" },
          ]}
        />
        <FormField label="Amount" name="amount" required placeholder="24000" />
        <FormField label="Due date" name="dueDate" placeholder="25 Sep 2026" />
        <FormSelect
          label="Method"
          name="method"
          options={[
            { value: "UPI", label: "UPI" },
            { value: "NEFT", label: "NEFT" },
            { value: "Cash", label: "Cash" },
            { value: "Card", label: "Card" },
          ]}
        />
        <FormSelect
          label="Status"
          name="status"
          options={[
            { value: "Paid", label: "Paid" },
            { value: "Partial", label: "Partial" },
            { value: "Pending", label: "Pending" },
          ]}
        />
      </FormDialog>

      <FormDialog
        open={modal === "download"}
        onOpenChange={(open) => !open && setModal(null)}
        title="Download ledger"
        description="Generate a fee ledger export for the selected period."
        submitLabel="Download"
        onSubmit={(formData) => {
          const range = String(formData.get("range") ?? "MTD");
          const format = String(formData.get("format") ?? "CSV");
          setLedgerNote(
            `Ledger ready: ${format} export for ${range}. ${fees.length} invoices included.`,
          );
        }}
      >
        <FormSelect
          label="Period"
          name="range"
          options={[
            { value: "MTD", label: "Month to date" },
            { value: "QTD", label: "Quarter to date" },
            { value: "YTD", label: "Year to date" },
          ]}
        />
        <FormSelect
          label="Format"
          name="format"
          options={[
            { value: "CSV", label: "CSV" },
            { value: "PDF", label: "PDF" },
            { value: "XLSX", label: "Excel" },
          ]}
        />
        <FormTextarea
          label="Filter notes"
          name="notes"
          placeholder="Optional: overdue only, batch filter, etc."
        />
      </FormDialog>
    </div>
  );
}
