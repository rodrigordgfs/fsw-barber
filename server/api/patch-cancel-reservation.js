import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { reservationId } = getQuery(event);

  const reservation = await prisma.reservations.update({
    where: {
      id: reservationId,
    },
    data: {
      status: "CANCELED",
    },
  });

  return reservation;
});
