import { router, publicProcedure } from "./lib/trpc";
import { z } from "zod";
const appRouter = router({
  // Create publicProcedure at path 'hello'
  hello: publicProcedure.query(() => {
    return {
      greeting: "hello world",
    };
  }),
});
