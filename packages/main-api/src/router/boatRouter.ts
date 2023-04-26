// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { getBoatSchema, updateBoatPosition } from "@pnpm-monorepo/schemas";
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
