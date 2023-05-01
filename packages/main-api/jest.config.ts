import type { Config } from "jest";

const config: Config = {
  verbose: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
  },
};

export default config;
