import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const { barbershopId, dayOfWeek } = getQuery(event);

  const day = await prisma.days.findMany({
    where: {
      barbershopId,
      day: dayOfWeek,
    },
    cacheStrategy: { ttl: 60 },
  });

  return day[0];
});
