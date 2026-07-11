import express from "express"
import { organizationRouter } from "./organization";
import { userRouter } from "./user";
import { supplierRouter } from "./supplier";

import { brandRouter } from "./brand";
import { productRouter } from "./product";
import { productVariantsRouter } from "./product-Variants";
import { purchaseOrderRouter } from "./purchaseOrder";
import { purchaseOrderItemRouter } from "./purchaseOrderItem";
import { saleRouter } from "./sale";
import { stockMovementsRouter } from "./stockMovements";
import { categoriesRouter } from "./categories";
import cookieParser from "cookie-parser"
const app=express();
app.use(cookieParser())
app.use(express.json())

app.use("/api/addOrganizations",organizationRouter)
app.use("/api/user",userRouter)
app.use("/api/addSupplier",supplierRouter);

app.use("/api/addBrand",brandRouter)
app.use("/api/addProduct",productRouter)
app.use("/api/addProductVariants",productVariantsRouter);
app.use("/api/addPurchaseOrder",purchaseOrderRouter);
app.use("/api/addPurchaseOrderItem",purchaseOrderItemRouter);
app.use("/api/addSale",saleRouter)
app.use("/api/addStockMovement",stockMovementsRouter);
app.use("/api/addCategeories",categoriesRouter)

app.listen(3001)