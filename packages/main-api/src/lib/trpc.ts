import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { deserializeUser } from "../middleware/deserializeUser";

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => deserializeUser({ req, res });

export type Context = inferAsyncReturnType<typeof createContext>;
export const trpc = initTRPC.context<Context>().create();
