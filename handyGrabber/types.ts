/* eslint-disable @typescript-eslint/no-namespace */

namespace Types {
  export enum Command {
    data = "data",
    img = "img"
  }

  export enum Option {
    entity = "entity",
    stage = "stage",
    log = "log"
  }

  export enum entity {
    movie = "movie",
    torrent = "torrent"
  }

  export enum stage {
    first = "first",
    upsert = "upsert",
    check = "check"
  }

  export enum log {
    yes = "yes",
    no = "no"
  }
}

export default Types;
