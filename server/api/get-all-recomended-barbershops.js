import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const barbershops = await prisma.barbershop.findMany({
    orderBy: { name: "desc" },
    where: { recommended: true },
    include: { rates: true },
  });

  return barbershops;
});
