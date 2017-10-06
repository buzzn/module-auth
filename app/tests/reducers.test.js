import reducers from '../reducers';
import constants from '../constants';

describe('auth reducers', () => {
  const initialState = { login: '', password: '' };

  test('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual(initialState);
  });

  test('should handle SET_LOGIN', () => {
    const login = 'user';
    const action = { type: constants.SET_LOGIN, login };
    expect(reducers(undefined, action)).toEqual({ ...initialState, login });
  });

  test('should handle SET_PASSWORD', () => {
    const password = 'password';
    const action = { type: constants.SET_PASSWORD, password };
    expect(reducers(undefined, action)).toEqual({ ...initialState, password });
  });

  test('should handle SIGN_IN', () => {
    const token = '*****';
    const action = { type: constants.SIGN_IN, token };
    expect(reducers(undefined, action)).toEqual({ ...initialState, token, error: null });
  });

  test('should handle SIGN_OUT', () => {
    const error = '*****';
    const action = { type: constants.SIGN_OUT, error };
    expect(reducers(undefined, action)).toEqual({ ...initialState, token: null, error });
  });
});
