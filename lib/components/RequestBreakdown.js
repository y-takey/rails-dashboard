"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _formatter = require("../formatter");

var _formatter2 = _interopRequireDefault(_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var labelStyle = { fg: "magenta", bold: true };

var RequestBreakdown = function (_Component) {
  _inherits(RequestBreakdown, _Component);

  function RequestBreakdown() {
    _classCallCheck(this, RequestBreakdown);

    return _possibleConstructorReturn(this, (RequestBreakdown.__proto__ || Object.getPrototypeOf(RequestBreakdown)).apply(this, arguments));
  }

  _createClass(RequestBreakdown, [{
    key: "render",
    value: function render() {
      var _props$data = this.props.data,
          respTime = _props$data.respTime,
          sqlTime = _props$data.sqlTime,
          renderingTime = _props$data.renderingTime;


      return _react2.default.createElement(
        "box",
        { top: 0, height: "100%-2", left: 0, width: "100%-2" },
        _react2.default.createElement("box", { top: 1, height: 1, left: 0, width: 19, content: "   Response Time : ", style: labelStyle }),
        _react2.default.createElement("box", { top: 1, height: 1, left: 19, width: "100%-19", content: _formatter2.default.ms(respTime) }),
        _react2.default.createElement("box", { top: 2, height: 1, left: 0, width: 29, content: "  ===========================" }),
        _react2.default.createElement("box", { top: 3, height: 1, left: 0, width: 19, content: "        SQL Time : ", style: labelStyle }),
        _react2.default.createElement("box", { top: 3, height: 1, left: 19, width: "100%-19", content: _formatter2.default.ms(sqlTime) }),
        _react2.default.createElement("box", { top: 4, height: 1, left: 0, width: 19, content: "  Rendering Time : ", style: labelStyle }),
        _react2.default.createElement("box", { top: 4, height: 1, left: 19, width: "100%-19", content: _formatter2.default.ms(renderingTime) }),
        _react2.default.createElement("box", { top: 5, height: 1, left: 0, width: 19, content: "          Others : ", style: labelStyle }),
        _react2.default.createElement("box", { top: 5, height: 1, left: 19, width: "100%-19", content: _formatter2.default.ms(respTime - sqlTime - renderingTime) })
      );
    }
  }]);

  return RequestBreakdown;
}(_react.Component);

exports.default = RequestBreakdown;