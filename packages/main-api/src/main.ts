import * as trpcExpress from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import path from "path";
import ws from "ws";
import { createContext, createInnerTRPCContext } from "./lib/trpc";
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

const wss = new ws.Server({
  port: 3001,
});
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: () => {
    return createInnerTRPCContext({ user: null, req: undefined, res: undefined });
  },
});
wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log("✅ WebSocket Server listening on ws://localhost:3001");
process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
