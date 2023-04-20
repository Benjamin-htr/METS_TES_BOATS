import { createUserSchema, loginUserSchema } from "@pnpm-monorepo/schemas";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { CookieOptions } from "express";
import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { Context } from "../lib/trpc";
import { signJwt } from "../utils/jwt";

const accessTokenExpiresIn = 15;

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 1000),
};

export const registerHandler = async ({ input }: { input: z.infer<typeof createUserSchema> }) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = prisma.user.create({
      data: {
        username: input.username,
        password: hashedPassword,
      },
    });

    return {
      status: "success",
      data: {
        user,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists",
        });
      }
    }
    throw err;
  }
};

export const loginHandler = async ({ input, ctx }: { input: z.infer<typeof loginUserSchema>; ctx: Context }) => {
  // Get the user from the collection
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: input.username.toLowerCase(),
      },
    });

    // Check if user exist and password is correct
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid username or password",
      });
    }

    // Create the Access and refresh Tokens
    const access_token = signJwt(
      { sub: user.id },
      {
        expiresIn: `${accessTokenExpiresIn}m`,
      }
    );

    // Send Access Token in Cookie
    ctx.res.cookie("access_token", access_token, accessTokenCookieOptions);
    ctx.res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    return {
      status: "success",
      access_token,
    };
  } catch (e) {
    //throw e;
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("Something went wrong");
  }
};

const logout = ({ ctx }: { ctx: Context }) => {
  ctx.res.cookie("access_token", "", { maxAge: -1 });
  ctx.res.cookie("logged_in", "", {
    maxAge: -1,
  });
};

export const logoutHandler = ({ ctx }: { ctx: Context }) => {
  try {
    logout({ ctx });
    return { status: "success" };
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Something went wrong");
  }
};
