import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { barbershopId, dayOfWeek } = getQuery(event);

  const day = await prisma.days.findMany({
    where: {
      barbershopId,
      day: dayOfWeek,
    },
  });

  return day[0];
});
