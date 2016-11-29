import constants from './constants';

export default {
  setUsername: (username) => ({ type: constants.SET_USERNAME, username }),
  setPassword: (password) => ({ type: constants.SET_PASSWORD, password }),
  startAuth: (authType) => ({ type: constants.START_AUTH, authType }),
  authorizeSuccess: token => ({ type: constants.SIGN_IN, token }),
  authorizeFailure: error => ({ type: constants.SIGN_OUT, error }),
  signOut: () => ({ type: constants.SIGN_OUT, error: 'Sign out' }),
  refreshToken: () => ({ type: constants.REFRESH_TOKEN }),
};
