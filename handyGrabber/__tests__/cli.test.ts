import { configYargs, runYargs, getCliOpts } from "../src/cli";
import Types from "../src/types";

import yargs = require("yargs");

const { Option: opt, Command: cmd, entity, stage, log } = Types;

const dataCmd = Types.Command.data;
const imgCmd = Types.Command.img;

describe(configYargs, () => {
  test("should require at least one command", (done) => {
    configYargs().parse([], {}, (err) => {
      expect(err?.message).toMatch("got 0, need at least 1");
      done();
    });
  });

  describe(`when '${dataCmd}' command is used and`, () => {
    test("no options specified, should require 3 options", (done) => {
      configYargs().parse([dataCmd], {}, (err) => {
        expect(err?.message)
          .toInclude(opt.stage)
          .toInclude(opt.log)
          .toInclude(opt.entity);
        done();
      });
    });

    test(`--${opt.stage} is incorrect, should require to select a correct choice`, (done) => {
      configYargs().parse([dataCmd, `--${opt.stage}`, "fake"], {}, (err) => {
        expect(err?.message)
          .toInclude(stage.first)
          .toInclude(stage.upsert)
          .toInclude(stage.check);
        done();
      });
    });

    test(`--${opt.entity} is incorrect, should require to select a correct choice`, (done) => {
      configYargs().parse([dataCmd, `--${opt.entity}`, "fake"], {}, (err) => {
        expect(err?.message)
          .toInclude(entity.movie)
          .toInclude(entity.torrent);
        done();
      });
    });

    test(`--${opt.log} is incorrect, should require to select a correct choice`, (done) => {
      configYargs().parse([dataCmd, `--${opt.log}`, "fake"], {}, (err) => {
        expect(err?.message)
          .toInclude(log.no)
          .toInclude(log.yes);
        done();
      });
    });
  });

  describe(`when ${imgCmd} command is used`, () => {
    // TODO: Write tests when implementing `img` command
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
