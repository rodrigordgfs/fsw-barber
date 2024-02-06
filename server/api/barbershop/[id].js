import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: { rates: true, phones: true, services: true, days: true },
    cacheStrategy: { ttl: 60 },
  });

  return barbershop;
});
