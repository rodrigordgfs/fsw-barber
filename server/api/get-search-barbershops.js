import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);

  const barbershops = await prisma.barbershop.findMany({
    orderBy: { name: "desc" },
    include: { rates: true },
    where: {
      name: {
        contains: query,
      },
    },
  });

  return barbershops;
});
