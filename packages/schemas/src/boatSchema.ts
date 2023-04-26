import { z } from "zod";

export const getBoatSchema = z.object({
  boatId: z.number(),
});

export const updateBoatPosition = z.object({
  boatId: z.number(),
  longitude: z.number(),
  latitude: z.number(),
});
