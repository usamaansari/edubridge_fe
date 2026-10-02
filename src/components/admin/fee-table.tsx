import type { Tone } from "@/types";
import { DataTable, StatusBadge } from "./data-table";

export type FeeRecord = {
  id: string;
  student: string;
  batch: string;
  amount: string;
  dueDate: string;
  method: string;
  status: string;
};

export function feeStatusTone(status: string): Tone {
  if (status === "Paid" || status === "Waived") return "success";
  if (status === "Partial" || status === "Pending") return "warning";
  return "danger";
}

type FeeTableProps = {
  fees: FeeRecord[];
  showStudent?: boolean;
  renderAction?: (fee: FeeRecord) => React.ReactNode;
};

export function FeeTable({ fees, showStudent = true, renderAction }: FeeTableProps) {
  return (
    <DataTable
      data={fees}
      getRowKey={(row) => row.id}
      columns={[
        {
          key: "id",
          header: "Invoice",
          render: (row) => <span className="font-medium">{row.id}</span>,
        },
        ...(showStudent
          ? [{ key: "student", header: "Student", render: (row: FeeRecord) => row.student }]
          : []),
        { key: "batch", header: "Batch", render: (row) => row.batch },
        { key: "amount", header: "Amount", render: (row) => row.amount },
        {
          key: "dueDate",
          header: "Due date",
          render: (row) => <span className="text-muted-foreground">{row.dueDate}</span>,
        },
        { key: "method", header: "Method", render: (row) => row.method },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusBadge status={row.status} tone={feeStatusTone(row.status)} />
          ),
        },
        ...(renderAction
          ? [
              {
                key: "action",
                header: "",
                className: "text-right",
                render: (row: FeeRecord) => renderAction(row),
              },
            ]
          : []),
      ]}
    />
  );
}
