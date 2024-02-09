import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";

const { CI_PRODUCTION_E2E } = process.env;
console.log({ CI_PRODUCTION_E2E });

const baseUrl = CI_PRODUCTION_E2E
  ? "http://localhost:5000/meeting"
  : "http://localhost:5173";

const setupNodeEvents = CI_PRODUCTION_E2E
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
