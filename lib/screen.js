"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _blessed = require("blessed");

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = _blessed2.default.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Rails Dashboard"
});

screen.key(["C-c"], function (ch, key) {
  return process.exit(0);
});

exports.default = screen;