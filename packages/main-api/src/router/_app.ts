import { trpc } from "../lib/trpc";
import { authRouter } from "./authRouter";
import { dataRouter } from "./dataRouter";
import { userRouter } from "./userRouter";

export const appRouter = trpc.router({
  user: userRouter,
  auth: authRouter,
  data: dataRouter,
  hello: trpc.procedure.query(() => {
    return "Hello World";
  }),
});

export type AppRouter = typeof appRouter;
