import { observable } from "@trpc/server/observable";
import { EventEmitter } from "events";
import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";

interface MyEvents {
  positionUpdate: () => void;
}
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(event: TEv, ...args: Parameters<MyEvents[TEv]>): boolean;
}

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

// every 1s, positions are updated
setInterval(() => {
  ee.emit("positionUpdate");
}, 1000);

export const simulationRouter = trpc.router({
  getPositions: trpc.procedure
    .input(
      z.object({
        trajectId: z.number(),
      })
    )
    .subscription(async ({ input }) => {
      const traject = await prisma.traject.findUnique({
        where: {
          id: input.trajectId,
        },
        include: {
          Boat: true,
        },
      });

      let prev: { latitude: number; longitude: number } | undefined = {
        latitude: traject?.Boat.latitude ?? 0,
        longitude: traject?.Boat.longitude ?? 0,
      };

      return observable((emit) => {
        const handler = () => {
          const newData = {
            latitude: (prev?.latitude ?? 0) + 0.0001,
            longitude: (prev?.longitude ?? 0) + 0.0001,
          };
          //console.log("newData", newData);
          emit.next(newData);
          prev = newData;
        };

        ee.on("positionUpdate", handler);

        return () => {
          ee.off("positionUpdate", handler);
        };
      });
    }),
});
