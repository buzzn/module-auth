"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = _interopRequireDefault(require("../actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SignOutButton, "SignOutButton", "app/components/sign_out_button.js");

  __REACT_HOT_LOADER__.register(_default, "default", "app/components/sign_out_button.js");
}();

;