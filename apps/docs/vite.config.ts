// apps/docs/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@doo/common-ui": resolve(
        __dirname,
        "../../packages/common-ui/src/index.ts"
      ),
    },
  },
});
