"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TYPES, _PROCESSOR;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var BOOTING = "BOOTING";
var RAILS = "RAILS";
var VERSION = "VERSION";
var STARTING = "STARTING";
var ENVIRONMENT = "ENVIRONMENT";
var STARTED = "STARTED";

var REQUEST = "REQUEST";
var PARAMS = "PARAMS";
var SQL = "SQL";
var PROCESSING = "PROCESSING";
var RENDER = "RENDER";
var RESPONSE = "RESPONSE";

var formatParams = function formatParams(data) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var params = _lodash2.default.flatMap(data, function (val, key) {
    var name = prefix ? prefix + "[" + key + "]" : key;
    var value = _lodash2.default.isObject(val) ? "Object" : _lodash2.default.isArray(val) ? "Array" : val;

    if (!_lodash2.default.isObject(val) && !_lodash2.default.isArray(val)) return { name: name, value: value };

    return [{ name: name, value: value }].concat(_toConsumableArray(formatParams(val, name)));
  });
  return _lodash2.default.sortBy(params, "name");
};

var TYPES = (_TYPES = {}, _defineProperty(_TYPES, BOOTING, function (line) {
  return line.startsWith("=> Booting");
}), _defineProperty(_TYPES, RAILS, function (line) {
  return line.startsWith("=> Rails");
}), _defineProperty(_TYPES, VERSION, function (line) {
  return !!line.match(/. Version /);
}), _defineProperty(_TYPES, ENVIRONMENT, function (line) {
  return !!line.match(/. Environment: /);
}), _defineProperty(_TYPES, STARTED, function (line) {
  return line.startsWith("Use Ctrl-C to stop");
}), _defineProperty(_TYPES, REQUEST, function (line) {
  return line.startsWith("Started ");
}), _defineProperty(_TYPES, RENDER, function (line) {
  return line.startsWith("Rendered ");
}), _defineProperty(_TYPES, PARAMS, function (line) {
  return line.startsWith("Parameters: ");
}), _defineProperty(_TYPES, SQL, function (line) {
  return !!line.match(/(.*)\((.+)ms\) .+/);
}), _defineProperty(_TYPES, PROCESSING, function (line) {
  return line.startsWith("Processing ");
}), _defineProperty(_TYPES, RESPONSE, function (line) {
  return line.startsWith("Completed ");
}), _TYPES);

var serverInfo = void 0;
var processInfo = null;
var prevProcessInfo = null;

var PROCESSOR = (_PROCESSOR = {}, _defineProperty(_PROCESSOR, BOOTING, function (line) {
  var ret = line.match(/Booting (\S+)/);

  if (!ret) return;

  serverInfo = { webServer: ret[1] };
}), _defineProperty(_PROCESSOR, RAILS, function (line) {
  var ret = line.match(/=> Rails (\S+) .+ on (\S+)/);

  if (!ret) return;

  Object.assign(serverInfo, { railsVersion: ret[1], url: ret[2] });
}), _defineProperty(_PROCESSOR, VERSION, function (line) {
  var ret = line.match(/Version (\S+) \(ruby (\S+)\)/);

  if (!ret) return;

  Object.assign(serverInfo, { webServerVersion: ret[1], rubyVersion: ret[2] });
}), _defineProperty(_PROCESSOR, ENVIRONMENT, function (line) {
  var ret = line.match(/Environment: (\S+)/);

  if (!ret) return;
  serverInfo.mode = ret[1];
}), _defineProperty(_PROCESSOR, STARTED, function (line) {
  return { type: "started", data: serverInfo };
}), _defineProperty(_PROCESSOR, REQUEST, function (line) {
  var ret = line.match(/Started (\S+) "(\S+)" for \S+ at \d{4}-(\S+ \S+)/);
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
}), _defineProperty(_PROCESSOR, PARAMS, function (line) {
  if (!processInfo) return;

  var ret = line.match(/Parameters: (.+)$/);
  if (!ret) return;

  var params = JSON.parse(ret[1].replace(/=>/g, ":").replace(/nil/g, '"nil"'));

  Object.assign(processInfo, { params: formatParams(params) });
}), _defineProperty(_PROCESSOR, SQL, function (line) {
  if (!processInfo) return;
  var ret = line.match(/(.*)\((.+)ms\) (.+)$/);

  if (!ret) return;

  processInfo.activeRecords.push({ type: ret[1], duration: Number(ret[2]), sql: ret[3] });
}), _defineProperty(_PROCESSOR, PROCESSING, function (line) {
  if (!processInfo) return;

  var ret = line.match(/Processing by (\S+) as (\S+)/);

  if (!ret) return;

  Object.assign(processInfo, { processor: ret[1], format: ret[2] });
}), _defineProperty(_PROCESSOR, RENDER, function (line) {
  if (!processInfo) return;
  var ret = line.match(/Rendered (.+) \((.+)ms\)/);

  if (!ret) return;

  processInfo.renderings.push({ view: ret[1], duration: Number(ret[2]) });
}), _defineProperty(_PROCESSOR, RESPONSE, function (line) {
  if (!processInfo) return;

  var ret = line.match(/Completed (\d+) .+ in ([\d\.]+)ms (.*)/);

  if (!ret) return;

  var detailTimes = ret[3];
  var renderingTime = detailTimes.match(/Views: ([\d\.]+)ms/);
  var sqlTime = detailTimes.match(/ActiveRecord: ([\d\.]+)ms/);

  Object.assign(processInfo, {
    status: ret[1],
    respTime: Number(ret[2] || 0),
    renderingTime: Number(renderingTime && renderingTime[1] || 0),
    sqlTime: Number(sqlTime && sqlTime[1] || 0)
  });

  prevProcessInfo = processInfo;
  prevProcessInfo.pushed = true;
  processInfo = null;
  return { type: "requested", data: prevProcessInfo };
}), _PROCESSOR);

var logType = function logType(line) {
  return _lodash2.default.find(_lodash2.default.keys(TYPES), function (key) {
    return TYPES[key](line);
  });
};

var ANSIRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
var removeANSIstyles = function removeANSIstyles(str) {
  return str.replace(ANSIRegex, "");
};

var parse = function parse(buffer) {
  var lines = buffer.toString().split("\n");
  var ret = lines.map(function (line) {
    var l = removeANSIstyles(line).trim();
    var type = logType(l);
    var foo = null;
    if (type) {
      foo = PROCESSOR[type](l);
    }

    var target = processInfo || prevProcessInfo;
    if (target) target.logs.push(l);
    return foo;
  });
  return _lodash2.default.last(_lodash2.default.compact(ret));
};

exports.default = parse;