import { createUserSchema, loginUserSchema } from "@pnpm-monorepo/schemas";
import { loginHandler, logoutHandler, registerHandler } from "../controllers/auth.controller";
import { trpc } from "../lib/trpc";

export const authRouter = trpc.router({
  registerUser: trpc.procedure.input(createUserSchema).mutation(({ input }) => registerHandler({ input })),
  loginUser: trpc.procedure.input(loginUserSchema).mutation(({ input, ctx }) => loginHandler({ input, ctx })),
  logoutUser: trpc.procedure.mutation(({ ctx }) => logoutHandler({ ctx })),
});
