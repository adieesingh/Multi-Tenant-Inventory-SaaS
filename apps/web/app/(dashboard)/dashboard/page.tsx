import { Package, Boxes, AlertTriangle, ClipboardList } from "lucide-react";
import { Badge, Card, CardBody, CardHeader, CardTitle, PageHeader, StatCard } from "@repo/ui";
import {
  currentUser,
  dashboardStats,
  formatCurrency,
  formatDate,
  poTone,
  products,
  purchaseOrders,
  sales,
  stockTone,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const lowStock = products
    .flatMap((p) => p.variants.map((v) => ({ ...v, productName: p.name, sku: p.sku })))
    .filter((v) => v.stockQuantity <= 8)
    .sort((a, b) => a.stockQuantity - b.stockQuantity);

  const recentPOs = [...purchaseOrders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back, ${currentUser.name.split(" ")[0]}`}
        description="Here's what's moving across your inventory this week."
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Active products"
          value={String(dashboardStats.totalProducts)}
          delta="Across 3 categories"
          icon={<Package size={18} />}
        />
        <StatCard
          label="Units in stock"
          value={dashboardStats.totalStockUnits.toLocaleString("en-IN")}
          delta="All variants combined"
          icon={<Boxes size={18} />}
        />
        <StatCard
          label="Low stock variants"
          value={String(dashboardStats.lowStockCount)}
          delta="At or below 8 units"
          deltaTone={dashboardStats.lowStockCount > 0 ? "down" : "neutral"}
          icon={<AlertTriangle size={18} />}
        />
        <StatCard
          label="Open purchase orders"
          value={String(dashboardStats.openPurchaseOrders)}
          delta="Pending + approved"
          icon={<ClipboardList size={18} />}
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-5">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent purchase orders</CardTitle>
            <a href="/purchase-orders" className="text-[13px] font-medium text-accent-600 hover:underline">
              View all
            </a>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-line">
              {recentPOs.map((po) => (
                <div key={po.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-[13px] font-medium text-ink">PO-{po.id}</p>
                    <p className="text-[12px] text-ink-400">{po.supplierName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[13px] tabular-nums text-ink">
                      {formatCurrency(po.totalAmount)}
                    </p>
                    <Badge tone={poTone(po.status)} className="mt-1">
                      {po.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low stock</CardTitle>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-line">
              {lowStock.length === 0 && (
                <p className="px-5 py-6 text-center text-[13px] text-ink-400">
                  Every variant is comfortably stocked.
                </p>
              )}
              {lowStock.map((v) => (
                <div key={v.id} className="flex items-center justify-between px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-ink">{v.productName}</p>
                    <p className="text-[12px] text-ink-400">
                      {[v.size, v.color].filter(Boolean).join(" / ") || "Default"}
                    </p>
                  </div>
                  <Badge tone={stockTone(v.stockQuantity)}>{v.stockQuantity} left</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Recent sales</CardTitle>
          <a href="/sales" className="text-[13px] font-medium text-accent-600 hover:underline">
            View all
          </a>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-line">
            {sales.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="font-mono text-[13px] text-ink">{s.invoiceNumber}</p>
                  <p className="text-[12px] text-ink-400">{s.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[13px] tabular-nums text-ink">
                    {formatCurrency(s.totalAmount)}
                  </p>
                  <p className="text-[12px] text-ink-400">{formatDate(s.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
