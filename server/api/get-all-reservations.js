import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);

  const reservations = await prisma.reservations.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      barbershop: {
        include: { phones: true },
      },
      service: true,
    },
    where: {
      userId,
    },
    cacheStrategy: { ttl: 60 },
  });

  return reservations;
});
