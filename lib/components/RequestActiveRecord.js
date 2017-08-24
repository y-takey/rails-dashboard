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

var _formatter = require("../formatter");

var _formatter2 = _interopRequireDefault(_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var typeStyle = { fg: "magenta", bold: true, align: "right" };
var durationStyle = { fg: "yellow" };
var sqlStyle = {};
var durationHeaderStyle = { fg: "yellow" };
var sqlHeaderStyle = { fg: "magenta" };

var containerStyle = {
  padding: { top: 1, left: 2, right: 2 }
};

var RequestActiveRecord = function (_Component) {
  _inherits(RequestActiveRecord, _Component);

  function RequestActiveRecord() {
    _classCallCheck(this, RequestActiveRecord);

    return _possibleConstructorReturn(this, (RequestActiveRecord.__proto__ || Object.getPrototypeOf(RequestActiveRecord)).apply(this, arguments));
  }

  _createClass(RequestActiveRecord, [{
    key: "render",
    value: function render() {
      var _props$data = this.props.data,
          sqlTime = _props$data.sqlTime,
          activeRecords = _props$data.activeRecords;

      var maxTypeLength = _lodash2.default.max(activeRecords.map(function (_ref) {
        var type = _ref.type;
        return type.length;
      })) || 7;
      var othersTime = sqlTime - _lodash2.default.sumBy(activeRecords, "duration");
      if (othersTime < 0) othersTime = 0;

      return _react2.default.createElement(
        "box",
        _extends({ top: 0, height: "100%-2", left: 0, width: "100%-6" }, containerStyle),
        _react2.default.createElement(_StyledRow2.default, {
          top: 0,
          columns: ["Total ", _formatter2.default.ms(sqlTime), activeRecords.length + " SQL"],
          styles: [{ width: maxTypeLength, align: "right" }, durationHeaderStyle, sqlHeaderStyle]
        }),
        _react2.default.createElement(_StyledRow2.default, { top: 1, columns: ["=".repeat(maxTypeLength + 11)], styles: [{ fg: "white" }] }),
        activeRecords.map(function (_ref2, i) {
          var type = _ref2.type,
              duration = _ref2.duration,
              sql = _ref2.sql;
          return _react2.default.createElement(_StyledRow2.default, {
            key: "styledrow-" + i,
            top: i + 2,
            columns: [type, _formatter2.default.ms(duration), sql],
            styles: [_extends({ width: maxTypeLength }, typeStyle), durationStyle, sqlStyle]
          });
        }),
        _react2.default.createElement(_StyledRow2.default, {
          top: 2 + activeRecords.length,
          columns: ["Others ", _formatter2.default.ms(othersTime)],
          styles: [_extends({ width: maxTypeLength }, typeStyle), durationStyle]
        })
      );
    }
  }]);

  return RequestActiveRecord;
}(_react.Component);

exports.default = RequestActiveRecord;