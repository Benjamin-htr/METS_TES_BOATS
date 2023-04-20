import { trpc } from "../lib/trpc";
import { userRouter } from "./userRouter";

export const appRouter = trpc.router({
  user: userRouter,
  hello: trpc.procedure.query(() => {
    return "Hello World";
  }),
});

export type AppRouter = typeof appRouter;
