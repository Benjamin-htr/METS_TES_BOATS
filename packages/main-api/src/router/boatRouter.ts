// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { changeBoatSpeed, createBoatSchema, editBoatSchema, getBoatSchema } from "@pnpm-monorepo/schemas";
import { isAuthorizedProcedure } from "../middleware/isAuthorized";

export function sum(a: number, b: number): number {
  return a + b;
}

export const boatRouter = trpc.router({
  get: isAuthorizedProcedure.input(getBoatSchema).query(({ input, ctx }) => {
    return ctx.prisma.boat.findUnique({
      where: {
        id: input.boatId,
      },
      include: {
        BoatModel: true,
      },
    });
  }),

  getAll: isAuthorizedProcedure.query(({ ctx }) => {
    return ctx.prisma.boat.findMany({
      where: {
        userId: ctx.user?.id,
      },
      include: {
        BoatModel: true,
        Traject: true,
      },
    });
  }),

  delete: isAuthorizedProcedure.input(getBoatSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.boat.delete({
      where: {
        id: input.boatId,
      },
    });
  }),

  create: isAuthorizedProcedure.input(createBoatSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.boat.create({
      data: {
        name: input.name,
        latitude: 23,
        longitude: -173,

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
      },
    });
  }),

  edit: isAuthorizedProcedure.input(editBoatSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.boat.update({
      where: {
        id: input.boatId,
      },
      data: {
        name: input.name,
      },
    });
  }),

  changeSpeed: isAuthorizedProcedure.input(changeBoatSpeed).mutation(({ input, ctx }) => {
    return ctx.prisma.boat.update({
      where: {
        id: input.boatId,
      },
      data: {
        Speed: {
          create: {
            speed: input.speed,
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
