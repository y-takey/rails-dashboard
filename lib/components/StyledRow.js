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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyledRow = function (_Component) {
  _inherits(StyledRow, _Component);

  function StyledRow() {
    _classCallCheck(this, StyledRow);

    return _possibleConstructorReturn(this, (StyledRow.__proto__ || Object.getPrototypeOf(StyledRow)).apply(this, arguments));
  }

  _createClass(StyledRow, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          top = _props.top,
          styles = _props.styles,
          columns = _props.columns,
          _props$spacer = _props.spacer,
          spacer = _props$spacer === undefined ? 1 : _props$spacer;

      styles.reduce(function (left, style, i) {
        style.left = left;
        if (!style.width) {
          style.width = i === columns.length - 1 ? "100%-" + left : columns[i].length;
        }

        return left + style.width + spacer;
      }, 0);

      return _react2.default.createElement(
        "box",
        { top: top, height: 1, left: 0, width: "100%" },
        columns.map(function (column, i) {
          return _react2.default.createElement("box", _extends({
            key: "row-" + top + "-" + i
          }, _lodash2.default.pick(styles[i], "left", "width", "align"), {
            content: column,
            style: styles[i]
          }));
        })
      );
    }
  }]);

  return StyledRow;
}(_react.Component);

exports.default = StyledRow;