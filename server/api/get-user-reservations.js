import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);

  const reservation = await prisma.reservations.findMany({
    orderBy: { createdAt: "desc" },
    include: { barbershop: true, service: true },
    where: {
      userId,
    },
  });

  return reservation[0] || {};
});
