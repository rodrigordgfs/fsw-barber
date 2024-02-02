/*
  Warnings:

  - You are about to alter the column `address` on the `Barbershop` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(55)`.

*/
-- AlterTable
ALTER TABLE "Barbershop" ALTER COLUMN "address" SET DATA TYPE VARCHAR(55);
