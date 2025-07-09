import { Speed, Wind } from "@prisma/client";
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "events";
import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { calculateDistance, calculateNextPosition } from "../services/simulation.service";

interface MyEvents {
  positionUpdate: () => Promise<void>;
  speedChange: (speed: Speed) => void;
  windChange: (wind: Wind) => void;
}
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(event: TEv, ...args: Parameters<MyEvents[TEv]>): boolean;
}

class MyEventEmitter extends EventEmitter {}

export const ee = new MyEventEmitter();

// every 1s, positions is updated
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
          Speed: true,
          Wind: true,
        },
      });

      let prev: { latitude: number; longitude: number } | undefined = {
        latitude: traject?.Boat.latitude ?? 0,
        longitude: traject?.Boat.longitude ?? 0,
      };

      const destinationPos = {
        latitude: traject?.latitude ?? 0,
        longitude: traject?.longitude ?? 0,
      };

      console.log("initial boat position : ");
      console.log(prev);
      console.log("destination position : ");
      console.log(destinationPos);

      let currentSpeed = traject?.Speed.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }).at(0);

      let currentWind = traject?.Wind.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }).at(0);

      return observable<{ latitude: number; longitude: number }>((emit) => {
        const handler = async () => {
          const pos = calculateNextPosition(
            prev ?? {
              latitude: 0,
              longitude: 0,
            },
            destinationPos,
            currentSpeed?.speed ?? 0,
            { speed: currentWind?.speed ?? 0, direction: currentWind?.direction ?? 0 }
          );

          const newData = {
            latitude: pos.latitude,
            longitude: pos.longitude,
          };
          emit.next(newData);
          console.log(newData);

          if (calculateDistance(newData, destinationPos) <= (currentSpeed?.speed ?? 0)) {
            await prisma.traject.update({
              where: {
                id: input.trajectId,
              },
              data: {
                finishedDate: new Date(),
                Boat: {
                  update: {
                    latitude: newData.latitude,
                    longitude: newData.longitude,
                  },
                },
              },
            });

            emit.complete();
            console.log("complete");
          }

          prev = newData;
        };

        ee.on("positionUpdate", handler);

        ee.on("speedChange", (data) => {
          currentSpeed = data;
          console.log("speedChange, speed : ", currentSpeed.speed);
        });

        ee.on("windChange", (data) => {
          currentWind = data;
          console.log("windChange");
        });

        return () => {
          ee.off("positionUpdate", handler);
        };
      });
    }),
});
