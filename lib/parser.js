import _ from "lodash";

const BOOTING = "BOOTING";
const RAILS = "RAILS";
const VERSION = "VERSION";
const STARTING = "STARTING";
const ENVIRONMENT = "ENVIRONMENT";
const STARTED = "STARTED";

const REQUEST = "REQUEST";
const PARAMS = "PARAMS";
const SQL = "SQL";
const PROCESSING = "PROCESSING";
const RENDER = "RENDER";
const RESPONSE = "RESPONSE";

const TYPES = {
  [BOOTING]: line => {
    return line.startsWith("=> Booting");
  },
  [RAILS]: line => {
    return line.startsWith("=> Rails");
  },
  [VERSION]: line => {
    return !!line.match(/. Version /);
  },
  [ENVIRONMENT]: line => {
    return !!line.match(/. Environment: /);
  },
  [STARTED]: line => {
    return line.startsWith("Use Ctrl-C to stop");
  },
  [REQUEST]: line => {
    return line.startsWith("Started ");
  },
  [RENDER]: line => {
    return line.startsWith("Rendered ");
  },
  [PARAMS]: line => {
    return line.startsWith("Parameters: ");
  },
  [SQL]: line => {
    return !!line.match(/(.*)\((.+)ms\) (.+)/);
  },
  [PROCESSING]: line => {
    return line.startsWith("Processing ");
  },
  [RESPONSE]: line => {
    return line.startsWith("Completed ");
  }
};

let serverInfo;
let processInfo = null;

const PROCESSOR = {
  [BOOTING]: line => {
    let ret = line.match(/Booting (\S+)/);

    if (!ret) return;

    serverInfo = { webServer: ret[1] };
  },
  [RAILS]: line => {
    let ret = line.match(/=> Rails (\S+) .+ on (\S+)/);

    if (!ret) return;

    Object.assign(serverInfo, { railsVersion: ret[1], url: ret[2] });
  },
  [VERSION]: line => {
    let ret = line.match(/Version (\S+) \(ruby (\S+)\)/);

    if (!ret) return;

    Object.assign(serverInfo, { webServerVersion: ret[1], rubyVersion: ret[2] });
  },
  [ENVIRONMENT]: line => {
    let ret = line.match(/Environment: (\S+)/);

    if (!ret) return;
    serverInfo.mode = ret[1];
  },
  [STARTED]: line => {
    return { type: "started", data: serverInfo };
  },
  [REQUEST]: line => {
    return null;
  },
  [PARAMS]: line => {
    return null;
  },
  [SQL]: line => {
    return null;
  },
  [PROCESSING]: line => {
    return null;
  },
  [RENDER]: line => {
    return null;
  },
  [RESPONSE]: line => {
    if (!processInfo) return;

    let ret = line.match(/Completed (\d+) \S+ in ([\d\.]+)ms \(Views: ([\d\.]+)ms | ActiveRecord: ([\d\.]+)ms\)/);

    if (!ret) return;

    Object.assign(processInfo, {
      status: ret[1],
      respTime: Number(ret[2]),
      renderingTime: Number(ret[3]),
      sqlTime: Number(ret[4])
    });

    info = processInfo;
    processInfo = null;
    return { type: "started", data: info };
  }
};

const logType = line => {
  return _.find(_.keys(TYPES), key => TYPES[key](line));
};

const parse = buffer => {
  const lines = buffer.toString().split("\n");
  const ret = lines.map(line => {
    const l = line.trim();
    const type = logType(l);
    if (!type) return;

    return PROCESSOR[type](l);
  });
  return _.last(_.compact(ret));
};

export default parse;
