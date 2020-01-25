const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  // preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./.configs/jest.setup.js"],
  transform: {
    ...tsjPreset.transform,
  },
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/\\..*/"],
  cache: true,
  cacheDirectory: "./.out/jest-cache",
  coverageDirectory: "./.out/jest-coverage",
};
