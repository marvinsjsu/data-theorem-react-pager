"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SupportForm = _interopRequireDefault(require("./SupportForm"));

var _api = require("../../utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GO_BACK = 1;
var GO_PREV = -1;

var Pager =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Pager, _React$Component);

  function Pager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Pager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Pager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      initialized: false,
      pageIndex: 0,
      pageInfo: null,
      pageInfoIsLoading: false,
      pageInfoError: null,
      showSupportDialog: false
    });

    _defineProperty(_assertThisInitialized(_this), "currentPageLabel", function () {
      var pageIndex = _this.state.pageIndex;
      var getLabel = _this.props.getLabel;
      return getLabel(pageIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "pageLabels", function () {
      var _this$props = _this.props,
          getLabel = _this$props.getLabel,
          pages = _this$props.pages;
      return pages.map(function (page, idx) {
        return getLabel(idx);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "goPrevious", function () {
      _this._movePage(GO_PREV);
    });

    _defineProperty(_assertThisInitialized(_this), "goNext", function () {
      _this._movePage(GO_BACK);
    });

    _defineProperty(_assertThisInitialized(_this), "goToLabel", function (label) {
      var pageIndex = _this.pageLabels().indexOf(label);

      if (pageIndex !== -1) {
        _this.setState({
          pageIndex: pageIndex
        }, _this._loadPageUrl);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "openSupportDialog", function () {
      var supportRequestUrl = _this.props.supportRequestUrl;
      if (!supportRequestUrl) return false;

      _this.setState({
        showSupportDialog: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeSupportDialog", function () {
      _this.setState({
        showSupportDialog: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getPageIndex", function (step, currIndex, pageCount) {
      var newPageIndex = currIndex + step;
      var mod = newPageIndex % pageCount;
      return mod > 0 ? mod : Math.abs(pageCount + mod) % pageCount;
    });

    _defineProperty(_assertThisInitialized(_this), "_movePage", function (step) {
      var pages = _this.props.pages;

      _this.setState(function (currState) {
        var newPageIndex = _this._getPageIndex(step, currState.pageIndex, pages.length);

        var newPage = pages[newPageIndex];
        return {
          pageIndex: newPageIndex,
          page: newPage
        };
      }, _this._loadPageUrl);
    });

    _defineProperty(_assertThisInitialized(_this), "_loadPageUrl", function () {
      _this.setState({
        pageInfoError: null,
        pageInfoIsLoading: true
      }, function () {
        var pageInfoUrl = _this.props.pageInfoUrl;

        var pageLabel = _this.currentPageLabel();

        if (pageInfoUrl && pageLabel) {
          (0, _api.getPage)(pageInfoUrl(pageLabel)).then(function (pageInfo) {
            if (_this.mounted && pageInfo) {
              _this.setState({
                pageInfo: pageInfo,
                pageInfoIsLoading: false
              });
            }
          })["catch"](function (error) {
            if (_this.mounted) {
              _this.setState({
                pageInfo: null,
                pageInfoError: error.message,
                pageInfoIsLoading: false
              });
            }
          });
        }
      });
    });

    return _this;
  }

  _createClass(Pager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          pages = _this$props2.pages,
          children = _this$props2.children,
          getLabel = _this$props2.getLabel;
      if (!children || !pages || !pages[0] || !getLabel) return false;
      this.mounted = true;

      this._loadPageUrl();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          showSupportDialog = _this$state.showSupportDialog,
          pageIndex = _this$state.pageIndex;
      var _this$props3 = this.props,
          Component = _this$props3.children,
          supportRequestUrl = _this$props3.supportRequestUrl,
          pages = _this$props3.pages;
      var page = pages[pageIndex];
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(Component, _extends({}, this.state, {
        page: page,
        goNext: this.goNext,
        goPrevious: this.goPrevious,
        goToLabel: this.goToLabel,
        openSupportDialog: this.openSupportDialog,
        pageLabels: this.pageLabels(),
        currentPageLabel: this.currentPageLabel()
      })), showSupportDialog && _react["default"].createElement(_SupportForm["default"], {
        supportRequestUrl: supportRequestUrl,
        closeSupportDialog: this.closeSupportDialog
      }));
    }
  }]);

  return Pager;
}(_react["default"].Component);

exports["default"] = Pager;

_defineProperty(Pager, "propTypes", {
  pages: _propTypes["default"].array.isRequired,
  getLabel: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].func.isRequired,
  supportRequestUrl: _propTypes["default"].string,
  pageInfoUrl: _propTypes["default"].func
});

_defineProperty(Pager, "defaultProps", {
  supportRequestUrl: null,
  pageInfoUrl: null
});