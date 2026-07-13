import { http } from "./http";
import type {
  Brand,
  Category,
  Organization,
  Product,
  ProductVariant,
  PurchaseOrder,
  PurchaseOrderItem,
  Sale,
  StockMovement,
  Supplier,
  User,
} from "@multi-inv/types";

type Id = string | number;

function createResource<T>(basePath: string) {
  return {
    list: () => http.get<T[]>(basePath),
    get: (id: Id) => http.get<T>(`${basePath}/${id}`),
    create: (data: Partial<T>) => http.post<T>(basePath, data),
    update: (id: Id, data: Partial<T>) => http.patch<T>(`${basePath}/${id}`, data),
    remove: (id: Id) => http.delete<void>(`${basePath}/${id}`),
  };
}

// Organizations and Sales only expose GET / POST / PATCH on the backend
// (no DELETE), so those two clients omit `remove`.
function createResourceNoDelete<T>(basePath: string) {
  const { remove, ...rest } = createResource<T>(basePath);
  return rest;
}

// Paths match your Express routes exactly — update here if a route changes,
// every page that uses these clients picks it up automatically.
export const organizationsApi = createResourceNoDelete<Organization>("/api/addOrganizations");
export const usersApi = createResource<User>("/api/user");
export const suppliersApi = createResource<Supplier>("/api/addSupplier");
export const brandsApi = createResource<Brand>("/api/addBrand");
export const productsApi = createResource<Product>("/api/addProduct");
export const productVariantsApi = createResource<ProductVariant>("/api/addProductVariants");
export const purchaseOrdersApi = createResource<PurchaseOrder>("/api/addPurchaseOrder");
export const purchaseOrderItemsApi = createResource<PurchaseOrderItem>("/api/addPurchaseOrderItem");
export const salesApi = createResourceNoDelete<Sale>("/api/addSale");
export const stockMovementsApi = createResource<StockMovement>("/api/addStockMovement");
export const categoriesApi = createResource<Category>("/api/addCategeories");
