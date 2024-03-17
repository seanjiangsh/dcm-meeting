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
  on("before:browser:launch", (browser, launchOptions) => {
    const { name } = browser;
    if (name === "chrome") {
      launchOptions.args.push("--window-size=1000,660");
      launchOptions.args.push("--force-device-scale-factor=1");
    } else if (name === "electron") {
      launchOptions.preferences.width = 1000;
      launchOptions.preferences.height = 660;
    } else if (name === "firefox") {
      launchOptions.args.push("--width=1000");
      launchOptions.args.push("--height=660");
    }
    return launchOptions;
  });
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
    pageLoadTimeout: 10000,
  },
});
