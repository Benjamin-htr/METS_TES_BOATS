import { TRPCError } from "@trpc/server";
import { Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { verifyJwt } from "../utils/jwt";

export const deserializeUser = async ({ req, res }: { req: Request; res: Response }) => {
  try {
    // Get the token
    let access_token: string | undefined;
    const cookies = req.cookies as { access_token: string };
    if (req.headers.authorization?.startsWith("Bearer")) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (cookies.access_token) {
      access_token = cookies.access_token;
    }

    const notAuthenticated = {
      req,
      res,
      user: null,
    };

    if (!access_token) {
      return notAuthenticated;
    }

    // Validate Access Token
    const decoded = verifyJwt<{ sub: string }>(access_token);

    if (!decoded) {
      return notAuthenticated;
    }

    // Check if user has a valid session
    //const session = await redisClient.get(decoded.sub);

    // if (!session) {
    //   return notAuthenticated;
    // }

    // Check if user still exist
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(decoded.sub),
      },
    });

    if (!user) {
      return notAuthenticated;
    }

    return {
      req,
      res,
      user,
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
    throw err;
  }
};
