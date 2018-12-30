"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = _interopRequireDefault(require("../actions"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var PasswordSignIn = function PasswordSignIn(props) {
  var dispatch = props.dispatch,
      login = props.login,
      password = props.password;
  return _react.default.createElement("div", null, _react.default.createElement("input", {
    value: login,
    onChange: function onChange(event) {
      return dispatch(_actions.default.setLogin(event.target.value));
    },
    type: "text"
  }), _react.default.createElement("input", {
    value: password,
    onChange: function onChange(event) {
      return dispatch(_actions.default.setPassword(event.target.value));
    },
    type: "password"
  }), _react.default.createElement("button", {
    onClick: function onClick() {
      return dispatch(_actions.default.startAuth());
    }
  }, "Sign in"));
};

function mapStateToProps(state) {
  return {
    login: state.auth.login,
    password: state.auth.password
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(PasswordSignIn);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PasswordSignIn, "PasswordSignIn", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/components/password_sign_in.js");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/components/password_sign_in.js");
  reactHotLoader.register(_default, "default", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/components/password_sign_in.js");
  leaveModule(module);
})();

;