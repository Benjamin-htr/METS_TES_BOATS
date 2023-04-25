import { z } from "zod";

export const createTrajectSchema = z.object({
  longitudeDestination: z.number(),
  latitudeDestination: z.number(),
});
