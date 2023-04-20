import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";

export const userRouter = trpc.router({
  all: trpc.procedure.query(() => {
    return prisma.user.findMany();
  }),
  register: trpc.procedure
    .input(z.object({ username: z.string().min(3).max(30), password: z.string().min(10).max(20) }))
    .mutation(({ input }) => {
      return prisma.user.create({
        data: {
          username: input.username,
          password: input.password,
        },
      });
    }),
  login: trpc.procedure
    .input(z.object({ username: z.string().min(3).max(30), password: z.string().min(10).max(20) }))
    .query(({ input }) => {
      return prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });
    }),
});
