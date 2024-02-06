import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const { barbershopId } = getQuery(event);

  const barbershop = await prisma.barbershop.findUnique({
    where: { id: barbershopId },
    cacheStrategy: { ttl: 60 },
  });

  const quantity = barbershop.visits + 1;

  const updatedBarbershop = await prisma.barbershop.update({
    where: { id: barbershopId },
    data: { visits: quantity },
    cacheStrategy: { ttl: 60 },
  });

  return updatedBarbershop;
});
