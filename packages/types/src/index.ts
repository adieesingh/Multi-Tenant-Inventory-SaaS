// Shared domain types — mirrors apps/backend/prisma/schema.prisma
// Kept independent of Prisma's generated client so the frontend
// package never needs a DB connection to type-check.

export type Role = "OWNER" | "ADMIN" | "STAFF";

export type PurchaseOrderStatus = "PENDING" | "APPROVED" | "RECEIVED" | "CANCELLED";

export type StockMovementType = "PURCHASE" | "SALE" | "ADJUSTMENT" | "RETURN";

export interface Organization {
  id: string;
  name: string;
  phoneNumber: string;
  username: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  organizationId: string;
}

export interface Supplier {
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  address: string;
  gstNumber: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  organizationId: string;
}

export interface Brand {
  id: number;
  name: string;
  organizationId: string;
}

export interface ProductVariant {
  id: number;
  productId: number;
  size?: string | null;
  color?: string | null;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  sku?: string | null;
  description?: string | null;
  brandId: number;
  brand?: Brand;
  categoryId: number;
  category?: Category;
  costPrice: number;
  sellingPrice: number;
  organizationId: string;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderItem {
  id: number;
  purchaseOrderId: number;
  productVariantId: number;
  productName: string;
  variantLabel: string;
  quantity: number;
  unitCost: number;
  subtotal: number;
}

export interface PurchaseOrder {
  id: number;
  supplierId: number;
  supplierName: string;
  totalAmount: number;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: number;
  invoiceNumber: string;
  customerName: string;
  totalAmount: number;
  organizationsId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: number;
  productVariantId: number;
  productName: string;
  variantLabel: string;
  type: StockMovementType;
  quantity: number;
  purchaseOrderId: number;
  organizationId: string;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalStockUnits: number;
  lowStockCount: number;
  openPurchaseOrders: number;
  monthRevenue: number;
  monthOrders: number;
}
