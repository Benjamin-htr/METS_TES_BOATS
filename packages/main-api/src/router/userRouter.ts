import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
import { isAuthorizedProcedure } from "../middleware/isAuthorized";

export const userRouter = trpc.router({
  getMe: isAuthorizedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
});
