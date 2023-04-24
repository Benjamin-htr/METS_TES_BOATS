import { z } from "zod";

export const createCoordinatesSchema = z.object({
  trajectId: z.number(),
  logitude: z.number(),
  latitude: z.number(),
});
