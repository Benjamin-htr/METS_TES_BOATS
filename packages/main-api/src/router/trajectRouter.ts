import { createTrajectSchema, editTrajectSchema } from "@pnpm-monorepo/schemas";
import { TRPCError } from "@trpc/server";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { boatIsAvailable } from "../services/boat.service";

export const trajectRouter = trpc.router({
  //permet de créer un trajet
  create: isAuthorizedProcedure.input(createTrajectSchema).mutation(async ({ input, ctx }) => {
    const isAvailable = await boatIsAvailable(parseInt(input.boatId), ctx);

    if (!isAvailable) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Boat is not available",
      });
    }

    return ctx.prisma.traject.create({
      data: {
        name: input.name,
        latitude: input.latitudeDestination,
        longitude: input.longitudeDestination,
        User: {
          connect: {
            id: ctx.user?.id,
          },
        },
        Boat: {
          connect: {
            id: parseInt(input.boatId),
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

  edit: isAuthorizedProcedure.input(editTrajectSchema).mutation(async ({ input, ctx }) => {
    return ctx.prisma.traject.update({
      where: {
        id: input.trajectId,
      },
      data: {
        name: input.name,
      },
    });
  }),
});
