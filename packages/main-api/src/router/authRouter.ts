import { router } from "@trpc/server";
import { Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";

export function createContext({ req, res }: { req: Request; res: Response }) {
  return { req, res, prisma };
}

export type Context = ReturnType<typeof createContext>;

export function createRouter() {
  return router<Context>();
}

export const authRouter = trpc.middleware(async ({ ctx, next }) => {
  return next();
});
