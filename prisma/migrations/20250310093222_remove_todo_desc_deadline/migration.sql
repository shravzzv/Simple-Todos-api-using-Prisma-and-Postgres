/*
  Warnings:

  - You are about to drop the column `deadline` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "deadline",
DROP COLUMN "description";
