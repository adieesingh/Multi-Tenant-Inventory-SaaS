"use client";

import { Badge, Card, Column, DataTable, PageHeader } from "@repo/ui";
import type { StockMovement, StockMovementType } from "@repo/types";
import { formatDate, stockMovements } from "@/lib/mock-data";

const typeTone: Record<StockMovementType, "success" | "warning" | "danger" | "info"> = {
  PURCHASE: "success",
  SALE: "info",
  ADJUSTMENT: "warning",
  RETURN: "success",
};

const columns: Column<StockMovement>[] = [
  {
    key: "product",
    header: "Product",
    render: (m:any) => (
      <div>
        <p className="font-medium text-ink">{m.productName}</p>
        <p className="text-[12px] text-ink-400">{m.variantLabel}</p>
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (m) => <Badge tone={typeTone[m.type]}>{m.type}</Badge>,
  },
  {
    key: "reference",
    header: "Reference",
    render: (m) => (
      <span className="font-mono text-[12px] text-ink-500">
        {m.purchaseOrderId ? `PO-${m.purchaseOrderId}` : "—"}
      </span>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (m:any) => <span className="text-ink-500">{formatDate(m.createdAt)}</span>,
  },
  {
    key: "quantity",
    header: "Quantity",
    align: "right",
    render: (m:any) => (
      <span
        className={`font-mono tabular-nums ${m.quantity < 0 ? "text-danger-600" : "text-success-600"}`}
      >
        {m.quantity > 0 ? `+${m.quantity}` : m.quantity}
      </span>
    ),
  },
];

export default function StockMovementsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Stock movements"
        description="A running ledger of every unit received, sold, adjusted, or returned."
      />
      <Card>
        <DataTable
          columns={columns}
          rows={stockMovements}
          rowKey={(m:any) => m.id}
          emptyTitle="No stock movements yet"
          emptyDescription="Movements are logged automatically from purchase orders and sales."
        />
      </Card>
    </div>
  );
}
