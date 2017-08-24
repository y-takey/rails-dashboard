"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ms: function ms(num) {
    var roundedNum = Math.round(num * 10) / 10;
    var str = String(roundedNum).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return str.padStart(7) + " ms";
  }
};