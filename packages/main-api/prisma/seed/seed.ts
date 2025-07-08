import { PrismaClient } from "@prisma/client";
import { generateBoatModelData } from "./boatModelSeed";
import { generateUserData } from "./userSeed";

const prisma = new PrismaClient();

async function main() {
  await generateBoatModelData(prisma);
  await generateUserData(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
