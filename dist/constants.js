"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = {
  SET_API_PARAMS: 'buzzn_auth/SET_API_PARAMS',
  SET_LOGIN: 'buzzn_auth/SET_LOGIN',
  SET_PASSWORD: 'buzzn_auth/SET_PASSWORD',
  SIGN_IN: 'buzzn_auth/SIGN_IN',
  SIGN_OUT: 'buzzn_auth/SIGN_OUT',
  START_AUTH: 'buzzn_auth/START_AUTH',
  REFRESH_TOKEN: 'buzzn_auth/REFRESH_TOKEN'
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

  reactHotLoader.register(_default, "default", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/constants.js");
  leaveModule(module);
})();

;