import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { mockDeep } from "jest-mock-extended";
import { createInnerTRPCContext } from "../../lib/trpc";
import { appRouter } from "../_app";

test("create user", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  // Mock user
  const user = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    username: "test_user",
    password: "azertyuiop",
  };

  prismaMock.user.create.mockResolvedValue(user);

  const caller = appRouter.createCaller(
    createInnerTRPCContext({
      user: null,
      prisma: prismaMock,
    })
  );

  await expect(
    caller.auth.register({
      username: "test_user",
      password: "azertyuiop",
      confirmPassword: "azertyuiop",
    })
  ).rejects.toEqual(
    new TRPCError({
      code: "CONFLICT",
      message: "Username already exists",
    })
  );
});
