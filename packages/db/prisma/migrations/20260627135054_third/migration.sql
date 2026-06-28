/*
  Warnings:

  - You are about to drop the column `purchase_order` on the `Stock_Movements` table. All the data in the column will be lost.
  - Changed the type of `brandId` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `categoryId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseOrderId` to the `Stock_Movements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stock_Movements" DROP CONSTRAINT "Stock_Movements_purchase_order_fkey";

-- AlterTable
ALTER TABLE "Organizations" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "brandId",
ADD COLUMN     "brandId" INTEGER NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stock_Movements" DROP COLUMN "purchase_order",
ADD COLUMN     "purchaseOrderId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Brands" ADD CONSTRAINT "Brands_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock_Movements" ADD CONSTRAINT "Stock_Movements_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "Purchase_Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
