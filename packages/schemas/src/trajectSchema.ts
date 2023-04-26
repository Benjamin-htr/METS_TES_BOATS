import { z } from "zod";

export const createTrajectSchema = z.object({
  userId: z.number(),
  boatId: z.number(),
  longitudeDestination: z.number(),
  latitudeDestination: z.number(),
});
