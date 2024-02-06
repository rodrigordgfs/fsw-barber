import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const barbershops = await prisma.barbershop.findMany({
    orderBy: { visits: "desc" },
    include: { rates: true },
  });

  return barbershops;
});