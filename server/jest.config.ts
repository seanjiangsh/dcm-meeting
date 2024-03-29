import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist/", "node_modules/"],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  // this enables us to use tsconfig-paths with jest
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
