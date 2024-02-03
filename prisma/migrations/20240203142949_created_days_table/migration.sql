/*
  Warnings:

  - Changed the type of `day` on the `Days` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado');

-- AlterTable
ALTER TABLE "Days" DROP COLUMN "day",
ADD COLUMN     "day" "Day" NOT NULL;
