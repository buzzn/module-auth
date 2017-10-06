import actions from '../actions';
import constants from '../constants';

describe('auth actions', () => {
  test('should create and action to set api params', () => {
    const apiUrl = 'url';
    const apiPath = 'path';
    const expectedAction = { type: constants.SET_API_PARAMS, apiUrl, apiPath };
    expect(actions.setApiParams({ apiUrl, apiPath })).toEqual(expectedAction);
  });

  test('should create an action to store login', () => {
    const login = 'user';
    const expectedAction = { type: constants.SET_LOGIN, login };
    expect(actions.setLogin(login)).toEqual(expectedAction);
  });

  test('should create an action to store password', () => {
    const password = 'password';
    const expectedAction = { type: constants.SET_PASSWORD, password };
    expect(actions.setPassword(password)).toEqual(expectedAction);
  });

  test('should create an action to start auth', () => {
    const expectedAction = { type: constants.START_AUTH, authType: constants.PASSWORD_FLOW };
    expect(actions.startAuth(constants.PASSWORD_FLOW)).toEqual(expectedAction);
  });

  test('should create an action to auth success', () => {
    const token = '*****';
    const expectedAction = { type: constants.SIGN_IN, token };
    expect(actions.authorizeSuccess(token)).toEqual(expectedAction);
  });

  test('should create an action to auth failure', () => {
    const error = '*****';
    const expectedAction = { type: constants.SIGN_OUT, error };
    expect(actions.authorizeFailure(error)).toEqual(expectedAction);
  });

  test('should create an action to sign out', () => {
    const error = 'Sign out';
    const expectedAction = { type: constants.SIGN_OUT, error };
    expect(actions.signOut()).toEqual(expectedAction);
  });
});
