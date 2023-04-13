import { macaronVitePlugin } from "@macaron-css/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macaronVitePlugin()],
  server: {
    port: 5001,
  },
});
