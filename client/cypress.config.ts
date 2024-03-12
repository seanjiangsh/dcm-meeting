import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin";

const { CI_PRODUCTION_E2E } = process.env;
console.log({ CI_PRODUCTION_E2E });

const baseUrl = CI_PRODUCTION_E2E
  ? "http://localhost:5000/meeting"
  : "http://localhost:5173";

const setupNodeEvents = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  cypressCoverageTask(on, config);
  configureVisualRegression(on);
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
    env: { visualRegressionType: "regression" },
    screenshotsFolder: "cypress/snapshots/actual",
  },
});
