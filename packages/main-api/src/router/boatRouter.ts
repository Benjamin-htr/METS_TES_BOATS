// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { getBoatSchema } from "@pnpm-monorepo/schemas";
import { prisma } from "../lib/prismaClient";

export const boatRouter = trpc.router({
  //retourne un boat en fonction de l'id
  getBoat: trpc.procedure.input(getBoatSchema).query(({ input }) => {
    return prisma.boat.findUnique({
      where: {
        id: input.boatId,
      },
    });
  }),

  getAllBoats: trpc.procedure.query(({ ctx }) => {
    return prisma.boat.findMany({
      where: {
        userId: ctx.user?.id,
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
