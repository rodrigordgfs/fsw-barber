-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RESERVED', 'CONFIRMED', 'CANCELED');

-- AlterTable
ALTER TABLE "Reservations" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'RESERVED';
