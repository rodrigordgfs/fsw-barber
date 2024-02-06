import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const barbershops = await prisma.barbershop.findMany({
    orderBy: { visits: "desc" },
    include: { rates: true },
    cacheStrategy: { ttl: 60 },
  });

  return barbershops;
});
