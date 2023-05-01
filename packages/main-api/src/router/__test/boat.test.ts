import { Boat, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { createInnerTRPCContext } from "../../lib/trpc";
import { appRouter } from "../_app";

test("getAll test", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Boat[] = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "test",
      latitude: 23,
      longitude: -173,
      userId: 14,
      boatModelId: 1,
    },
  ];

  prismaMock.boat.findMany.mockResolvedValue(mockOutput);

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

  const result = await caller.boat.getAll();

  expect(result).toHaveLength(mockOutput.length);
  expect(result).toStrictEqual(mockOutput);
});
