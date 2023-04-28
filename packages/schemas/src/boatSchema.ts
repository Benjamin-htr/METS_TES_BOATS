import { z } from "zod";

export const getBoatSchema = z.object({
  boatId: z.number(),
});

export const createBoatSchema = z.object({
  name: z.string(),
  boatModelId: z.string(),
});

export const updateBoatPosition = z.object({
  boatId: z.number(),
  longitude: z.number(),
  latitude: z.number(),
});
