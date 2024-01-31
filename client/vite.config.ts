import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";

const aliasPaths = {
  "@/*": path.resolve("src"),
  "@appTypes": path.resolve("src/types"),
  "@assets": path.resolve("src/assets"),
  "@components": path.resolve("src/components"),
  "@pages": path.resolve("src/pages"),
  "@redux": path.resolve("src/redux"),
  "@routes": path.resolve("src/routes"),
  "@utils": path.resolve("src/utils"),
  "@hooks": path.resolve("src/hooks"),
};
const aliasPathsMap = Object.entries(aliasPaths).map(([k, v]) => ({
  find: k,
  replacement: v,
}));
const csToolIdx = {
  // TODO: this is a temp hack, wait csTools to be fixed
  find: "@cornerstonejs/tools",
  replacement: "./node_modules/@cornerstonejs/tools/dist/umd/index.js",
};
const alias =
  process.env.NODE_ENV === "production"
    ? [...aliasPathsMap, csToolIdx]
    : aliasPathsMap;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), istanbul({ cypress: true, requireEnv: false })],
  build: { outDir: "../server/public" },
  resolve: { alias },
});
