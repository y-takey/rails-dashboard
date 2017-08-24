"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LogListener = require("../LogListener");

var _LogListener2 = _interopRequireDefault(_LogListener);

var _Booting = require("./Booting");

var _Booting2 = _interopRequireDefault(_Booting);

var _ServerInfo = require("./ServerInfo");

var _ServerInfo2 = _interopRequireDefault(_ServerInfo);

var _RequestList = require("./RequestList");

var _RequestList2 = _interopRequireDefault(_RequestList);

var _RequestDetail = require("./RequestDetail");

var _RequestDetail2 = _interopRequireDefault(_RequestDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventEmitter = new _events2.default.EventEmitter();

var containerOptions = {
  vi: true,
  keys: true,
  scrollable: true,
  mouse: true,
  focused: true,
  width: "100%"
};

var initialRow = process.stdout.rows - 3;
var initialState = {
  serverInfo: null,
  requests: [],
  selectedIndex: 0,
  showDetail: false,
  detailMode: "breakdown",
  currentRangeStart: 0,
  maxRow: initialRow,
  halfRow: initialRow,
  currentRow: initialRow
};

var allRequests = [];

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = initialState;

    ["onRailsStarted", "onRailsRequested", "onKeypress", "setMaxRow"].forEach(function (func) {
      return _this[func] = _this[func].bind(_this);
    });

    eventEmitter.on("started", _this.onRailsStarted);
    eventEmitter.on("requested", _this.onRailsRequested);
    eventEmitter.on("error", _this.onRailsError);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var listener = new _LogListener2.default(eventEmitter);
      this.props.railsProc.stdout.on("data", listener.stdout);
      this.props.railsProc.stderr.on("data", listener.stderr);
      this.setMaxRow();
    }
  }, {
    key: "onRailsStarted",
    value: function onRailsStarted(serverInfo) {
      this.setState({ serverInfo: serverInfo });
    }
  }, {
    key: "onRailsRequested",
    value: function onRailsRequested(data) {
      allRequests.push(data);
      var _state = this.state,
          selectedIndex = _state.selectedIndex,
          showDetail = _state.showDetail;


      if (selectedIndex === allRequests.length - 2) {
        this.setState({ selectedIndex: allRequests.length - 1 });
      }
      this.setDisplayRange();
    }
  }, {
    key: "onRailsError",
    value: function onRailsError() {
      console.log("onRailsError");
    }
  }, {
    key: "moveIndex",
    value: function moveIndex(amount) {
      this.move(this.state.selectedIndex + amount);
    }
  }, {
    key: "move",
    value: function move(nextIndex) {
      var maxIndex = allRequests.length - 1;

      if (nextIndex < 0) {
        nextIndex = 0;
      } else if (nextIndex > maxIndex) {
        nextIndex = maxIndex;
      }

      this.setState({ selectedIndex: nextIndex });
      this.setDisplayRange();
    }
  }, {
    key: "moveToEdge",
    value: function moveToEdge(key) {
      this.move(key.shift ? allRequests.length - 1 : 0);
    }
  }, {
    key: "movePage",
    value: function movePage(key) {
      var _state2 = this.state,
          selectedIndex = _state2.selectedIndex,
          currentRow = _state2.currentRow;

      var amount = key.shift ? currentRow * -1 : currentRow;

      this.move(selectedIndex + amount);
    }
  }, {
    key: "changeMode",
    value: function changeMode(mode) {
      if (allRequests.length === 0) return;

      this.setState({ showDetail: true, detailMode: mode });
      this.setDisplayRange();
    }
  }, {
    key: "showDetail",
    value: function showDetail(enable) {
      this.setState({ showDetail: enable });
      this.setDisplayRange();
    }
  }, {
    key: "setMaxRow",
    value: function setMaxRow() {
      var maxRow = process.stdout.rows - 3;
      this.setState({ maxRow: maxRow, halfRow: Math.floor(maxRow / 2) - 1 });
      this.setDisplayRange();
    }
  }, {
    key: "keyFunc",
    value: function keyFunc(key) {
      if (!this._keyMap) {
        var up = _lodash2.default.partial(this.moveIndex, -1).bind(this);
        var down = _lodash2.default.partial(this.moveIndex, 1).bind(this);

        this._keyMap = {
          down: down,
          up: up,
          j: down,
          k: up,
          g: this.moveToEdge.bind(this),
          l: _lodash2.default.partial(this.changeMode, "log").bind(this),
          b: _lodash2.default.partial(this.changeMode, "breakdown").bind(this),
          p: _lodash2.default.partial(this.changeMode, "params").bind(this),
          a: _lodash2.default.partial(this.changeMode, "activerecord").bind(this),
          r: _lodash2.default.partial(this.changeMode, "rendering").bind(this),
          space: this.movePage.bind(this),
          enter: _lodash2.default.partial(this.showDetail, true).bind(this),
          escape: _lodash2.default.partial(this.showDetail, false).bind(this)
        };
      }
      return this._keyMap[key];
    }
  }, {
    key: "onKeypress",
    value: function onKeypress(_char, key) {
      var func = this.keyFunc(key.name);
      if (func) func(key);
    }
  }, {
    key: "setDisplayRange",
    value: function setDisplayRange() {
      var _state3 = this.state,
          selectedIndex = _state3.selectedIndex,
          showDetail = _state3.showDetail,
          maxRow = _state3.maxRow,
          halfRow = _state3.halfRow,
          currentRangeStart = _state3.currentRangeStart;

      var currentRow = showDetail ? halfRow : maxRow;
      var nextRangeStart = void 0;

      if (selectedIndex < currentRangeStart) {
        nextRangeStart = selectedIndex;
      } else if (selectedIndex >= currentRangeStart + currentRow) {
        nextRangeStart = selectedIndex - currentRow + 1;
      } else {
        nextRangeStart = currentRangeStart;
      }
      var requests = allRequests.slice(nextRangeStart, nextRangeStart + currentRow);

      this.setState({ requests: requests, currentRow: currentRow, currentRangeStart: nextRangeStart });
    }
  }, {
    key: "render",
    value: function render() {
      var _state4 = this.state,
          serverInfo = _state4.serverInfo,
          requests = _state4.requests,
          showDetail = _state4.showDetail,
          detailMode = _state4.detailMode,
          selectedIndex = _state4.selectedIndex,
          currentRangeStart = _state4.currentRangeStart,
          currentRow = _state4.currentRow,
          halfRow = _state4.halfRow;


      if (!serverInfo) return _react2.default.createElement(_Booting2.default, null);

      var selectedData = allRequests[selectedIndex] || {};
      var detailProps = {
        top: halfRow + 3,
        height: "100%-" + (halfRow + 3),
        data: selectedData,
        mode: detailMode
      };

      return _react2.default.createElement(
        "box",
        _extends({}, containerOptions, { onKeypress: this.onKeypress, onResize: this.setMaxRow }),
        _react2.default.createElement(_ServerInfo2.default, _extends({ top: 0, height: 1 }, serverInfo)),
        _react2.default.createElement(_RequestList2.default, { top: 1, height: currentRow, data: requests, selectedNo: selectedIndex - currentRangeStart }),
        showDetail && _react2.default.createElement(_RequestDetail2.default, detailProps)
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;