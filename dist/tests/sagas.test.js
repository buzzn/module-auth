"use strict";

var _effects = require("redux-saga/effects");

var _reduxSaga = require("redux-saga");

var _utils = require("redux-saga/utils");

var _sagas = _interopRequireWildcard(require("../sagas"));

var _constants = _interopRequireDefault(require("../constants"));

var _actions = _interopRequireDefault(require("../actions"));

var _api = _interopRequireDefault(require("../api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('auth sagas', function () {
  var apiUrl = 'url';
  var apiPath = 'path';
  var token = 'token';
  describe('selectors', function () {
    test('getAuth selector should return auth state', function () {
      var state = {
        auth: {
          login: ''
        }
      };
      expect((0, _sagas.getAuth)(state)).toEqual(state.auth);
    });
  });
  describe('main saga', function () {
    var gen = {
      withToken: (0, _utils.cloneableGenerator)(_sagas.default)()
    };
    var pingSaga = (0, _utils.createMockTask)();
    test('should wait for api params', function () {
      expect(gen.withToken.next().value).toEqual((0, _effects.take)(_constants.default.SET_API_PARAMS));
    });
    test('should get token from localStorage', function () {
      expect(gen.withToken.next({
        apiUrl: apiUrl,
        apiPath: apiPath
      }).value).toEqual((0, _effects.call)(_api.default.getAuthTokens));
    });
    describe('no saved token available', function () {
      var login = 'login';
      var password = 'password';
      test('should wait for start auth action', function () {
        gen.noToken = gen.withToken.clone();
        expect(gen.noToken.next({
          token: null
        }).value).toEqual((0, _effects.take)(_constants.default.START_AUTH));
      });
      test('should get login/password from state', function () {
        expect(gen.noToken.next().value).toEqual((0, _effects.select)(_sagas.getAuth));
      });
      describe('correct flow', function () {
        test('should get token obj from api', function () {
          gen.apiProblem = gen.noToken.clone();
          expect(gen.noToken.next({
            login: login,
            password: password
          }).value).toEqual((0, _effects.call)(_api.default.passwordAuthorize, {
            login: login,
            password: password,
            apiUrl: apiUrl,
            apiPath: apiPath
          }));
        });
        test('should store token in localStorage', function () {
          expect(gen.noToken.next({
            token: token
          }).value).toEqual((0, _effects.call)(_api.default.setAuthTokens, {
            token: token
          }));
        });
        test('should dispatch success action with token', function () {
          expect(gen.noToken.next().value).toEqual((0, _effects.put)(_actions.default.authorizeSuccess(token)));
        });
        test('should fork pingSaga', function () {
          expect(gen.noToken.next().value).toEqual((0, _effects.fork)(_sagas.ping, {
            apiUrl: apiUrl,
            apiPath: apiPath,
            token: token
          }));
        });
        test('should wait for sign out action', function () {
          expect(gen.noToken.next(pingSaga).value).toEqual((0, _effects.take)(_constants.default.SIGN_OUT));
        });
        test('should cancel pingSaga', function () {
          expect(gen.noToken.next().value).toEqual((0, _effects.cancel)(pingSaga));
        });
        test('should remove token from localStorage', function () {
          expect(gen.noToken.next().value).toEqual((0, _effects.call)(_api.default.removeAuthTokens));
        });
        test('should wait for start auth action', function () {
          expect(gen.noToken.next().value).toEqual((0, _effects.take)(_constants.default.START_AUTH));
        });
      });
      describe('error res from api', function () {
        var error = 'error';
        test('should get token obj from api', function () {
          expect(gen.apiProblem.next({
            login: login,
            password: password
          }).value).toEqual((0, _effects.call)(_api.default.passwordAuthorize, {
            login: login,
            password: password,
            apiUrl: apiUrl,
            apiPath: apiPath
          }));
        });
        test('should remove token from localStorage if shit happens', function () {
          expect(gen.apiProblem.throw(error).value).toEqual((0, _effects.call)(_api.default.removeAuthTokens));
        });
        test('should dispatch failure action with error', function () {
          expect(gen.apiProblem.next().value).toEqual((0, _effects.put)(_actions.default.authorizeFailure(error)));
        });
        test('should wait for start auth action', function () {
          expect(gen.apiProblem.next().value).toEqual((0, _effects.take)(_constants.default.START_AUTH));
        });
      });
    });
    describe('saved token available', function () {
      test('should dispatch success action with token', function () {
        expect(gen.withToken.next({
          token: token
        }).value).toEqual((0, _effects.put)(_actions.default.authorizeSuccess(token)));
      });
      test('should fork pingSaga', function () {
        expect(gen.withToken.next().value).toEqual((0, _effects.fork)(_sagas.ping, {
          apiUrl: apiUrl,
          apiPath: apiPath,
          token: token
        }));
      });
      test('should wait for sign out action', function () {
        expect(gen.withToken.next(pingSaga).value).toEqual((0, _effects.take)(_constants.default.SIGN_OUT));
      });
      test('should cancel pingSaga', function () {
        expect(gen.withToken.next().value).toEqual((0, _effects.cancel)(pingSaga));
      });
      test('should remove token from localStorage', function () {
        expect(gen.withToken.next().value).toEqual((0, _effects.call)(_api.default.removeAuthTokens));
      });
      test('should wait for start auth action', function () {
        expect(gen.withToken.next().value).toEqual((0, _effects.take)(_constants.default.START_AUTH));
      });
    });
  });
  describe('ping saga', function () {
    var gen = {
      primed: (0, _utils.cloneableGenerator)(_sagas.ping)({
        apiUrl: apiUrl,
        apiPath: apiPath,
        token: token
      })
    };
    gen.primed.next();
    test('should ping', function () {
      gen.exploded = gen.primed.clone();
      expect(gen.primed.next().value).toEqual((0, _effects.call)(_api.default.ping, {
        apiUrl: apiUrl,
        apiPath: apiPath,
        token: token
      }));
    });
    test('should dispatch sign out on fail', function () {
      expect(gen.exploded.throw().value).toEqual((0, _effects.put)(_actions.default.signOut()));
    });
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;