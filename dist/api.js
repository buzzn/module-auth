"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("whatwg-fetch");

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function parseResponse(response) {
  if (response.status === 200) {
    return {
      token: response.headers.get('authorization')
    };
  } else {
    return Promise.reject(response.status);
  }
}

function prepareHeaders(token) {
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (token) headers.Authorization = "Bearer ".concat(token);
  return headers;
}

var _default = {
  getAuthTokens: function getAuthTokens() {
    return JSON.parse(localStorage.getItem('buzznAuthTokens')) || {};
  },
  setAuthTokens: function setAuthTokens(token) {
    return localStorage.setItem('buzznAuthTokens', JSON.stringify(token || {}));
  },
  removeAuthTokens: function removeAuthTokens() {
    return localStorage.removeItem('buzznAuthTokens');
  },
  passwordAuthorize: function passwordAuthorize(_ref) {
    var login = _ref.login,
        password = _ref.password,
        apiUrl = _ref.apiUrl,
        apiPath = _ref.apiPath;
    return fetch("".concat(apiUrl).concat(apiPath, "/login"), {
      method: 'POST',
      headers: prepareHeaders(),
      body: JSON.stringify({
        login: login,
        password: password
      })
    }).then(parseResponse);
  },
  ping: function ping(_ref2) {
    var apiUrl = _ref2.apiUrl,
        apiPath = _ref2.apiPath,
        token = _ref2.token;
    return fetch("".concat(apiUrl).concat(apiPath, "/ping"), {
      headers: prepareHeaders(token)
    }).then(parseResponse);
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

  reactHotLoader.register(parseResponse, "parseResponse", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/api.js");
  reactHotLoader.register(prepareHeaders, "prepareHeaders", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/api.js");
  reactHotLoader.register(_default, "default", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/api.js");
  leaveModule(module);
})();

;