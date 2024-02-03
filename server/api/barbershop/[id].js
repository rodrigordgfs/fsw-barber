import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: { rates: true, phones: true, services: true, days: true },
  });

  return barbershop;
});
