"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var labelStyle = { fg: "magenta", bold: true };

var RequestParams = function (_Component) {
  _inherits(RequestParams, _Component);

  function RequestParams() {
    _classCallCheck(this, RequestParams);

    return _possibleConstructorReturn(this, (RequestParams.__proto__ || Object.getPrototypeOf(RequestParams)).apply(this, arguments));
  }

  _createClass(RequestParams, [{
    key: "render",
    value: function render() {
      var params = this.props.data.params;

      var maxNameLength = _lodash2.default.max(params.map(function (param) {
        return param.name.length;
      })) + 1;
      return _react2.default.createElement(
        "box",
        { top: 0, height: "100%-2", left: 0, width: "100%-2" },
        params.map(function (_ref, i) {
          var name = _ref.name,
              value = _ref.value;

          return [_react2.default.createElement("box", {
            top: i + 1,
            height: 1,
            left: 0,
            width: maxNameLength + 3,
            content: name.padStart(maxNameLength) + " : ",
            style: labelStyle
          }), _react2.default.createElement("box", { top: i + 1, height: 1, left: maxNameLength + 3, width: "100%-" + (maxNameLength + 3), content: value })];
        })
      );
    }
  }]);

  return RequestParams;
}(_react.Component);

exports.default = RequestParams;