import { trpc } from "../lib/trpc";
import { userRouter } from "./userRouter";

export const appRouter = trpc.router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
