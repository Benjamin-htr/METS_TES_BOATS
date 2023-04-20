import { createUserSchema } from "@pnpm-monorepo/schemas";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { CookieOptions } from "express";
import { z } from "zod";
import { prisma } from "../lib/prismaClient";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(Date.now() + 15 * 60 * 1000),
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
  } catch (err: any) {
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

// export const loginHandler = async ({
//   input,
//   ctx,
// }: {
//   input: z.infer<typeof loginUserSchema>;
//   ctx: Context;
// }) => {
//   try {
//     // Get the user from the collection
//     const user = await findUser({ email: input.email.toLowerCase() });

//     // Check if user exist and password is correct
//     if (!user || !(await bcrypt.compare(input.password, user.password))) {
//       throw new TRPCError({
//         code: 'BAD_REQUEST',
//         message: 'Invalid email or password',
//       });
//     }

//     // Create the Access and refresh Tokens
//     const { access_token, refresh_token } = await signTokens(user);

//     // Send Access Token in Cookie
//     ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
//     ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
//     ctx.res.cookie('logged_in', true, {
//       ...accessTokenCookieOptions,
//       httpOnly: false,
//     });

//     // Send Access Token
//     return {
//       status: 'success',
//       access_token,
//     };
//   } catch (err: any) {
//     throw err;
//   }
// };
