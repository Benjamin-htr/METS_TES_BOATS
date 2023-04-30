import { trpc } from "../lib/trpc";
import { isAuthorizedProcedure } from "../middleware/isAuthorized";

export const modelBoatRouter = trpc.router({
  getAll: isAuthorizedProcedure.query(({ ctx }) => {
    return ctx.prisma.boatModel.findMany();
  }),
});
