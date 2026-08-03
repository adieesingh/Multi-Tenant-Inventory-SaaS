import express from "express";
import { organizationRouter } from "./router/organization";
import dotenv from "dotenv";
import { userRouter } from "./router/user";
import { supplierRouter } from "./router/supplier";
import { brandRouter } from "./router/brand";
import { productRouter } from "./router/product";
import { productVariantsRouter } from "./router/product-Variants";
import { purchaseOrderRouter } from "./router/purchaseOrder";
import { purchaseOrderItemRouter } from "./router/purchaseOrderItem";
import { saleRouter } from "./router/sale";
import { stockMovementsRouter } from "./router/stockMovements";
import { categoriesRouter } from "./router/categories";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
dotenv.config();
app.use("/api/addOrganizations", organizationRouter);
app.use("/api/user", userRouter);
app.use("/api/addSupplier", supplierRouter);
app.use("/api/addBrand", brandRouter);
app.use("/api/addProduct", productRouter);
app.use("/api/addProductVariants", productVariantsRouter);
app.use("/api/addPurchaseOrder", purchaseOrderRouter);
app.use("/api/addPurchaseOrderItem", purchaseOrderItemRouter);
app.use("/api/addSale", saleRouter);
app.use("/api/addStockMovement", stockMovementsRouter);
app.use("/api/addCategeories", categoriesRouter);

app.listen(3001);
