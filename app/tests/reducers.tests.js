import { expect } from 'chai';
import reducers from '../reducers';
import constants from '../constants';

describe('auth reducers', () => {
  const initialState = { username: '', password: '' };

  it('should return the initial state', () => {
    expect(reducers(undefined, {})).to.eql(initialState);
  });

  it('should handle SET_USERNAME', () => {
    const username = 'user';
    const action = { type: constants.SET_USERNAME, username };
    expect(reducers(undefined, action)).to.eql({ ...initialState, username });
  });

  it('should handle SET_PASSWORD', () => {
    const password = 'password';
    const action = { type: constants.SET_PASSWORD, password };
    expect(reducers(undefined, action)).to.eql({ ...initialState, password });
  });

  it('should handle START_AUTH', () => {
    const authType = constants.PASSWORD_FLOW;
    const action = { type: constants.START_AUTH, authType };
    expect(reducers(undefined, action)).to.eql({ ...initialState, authType });
  });

  it('should handle REFRESH_TOKEN', () => {
    const action = { type: constants.REFRESH_TOKEN };
    expect(reducers(undefined, action)).to.eql(initialState);
  });

  it('should handle SIGN_IN', () => {
    const token = '*****';
    const action = { type: constants.SIGN_IN, token };
    expect(reducers(undefined, action)).to.eql({ ...initialState, token, error: null });
  });

  it('should handle SIGN_OUT', () => {
    const error = '*****';
    const action = { type: constants.SIGN_OUT, error };
    expect(reducers(undefined, action)).to.eql({ ...initialState, token: null, error });
  });
});
