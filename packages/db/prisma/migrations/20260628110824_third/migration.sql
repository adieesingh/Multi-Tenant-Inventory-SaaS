/*
  Warnings:

  - Changed the type of `totalAmount` on the `Sales` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "totalAmount",
ADD COLUMN     "totalAmount" INTEGER NOT NULL;
