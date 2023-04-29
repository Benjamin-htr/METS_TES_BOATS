// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { getBoatSchema, updateBoatPosition, getAllBoatFromUser } from "@pnpm-monorepo/schemas";
import { prisma } from "../lib/prismaClient";

export function sum(a: number, b: number): number {
  return a + b;
}

export const boatRouter = trpc.router({
  //retourne un boat en fonction de l'id
  getBoat: trpc.procedure.input(getBoatSchema).query(({ input }) => {
    return prisma.boat.findUnique({
      where: {
        id: input.boatId,
      },
    });
  }),

  getAllBoat: trpc.procedure.input(getAllBoatFromUser).query(({ input }) => {
    return prisma.boat.findMany({
      where: {
        userId: input.userId,
      },
    });
  }),

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
