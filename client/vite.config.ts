import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { include: ["**/*.test.tsx"], globals: true, environment: "jsdom" },
  build: { outDir: "../server/public" },
  resolve: {
    alias: {
      "@appTypes": path.resolve("src/types"),
      "@assets": path.resolve("src/assets"),
      "@components": path.resolve("src/components"),
      "@pages": path.resolve("src/pages"),
      "@redux": path.resolve("src/redux"),
      "@routes": path.resolve("src/routes"),
      "@utils": path.resolve("src/utils"),
      "@hooks": path.resolve("src/hooks"),
    },
  },
});
