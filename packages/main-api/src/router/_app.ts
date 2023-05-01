import { trpc } from "../lib/trpc";
import { authRouter } from "./authRouter";
import { boatRouter } from "./boatRouter";
import { modelBoatRouter } from "./modelBoatRouter";
import { simulationRouter } from "./simulationRouter";
import { trajectRouter } from "./trajectRouter";
import { userRouter } from "./userRouter";

export const appRouter = trpc.router({
  auth: authRouter,
  user: userRouter,
  boat: boatRouter,
  modelBoat: modelBoatRouter,
  traject: trajectRouter,
  simulation: simulationRouter,
});

export type AppRouter = typeof appRouter;
