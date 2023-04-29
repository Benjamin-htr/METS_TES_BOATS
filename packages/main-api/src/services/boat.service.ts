import { prisma } from "../lib/prismaClient";

export const defaultBoats = [
  {
    name: "Espérance",
    boatModelId: 4,
    latitude: 23,
    longitude: -173,
  },
  {
    name: "US Sharkido",
    boatModelId: 2,
    latitude: 44,
    longitude: -125,
  },
];

export const createDefaultBoats = async (userId: number) => {
  const result = [];
  for (const boat of defaultBoats) {
    const createdBoat = await prisma.boat.create({
      data: {
        name: boat.name,
        latitude: boat.latitude,
        longitude: boat.longitude,
        BoatModel: {
          connect: {
            id: boat.boatModelId,
          },
        },

        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
    result.push(createdBoat);
  }
  return result;
};

export const boatIsAvailable = async (boatId: number) => {
  const boat = await prisma.boat.findUnique({
    where: {
      id: boatId,
    },
    include: {
      Traject: true,
    },
  });

  if (boat?.Traject.find((t) => t.finishedDate === null)) {
    return false;
  }

  return true;
};
