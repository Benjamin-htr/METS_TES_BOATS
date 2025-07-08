import { PrismaClient } from "@prisma/client";

export async function generateBoatModelData(prisma: PrismaClient) {
  await prisma.boatModel.create({
    data: {
      id: 1,
      name: "Speedster 3000",
      maxSpeed: 38.5,
      maxFuel: 245.7,
      description: "Zooms faster than your morning coffee kicks in!",
      imageUrl: "https://example.com/images/speedster3000.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 2,
      name: "Wave Rider",
      maxSpeed: 29.2,
      maxFuel: 312.4,
      description: "Catches waves and compliments alike.",
      imageUrl: "https://example.com/images/waverider.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 3,
      name: "Ocean Explorer",
      maxSpeed: 22.8,
      maxFuel: 370.1,
      description: "For those who like to get lost on purpose.",
      imageUrl: "https://example.com/images/oceanexplorer.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 4,
      name: "Lazy Lagoon",
      maxSpeed: 11.3,
      maxFuel: 92.5,
      description: "Perfect for chilling and pretending to fish.",
      imageUrl: "https://example.com/images/lazylagoon.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 5,
      name: "Thunderbolt",
      maxSpeed: 44.7,
      maxFuel: 210.6,
      description: "Strikes fast and leaves a trail of awe.",
      imageUrl: "https://example.com/images/thunderbolt.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 6,
      name: "Sunset Cruiser",
      maxSpeed: 18.4,
      maxFuel: 134.9,
      description: "Glides smoothly into your golden hour.",
      imageUrl: "https://example.com/images/sunsetcruiser.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 7,
      name: "Pirate's Dream",
      maxSpeed: 32.1,
      maxFuel: 195.3,
      description: "Arrr matey! Ready for treasure hunts.",
      imageUrl: "https://example.com/images/piratesdream.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 8,
      name: "Coral Cruiser",
      maxSpeed: 24.9,
      maxFuel: 121.7,
      description: "Colors as vibrant as the reef.",
      imageUrl: "https://example.com/images/coralcruiser.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 9,
      name: "Storm Chaser",
      maxSpeed: 50.3,
      maxFuel: 330.2,
      description: "For the brave souls who dance with storms.",
      imageUrl: "https://example.com/images/stormchaser.jpg",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 10,
      name: "Bubble Blower",
      maxSpeed: 13.6,
      maxFuel: 67.8,
      description: "Makes waves and bubbles everywhere it goes.",
      imageUrl: "https://example.com/images/bubbleblower.jpg",
    },
  });
}
