"use client";

import { Plus } from "lucide-react";
import { Button, Card, Column, DataTable, PageHeader } from "@repo/ui";
import type { Category } from "@repo/types";
import { categories, products } from "@/lib/mock-data";

const columns: Column<Category>[] = [
  { key: "name", header: "Category", render: (c) => <span className="font-medium text-ink">{c.name}</span> },
  {
    key: "products",
    header: "Products",
    align: "right",
    render: (c) => (
      <span className="font-mono tabular-nums text-ink">
        {products.filter((p) => p.categoryId === c.id).length}
      </span>
    ),
  },
];

export default function CategoriesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Categories"
        description="Group products so they're easy to browse and report on."
        action={
          <Button size="md">
            <Plus size={16} /> Add category
          </Button>
        }
      />
      <Card>
        <DataTable
          columns={columns}
          rows={categories}
          rowKey={(c) => c.id}
          emptyTitle="No categories yet"
          emptyDescription="Create a category to start organizing products."
        />
      </Card>
    </div>
  );
}
