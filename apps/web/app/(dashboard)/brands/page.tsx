"use client";

import { Plus } from "lucide-react";
import { Button, Card, Column, DataTable, PageHeader } from "@repo/ui";
import type { Brand } from "@repo/types";
import { brands, products } from "@/lib/mock-data";

const columns: Column<Brand>[] = [
  { key: "name", header: "Brand", render: (b) => <span className="font-medium text-ink">{b.name}</span> },
  {
    key: "products",
    header: "Products",
    align: "right",
    render: (b) => (
      <span className="font-mono tabular-nums text-ink">
        {products.filter((p) => p.brandId === b.id).length}
      </span>
    ),
  },
];

export default function BrandsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Brands"
        description="Brands owned or distributed by this organization."
        action={
          <Button size="md">
            <Plus size={16} /> Add brand
          </Button>
        }
      />
      <Card>
        <DataTable
          columns={columns}
          rows={brands}
          rowKey={(b) => b.id}
          emptyTitle="No brands yet"
          emptyDescription="Add a brand to start tagging products."
        />
      </Card>
    </div>
  );
}
