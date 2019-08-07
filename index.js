"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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
      page: _this.props.pages[0],
      pages: _this.props.pages,
      pageIndex: 0,
      pageInfo: {},
      pageInfoIsLoading: true,
      pageInfoError: null
    });

    _defineProperty(_assertThisInitialized(_this), "currentPageLabel", function () {
      var pageIndex = _this.state.pageIndex;
      var getLabel = _this.props.getLabel;
      return getLabel(pageIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "pageLabels", function () {
      var pages = _this.state.pages;
      var getLabel = _this.props.getLabel;
      return pages.map(function (page, idx) {
        return getLabel(idx);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "goPrevious", function () {
      _this.setState(function (currState) {
        var newPageIndex = _this._getPageIndex(1, currState.pageIndex, currState.pages.length);

        var newPage = currState.pages[newPageIndex];
        return {
          pageIndex: newPageIndex,
          page: newPage
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "goNext", function () {
      _this.setState(function (currState) {
        var newPageIndex = _this._getPageIndex(-1, currState.pageIndex, currState.pages.length);

        var newPage = currState.pages[newPageIndex];
        return {
          pageIndex: newPageIndex,
          page: newPage
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "goToLabel", function (label) {
      var pages = _this.state.pages;

      var pageIndex = _this.pageLabels().indexOf(label);

      var page = pages[pageIndex];

      if (pageIndex !== -1) {
        _this.setState({
          pageIndex: pageIndex,
          page: page
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "openSupportDialog", function () {});

    _defineProperty(_assertThisInitialized(_this), "_getPageIndex", function (step, currIndex, pageCount) {
      var newPageIndex = currIndex + step;
      var mod = newPageIndex % pageCount;
      return mod > 0 ? mod : Math.abs(pageCount + mod) % pageCount;
    });

    return _this;
  }

  _createClass(Pager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var children = this.props.children;

      if (!children) {
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var Component = this.props.children;
      return _react["default"].createElement(Component, _extends({}, this.state, {
        goNext: this.goNext,
        goPrevious: this.goPrevious,
        goToLabel: this.goToLabel,
        openSupportDialog: this.openSupportDialog,
        pageLabels: this.pageLabels(),
        currentPageLabel: this.currentPageLabel()
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPage = getPage;

function getPage(url) {
  return fetch(url).then(errorHandler).then(function (res) {
    return true;
  })["catch"](function (e) {
    return false;
  });
}

function errorHandler(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}
