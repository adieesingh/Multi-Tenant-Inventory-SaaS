import type {
  Brand,
  Category,
  DashboardStats,
  Organization,
  Product,
  PurchaseOrder,
  Sale,
  StockMovement,
  Supplier,
  User,
} from "@multi-inv/types";

export const currentOrg: Organization = {
  id: "org_feat_system",
  name: "Feat System Retail",
  phoneNumber: "+91 98200 00000",
  username: "featsystem",
  address: "Andheri East, Mumbai, MH",
  createdAt: "2025-04-01T00:00:00Z",
  updatedAt: "2026-06-01T00:00:00Z",
};

export const currentUser: User = {
  id: 1,
  name: "Adarsh Singh",
  email: "adarsh@featsystem.com",
  role: "ADMIN",
  organizationId: currentOrg.id,
};

export const brands: Brand[] = [
  { id: 1, name: "Northline", organizationId: currentOrg.id },
  { id: 2, name: "Cedar & Co.", organizationId: currentOrg.id },
  { id: 3, name: "Voltform", organizationId: currentOrg.id },
];

export const categories: Category[] = [
  { id: 1, name: "Footwear", organizationId: currentOrg.id },
  { id: 2, name: "Apparel", organizationId: currentOrg.id },
  { id: 3, name: "Electronics", organizationId: currentOrg.id },
];

export const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Raghav Textiles Pvt Ltd",
    email: "orders@raghavtextiles.in",
    phone: "+91 98765 43210",
    address: "MIDC, Andheri, Mumbai",
    gstNumber: "27AAECR1234F1Z5",
    organizationId: currentOrg.id,
    createdAt: "2025-05-12T00:00:00Z",
    updatedAt: "2026-05-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Voltform Electronics Supply",
    email: "sales@voltform.com",
    phone: "+91 90000 11223",
    address: "Powai, Mumbai",
    gstNumber: "27AACCV5678H1Z2",
    organizationId: currentOrg.id,
    createdAt: "2025-06-20T00:00:00Z",
    updatedAt: "2026-04-18T00:00:00Z",
  },
  {
    id: 3,
    name: "Cedar & Co. Distribution",
    email: null,
    phone: "+91 88888 22334",
    address: "Bhiwandi, Thane",
    gstNumber: "27AADCC9012K1Z8",
    organizationId: currentOrg.id,
    createdAt: "2025-08-02T00:00:00Z",
    updatedAt: "2026-03-11T00:00:00Z",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Trail Runner Sneaker",
    sku: "NL-TRS-001",
    description: "Lightweight trail running sneaker",
    brandId: 1,
    brand: brands[0],
    categoryId: 1,
    category: categories[0],
    costPrice: 1450,
    sellingPrice: 2699,
    organizationId: currentOrg.id,
    createdAt: "2025-09-01T00:00:00Z",
    updatedAt: "2026-06-10T00:00:00Z",
    variants: [
      { id: 1, productId: 1, size: "8", color: "Charcoal", stockQuantity: 34, createdAt: "2025-09-01T00:00:00Z", updatedAt: "2026-06-10T00:00:00Z" },
      { id: 2, productId: 1, size: "9", color: "Charcoal", stockQuantity: 6, createdAt: "2025-09-01T00:00:00Z", updatedAt: "2026-06-10T00:00:00Z" },
      { id: 3, productId: 1, size: "10", color: "Sand", stockQuantity: 0, createdAt: "2025-09-01T00:00:00Z", updatedAt: "2026-06-10T00:00:00Z" },
    ],
  },
  {
    id: 2,
    name: "Everyday Crewneck",
    sku: "CD-CRW-014",
    description: "Cotton-blend crewneck sweatshirt",
    brandId: 2,
    brand: brands[1],
    categoryId: 2,
    category: categories[1],
    costPrice: 520,
    sellingPrice: 999,
    organizationId: currentOrg.id,
    createdAt: "2025-10-14T00:00:00Z",
    updatedAt: "2026-06-08T00:00:00Z",
    variants: [
      { id: 4, productId: 2, size: "M", color: "Olive", stockQuantity: 58, createdAt: "2025-10-14T00:00:00Z", updatedAt: "2026-06-08T00:00:00Z" },
      { id: 5, productId: 2, size: "L", color: "Olive", stockQuantity: 21, createdAt: "2025-10-14T00:00:00Z", updatedAt: "2026-06-08T00:00:00Z" },
    ],
  },
  {
    id: 3,
    name: "USB-C Fast Charger 65W",
    sku: "VF-CHG-065",
    description: "GaN fast charger, 65W, dual port",
    brandId: 3,
    brand: brands[2],
    categoryId: 3,
    category: categories[2],
    costPrice: 610,
    sellingPrice: 1199,
    organizationId: currentOrg.id,
    createdAt: "2025-11-02T00:00:00Z",
    updatedAt: "2026-06-11T00:00:00Z",
    variants: [
      { id: 6, productId: 3, size: null, color: "Black", stockQuantity: 4, createdAt: "2025-11-02T00:00:00Z", updatedAt: "2026-06-11T00:00:00Z" },
    ],
  },
  {
    id: 4,
    name: "Insulated Steel Bottle 1L",
    sku: "NL-BTL-500",
    description: null,
    brandId: 1,
    brand: brands[0],
    categoryId: 3,
    category: categories[2],
    costPrice: 340,
    sellingPrice: 699,
    organizationId: currentOrg.id,
    createdAt: "2026-01-06T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    variants: [
      { id: 7, productId: 4, size: null, color: "Slate", stockQuantity: 112, createdAt: "2026-01-06T00:00:00Z", updatedAt: "2026-06-01T00:00:00Z" },
    ],
  },
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 1001,
    supplierId: 1,
    supplierName: suppliers[0].name,
    totalAmount: 87000,
    status: "RECEIVED",
    organizationId: currentOrg.id,
    createdAt: "2026-05-02T00:00:00Z",
    updatedAt: "2026-05-09T00:00:00Z",
    items: [
      { id: 1, purchaseOrderId: 1001, productVariantId: 4, productName: "Everyday Crewneck", variantLabel: "M / Olive", quantity: 60, unitCost: 520, subtotal: 31200 },
      { id: 2, purchaseOrderId: 1001, productVariantId: 5, productName: "Everyday Crewneck", variantLabel: "L / Olive", quantity: 25, unitCost: 520, subtotal: 13000 },
    ],
  },
  {
    id: 1002,
    supplierId: 2,
    supplierName: suppliers[1].name,
    totalAmount: 24400,
    status: "APPROVED",
    organizationId: currentOrg.id,
    createdAt: "2026-06-18T00:00:00Z",
    updatedAt: "2026-06-19T00:00:00Z",
    items: [
      { id: 3, purchaseOrderId: 1002, productVariantId: 6, productName: "USB-C Fast Charger 65W", variantLabel: "Black", quantity: 40, unitCost: 610, subtotal: 24400 },
    ],
  },
  {
    id: 1003,
    supplierId: 1,
    supplierName: suppliers[0].name,
    totalAmount: 15400,
    status: "PENDING",
    organizationId: currentOrg.id,
    createdAt: "2026-07-05T00:00:00Z",
    updatedAt: "2026-07-05T00:00:00Z",
    items: [
      { id: 4, purchaseOrderId: 1003, productVariantId: 3, productName: "Trail Runner Sneaker", variantLabel: "10 / Sand", quantity: 20, unitCost: 1450 / 2, subtotal: 15400 },
    ],
  },
  {
    id: 1004,
    supplierId: 3,
    supplierName: suppliers[2].name,
    totalAmount: 9600,
    status: "CANCELLED",
    organizationId: currentOrg.id,
    createdAt: "2026-04-11T00:00:00Z",
    updatedAt: "2026-04-14T00:00:00Z",
    items: [
      { id: 5, purchaseOrderId: 1004, productVariantId: 7, productName: "Insulated Steel Bottle 1L", variantLabel: "Slate", quantity: 30, unitCost: 320, subtotal: 9600 },
    ],
  },
];

export const sales: Sale[] = [
  { id: 1, invoiceNumber: "INV-2607-014", customerName: "Meera Kulkarni", totalAmount: 2699, organizationsId: currentOrg.id, createdAt: "2026-07-09T10:20:00Z", updatedAt: "2026-07-09T10:20:00Z" },
  { id: 2, invoiceNumber: "INV-2607-013", customerName: "Arjun Rao", totalAmount: 1998, organizationsId: currentOrg.id, createdAt: "2026-07-08T15:45:00Z", updatedAt: "2026-07-08T15:45:00Z" },
  { id: 3, invoiceNumber: "INV-2607-012", customerName: "Sana Sheikh", totalAmount: 1199, organizationsId: currentOrg.id, createdAt: "2026-07-08T09:05:00Z", updatedAt: "2026-07-08T09:05:00Z" },
  { id: 4, invoiceNumber: "INV-2607-011", customerName: "Devansh Patil", totalAmount: 699, organizationsId: currentOrg.id, createdAt: "2026-07-07T18:12:00Z", updatedAt: "2026-07-07T18:12:00Z" },
  { id: 5, invoiceNumber: "INV-2607-010", customerName: "Ritika Nair", totalAmount: 999, organizationsId: currentOrg.id, createdAt: "2026-07-06T12:30:00Z", updatedAt: "2026-07-06T12:30:00Z" },
];

export const stockMovements: StockMovement[] = [
  { id: 1, productVariantId: 4, productName: "Everyday Crewneck", variantLabel: "M / Olive", type: "PURCHASE", quantity: 60, purchaseOrderId: 1001, organizationId: currentOrg.id, createdAt: "2026-05-09T00:00:00Z" },
  { id: 2, productVariantId: 2, productName: "Trail Runner Sneaker", variantLabel: "9 / Charcoal", type: "SALE", quantity: -3, purchaseOrderId: 0, organizationId: currentOrg.id, createdAt: "2026-07-08T00:00:00Z" },
  { id: 3, productVariantId: 6, productName: "USB-C Fast Charger 65W", variantLabel: "Black", type: "SALE", quantity: -2, purchaseOrderId: 0, organizationId: currentOrg.id, createdAt: "2026-07-08T00:00:00Z" },
  { id: 4, productVariantId: 3, productName: "Trail Runner Sneaker", variantLabel: "10 / Sand", type: "ADJUSTMENT", quantity: -4, purchaseOrderId: 0, organizationId: currentOrg.id, createdAt: "2026-07-06T00:00:00Z" },
  { id: 5, productVariantId: 7, productName: "Insulated Steel Bottle 1L", variantLabel: "Slate", type: "RETURN", quantity: 2, purchaseOrderId: 0, organizationId: currentOrg.id, createdAt: "2026-07-05T00:00:00Z" },
];

export const dashboardStats: DashboardStats = {
  totalProducts: products.length,
  totalStockUnits: products.flatMap((p) => p.variants).reduce((sum, v) => sum + v.stockQuantity, 0),
  lowStockCount: products.flatMap((p) => p.variants).filter((v) => v.stockQuantity > 0 && v.stockQuantity <= 8).length,
  openPurchaseOrders: purchaseOrders.filter((po) => po.status === "PENDING" || po.status === "APPROVED").length,
  monthRevenue: sales.reduce((sum, s) => sum + s.totalAmount, 0),
  monthOrders: sales.length,
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(iso),
  );
}

export function stockTone(qty: number): "success" | "warning" | "danger" {
  if (qty <= 0) return "danger";
  if (qty <= 8) return "warning";
  return "success";
}

export function poTone(status: PurchaseOrder["status"]): "success" | "warning" | "danger" | "neutral" {
  switch (status) {
    case "RECEIVED":
      return "success";
    case "APPROVED":
      return "warning";
    case "CANCELLED":
      return "danger";
    default:
      return "neutral";
  }
}
