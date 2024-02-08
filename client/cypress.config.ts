import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";

const isProd = process.env.ENV === "PROD";
const baseUrl = isProd ? "http://localhost/meeting" : "http://localhost:5173";
const setupNodeEvents = isProd
  ? undefined
  : (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
      cypressCoverageTask(on, config);
      return config;
    };

export default defineConfig({
  component: {
    devServer: { framework: "react", bundler: "vite" },
    setupNodeEvents,
  },
  e2e: {
    baseUrl,
    setupNodeEvents,
  },
});
