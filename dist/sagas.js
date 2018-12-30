"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ping = ping;
exports.default = authentication;
exports.getAuth = void 0;

var _effects = require("redux-saga/effects");

var _constants = _interopRequireDefault(require("./constants"));

var _actions = _interopRequireDefault(require("./actions"));

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(ping),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(authentication);

var getAuth = function getAuth(state) {
  return state.auth;
};

exports.getAuth = getAuth;

function ping(_ref) {
  var apiUrl, apiPath, token;
  return regeneratorRuntime.wrap(function ping$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiUrl = _ref.apiUrl, apiPath = _ref.apiPath, token = _ref.token;

        case 1:
          if (!true) {
            _context.next = 15;
            break;
          }

          _context.prev = 2;
          _context.next = 5;
          return (0, _effects.call)(_api.default.ping, {
            apiUrl: apiUrl,
            apiPath: apiPath,
            token: token
          });

        case 5:
          _context.next = 7;
          return (0, _effects.delay)(1000 * 60);

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          _context.next = 13;
          return (0, _effects.put)(_actions.default.signOut());

        case 13:
          _context.next = 1;
          break;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[2, 9]]);
}

function authentication() {
  var _ref2, apiUrl, apiPath, _ref3, token, _ref4, login, password, res, pingSaga, _pingSaga;

  return regeneratorRuntime.wrap(function authentication$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.take)(_constants.default.SET_API_PARAMS);

        case 2:
          _ref2 = _context2.sent;
          apiUrl = _ref2.apiUrl;
          apiPath = _ref2.apiPath;
          _context2.next = 7;
          return (0, _effects.call)(_api.default.getAuthTokens);

        case 7:
          _ref3 = _context2.sent;
          token = _ref3.token;

        case 9:
          if (!true) {
            _context2.next = 61;
            break;
          }

          if (token) {
            _context2.next = 47;
            break;
          }

          _context2.next = 13;
          return (0, _effects.take)(_constants.default.START_AUTH);

        case 13:
          _context2.next = 15;
          return (0, _effects.select)(getAuth);

        case 15:
          _ref4 = _context2.sent;
          login = _ref4.login;
          password = _ref4.password;
          _context2.prev = 18;
          _context2.next = 21;
          return (0, _effects.call)(_api.default.passwordAuthorize, {
            login: login,
            password: password,
            apiUrl: apiUrl,
            apiPath: apiPath
          });

        case 21:
          res = _context2.sent;
          token = res.token;
          _context2.next = 25;
          return (0, _effects.call)(_api.default.setAuthTokens, {
            token: token
          });

        case 25:
          _context2.next = 27;
          return (0, _effects.put)(_actions.default.authorizeSuccess(token));

        case 27:
          _context2.next = 29;
          return (0, _effects.fork)(ping, {
            apiUrl: apiUrl,
            apiPath: apiPath,
            token: token
          });

        case 29:
          pingSaga = _context2.sent;
          _context2.next = 32;
          return (0, _effects.take)(_constants.default.SIGN_OUT);

        case 32:
          _context2.next = 34;
          return (0, _effects.cancel)(pingSaga);

        case 34:
          token = null;
          _context2.next = 37;
          return (0, _effects.call)(_api.default.removeAuthTokens);

        case 37:
          _context2.next = 45;
          break;

        case 39:
          _context2.prev = 39;
          _context2.t0 = _context2["catch"](18);
          _context2.next = 43;
          return (0, _effects.call)(_api.default.removeAuthTokens);

        case 43:
          _context2.next = 45;
          return (0, _effects.put)(_actions.default.authorizeFailure(_context2.t0));

        case 45:
          _context2.next = 59;
          break;

        case 47:
          _context2.next = 49;
          return (0, _effects.put)(_actions.default.authorizeSuccess(token));

        case 49:
          _context2.next = 51;
          return (0, _effects.fork)(ping, {
            apiUrl: apiUrl,
            apiPath: apiPath,
            token: token
          });

        case 51:
          _pingSaga = _context2.sent;
          _context2.next = 54;
          return (0, _effects.take)(_constants.default.SIGN_OUT);

        case 54:
          _context2.next = 56;
          return (0, _effects.cancel)(_pingSaga);

        case 56:
          token = null;
          _context2.next = 59;
          return (0, _effects.call)(_api.default.removeAuthTokens);

        case 59:
          _context2.next = 9;
          break;

        case 61:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[18, 39]]);
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getAuth, "getAuth", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/sagas.js");
  reactHotLoader.register(ping, "ping", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/sagas.js");
  reactHotLoader.register(authentication, "authentication", "/Users/dongeolog/node_apps/buzzn/modules/auth/app/sagas.js");
  leaveModule(module);
})();

;