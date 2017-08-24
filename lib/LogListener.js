"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// for test ////////////////////
var dmyServerInfo = {
  webServer: "Puma",
  railsVersion: "5.1.2",
  url: "http://localhost:3000",
  webServerVersion: "3.9.2",
  rubyVersion: "2.2.1p100"
};

var dmyParams = [{ name: "foo", value: "hoge" }, { name: "bar", value: "fuga" }];
var dmyActiveRecords = [{
  type: "User Load",
  sql: "SELECT * FROM users <dmy>123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
  duration: 1
}, { type: "SQL", sql: "UPDATE users SET name = 'hoge'", duration: 10 }];
var dmyRenderings = [{ view: "views/shared/_page_title.html.haml", duration: 2 }, { view: "views/shared/_page_body.html.haml", duration: 13 }];
var dmyData = {
  date: "",
  status: "200",
  method: "GET",
  format: "JSON",
  processor: "HogesController#index",
  url: "/fooo/bar",
  respTime: 40,
  sqlTime: 18,
  renderingTime: 16,
  params: dmyParams,
  activeRecords: dmyActiveRecords,
  renderings: dmyRenderings
};
//////////////////////

var LogListener = function () {
  function LogListener(eventEmitter) {
    _classCallCheck(this, LogListener);

    this.eventEmitter = eventEmitter;
    this.stdout = this.stdout.bind(this);
    this.stderr = this.stderr.bind(this);
  }

  _createClass(LogListener, [{
    key: "stdout",
    value: function stdout(data) {
      var ret = (0, _parser2.default)(data);
      if (ret) this.eventEmitter.emit(ret.type, ret.data);
      // for test
      // if (ret && !this.interval) {
      //   this.interval = true;
      //   setInterval(() => {
      //     const sec = new Date().getSeconds();
      //     const status = sec % 3 === 0 ? "422" : sec % 5 === 0 ? "500" : "200";
      //     const dmy = Object.assign({}, dmyData, {
      //       date: `08-01 00:12:${sec.toString().padStart(2, "0")}`,
      //       status: status
      //     });
      //     this.eventEmitter.emit("requested", dmy);
      //   }, 3000);
      // }
      //
    }
  }, {
    key: "stderr",
    value: function stderr(data) {
      this.eventEmitter.emit("error", data.toString().trim());
    }
  }]);

  return LogListener;
}();

exports.default = LogListener;