"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = _interopRequireDefault(require("../actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var SignOutButton = function SignOutButton(props) {
  var dispatch = props.dispatch;
  return _react.default.createElement("button", {
    onClick: function onClick() {
      return dispatch(_actions.default.signOut());
    }
  }, "Sign out");
};

var _default = (0, _reactRedux.connect)()(SignOutButton);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SignOutButton, "SignOutButton", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/components/sign_out_button.js");
  reactHotLoader.register(_default, "default", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/components/sign_out_button.js");
  leaveModule(module);
})();

;