import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prismaClient";

export const createUser = async (input: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: input,
  });
};

export const findUser = async (where: Partial<Prisma.UserCreateInput>, select?: Prisma.UserSelect) => {
  return await prisma.user.findFirst({
    where,
    select,
  });
};

export const findUniqueUser = async (where: Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect) => {
  return await prisma.user.findUnique({
    where,
    select,
  });
};
