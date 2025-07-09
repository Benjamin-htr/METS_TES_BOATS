import { PrismaClient } from "@prisma/client";

export async function generateBoatModelData(prisma: PrismaClient) {
  await prisma.boatModel.create({
    data: {
      id: 1,
      name: "La barque",
      maxSpeed: 3.5,
      maxFuel: 40.0,
      description: "A classic boat for those who like to row.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1714839369008-592b3a50e230?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 2,
      name: "Wave Rider",
      maxSpeed: 29.2,
      maxFuel: 312.4,
      description: "Catches waves and compliments alike.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1734727098562-24269508b0fb?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 3,
      name: "The Paqueboat",
      maxSpeed: 15,
      maxFuel: 651.2,
      description: "For those who like to get lost on purpose.",
      imageUrl:
        "https://images.unsplash.com/photo-1599592250388-723111434445?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 4,
      name: "Lazy Lagoon",
      maxSpeed: 11.3,
      maxFuel: 92.5,
      description: "Perfect for chilling and pretending to fish.",
      imageUrl:
        "https://images.unsplash.com/photo-1527866492609-a70b79cd6cfe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 5,
      name: "Thunderbolt",
      maxSpeed: 44.7,
      maxFuel: 210.6,
      description: "Strikes fast and leaves a trail of awe.",
      imageUrl:
        "https://images.unsplash.com/photo-1615646194267-ecf4380ac001?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 6,
      name: "Sunset Cruiser",
      maxSpeed: 18.4,
      maxFuel: 134.9,
      description: "Glides smoothly into your golden hour.",
      imageUrl:
        "https://images.unsplash.com/photo-1528310537471-3171913904ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 7,
      name: "Pirate's Dream",
      maxSpeed: 32.1,
      maxFuel: 195.3,
      description: "Arrr matey! Ready for treasure hunts.",
      imageUrl:
        "https://img.20mn.fr/pvmkE-DFSyKnBk2ennG6KSk/1444x920_le-trois-mats-duchesse-anne-fierte-de-la-ville-de-dunkerque-a-grand-besoin-d-un-severe-ravalement",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 8,
      name: "Coral Cruiser",
      maxSpeed: 24.9,
      maxFuel: 121.7,
      description: "Colors as vibrant as the reef.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661962719862-4b8f0aee3a15?q=80&w=1395&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 9,
      name: "Storm Chaser",
      maxSpeed: 50.3,
      maxFuel: 330.2,
      description: "For the brave souls who dance with storms.",
      imageUrl:
        "https://images.unsplash.com/photo-1443376133869-19bce1f036e1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  await prisma.boatModel.create({
    data: {
      id: 10,
      name: "Bubble Blower",
      maxSpeed: 13.6,
      maxFuel: 67.8,
      description: "Makes waves and bubbles everywhere it goes.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681488295560-c509f06c3156?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
}
