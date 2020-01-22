import * as yargs from "yargs";
import types from "./types";

type Options = { [option: string]: yargs.Options };

const generalOptions: Options = {
  [types.Option.stage]: {
    desc: "Choose a stage of processing",
    choices: [...Object.keys(types.stage)],
    demandOption: true,
  },
  [types.Option.log]: {
    desc: "Log processing?",
    choices: [...Object.keys(types.log)],
    demandOption: true,
  },
};

const dataOptions: Options = {
  [types.Option.entity]: {
    desc: "Choose an entity",
    choices: [...Object.keys(types.entity)],
    demandOption: true,
  },
};

const imgOptions: Options = {
  // Options for img command
};

type MyArgv = {
  $0: string;
  _: [types.Command];
  entity?: types.entity;
  stage: types.stage;
  log: types.log;
};

const dataMod: yargs.CommandModule = {
  command: types.Command.data,
  describe: "Get data from remote",
  builder: (_yargs) => _yargs.options(generalOptions).options(dataOptions),
  handler: () => undefined,
};

const imgMod: yargs.CommandModule = {
  command: types.Command.img,
  describe: "Get images from remote",
  builder: (_yargs) => _yargs.options(generalOptions).options(imgOptions),
  handler: () => undefined,
};

const argv = (yargs
  .command(dataMod)
  .command(imgMod)
  .demandCommand(1)
  .help().argv as unknown) as MyArgv;

console.log(argv);
