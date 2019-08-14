"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _api = require("../../utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SupportForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SupportForm, _React$Component);

  function SupportForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SupportForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SupportForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      name: '',
      email: '',
      message: '',
      successMessage: null,
      errorMessage: null
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (e) {
      e.preventDefault();

      _this._sendMessage(_objectSpread({}, _this.state));
    });

    _defineProperty(_assertThisInitialized(_this), "catchEnter", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (key, e) {
      _this.setState(_defineProperty({}, key, e.target.value));
    });

    _defineProperty(_assertThisInitialized(_this), "_sendMessage", function (_ref) {
      var name = _ref.name,
          email = _ref.email,
          message = _ref.message;

      if (name && email && message) {
        var supportRequestUrl = _this.props.supportRequestUrl;
        (0, _api.sendSupportMessage)(supportRequestUrl, {
          name: name,
          email: email,
          message: message
        }).then(function (res) {
          if ([200, 201, 202, 204].includes(res.status)) {
            _this.setState({
              successMessage: 'Support request was submitted.',
              name: '',
              email: '',
              message: '',
              errorMessage: null
            });
          }

          if (res.status === 400) {
            return res.json();
          }
        }).then(function (data) {
          if (data && data.message) {
            _this.setState({
              errorMessage: data.message || 'Something went wrong. Please try again.'
            });
          }
        })["catch"](function (e) {
          _this.setState({
            errorMessage: e.message
          }, function () {
            return console.log(_this.state);
          });
        });
      }
    });

    return _this;
  }

  _createClass(SupportForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          name = _this$state.name,
          email = _this$state.email,
          message = _this$state.message,
          successMessage = _this$state.successMessage,
          errorMessage = _this$state.errorMessage;
      var closeSupportDialog = this.props.closeSupportDialog;
      return _react["default"].createElement("div", {
        className: "container--form",
        id: "support-form"
      }, _react["default"].createElement("form", {
        onSubmit: this.onSubmit
      }, _react["default"].createElement("h4", {
        className: "title"
      }, "Support Request Form"), _react["default"].createElement("button", {
        className: "container--form__close",
        onClick: closeSupportDialog
      }, "\xD7"), successMessage && _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("h4", {
        className: "message message__success"
      }, successMessage)), errorMessage && _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("h4", {
        className: "message message__error"
      }, errorMessage)), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("input", {
        id: "name",
        className: "input",
        type: "text",
        name: "name",
        value: name,
        placeholder: "name",
        onChange: function onChange(e) {
          return _this2.onChange('name', e);
        },
        onKeyDown: this.catchEnter,
        required: true
      })), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("input", {
        id: "email",
        className: "input",
        type: "email",
        name: "email",
        value: email,
        placeholder: "email",
        onChange: function onChange(e) {
          return _this2.onChange('email', e);
        },
        onKeyDown: this.catchEnter,
        required: true
      })), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("textarea", {
        id: "message",
        className: "textarea--message",
        name: "message",
        value: message,
        placeholder: "message",
        onChange: function onChange(e) {
          return _this2.onChange('message', e);
        },
        onKeyDown: this.catchEnter,
        required: true
      })), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("button", {
        type: "submit",
        className: "btn",
        disabled: !name || !email || !message
      }, "Submit"))));
    }
  }]);

  return SupportForm;
}(_react["default"].Component);

exports["default"] = SupportForm;

_defineProperty(SupportForm, "propTypes", {
  supportRequestUrl: _propTypes["default"].string.isRequired,
  closeSupportDialog: _propTypes["default"].func.isRequired
});

;