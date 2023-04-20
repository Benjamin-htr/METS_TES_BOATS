import { AppRouter } from "@pnpm-monorepo/main-api/src";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
