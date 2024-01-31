import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  component: {
    devServer: { framework: "react", bundler: "vite" },
    setupNodeEvents(on, config) {
      cypressCoverageTask(on, config);
      return config;
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      cypressCoverageTask(on, config);
      return config;
    },
  },
});
