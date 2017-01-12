import { expect } from 'chai';
import authentication, { implicitAuthorize, passwordAuthorize, authorizeLoop, getConfig, getAuth } from '../sagas';
import constants from '../constants';
import actions from '../actions';
import api from '../api';
import { call, put, take, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

describe('auth sagas', () => {
  describe('main flow with saved token', () => {
    const generator = authentication();
    const refreshToken = '*****';
    const authType = constants.IMPLICIT_FLOW;

    it('should get refresh token from local storage', () => {
      expect(generator.next().value)
      .to.eql(call(api.getAuthTokens));
    });

    it('should start a race if there is a refreshToken', () => {
      expect(generator.next({ refreshToken }).value)
      .to.eql(race({
        signOutAction: take(constants.SIGN_OUT),
        authLoop: call(authorizeLoop, { refreshToken, authType }),
      }));
    });

    it('should quit race on SIGN_OUT action', () => {
      expect(generator.next({ signOutAction: actions.signOut() }).value)
      .to.eql(call(api.removeAuthTokens));
    });
  });

  describe('main flow without saved token', () => {
    const generator = authentication();
    const refreshToken = undefined;
    const authType = constants.PASSWORD_FLOW;

    generator.next();

    it('should wait for START_AUTH action if there is no refreshToken', () => {
      expect(generator.next({ refreshToken }).value)
      .to.eql(take(constants.START_AUTH));
    });

    it('should start a race if there is a START_AUTH action', () => {
      expect(generator.next(actions.startAuth(constants.PASSWORD_FLOW)).value)
      .to.eql(race({
        signOutAction: take(constants.SIGN_OUT),
        authLoop: call(authorizeLoop, { refreshToken, authType }),
      }));
    });
  });

  describe('authorizeLoop implicit flow', () => {
    const refreshToken = null;
    const authType = constants.IMPLICIT_FLOW;
    const generator = authorizeLoop({ refreshToken, authType });

    it('should get username and password from state', () => {
      expect(generator.next().value)
      .to.eql(select(getAuth));
    });

    it('should call implicitAuthorize with authType === implicit', () => {
      expect(generator.next({}).value)
      .to.eql(call(implicitAuthorize));
    });
  });

  describe('authorizeLoop success flow', () => {
    let refreshToken = null;
    let username = 'user';
    let password = 'password';
    const authType = constants.PASSWORD_FLOW;
    const generator = authorizeLoop({ refreshToken, authType });

    it('should get username and password from state', () => {
      expect(generator.next().value)
      .to.eql(select(getAuth));
    });

    it('should call passwordAuthorize when authType === password', () => {
      expect(generator.next({ username, password }).value)
      .to.eql(call(passwordAuthorize, { oldRefreshToken: refreshToken, username, password }));
    });

    it('should start a race if auth succeed', () => {
      const ms = 600 * 1000 + 1;
      refreshToken = '*****';
      expect(generator.next({ refreshToken, expiresIn: ms }).value)
      .to.eql(race({
        delay: call(delay, ms - 600 * 1000),
        refresh: take(constants.REFRESH_TOKEN),
      }));
    });

    it('should call passwordAuthorize saga with nullified username/password if there is REFRESH_TOKEN action', () => {
      username = null;
      password = null;
      expect(generator.next(actions.refreshToken()).value)
      .to.eql(call(passwordAuthorize, { oldRefreshToken: refreshToken, username, password }));
    });
  });

  describe('authorizeLoop failure flow', () => {
    const refreshToken = '*****';
    const username = null;
    const password = null;
    const authType = constants.PASSWORD_FLOW;
    const generator = authorizeLoop({ refreshToken, authType });

    generator.next();
    it('should call passwordAuthorize when authType === password', () => {
      expect(generator.next({ username, password }).value)
      .to.eql(call(passwordAuthorize, { oldRefreshToken: refreshToken, username, password }));
    });

    it('should return if auth failed', () => {
      expect(generator.next(null))
      .to.eql({ value: undefined, done: true });
    });
  });

  describe('passwordAuthorize success flow', () => {
    const oldRefreshToken = null;
    const username = 'user';
    const password = 'password';
    const generator = passwordAuthorize({ oldRefreshToken, username, password });
    const token = '*****';
    const refreshToken = '*****';
    const expiresIn = 601;
    const apiUrl = 'url';
    const clientId = 'id';

    it('should get api params', () => {
      expect(generator.next().value)
      .to.eql(select(getConfig));
    });

    it('should call api.passwordAuthorize with api params', () => {
      expect(generator.next({ apiUrl, clientId }).value)
      .to.eql(call(api.passwordAuthorize, { refreshToken: oldRefreshToken, username, password, apiUrl, clientId }));
    });

    it('should save tokens to localStorage', () => {
      expect(generator.next({ token, refreshToken, expiresIn }).value)
      .to.eql(call(api.setAuthTokens, { token, refreshToken }));
    });

    it('should dispatch SIGN_IN action', () => {
      expect(generator.next().value)
      .to.eql(put(actions.authorizeSuccess(token)));
    });

    it('should return token params', () => {
      expect(generator.next().value)
      .to.eql({ token, refreshToken, expiresIn });
    });
  });

  describe('passwordAuthorize failure flow', () => {
    const oldRefreshToken = null;
    const username = 'user';
    const password = 'password';
    const generator = passwordAuthorize({ oldRefreshToken, username, password });

    generator.next();
    it('should remove old tokens from localStorage on error', () => {
      expect(generator.throw().value)
      .to.eql(call(api.removeAuthTokens));
    });

    it('should dispatch SIGN_OUT action', () => {
      expect(generator.next().value)
      .to.eql(put(actions.authorizeFailure()));
    });

    it('should return on failure', () => {
      expect(generator.next())
      .to.eql({ value: null, done: true });
    });
  });

  describe('implicitAuthorize success flow', () => {
    const generator = implicitAuthorize();
    const apiUrl = 'url';
    const clientId = 'id';
    const token = '*****';
    const scope = 'full';
    const callBackURL = 'http://localhost/';

    it('should get api params', () => {
      expect(generator.next().value)
      .to.eql(select(getConfig));
    });

    it('should call api.implicitAuthorize with api params', () => {
      expect(generator.next({ apiUrl, clientId, scope, callBackURL }).value)
      .to.eql(call(api.implicitAuthorize, { apiUrl, clientId, scope, callBackURL }));
    });

    it('should save tokens to localStorage', () => {
      expect(generator.next({ token }).value)
      .to.eql(call(api.setAuthTokens, { token }));
    });

    it('should dispatch SIGN_IN action', () => {
      expect(generator.next().value)
      .to.eql(put(actions.authorizeSuccess(token)));
    });

    it('should return null', () => {
      expect(generator.next())
      .to.eql({ done: true, value: null });
    });
  });

  describe('implicitAuthorize failure flow', () => {
    const generator = implicitAuthorize();

    generator.next();
    it('should remove old tokens from localStorage on error', () => {
      expect(generator.throw().value)
      .to.eql(call(api.removeAuthTokens));
    });

    it('should dispatch SIGN_OUT action', () => {
      expect(generator.next().value)
      .to.eql(put(actions.authorizeFailure()));
    });

    it('should return on failure', () => {
      expect(generator.next())
      .to.eql({ value: null, done: true });
    });
  });
});
