"use strict";

var _reducers = _interopRequireDefault(require("../reducers"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

describe('auth reducers', function () {
  var initialState = {
    login: '',
    password: ''
  };
  test('should return the initial state', function () {
    expect((0, _reducers.default)(undefined, {})).toEqual(initialState);
  });
  test('should handle SET_LOGIN', function () {
    var login = 'user';
    var action = {
      type: _constants.default.SET_LOGIN,
      login: login
    };
    expect((0, _reducers.default)(undefined, action)).toEqual(_extends({}, initialState, {
      login: login
    }));
  });
  test('should handle SET_PASSWORD', function () {
    var password = 'password';
    var action = {
      type: _constants.default.SET_PASSWORD,
      password: password
    };
    expect((0, _reducers.default)(undefined, action)).toEqual(_extends({}, initialState, {
      password: password
    }));
  });
  test('should handle SIGN_IN', function () {
    var token = '*****';
    var action = {
      type: _constants.default.SIGN_IN,
      token: token
    };
    expect((0, _reducers.default)(undefined, action)).toEqual(_extends({}, initialState, {
      token: token,
      error: null
    }));
  });
  test('should handle SIGN_OUT', function () {
    var error = '*****';
    var action = {
      type: _constants.default.SIGN_OUT,
      error: error
    };
    expect((0, _reducers.default)(undefined, action)).toEqual(_extends({}, initialState, {
      token: null,
      error: error
    }));
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;