import { publicProcedure, router } from "./lib/trpc";
const appRouter = router({
  // Create publicProcedure at path 'hello'
  hello: publicProcedure.query(() => {
    return {
      greeting: "hello world",
    };
  }),
});
