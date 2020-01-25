import * as yargs from "yargs";
import types from "./types";

export function configYargs(): yargs.Argv {
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

  return yargs
    .command(dataMod)
    .command(imgMod)
    .demandCommand(1);
}

interface ConfArgv {
  [key: string]: unknown;
}
interface ConfYargs {
  help: () => { argv: ConfArgv };
}

export function runYargs(configuredYargs: ConfYargs): yargs.Arguments {
  return configuredYargs.help().argv as yargs.Arguments;
}

interface BaseArgv {
  [types.Option.stage]: types.stage;
  [types.Option.log]: types.log;
}

interface DataArgv extends BaseArgv {
  [types.Option.entity]: types.entity;
}

type ImgArgv = BaseArgv; // TODO: Finish when implementing `img` command

type CliOpts =
  | (DataArgv & {
      cmd: types.Command.data;
    })
  | (ImgArgv & {
      cmd: types.Command.img;
    });

export function getCliOpts(readyArgv: yargs.Arguments): CliOpts {
  const cliOpts: ConfArgv = {};
  [cliOpts.cmd] = readyArgv._;

  Object.keys(readyArgv).forEach((key) => {
    if (!["_", "$0"].includes(key)) {
      cliOpts[key] = readyArgv[key];
    }
  });

  return cliOpts as CliOpts;
}
