import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const { barbershopId, date, time } = getQuery(event);

  const day = await prisma.reservations.findMany({
    where: {
      barbershopId,
      date,
      time,
      status: {
        notIn: ["DONE", "CANCELED"],
      },
    },
    cacheStrategy: { ttl: 60 },
  });

  return !day[0];
});
