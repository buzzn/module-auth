"use strict";

var _actions = _interopRequireDefault(require("../actions"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('auth actions', function () {
  test('should create and action to set api params', function () {
    var apiUrl = 'url';
    var apiPath = 'path';
    var expectedAction = {
      type: _constants.default.SET_API_PARAMS,
      apiUrl: apiUrl,
      apiPath: apiPath
    };
    expect(_actions.default.setApiParams({
      apiUrl: apiUrl,
      apiPath: apiPath
    })).toEqual(expectedAction);
  });
  test('should create an action to store login', function () {
    var login = 'user';
    var expectedAction = {
      type: _constants.default.SET_LOGIN,
      login: login
    };
    expect(_actions.default.setLogin(login)).toEqual(expectedAction);
  });
  test('should create an action to store password', function () {
    var password = 'password';
    var expectedAction = {
      type: _constants.default.SET_PASSWORD,
      password: password
    };
    expect(_actions.default.setPassword(password)).toEqual(expectedAction);
  });
  test('should create an action to start auth', function () {
    var expectedAction = {
      type: _constants.default.START_AUTH,
      authType: _constants.default.PASSWORD_FLOW
    };
    expect(_actions.default.startAuth(_constants.default.PASSWORD_FLOW)).toEqual(expectedAction);
  });
  test('should create an action to auth success', function () {
    var token = '*****';
    var expectedAction = {
      type: _constants.default.SIGN_IN,
      token: token
    };
    expect(_actions.default.authorizeSuccess(token)).toEqual(expectedAction);
  });
  test('should create an action to auth failure', function () {
    var error = '*****';
    var expectedAction = {
      type: _constants.default.SIGN_OUT,
      error: error
    };
    expect(_actions.default.authorizeFailure(error)).toEqual(expectedAction);
  });
  test('should create an action to sign out', function () {
    var error = 'Sign out';
    var expectedAction = {
      type: _constants.default.SIGN_OUT,
      error: error
    };
    expect(_actions.default.signOut()).toEqual(expectedAction);
  });
});