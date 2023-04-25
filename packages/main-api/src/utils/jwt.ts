import fs from "fs";
import jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (payload: object, options: SignOptions = {}) => {
  const privateKey = fs.readFileSync(__dirname + "/../../keys/private.key", "utf8");
  console.log(privateKey);
  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = fs.readFileSync(__dirname + "/../../keys/public.key", "utf8");
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    console.log(error);
    return null;
  }
};
