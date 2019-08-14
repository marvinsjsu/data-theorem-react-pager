"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _enzyme = _interopRequireWildcard(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _Pager = _interopRequireDefault(require("../Pager"));

var _SupportForm = _interopRequireDefault(require("../Pager/SupportForm"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('../../utils/api');

_enzyme["default"].configure({
  adapter: new _enzymeAdapterReact["default"]()
});

describe("The Pager component", function () {
  it("renders as expected", function () {
    var component = _reactTestRenderer["default"].create(pageComponent);

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("pageIndex initial value and after goNext/goPrevious", function () {
    var wrapper = (0, _enzyme.mount)(pageComponent);
    expect(wrapper.state().pageIndex).toBe(0);

    var _wrapper$children$pro = wrapper.children().props(),
        goNext = _wrapper$children$pro.goNext,
        goPrevious = _wrapper$children$pro.goPrevious;

    goNext();
    expect(wrapper.state().pageIndex).toBe(1);
    goPrevious();
    expect(wrapper.state().pageIndex).toBe(0);
    goPrevious();
    expect(wrapper.state().pageIndex).toBe(employees.length - 1);
    goNext();
    expect(wrapper.state().pageIndex).toBe(0);
  });
  test("update showSupportDialog when openSupportDialog is invoked", function () {
    var wrapper = (0, _enzyme.mount)(pageComponent);
    expect(wrapper.state().pageIndex).toBe(0);

    var _wrapper$children$pro2 = wrapper.children().props(),
        openSupportDialog = _wrapper$children$pro2.openSupportDialog,
        closeSupportDialog = _wrapper$children$pro2.closeSupportDialog;

    openSupportDialog();
    expect(wrapper.state().showSupportDialog).toBe(true);
  });
});
var employees = [{
  last_name: 'mante',
  first_name: 'marvin',
  department: 'engineering',
  salary: 'underpaid'
}, {
  last_name: 'oani',
  first_name: 'aimee',
  department: 'teaching',
  salary: 'definitely underpaid'
}, {
  last_name: 'mante',
  first_name: 'sophia',
  department: 'exploring',
  salary: 'more than we make combined'
}];

var pageComponent = _react["default"].createElement(_Pager["default"], {
  pages: employees.map(function (employee, idx) {
    return _react["default"].createElement("ul", {
      key: idx
    }, _react["default"].createElement("li", null, "Name: ", employee.last_name, ", ", employee.first_name), _react["default"].createElement("li", null, "Department: ", employee.department), _react["default"].createElement("li", null, "Salary: $", employee.salary));
  }),
  getLabel: function getLabel(i) {
    return "".concat(employees[i].last_name, ", ").concat(employees[i].first_name);
  },
  pageInfoUrl: function pageInfoUrl(label) {
    return "https://www.example.com/employees/info?label=".concat(label);
  },
  supportRequestUrl: "https://www.example.com/support"
}, function (_ref) {
  var page = _ref.page,
      goPrevious = _ref.goPrevious,
      goNext = _ref.goNext,
      goToLabel = _ref.goToLabel,
      currentPageLabel = _ref.currentPageLabel,
      pageLabels = _ref.pageLabels,
      openSupportDialog = _ref.openSupportDialog,
      pageInfoIsLoading = _ref.pageInfoIsLoading,
      pageInfoError = _ref.pageInfoError,
      pageInfo = _ref.pageInfo;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, _react["default"].createElement("select", {
    onChange: function onChange(e) {
      return goToLabel(e.target.value);
    },
    defaultValue: currentPageLabel
  }, pageLabels.map(function (label) {
    return _react["default"].createElement("option", {
      key: label,
      value: label
    }, label);
  })), _react["default"].createElement("button", {
    onClick: goPrevious
  }, "Previous"), _react["default"].createElement("button", {
    onClick: goNext
  }, "Next"), _react["default"].createElement("button", {
    onClick: openSupportDialog
  }, "Help")), _react["default"].createElement("div", null, page), pageInfoIsLoading && _react["default"].createElement("div", null, "Loading more info..."), pageInfoError && _react["default"].createElement("div", null, "Error fetching info: ", pageInfoError), pageInfo && _react["default"].createElement("div", null, "# of Likes: ", pageInfo.likes));
});