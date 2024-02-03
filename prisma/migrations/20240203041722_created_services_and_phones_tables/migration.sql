/*
  Warnings:

  - Added the required column `description` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Phones" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "barbershopId" TEXT NOT NULL,

    CONSTRAINT "Phones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
