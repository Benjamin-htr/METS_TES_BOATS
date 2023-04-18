import { publicProcedure, router } from "./trpc";
import { z } from "zod";
export const appRouter = router({
  hello: publicProcedure
    .input(
      z
        .object({
          text: z.string(),
        })
        .optional()
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    }),
});
export type AppRouter = typeof appRouter;
