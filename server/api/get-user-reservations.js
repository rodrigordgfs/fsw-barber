import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);

  const reservation = await prisma.reservations.findMany({
    orderBy: { createdAt: "desc" },
    include: { barbershop: true, service: true },
    where: {
      userId,
    },
    cacheStrategy: { ttl: 60 },
  });

  return reservation[0] || {};
});
