import { describe, expect, test } from "@jest/globals";
import { sum } from "../boatRouter";
import { AppRouter } from "../_app";
import { appRouter } from "../../router/_app";
import { prisma } from "../../../prisma";
import { inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../../lib/trpc";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

test("hello test", async () => {
  const caller = appRouter.createCaller(createInnerTRPCContext({ session: null }));

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;

  const input: Input = {
    text: "test",
  };

  const result = await caller.example.hello(input);

  expect(result).toStrictEqual({ greeting: "Hello test" });
});
