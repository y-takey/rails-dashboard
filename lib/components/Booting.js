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

var Spinner = ".";
var MaxSpinner = 10;

var containerProps = {
  height: "100%",
  width: "100%",
  align: "center",
  valign: "middle",
  style: { fg: "green" }
};

var Booting = function (_Component) {
  _inherits(Booting, _Component);

  function Booting(props) {
    _classCallCheck(this, Booting);

    var _this = _possibleConstructorReturn(this, (Booting.__proto__ || Object.getPrototypeOf(Booting)).call(this, props));

    _this.state = { counter: 0 };
    return _this;
  }

  _createClass(Booting, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var intervalId = setInterval(function () {
        return _this2.setState({ counter: _this2.state.counter + 1 });
      }, 500);
      this.setState({ intervalId: intervalId });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.state.intervalId);
    }
  }, {
    key: "render",
    value: function render() {
      var counter = this.state.counter;
      var spinner = _lodash2.default.padEnd(Spinner.repeat(counter % MaxSpinner), MaxSpinner);

      return _react2.default.createElement("box", _extends({}, containerProps, { content: "Booting" + spinner }));
    }
  }]);

  return Booting;
}(_react.Component);

exports.default = Booting;