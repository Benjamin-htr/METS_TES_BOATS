import { z } from "zod";

export const getTrajectSchema = z.object({
  trajectId: z.number(),
});

export const createTrajectSchema = z.object({
  boatId: z.string(),
  name: z.string(),
  longitudeDestination: z.number(),
  latitudeDestination: z.number(),
});

export const editTrajectSchema = z.object({
  trajectId: z.number(),
  name: z.string(),
});

export const changeTrajectSpeed = z.object({
  trajectId: z.number(),
  speed: z.number(),
});

export const changeTrajectWind = z.object({
  trajectId: z.number(),
  speed: z.number(),
  direction: z.number(),
});
