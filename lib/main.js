"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactBlessed = require("react-blessed");

var _App = require("./components/App");

var _App2 = _interopRequireDefault(_App);

var _screen = require("./screen");

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = function main(railsProc) {
  (0, _reactBlessed.render)(_react2.default.createElement(_App2.default, { railsProc: railsProc }), _screen2.default);
};

module.exports = main;