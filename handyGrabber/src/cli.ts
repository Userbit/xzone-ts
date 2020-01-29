import * as yargs from "yargs";
import types from "./types";

function configYargs(innerYargs: yargs.Argv): yargs.Argv {
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
    // TODO: Add options when implementing `img` command
  };

  const dataModule: yargs.CommandModule = {
    command: types.Command.data,
    describe: "Get data from remote",
    builder: (_yargs) => _yargs.options(generalOptions).options(dataOptions),
    handler: () => undefined,
  };

  const imgModule: yargs.CommandModule = {
    command: types.Command.img,
    describe: "Get images from remote",
    builder: (_yargs) => _yargs.options(generalOptions).options(imgOptions),
    handler: () => undefined,
  };

  return innerYargs
    .command(dataModule)
    .command(imgModule)
    .demandCommand(1);
}

function getCliOpts(readyArgv: yargs.Arguments): CliOpts {
  const cliOpts: ConfArgv = {};
  [cliOpts.cmd] = readyArgv._;

  Object.keys(readyArgv).forEach((key) => {
    if (!["_", "$0"].includes(key)) {
      cliOpts[key] = readyArgv[key];
    }
  });

  return cliOpts as CliOpts;
}

function runYargs(configuredYargs: ConfYargs): yargs.Arguments {
  return configuredYargs.help().argv as yargs.Arguments;
}

interface ConfArgv {
  [key: string]: unknown;
}
interface ConfYargs {
  help: () => { argv: ConfArgv };
}

interface BaseArgv {
  [types.Option.stage]: types.stage;
  [types.Option.log]: types.log;
}
interface DataArgv extends BaseArgv {
  [types.Option.entity]: types.entity;
}
type ImgArgv = BaseArgv; // TODO: Finish as interface when implementing `img` command

export type CliOpts =
  | (DataArgv & {
      cmd: types.Command.data;
    })
  | (ImgArgv & {
      cmd: types.Command.img;
    });

export const cli = {
  runYargs,
  configYargs,
  getCliOpts,
  runCli() {
    return this.getCliOpts(this.runYargs(this.configYargs(yargs)));
  },
};
