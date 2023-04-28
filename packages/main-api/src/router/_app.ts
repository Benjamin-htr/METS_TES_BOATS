import { trpc } from "../lib/trpc";
import { authRouter } from "./authRouter";
import { boatRouter } from "./boatRouter";
import { userRouter } from "./userRouter";

export const appRouter = trpc.router({
  auth: authRouter,
  user: userRouter,
  boat: boatRouter,
});

export type AppRouter = typeof appRouter;
