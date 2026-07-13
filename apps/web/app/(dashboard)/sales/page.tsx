"use client";

import { Plus } from "lucide-react";
import { Button, Card, Column, DataTable, PageHeader, StatCard } from "@repo/ui";
import type { Sale } from "@repo/types";
import { dashboardStats, formatCurrency, formatDate, sales } from "@/lib/mock-data";

const columns: Column<Sale>[] = [
  {
    key: "invoice",
    header: "Invoice",
    render: (s) => <span className="font-mono text-ink">{s.invoiceNumber}</span>,
  },
  {
    key: "customer",
    header: "Customer",
    render: (s) => <span className="text-ink-700">{s.customerName}</span>,
  },
  {
    key: "date",
    header: "Date",
    render: (s) => <span className="text-ink-500">{formatDate(s.createdAt)}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (s) => (
      <span className="font-mono tabular-nums text-ink">{formatCurrency(s.totalAmount)}</span>
    ),
  },
];

export default function SalesPage() {
  const avgOrderValue = sales.length ? dashboardStats.monthRevenue / sales.length : 0;

  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Sales"
        description="Every invoice recorded against this organization."
        action={
          <Button size="md">
            <Plus size={16} /> Record sale
          </Button>
        }
      />

      <div className="mb-5 grid grid-cols-3 gap-4">
        <StatCard label="Revenue this month" value={formatCurrency(dashboardStats.monthRevenue)} />
        <StatCard label="Orders this month" value={String(dashboardStats.monthOrders)} />
        <StatCard label="Average order value" value={formatCurrency(Math.round(avgOrderValue))} />
      </div>

      <Card>
        <DataTable
          columns={columns}
          rows={sales}
          rowKey={(s) => s.id}
          emptyTitle="No sales recorded"
          emptyDescription="Sales will appear here as invoices are created."
        />
      </Card>
    </div>
  );
}
