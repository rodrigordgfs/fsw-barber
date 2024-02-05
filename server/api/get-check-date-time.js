import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { barbershopId, date, time } = getQuery(event);

  const day = await prisma.reservations.findMany({
    where: {
      barbershopId,
      date,
      time,
    },
  });

  return !day[0];
});
