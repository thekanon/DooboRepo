// apps/docs/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },

  resolve: {
    alias: {
      "@doo/common-ui": resolve(
        __dirname,
        "../../packages/common-ui/src/index.ts"
      ),
    },
  },
});
