import { getCliOpts, configYargs, runYargs } from "./cli";

const cliOpts = getCliOpts(runYargs(configYargs()));

console.log(cliOpts);
