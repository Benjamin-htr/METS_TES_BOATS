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
    // Boat: [
    //   {
    //     id: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     name: "test",
    //     latitude: 23,
    //     longitude: -173,
    //     userId: 14,
    //     boatModelId: 1,
    //     Traject: [
    //       {
    //         id: 1,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         name: "test",
    //         latitudeDestination: 23,
    //         longitudeDestination: -173,
    //         boatId: 1,
    //         finishedDate: null,
    //       },
    //     ],
    //   },
    // ],
    // Traject: [
    //   {
    //     id: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     name: "test",
    //     latitudeDestination: 23,
    //     longitudeDestination: -173,
    //     boatId: 1,
    //     finishedDate: null,
    //   },
    // ],
  };

  prismaMock.user.findUnique.mockResolvedValue(user);

  const caller = appRouter.createCaller(
    createInnerTRPCContext({
      user: {
        id: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: "test",
        password: "test",
      },
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
