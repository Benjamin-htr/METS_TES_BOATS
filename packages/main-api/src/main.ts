import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import path from "path";
import { createContext } from "./lib/trpc";
import { appRouter } from "./router/_app";

dotenv.config({ path: path.join(__dirname, "../.env") });

const app: Application = express();
app.use(cors());

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
