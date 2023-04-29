import { inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../../lib/trpc";
import { AppRouter, appRouter } from "../_app";

test("hello test", async () => {
  const caller = appRouter.createCaller(createInnerTRPCContext({ user: null }));

  type Input = inferProcedureInput<AppRouter["hello"]>;

  const input: Input = {
    text: "test",
  };

  const result = await caller.hello(input);

  expect(result).toStrictEqual({ greeting: "Hello test" });
});
