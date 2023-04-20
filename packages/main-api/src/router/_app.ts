import { trpc } from "../lib/trpc";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

export const appRouter = trpc.router({
  user: userRouter,
  auth: authRouter,
  hello: trpc.procedure.query(() => {
    return "Hello World";
  }),
});

export type AppRouter = typeof appRouter;
