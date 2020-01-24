const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  // preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "./.out/jest-coverage",
  setupFilesAfterEnv: ["./.configs/jest.setup.js"],
  transform: {
    ...tsjPreset.transform,
  },
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/\\..*/"],
};
