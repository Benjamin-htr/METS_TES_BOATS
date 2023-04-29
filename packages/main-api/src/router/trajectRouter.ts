import { createTrajectSchema } from "@pnpm-monorepo/schemas";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { isAuthorizedProcedure } from "../middleware/isAuthorized";

export const trajectRouter = trpc.router({
  //permet de créer un trajet
  create: isAuthorizedProcedure.input(createTrajectSchema).mutation(({ input, ctx }) => {
    const traject = prisma.traject.create({
      data: {
        latitude: input.latitudeDestination,
        longitude: input.longitudeDestination,
        User: {
          connect: {
            id: ctx.user?.id,
          },
        },
        Boat: {
          connect: {
            id: input.boatId,
          },
        },
        Wind: {
          create: {
            speed: 10,
            direction: 2,
          },
        },
        Wave: {
          create: {
            height: 0.5,
            frequency: 5,
          },
        },
      },
    });
    return {
      status: "success",
      data: {
        traject,
      },
    };
  }),
  getAll: isAuthorizedProcedure.query(({ ctx }) => {
    return prisma.traject.findMany({
      where: {
        userId: ctx.user?.id,
      },
      include: {
        Boat: true,
        Wind: true,
        Wave: true,
      },
    });
  }),
});
