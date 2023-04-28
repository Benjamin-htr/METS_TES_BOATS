// import { getMeHandler } from "../controllers/user.controller";
import { createBoatSchema, getBoatSchema } from "@pnpm-monorepo/schemas";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { defaultBoat } from "../services/boat.service";

export const boatRouter = trpc.router({
  get: isAuthorizedProcedure.input(getBoatSchema).query(({ input }) => {
    return prisma.boat.findUnique({
      where: {
        id: input.boatId,
      },
    });
  }),

  getAll: isAuthorizedProcedure.query(({ ctx }) => {
    return prisma.boat.findMany({
      where: {
        userId: ctx.user?.id,
      },
      include: {
        BoatModel: true,
      },
    });
  }),

  delete: isAuthorizedProcedure.input(getBoatSchema).mutation(({ input }) => {
    return prisma.boat.delete({
      where: {
        id: input.boatId,
      },
    });
  }),

  create: isAuthorizedProcedure.input(createBoatSchema).mutation(({ input, ctx }) => {
    return prisma.boat.create({
      data: {
        name: input.name,
        BoatModel: {
          connect: {
            id: parseInt(input.boatModelId),
          },
        },
        User: {
          connect: {
            id: ctx.user?.id,
          },
        },
        Coordinates: {
          create: {
            latitude: defaultBoat.latitude,
            longitude: defaultBoat.longitude,
          },
        },
      },
    });
  }),

  //   A FAIRE :
  //   getAllBoat: trpc.procedure.input(getBoatSchema).query(({ input }) => {
  //     return prisma.boat.findUnique({
  //       where: {
  //         id: input.boatId,
  //       },
  //     });
  //   }),

  //Stand by :

  //   updateBoatCoordinates: trpc.procedure.input(updateBoatPosition).query(({ input }) => {
  //     return prisma.boat.update({
  //       where: {
  //         id: input.boatId,
  //       },
  //       data: {

  //       },
  //     });
  //   }),
});
