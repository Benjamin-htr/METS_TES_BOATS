import { createUserSchema, loginUserSchema } from "@pnpm-monorepo/schemas";
import { deleteAccountHandler, loginHandler, logoutHandler, registerHandler } from "../controllers/auth.controller";
import { trpc } from "../lib/trpc";

export const authRouter = trpc.router({
  register: trpc.procedure.input(createUserSchema).mutation(({ input }) => registerHandler({ input })),
  login: trpc.procedure.input(loginUserSchema).mutation(({ input, ctx }) => loginHandler({ input, ctx })),
  logout: trpc.procedure.mutation(({ ctx }) => logoutHandler({ ctx })),
  delete: trpc.procedure.mutation(({ ctx }) => deleteAccountHandler({ ctx })),
});
