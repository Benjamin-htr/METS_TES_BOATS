// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { prisma } from "../lib/prismaClient";
import { z } from "zod";
import { createCoordinatesSchema } from "@pnpm-monorepo/schemas";
import { connect } from "http2";

export const dataRouter = trpc.router({
  getCoordinates: trpc.procedure.query(({ ctx }) => {
    console.log(ctx.user);
    // const todos = await prisma.todo.findMany()
    // return todos
    return prisma.coordinates.findMany();
  }),
  postCoordinates: trpc.procedure.input(createCoordinatesSchema).mutation(({ input }) => {
    const postCoordinates = prisma.coordinates.create({
      data: {
        latitude: input.latitude,
        longitude: input.logitude,
        Traject: {
          connect: {
            id: 2,
          },
        },
      },
    });
    return input;
  }),

  getBoat: trpc.procedure.query(({ ctx }) => {
    console.log(ctx.user);
    // const todos = await prisma.todo.findMany()
    // return todos
    return prisma.boat.findMany();
  }),
  //   createTraject: trpc.procedure.query(({ ctx }) => {
  //     console.log(ctx.user);
  //     return prisma.boat.findMany();
  //   }),
  //   getTraject: trpc.procedure.query(({ ctx }) => {
  //     console.log(ctx.user);
  //     // const todos = await prisma.todo.findMany()
  //     // return todos
  //     return prisma.traject.findMany(ctx.user);
  //   }),
});
