"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _enzyme = _interopRequireWildcard(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _SupportForm = _interopRequireDefault(require("../Pager/SupportForm"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('../../utils/api');

_enzyme["default"].configure({
  adapter: new _enzymeAdapterReact["default"]()
});

var supportRequestUrl = 'http://localhost:3000/api/v1/test';
describe("The SupportForm component", function () {
  it("renders as expected", function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_SupportForm["default"], {
      supportRequestUrl: supportRequestUrl,
      closeSupportDialog: function closeSupportDialog() {}
    }));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("user enters name in input and is shown", function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_SupportForm["default"], {
      supportRequestUrl: supportRequestUrl,
      closeSupportDialog: function closeSupportDialog() {}
    }));
    wrapper.find('#name').simulate('change', {
      target: {
        value: 'calvin'
      }
    });
    expect(wrapper.find('#name').props().value).toEqual('calvin');
  });
  test("user enters email in input and is shown", function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_SupportForm["default"], {
      supportRequestUrl: supportRequestUrl,
      closeSupportDialog: function closeSupportDialog() {}
    }));
    wrapper.find('#email').simulate('change', {
      target: {
        value: 'calvin@pups.com'
      }
    });
    expect(wrapper.find('#email').props().value).toEqual('calvin@pups.com');
  });
  test("user enters message in input and is shown", function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_SupportForm["default"], {
      supportRequestUrl: supportRequestUrl,
      closeSupportDialog: function closeSupportDialog() {}
    }));
    wrapper.find('#message').simulate('change', {
      target: {
        value: 'need a walk'
      }
    });
    expect(wrapper.find('#message').props().value).toEqual('need a walk');
  });
  test("user submits support form, fires event preventsDefault", function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_SupportForm["default"], {
      supportRequestUrl: supportRequestUrl,
      closeSupportDialog: function closeSupportDialog() {}
    }));
    var prevented = false;
    wrapper.find('form').simulate('submit', {
      preventDefault: function preventDefault() {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  });
  test("user hits enter on input, fires event preventsDefault", function () {
    var closed = false;

    var closeSupportDialog = function closeSupportDialog() {
      closed = true;
    };

    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_SupportForm["default"], {
      supportRequestUrl: supportRequestUrl,
      closeSupportDialog: closeSupportDialog
    }));
    var prevented = false;
    wrapper.find('#name').simulate('keydown', {
      key: 'Enter',
      preventDefault: function preventDefault() {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  });
  test("user clicks on close (x) button", function () {
    var closed = false;

    var closeSupportDialog = function closeSupportDialog() {
      closed = true;
    };

    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_SupportForm["default"], {
      supportRequestUrl: supportRequestUrl,
      closeSupportDialog: closeSupportDialog
    }));
    wrapper.find('.container--form__close').simulate('click');
    expect(closed).toBe(true);
  });
});