import { trpc } from "../lib/trpc";
import { authRouter } from "./authRouter";
import { boatRouter } from "./boatRouter";
import { modelBoatRouter } from "./modelBoatRouter";
import { userRouter } from "./userRouter";

export const appRouter = trpc.router({
  auth: authRouter,
  user: userRouter,
  boat: boatRouter,
  modelBoat: modelBoatRouter,
});

export type AppRouter = typeof appRouter;
