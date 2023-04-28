// import { getMeHandler } from "../controllers/user.controller";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { isAuthorizedProcedure } from "../middleware/isAuthorized";

export const modelBoatRouter = trpc.router({
  getAll: isAuthorizedProcedure.query(() => {
    return prisma.boatModel.findMany();
  }),
});
