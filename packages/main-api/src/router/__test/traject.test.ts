import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { mockDeep } from "jest-mock-extended";
import { createInnerTRPCContext } from "../../lib/trpc";
import { appRouter } from "../_app";

test("create traject should fail if boat is already in sea", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  // Mock boat that is already in sea
  const boat = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "test",
    latitude: 23,
    longitude: -173,
    userId: 14,
    boatModelId: 1,
    Traject: [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "test",
        latitudeDestination: 23,
        longitudeDestination: -173,
        boatId: 1,
        finishedDate: null,
      },
    ],
  };

  prismaMock.boat.findUnique.mockResolvedValue(boat);

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
    caller.traject.create({
      boatId: "1",
      latitudeDestination: 23,
      longitudeDestination: -173,
      name: "test",
    })
  ).rejects.toEqual(
    new TRPCError({
      code: "CONFLICT",
      message: "Boat is not available",
    })
  );
});
