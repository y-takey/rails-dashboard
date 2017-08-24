"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _RequestBreakdown = require("./RequestBreakdown");

var _RequestBreakdown2 = _interopRequireDefault(_RequestBreakdown);

var _RequestParams = require("./RequestParams");

var _RequestParams2 = _interopRequireDefault(_RequestParams);

var _RequestActiveRecord = require("./RequestActiveRecord");

var _RequestActiveRecord2 = _interopRequireDefault(_RequestActiveRecord);

var _RequestRendering = require("./RequestRendering");

var _RequestRendering2 = _interopRequireDefault(_RequestRendering);

var _RequestLog = require("./RequestLog");

var _RequestLog2 = _interopRequireDefault(_RequestLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boxStyle = { fg: "white", border: { fg: "white" } };
var tabStyle = { bg: "", fg: "white" };
var selectedTabStyle = { bg: "cyan", fg: "white", bold: true };

var items = [{ key: "breakdown", label: " Breakdown [b] ", component: _RequestBreakdown2.default }, { key: "params", label: " Params [p] ", component: _RequestParams2.default }, { key: "activerecord", label: " ActiveRecord [a] ", component: _RequestActiveRecord2.default }, { key: "rendering", label: " Rendering [r] ", component: _RequestRendering2.default }, { key: "log", label: " Log [l] ", component: _RequestLog2.default }];

var itemSize = _lodash2.default.max(_lodash2.default.map(items, function (item) {
  return item.label.length;
}));

var RequestDetail = function (_Component) {
  _inherits(RequestDetail, _Component);

  function RequestDetail() {
    _classCallCheck(this, RequestDetail);

    return _possibleConstructorReturn(this, (RequestDetail.__proto__ || Object.getPrototypeOf(RequestDetail)).apply(this, arguments));
  }

  _createClass(RequestDetail, [{
    key: "renderTabs",
    value: function renderTabs(left, mode) {
      var ret = [];
      items.forEach(function (item, i) {
        var style = item.key === mode ? selectedTabStyle : tabStyle;
        ret.push(_react2.default.createElement("text", { key: "tab-" + i, left: left + (itemSize + 1) * i, width: itemSize, content: item.label, style: style }));
        ret.push(_react2.default.createElement("text", { key: "sep-" + i, left: left + (itemSize + 1) * (i + 1) - 1, width: 1, content: "|" }));
      });
      return ret;
    }
  }, {
    key: "renderDetail",
    value: function renderDetail(mode, data) {
      var foo = _lodash2.default.find(items, function (item) {
        return item.key === mode;
      });
      return _react2.default.createElement(foo.component, { data: data });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          top = _props.top,
          height = _props.height,
          mode = _props.mode,
          data = _props.data;
      var params = data.params,
          activeRecords = data.activeRecords,
          renderings = data.renderings;


      return _react2.default.createElement(
        "box",
        { top: top, height: height, left: "0", width: "100%" },
        _react2.default.createElement(
          "box",
          { top: 0, height: "100%", left: 0, width: "100%", border: { type: "line" }, style: boxStyle },
          this.renderDetail(mode, data)
        ),
        _react2.default.createElement(
          "box",
          { top: 0, height: 1, left: 2, width: itemSize * items.length + items.length + 1 },
          "|",
          this.renderTabs(1, mode)
        )
      );
    }
  }]);

  return RequestDetail;
}(_react.Component);

exports.default = RequestDetail;