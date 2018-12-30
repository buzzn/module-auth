"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/actions.js");
  leaveModule(module);
})();

;