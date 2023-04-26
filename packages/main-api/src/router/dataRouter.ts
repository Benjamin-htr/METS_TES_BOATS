// import { getMeHandler } from "../controllers/user.controller";
import { trpc } from "../lib/trpc";
// import { isAuthorizedProcedure } from "../middleware/isAuthorized";
import { createCoordinatesSchema, createTrajectSchema, getBoatSchema } from "@pnpm-monorepo/schemas";
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

  //retourne un boat en fonction de l'id
  getBoat: trpc.procedure.input(getBoatSchema).query(({ input }) => {
    return prisma.boat.findUnique({
      where: {
         id : input.boatId
      },
    });
  }),

  //permet de créer un trajet
  createTraject: trpc.procedure.input(createTrajectSchema).mutation(({ input }) => {
    const postCoordinates = prisma.traject.create({
      data: {
        Destination: {
          create: {
            latitude: input.latitudeDestination,
            longitude: input.longitudeDestination,
          },
        },
        User: {
          connect: {
            id: input.userId,
          },
        },
        Boat: {
          connect: {
            id: input.boatId,
          },
        },
        // Speed : ,
        // Wave : ,
        // Wind : ,
      },
    });
    return {
      status: "success",
      data: {
        postCoordinates,
      },
    };
  }),
  getTraject: trpc.procedure.query(({ ctx }) => {
    return prisma.traject.findUnique({
      where: {
        id: ctx.user?.id,
      },
    });
  }),
});
