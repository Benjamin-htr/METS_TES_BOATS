import { z } from "zod";

export const getBoatSchema = z.object({
  boatId: z.number(),
});
