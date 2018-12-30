"use strict";

var _reducers = _interopRequireDefault(require("../reducers"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    expect((0, _reducers.default)(undefined, action)).toEqual(_objectSpread({}, initialState, {
      login: login
    }));
  });
  test('should handle SET_PASSWORD', function () {
    var password = 'password';
    var action = {
      type: _constants.default.SET_PASSWORD,
      password: password
    };
    expect((0, _reducers.default)(undefined, action)).toEqual(_objectSpread({}, initialState, {
      password: password
    }));
  });
  test('should handle SIGN_IN', function () {
    var token = '*****';
    var action = {
      type: _constants.default.SIGN_IN,
      token: token
    };
    expect((0, _reducers.default)(undefined, action)).toEqual(_objectSpread({}, initialState, {
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
    expect((0, _reducers.default)(undefined, action)).toEqual(_objectSpread({}, initialState, {
      token: null,
      error: error
    }));
  });
});