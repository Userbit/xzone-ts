const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "./out/jest-coverage",
  transform: {
    ...tsjPreset.transform,
  },
};
