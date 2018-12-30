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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    login: '',
    password: ''
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.default.SET_LOGIN:
      return _objectSpread({}, state, {
        login: action.login
      });

    case _constants.default.SET_PASSWORD:
      return _objectSpread({}, state, {
        password: action.password
      });

    case _constants.default.SIGN_IN:
      return _objectSpread({}, state, {
        token: action.token,
        error: null,
        login: '',
        password: ''
      });

    case _constants.default.SIGN_OUT:
      return _objectSpread({}, state, {
        error: action.error,
        token: null
      });

    case _constants.default.START_AUTH:
    default:
      return state;
  }
}

var _default = authReducer;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(authReducer, "authReducer", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/reducers.js");
  reactHotLoader.register(_default, "default", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/reducers.js");
  leaveModule(module);
})();

;