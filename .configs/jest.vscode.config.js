// This config file for VSCode is included in ../.vscode/settings.json
// RESTART VSCODE AFTER CHANGING IT!
const baseJestConf = require("../jest.config");

// Extend or override Jest Config options in package.json for Jest extension in VSCode
const jestVSCodeConf = {
  collectCoverage: true,
  // reporters: [["jest-simple-dot-reporter", { color: true }]],
};

module.exports = {
  ...baseJestConf,
  ...jestVSCodeConf,
  rootDir: "../",
};
