import { z } from "zod";
import { trpc } from "../lib/trpc";
import { authRouter } from "./authRouter";
import { boatRouter } from "./boatRouter";
import { modelBoatRouter } from "./modelBoatRouter";
import { trajectRouter } from "./trajectRouter";
import { userRouter } from "./userRouter";

export const appRouter = trpc.router({
  auth: authRouter,
  user: userRouter,
  boat: boatRouter,
  modelBoat: modelBoatRouter,
  traject: trajectRouter,
  hello: trpc.procedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),
});

export type AppRouter = typeof appRouter;
