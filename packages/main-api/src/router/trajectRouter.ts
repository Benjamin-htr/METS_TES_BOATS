// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { createTrajectSchema } from "@pnpm-monorepo/schemas";
import { prisma } from "../lib/prismaClient";

export const trajectRouter = trpc.router({
  //permet de créer un trajet
  createTraject: trpc.procedure.input(createTrajectSchema).mutation(({ input }) => {
    const creationTraject = prisma.traject.create({
      data: {
        Destination: {
          create: {
            latitude: input.latitudeDestination,
            longitude: input.longitudeDestination,
          },
        },
        User: {
          connect: {
            id: input.userId,
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
        creationTraject,
      },
    };
  }),
  getTraject: trpc.procedure.query(({ ctx }) => {
    return prisma.traject.findUnique({
      where: {
        id: ctx.user?.id,
      },
    });
  }),
});
