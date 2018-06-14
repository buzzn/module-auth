"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  setApiParams: function setApiParams(_ref) {
    var apiPath = _ref.apiPath,
        apiUrl = _ref.apiUrl;
    return {
      type: _constants.default.SET_API_PARAMS,
      apiPath: apiPath,
      apiUrl: apiUrl
    };
  },
  setLogin: function setLogin(login) {
    return {
      type: _constants.default.SET_LOGIN,
      login: login
    };
  },
  setPassword: function setPassword(password) {
    return {
      type: _constants.default.SET_PASSWORD,
      password: password
    };
  },
  startAuth: function startAuth() {
    return {
      type: _constants.default.START_AUTH
    };
  },
  authorizeSuccess: function authorizeSuccess(token) {
    return {
      type: _constants.default.SIGN_IN,
      token: token
    };
  },
  authorizeFailure: function authorizeFailure(error) {
    return {
      type: _constants.default.SIGN_OUT,
      error: error
    };
  },
  signOut: function signOut() {
    return {
      type: _constants.default.SIGN_OUT,
      error: 'Sign out'
    };
  }
};
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "app/actions.js");
}();

;