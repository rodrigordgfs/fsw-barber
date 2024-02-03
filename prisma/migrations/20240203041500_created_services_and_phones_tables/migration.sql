-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "barbershopId" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
