"use client";

import { Plus } from "lucide-react";
import { Badge, Button, Card, Column, DataTable, PageHeader } from "@repo/ui";
import type { PurchaseOrder } from "@repo/types";
import { formatCurrency, formatDate, poTone, purchaseOrders } from "@/lib/mock-data";

const columns: Column<PurchaseOrder>[] = [
  {
    key: "id",
    header: "PO number",
    render: (po) => <span className="font-mono text-ink">PO-{po.id}</span>,
  },
  {
    key: "supplier",
    header: "Supplier",
    render: (po) => <span className="text-ink-700">{po.supplierName}</span>,
  },
  {
    key: "items",
    header: "Items",
    render: (po) => <span className="text-ink-500">{po.items.length} line items</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (po) => <Badge tone={poTone(po.status)}>{po.status}</Badge>,
  },
  {
    key: "date",
    header: "Created",
    render: (po) => <span className="text-ink-500">{formatDate(po.createdAt)}</span>,
  },
  {
    key: "total",
    header: "Total",
    align: "right",
    render: (po) => (
      <span className="font-mono tabular-nums text-ink">{formatCurrency(po.totalAmount)}</span>
    ),
  },
];

export default function PurchaseOrdersPage() {
  const openCount = purchaseOrders.filter((po) => po.status === "PENDING" || po.status === "APPROVED").length;

  return (
    <div>
      <PageHeader
        eyebrow="Procurement"
        title="Purchase orders"
        description={`${openCount} orders currently open with suppliers.`}
        action={
          <Button size="md">
            <Plus size={16} /> New purchase order
          </Button>
        }
      />
      <Card>
        <DataTable
          columns={columns}
          rows={purchaseOrders}
          rowKey={(po) => po.id}
          emptyTitle="No purchase orders yet"
          emptyDescription="Create a purchase order to start receiving stock from a supplier."
        />
      </Card>
    </div>
  );
}
