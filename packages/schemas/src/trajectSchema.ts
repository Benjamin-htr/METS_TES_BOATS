import { z } from "zod";

export const createTrajectSchema = z.object({
  boatId: z.string(),
  name: z.string(),
  longitudeDestination: z.number(),
  latitudeDestination: z.number(),
});
