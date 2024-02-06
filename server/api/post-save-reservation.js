import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const reservation = await prisma.reservations.create({
    data: {
      ...body,
    },
    cacheStrategy: { ttl: 60 },
  });

  return reservation;
});
