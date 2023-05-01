import { z } from "zod";

export const getBoatSchema = z.object({
  boatId: z.number(),
});

export const createBoatSchema = z.object({
  name: z.string(),
  boatModelId: z.string(),
});

export const editBoatSchema = z.object({
  boatId: z.number(),
  name: z.string(),
});

export const changeBoatSpeed = z.object({
  boatId: z.number(),
  speed: z.number(),
});

export const updateBoatPosition = z.object({
  boatId: z.number(),
  longitude: z.number(),
  latitude: z.number(),
});

export const getAllBoatFromUser = z.object({
  userId: z.number(),
});
