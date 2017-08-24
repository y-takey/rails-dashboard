"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  ms: function ms(num) {
    var roundedNum = Math.round(num * 10) / 10;
    var str = String(roundedNum).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return _lodash2.default.padStart(str, 7) + " ms";
  }
};