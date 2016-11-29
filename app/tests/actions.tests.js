import { expect } from 'chai';
import actions from '../actions';
import constants from '../constants';

describe('auth actions', () => {
  it('should create an action to store username', () => {
    const username = 'user';
    const expectedAction = { type: constants.SET_USERNAME, username };
    expect(actions.setUsername(username)).to.eql(expectedAction);
  });

  it('should create an action to store password', () => {
    const password = 'password';
    const expectedAction = { type: constants.SET_PASSWORD, password };
    expect(actions.setPassword(password)).to.eql(expectedAction);
  });

  it('should create an action to start auth', () => {
    const expectedAction = { type: constants.START_AUTH, authType: constants.PASSWORD_FLOW };
    expect(actions.startAuth(constants.PASSWORD_FLOW)).to.eql(expectedAction);
  });

  it('should create an action to auth success', () => {
    const token = '*****';
    const expectedAction = { type: constants.SIGN_IN, token };
    expect(actions.authorizeSuccess(token)).to.eql(expectedAction);
  });

  it('should create an action to auth failure', () => {
    const error = '*****';
    const expectedAction = { type: constants.SIGN_OUT, error };
    expect(actions.authorizeFailure(error)).to.eql(expectedAction);
  });

  it('should create an action to sign out', () => {
    const error = 'Sign out';
    const expectedAction = { type: constants.SIGN_OUT, error };
    expect(actions.signOut()).to.eql(expectedAction);
  });

  it('should create an action to refresf token', () => {
    const expectedAction = { type: constants.REFRESH_TOKEN };
    expect(actions.refreshToken()).to.eql(expectedAction);
  });
});
