import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);

  const barbershops = await prisma.barbershop.findMany({
    orderBy: { name: "desc" },
    include: { rates: true },
    where: {
      name: {
        contains: query,
      },
    },
    cacheStrategy: { ttl: 60 },
  });

  return barbershops;
});
