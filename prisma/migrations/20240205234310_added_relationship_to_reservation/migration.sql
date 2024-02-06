/*
  Warnings:

  - A unique constraint covering the columns `[serviceId]` on the table `Reservations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceId` to the `Reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservations" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reservations_serviceId_key" ON "Reservations"("serviceId");

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
