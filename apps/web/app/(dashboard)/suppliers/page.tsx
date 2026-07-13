"use client";

import { Plus } from "lucide-react";
import { Button, Card, Column, DataTable, PageHeader } from "@repo/ui";
import type { Supplier } from "@repo/types";
import { purchaseOrders, suppliers } from "@/lib/mock-data";

const columns: Column<Supplier>[] = [
  {
    key: "name",
    header: "Supplier",
    render: (s) => (
      <div>
        <p className="font-medium text-ink">{s.name}</p>
        <p className="text-[12px] text-ink-400">{s.email ?? "No email on file"}</p>
      </div>
    ),
  },
  { key: "phone", header: "Phone", render: (s) => <span className="text-ink-500">{s.phone}</span> },
  { key: "address", header: "Address", render: (s) => <span className="text-ink-500">{s.address}</span> },
  {
    key: "gst",
    header: "GST number",
    render: (s) => <span className="font-mono text-[12px] text-ink-500">{s.gstNumber}</span>,
  },
  {
    key: "orders",
    header: "Purchase orders",
    align: "right",
    render: (s) => (
      <span className="font-mono tabular-nums text-ink">
        {purchaseOrders.filter((po) => po.supplierId === s.id).length}
      </span>
    ),
  },
];

export default function SuppliersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Procurement"
        title="Suppliers"
        description={`${suppliers.length} suppliers connected to this organization.`}
        action={
          <Button size="md">
            <Plus size={16} /> Add supplier
          </Button>
        }
      />
      <Card>
        <DataTable
          columns={columns}
          rows={suppliers}
          rowKey={(s) => s.id}
          emptyTitle="No suppliers yet"
          emptyDescription="Add a supplier to start creating purchase orders."
        />
      </Card>
    </div>
  );
}
