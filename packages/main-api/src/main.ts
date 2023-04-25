import * as trpcExpress from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import path from "path";
import { createContext } from "./lib/trpc";
import { appRouter } from "./router/_app";

process.env.TZ = "Europe/Paris";

dotenv.config({ path: path.join(__dirname, "../.env") });

const app: Application = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONT_URL ? process.env.FRONT_URL : "", "http://localhost:5001"],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to main api" });
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  })
);

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT} at this url : http://localhost:${PORT}`);
});
