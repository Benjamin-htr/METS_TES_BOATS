import { z } from "zod";

export const createTrajectSchema = z.object({
  boatId: z.number(),
  longitudeDestination: z.number(),
  latitudeDestination: z.number(),
});
