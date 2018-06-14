"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    login: '',
    password: ''
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.default.SET_LOGIN:
      return _extends({}, state, {
        login: action.login
      });

    case _constants.default.SET_PASSWORD:
      return _extends({}, state, {
        password: action.password
      });

    case _constants.default.SIGN_IN:
      return _extends({}, state, {
        token: action.token,
        error: null,
        login: '',
        password: ''
      });

    case _constants.default.SIGN_OUT:
      return _extends({}, state, {
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

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(authReducer, "authReducer", "app/reducers.js");

  __REACT_HOT_LOADER__.register(_default, "default", "app/reducers.js");
}();

;