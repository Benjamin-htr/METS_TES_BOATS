import { TRPCError } from "@trpc/server";
import { trpc } from "../lib/trpc";

const isAuthorized = trpc.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next();
});

export const isAuthorizedProcedure = trpc.procedure.use(isAuthorized);
