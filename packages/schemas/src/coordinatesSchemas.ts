import { z } from "zod";

export const createCoordinatesSchema = z.object({
  boatId: z.number(),
  logitude: z.number(),
  latitude: z.number(),
});
