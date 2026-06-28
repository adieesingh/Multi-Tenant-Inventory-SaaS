import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/;

export const OrganizationSchema = z.object({
  name: z.string(),
  username: z.email(),
  phoneNumber: z.string().regex(phoneRegex),
  address: z.string(),
  password: z.string(),
});

export const UserSchmea = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(8, { error: "Min 8 Charachetr should be there" }),
  role: z.enum(["OWNER", "MANAGER", "STAFF"], {
    error: "Only 3 role are there",
  }),
});

export const SupplierSchema = z.object({
  name: z.string().min(4, { error: "naming should be more than 4 words" }),
  email: z.email({ error: "Email is not valid" }),
  phone: z.string().regex(phoneRegex, { error: "Invalid number" }),
  address: z.string(),
  gstNumber: z
    .string()
    .min(15)
    .max(15)
    .regex(gstRegex, { error: "Invalid gstin Format.min" }),
});
export const OrderSchema = z.object({
  name: z.string(),
  organizationId: z.number(),
});
export const BrandsSchema = z.object({
  name: z.string(),
  
});

export const ProductsSchema = z.object({
  name: z.string().min(3,{error:"Min 3 letter should be there"}),
  sku: z.string().optional(),
  description: z.string().optional(),
  brandId: z.number(),
  categorytId: z.number(),
  costPrice:z.number(),
  sellingPrice: z.number(),
  organizationId: z.string(),
});

export const ProductVariantsSchema = z.object({
  productId: z.number(),
  size: z.string(),
  color: z.string(),
  stockQuantity: z.number(),
  organizationId: z.string(),
});

export const PurchaseOrderSchema = z.object({
  supplierId: z.number(),
  totalAmount: z.number(),
  status: z.enum(["PENDING", "RECEIVED", "CANCELLED"], {
    error: "Only 3 option available",
  }),
  organizationId: z.string()
  .optional(),
});

export const PurchaseOrderItemSchema = z.object({
  purchaseOrderId: z.number(),
  productVariantId: z.number(),
  quantity: z.number(),
  unitCost: z.number(),
  subtotal: z.number(),
});
export const SalesSchema = z.object({
  invoiceNumber: z.string(),
  customerName: z.string(),
  totalAmount: z.number(),
  organizationsId: z.number(),
});

export const StockMovementsSchema = z.object({
  productVariantId: z.number(),
  type: z.enum(["PURCHASE", "SALE", "ADJUSTMENT", "RETURN"], {
    error: "Invalid value,Only 4 value there",
  }),
  quantity: z.number(),
  purchaseOrderId: z.number(),
  organizationId: z.number(),
});
export const CategoriesSchema = z.object({
  name: z.string(),
 organizationId:z.string().optional()
});
