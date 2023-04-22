// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { prisma } from "../lib/prismaClient";

export const dataRouter = trpc.router({
  list: trpc.procedure.query(({ ctx }) => {
    console.log(ctx.user);
    // const todos = await prisma.todo.findMany()
    // return todos
    return prisma.coordinates.findMany();
  }),
});
