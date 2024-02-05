import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const reservation = await prisma.reservations.create({
    data: {
      ...body,
    },
  });

  return reservation;
});
