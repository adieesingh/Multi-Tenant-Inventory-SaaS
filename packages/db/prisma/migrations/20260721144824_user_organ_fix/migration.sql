/*
  Warnings:

  - You are about to drop the column `password` on the `Organizations` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Organizations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Organizations_username_key";

-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "password",
DROP COLUMN "username";
