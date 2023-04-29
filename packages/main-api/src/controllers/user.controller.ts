import { TRPCError } from "@trpc/server";
import { Context } from "../lib/trpc";
import { excludeField } from "../utils/excludeField";

export const getMeHandler = ({ ctx }: { ctx: Context }) => {
  try {
    const userWithoutPassword = ctx.user ? excludeField(ctx.user, ["password"]) : null;
    return {
      status: "success",
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};
