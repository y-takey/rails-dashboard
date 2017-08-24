"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _StyledRow = require("./StyledRow");

var _StyledRow2 = _interopRequireDefault(_StyledRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var header = ["date", "status", "method", "url"];

var containerOptions = {
  ref: "table",
  border: { type: "line" },
  width: "100%",
  // padding: { left: 1, right: 1 },
  style: { border: { fg: "white" } }
};

var format = function format(num) {
  var str = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return (str + " ms").padStart(WIDTHS.respTime);
};

var WIDTHS = {
  date: 14,
  status: 3,
  method: 6,
  format: 4,
  respTime: 10,
  processor: 30,
  url: null
};

var StatusColors = { 2: "green", 3: "blue", 4: "yellow", 5: "red" };

var columns = function columns(data, isSelected) {
  var padded = _lodash2.default.extend({}, data, { respTime: format(data.respTime) });

  var cols = _lodash2.default.map(WIDTHS, function (width, key) {
    return width ? padded[key].padEnd(width).substr(0, width) : padded[key];
  });

  return isSelected ? [cols.join(" ")] : cols;
};

var styles = function styles(status, isSelected) {
  if (isSelected) return [{ bg: "cyan", fg: "white" }];

  return [{ bg: "", fg: "blue" }, { bg: "", fg: StatusColors[status[0]] }, { bg: "", fg: "white" }, { bg: "", fg: "white" }, { bg: "", fg: "magenta" }, { bg: "", fg: "white" }, { bg: "", fg: "" }];
};

var row = function row(data, i, selectedNo) {
  var isSelected = i === selectedNo;

  return _react2.default.createElement(_StyledRow2.default, {
    key: "styled-request-" + i,
    top: i,
    columns: columns(data, isSelected),
    styles: styles(data.status, isSelected)
  });
};

var RequestList = function (_Component) {
  _inherits(RequestList, _Component);

  function RequestList() {
    _classCallCheck(this, RequestList);

    return _possibleConstructorReturn(this, (RequestList.__proto__ || Object.getPrototypeOf(RequestList)).apply(this, arguments));
  }

  _createClass(RequestList, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          top = _props.top,
          height = _props.height,
          data = _props.data,
          selectedNo = _props.selectedNo;


      return _react2.default.createElement(
        "box",
        _extends({ top: top, height: height + 2 }, containerOptions),
        _react2.default.createElement(
          "box",
          { height: "100%-2", width: "100%-2" },
          data.map(function (record, i) {
            return row(record, i, selectedNo);
          })
        )
      );
    }
  }]);

  return RequestList;
}(_react.Component);

exports.default = RequestList;