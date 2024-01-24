import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const alias = {
  "@appTypes": path.resolve("src/types"),
  "@assets": path.resolve("src/assets"),
  "@components": path.resolve("src/components"),
  "@pages": path.resolve("src/pages"),
  "@redux": path.resolve("src/redux"),
  "@routes": path.resolve("src/routes"),
  "@utils": path.resolve("src/utils"),
  "@hooks": path.resolve("src/hooks"),
};
const aliasMap = Object.entries(alias).map(([k, v]) => ({
  find: k,
  replacement: v,
}));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.tsx"],
    globals: true,
    environment: "jsdom",
    watch: false,
    setupFiles: "test/test-setup.ts",
  },
  build: { outDir: "../server/public" },
  resolve: {
    alias:
      process.env.NODE_ENV === "production"
        ? [
            ...aliasMap,
            {
              // TODO: this is a temp hack, wait csTools to be fixed
              find: "@cornerstonejs/tools",
              replacement:
                "./node_modules/@cornerstonejs/tools/dist/umd/index.js",
            },
          ]
        : alias,
  },
});
