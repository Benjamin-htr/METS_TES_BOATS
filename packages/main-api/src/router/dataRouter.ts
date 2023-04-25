// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { createCoordinatesSchema, createTrajectSchema } from "@pnpm-monorepo/schemas";
import { prisma } from "../lib/prismaClient";

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
      },
    });
    return {
      status: "success",
      data: {
        postCoordinates,
      },
    };
  }),

  getBoat: trpc.procedure.query(({ ctx }) => {
    console.log(ctx.user);
    // const todos = await prisma.todo.findMany()
    // return todos
    return prisma.boat.findMany();
  }),
  postTraject: trpc.procedure.input(createTrajectSchema).mutation(({ input }) => {
    const postCoordinates = prisma.traject.create({});
    return {
      status: "success",
      data: {
        postCoordinates,
      },
    };
  }),
  //   getTraject: trpc.procedure.query(({ ctx }) => {
  //     console.log(ctx.user);
  //     // const todos = await prisma.todo.findMany()
  //     // return todos
  //     return prisma.traject.findMany(ctx.user);
  //   }),
});
