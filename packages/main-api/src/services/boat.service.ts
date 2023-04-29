import { prisma } from "../lib/prismaClient";

export const defaultBoat = {
  name: "Espérance",
  boatModelId: 4,
  latitude: 23,
  longitude: -173,
};

export const createDefaultBoat = async (userId: number) => {
  return await prisma.boat.create({
    data: {
      name: defaultBoat.name,
      latitude: defaultBoat.latitude,
      longitude: defaultBoat.longitude,
      BoatModel: {
        connect: {
          id: defaultBoat.boatModelId,
        },
      },
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
