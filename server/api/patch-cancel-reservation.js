import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const { reservationId } = getQuery(event);

  const reservation = await prisma.reservations.update({
    where: {
      id: reservationId,
    },
    data: {
      status: "CANCELED",
    },
    cacheStrategy: { ttl: 60 },
  });

  return reservation;
});
