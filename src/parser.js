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

const formatParams = (data, prefix = null) => {
  const params = _.flatMap(data, (val, key) => {
    const name = prefix ? `${prefix}[${key}]` : key;
    const value = _.isObject(val) ? "Object" : _.isArray(val) ? "Array" : val;

    if (!_.isObject(val) && !_.isArray(val)) return { name, value };

    return [{ name, value }, ...formatParams(val, name)];
  });
  return _.sortBy(params, "name");
};

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
    return !!line.match(/(.*)\((.+)ms\) .+/);
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
let prevProcessInfo = null;

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
    let ret = line.match(/Started (\S+) "(\S+)" for \S+ at \d{4}-(\S+ \S+)/);
    if (!ret) return;

    processInfo = {
      method: ret[1],
      url: decodeURIComponent(ret[2]),
      date: ret[3],
      params: [],
      activeRecords: [],
      renderings: [],
      logs: [],
      pushed: false
    };
  },
  [PARAMS]: line => {
    if (!processInfo) return;

    let ret = line.match(/Parameters: (.+)$/);
    if (!ret) return;

    const params = JSON.parse(ret[1].replace(/=>/g, ":").replace(/nil/g, '"nil"'));

    Object.assign(processInfo, { params: formatParams(params) });
  },
  [SQL]: line => {
    if (!processInfo) return;
    let ret = line.match(/(.*)\((.+)ms\) (.+)$/);

    if (!ret) return;

    processInfo.activeRecords.push({ type: ret[1], duration: Number(ret[2]), sql: ret[3] });
  },
  [PROCESSING]: line => {
    if (!processInfo) return;

    let ret = line.match(/Processing by (\S+) as (\S+)/);

    if (!ret) return;

    Object.assign(processInfo, { processor: ret[1], format: ret[2] });
  },
  [RENDER]: line => {
    if (!processInfo) return;
    let ret = line.match(/Rendered (.+) \((.+)ms\)/);

    if (!ret) return;

    processInfo.renderings.push({ view: ret[1], duration: Number(ret[2]) });
  },
  [RESPONSE]: line => {
    if (!processInfo) return;

    let ret = line.match(/Completed (\d+) .+ in ([\d\.]+)ms (.*)/);

    if (!ret) return;

    const detailTimes = ret[3];
    const renderingTime = detailTimes.match(/Views: ([\d\.]+)ms/);
    const sqlTime = detailTimes.match(/ActiveRecord: ([\d\.]+)ms/);

    Object.assign(processInfo, {
      status: ret[1],
      respTime: Number(ret[2] || 0),
      renderingTime: Number((renderingTime && renderingTime[1]) || 0),
      sqlTime: Number((sqlTime && sqlTime[1]) || 0)
    });

    prevProcessInfo = processInfo;
    prevProcessInfo.pushed = true;
    processInfo = null;
    return { type: "requested", data: prevProcessInfo };
  }
};

const logType = line => {
  return _.find(_.keys(TYPES), key => TYPES[key](line));
};

const ANSIRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
const removeANSIstyles = str => str.replace(ANSIRegex, "");

const parse = buffer => {
  const lines = buffer.toString().split("\n");
  const ret = lines.map(line => {
    const l = removeANSIstyles(line).trim();
    const type = logType(l);
    let foo = null;
    if (type) {
      foo = PROCESSOR[type](l);
    }

    const target = processInfo || prevProcessInfo;
    if (target) target.logs.push(l);
    return foo;
  });
  return _.last(_.compact(ret));
};

export default parse;
