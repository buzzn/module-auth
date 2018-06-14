"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("whatwg-fetch");

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

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(parseResponse, "parseResponse", "app/api.js");

  __REACT_HOT_LOADER__.register(prepareHeaders, "prepareHeaders", "app/api.js");

  __REACT_HOT_LOADER__.register(_default, "default", "app/api.js");
}();

;