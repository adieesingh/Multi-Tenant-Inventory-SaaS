"use client";

import { Plus } from "lucide-react";
import { Badge, Button, Card, Column, DataTable, PageHeader } from "@repo/ui";
import type { Product } from "@repo/types";
import { formatCurrency, products, stockTone } from "@/lib/mock-data";

function totalStock(p: Product) {
  return p.variants.reduce((sum, v) => sum + v.stockQuantity, 0);
}

const columns: Column<Product>[] = [
  {
    key: "name",
    header: "Product",
    render: (p) => (
      <div>
        <p className="font-medium text-ink">{p.name}</p>
        <p className="font-mono text-[12px] text-ink-400">{p.sku ?? "No SKU"}</p>
      </div>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (p) => <span className="text-ink-500">{p.category?.name ?? "—"}</span>,
  },
  {
    key: "brand",
    header: "Brand",
    render: (p) => <span className="text-ink-500">{p.brand?.name ?? "—"}</span>,
  },
  {
    key: "variants",
    header: "Variants",
    render: (p) => (
      <div className="flex flex-wrap gap-1">
        {p.variants.map((v) => (
          <Badge key={v.id} tone={stockTone(v.stockQuantity)}>
            {[v.size, v.color].filter(Boolean).join("/") || "Default"} · {v.stockQuantity}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    key: "stock",
    header: "Total stock",
    align: "right",
    render: (p) => <span className="font-mono tabular-nums text-ink">{totalStock(p)}</span>,
  },
  {
    key: "price",
    header: "Selling price",
    align: "right",
    render: (p) => (
      <span className="font-mono tabular-nums text-ink">{formatCurrency(p.sellingPrice)}</span>
    ),
  },
];

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        description={`${products.length} products across all variants and warehouses.`}
        action={
          <Button size="md">
            <Plus size={16} /> Add product
          </Button>
        }
      />
      <Card>
        <DataTable
          columns={columns}
          rows={products}
          rowKey={(p) => p.id}
          emptyTitle="No products yet"
          emptyDescription="Add your first product to start tracking stock."
        />
      </Card>
    </div>
  );
}
