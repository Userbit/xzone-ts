import { cli, CliOpts } from "../src/cli";
import Types from "../src/types";

import yargs = require("yargs");

const { configYargs, runYargs, getCliOpts, runCli } = cli;
const { Option: opt, Command: cmd, entity, stage, log } = Types;

const dataCmd = Types.Command.data;
const imgCmd = Types.Command.img;

describe(configYargs, () => {
  test("should require at least one command, when no command specified", () => {
    return new Promise((done) => {
      configYargs(yargs).parse([], {}, (err) => {
        expect(err?.message).toMatch("got 0, need at least 1");

        done();
      });
    });
  });

  describe(`when '${dataCmd}' command is used and`, () => {
    test("no options specified, should require 3 options", () => {
      return new Promise((done) => {
        configYargs(yargs).parse([dataCmd], {}, (err) => {
          Object.keys(opt).forEach((option) => {
            expect(err?.message).toInclude(option);
          });

          done();
        });
      });
    });

    test(`--${opt.stage} is incorrect, should require to select a correct choice`, () => {
      return new Promise((done) => {
        configYargs(yargs).parse([dataCmd, `--${opt.stage}`, "fake"], {}, (err) => {
          Object.keys(stage).forEach((option) => {
            expect(err?.message).toInclude(option);
          });

          done();
        });
      });
    });

    test(`--${opt.log} is incorrect, should require to select a correct choice`, () => {
      return new Promise((done) => {
        configYargs(yargs).parse([dataCmd, `--${opt.log}`, "fake"], {}, (err) => {
          Object.keys(log).forEach((option) => {
            expect(err?.message).toInclude(option);
          });

          done();
        });
      });
    });

    test(`--${opt.entity} is incorrect, should require to select a correct choice`, () => {
      return new Promise((done) => {
        configYargs(yargs).parse([dataCmd, `--${opt.entity}`, "fake"], {}, (err) => {
          Object.keys(entity).forEach((option) => {
            expect(err?.message).toInclude(option);
          });

          done();
        });
      });
    });
  });

  describe(`when '${imgCmd}' command is used and`, () => {
    // TODO: Write additional tests when implementing `img` command
    test(`--${opt.stage} is incorrect, should require to select a correct choice`, () => {
      return new Promise((done) => {
        configYargs(yargs).parse([imgCmd, `--${opt.stage}`, "fake"], {}, (err) => {
          Object.keys(stage).forEach((option) => {
            expect(err?.message).toInclude(option);
          });

          done();
        });
      });
    });

    test(`--${opt.log} is incorrect, should require to select a correct choice`, () => {
      return new Promise((done) => {
        configYargs(yargs).parse([imgCmd, `--${opt.log}`, "fake"], {}, (err) => {
          Object.keys(log).forEach((option) => {
            expect(err?.message).toInclude(option);
          });

          done();
        });
      });
    });

    test.todo("Write additional test when implementing 'img' command");
  });
});

describe(runYargs, () => {
  test("should call .help() and return 'argv' object, when configured yargs is passed in", () => {
    const mockObj = { fakeProp: "fakeValue" };
    const mockConfiguredYargs = {
      help: () => ({ argv: mockObj }),
    };

    const result = runYargs(mockConfiguredYargs);

    expect(result).toBe(mockObj);
  });
});

describe(getCliOpts, () => {
  test("should return object with all options and 'cmd' key, from 'argv' object", () => {
    const mockOpts = {
      stage: stage.check,
      log: log.no,
      entity: entity.movie,
    };
    const mockArgv: yargs.Arguments = {
      _: ["data"],
      $0: "path/to/script",
      ...mockOpts,
    };

    const result = getCliOpts(mockArgv);

    expect(result).toStrictEqual<ReturnType<typeof getCliOpts>>({ cmd: cmd.data, ...mockOpts });
  });
});

describe(runCli, () => {
  it(`should call appropriate functions in a correct way and return valid result`, () => {
    const mockObj1 = { _: ["data"], $0: "path" };
    const mockObj2: CliOpts = { cmd: cmd.img, log: log.yes, stage: stage.first };
    const configYargsMock = jest.spyOn(cli, "configYargs").mockReturnValue(yargs);
    const runYargsMock = jest.spyOn(cli, "runYargs").mockReturnValue(mockObj1);
    const getCliOptsMock = jest.spyOn(cli, "getCliOpts").mockReturnValue(mockObj2);

    const result = cli.runCli();

    expect(configYargsMock).toHaveBeenCalledWith(yargs);
    expect(runYargsMock).toHaveBeenCalledWith(yargs);
    expect(getCliOptsMock).toHaveBeenCalledWith(mockObj1);
    expect(result).toBe(mockObj2);
  });
});
