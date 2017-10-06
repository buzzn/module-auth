import { call, put, take, select, fork, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { cloneableGenerator, createMockTask } from 'redux-saga/utils';
import authentication, { getAuth, ping } from '../sagas';
import constants from '../constants';
import actions from '../actions';
import api from '../api';

describe('auth sagas', () => {
  const apiUrl = 'url';
  const apiPath = 'path';
  const token = 'token';

  describe('selectors', () => {
    test('getAuth selector should return auth state', () => {
      const state = { auth: { login: '' } };
      expect(getAuth(state)).toEqual(state.auth);
    });
  });

  describe('main saga', () => {
    const gen = { withToken: cloneableGenerator(authentication)() };
    const pingSaga = createMockTask();

    test('should wait for api params', () => {
      expect(gen.withToken.next().value)
        .toEqual(take(constants.SET_API_PARAMS));
    });

    test('should get token from localStorage', () => {
      expect(gen.withToken.next({ apiUrl, apiPath }).value)
        .toEqual(call(api.getAuthTokens));
    });

    describe('no saved token available', () => {
      const login = 'login';
      const password = 'password';

      test('should wait for start auth action', () => {
        gen.noToken = gen.withToken.clone();

        expect(gen.noToken.next({ token: null }).value)
          .toEqual(take(constants.START_AUTH));
      });

      test('should get login/password from state', () => {
        expect(gen.noToken.next().value)
          .toEqual(select(getAuth));
      });

      describe('correct flow', () => {
        test('should get token obj from api', () => {
          gen.apiProblem = gen.noToken.clone();

          expect(gen.noToken.next({ login, password }).value)
            .toEqual(call(api.passwordAuthorize, { login, password, apiUrl, apiPath }));
        });

        test('should store token in localStorage', () => {
          expect(gen.noToken.next({ token }).value)
            .toEqual(call(api.setAuthTokens, { token }));
        });

        test('should dispatch success action with token', () => {
          expect(gen.noToken.next().value)
            .toEqual(put(actions.authorizeSuccess(token)));
        });

        test('should fork pingSaga', () => {
          expect(gen.noToken.next().value)
            .toEqual(fork(ping, { apiUrl, apiPath, token }));
        });

        test('should wait for sign out action', () => {
          expect(gen.noToken.next(pingSaga).value)
            .toEqual(take(constants.SIGN_OUT));
        });

        test('should cancel pingSaga', () => {
          expect(gen.noToken.next().value)
            .toEqual(cancel(pingSaga));
        });

        test('should remove token from localStorage', () => {
          expect(gen.noToken.next().value)
            .toEqual(call(api.removeAuthTokens));
        });

        test('should wait for start auth action', () => {
          expect(gen.noToken.next().value)
            .toEqual(take(constants.START_AUTH));
        });
      });

      describe('error res from api', () => {
        const error = 'error';

        test('should get token obj from api', () => {
          expect(gen.apiProblem.next({ login, password }).value)
            .toEqual(call(api.passwordAuthorize, { login, password, apiUrl, apiPath }));
        });

        test('should remove token from localStorage if shit happens', () => {
          expect(gen.apiProblem.throw(error).value)
            .toEqual(call(api.removeAuthTokens));
        });

        test('should dispatch failure action with error', () => {
          expect(gen.apiProblem.next().value)
            .toEqual(put(actions.authorizeFailure(error)));
        });

        test('should wait for start auth action', () => {
          expect(gen.apiProblem.next().value)
            .toEqual(take(constants.START_AUTH));
        });
      });
    });

    describe('saved token available', () => {
      test('should dispatch success action with token', () => {
        expect(gen.withToken.next({ token }).value)
          .toEqual(put(actions.authorizeSuccess(token)));
      });

      test('should fork pingSaga', () => {
        expect(gen.withToken.next().value)
          .toEqual(fork(ping, { apiUrl, apiPath, token }));
      });

      test('should wait for sign out action', () => {
        expect(gen.withToken.next(pingSaga).value)
          .toEqual(take(constants.SIGN_OUT));
      });

      test('should cancel pingSaga', () => {
        expect(gen.withToken.next().value)
          .toEqual(cancel(pingSaga));
      });

      test('should remove token from localStorage', () => {
        expect(gen.withToken.next().value)
          .toEqual(call(api.removeAuthTokens));
      });

      test('should wait for start auth action', () => {
        expect(gen.withToken.next().value)
          .toEqual(take(constants.START_AUTH));
      });
    });
  });

  describe('ping saga', () => {
    const gen = { primed: cloneableGenerator(ping)({ apiUrl, apiPath, token }) };
    gen.primed.next();

    test('should ping', () => {
      gen.exploded = gen.primed.clone();

      expect(gen.primed.next().value)
        .toEqual(call(api.ping, { apiUrl, apiPath, token }));
    });

    test('should dispatch sign out on fail', () => {
      expect(gen.exploded.throw().value)
        .toEqual(put(actions.signOut()));
    });
  });
});
