import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";

const isCI = !!process.env.CI;
console.log({ cypressConfigIsCI: isCI });

const baseUrl = isCI
  ? "http://localhost:5000/meeting"
  : "http://localhost:5173";
const setupNodeEvents = isCI
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
