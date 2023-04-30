import { PrismaClient, User } from "@prisma/client";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { deserializeUser } from "../middleware/deserializeUser";
import { prisma } from "./prismaClient";

interface CreateContextOptions {
  user: User | null;
  res?: trpcExpress.CreateExpressContextOptions["res"];
  req?: trpcExpress.CreateExpressContextOptions["req"];
  prisma?: PrismaClient;
}
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    user: opts.user,
    prisma: opts.prisma ?? prisma,
    req: opts.req,
    res: opts.res,
  };
};

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const { user } = await deserializeUser({ req, res });
  return { ...createInnerTRPCContext({ user, req, res }) };
};

export type Context = inferAsyncReturnType<typeof createContext>;
export const trpc = initTRPC.context<Context>().create();
