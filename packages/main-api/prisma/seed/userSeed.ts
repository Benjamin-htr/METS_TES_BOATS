import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function generateUserData(prisma: PrismaClient) {
  await prisma.user.create({
    data: {
      username: "captain_jack",
      password: await bcrypt.hash("pirate1234", 12),
    },
  });
}
