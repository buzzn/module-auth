import constants from './constants';

export default {
  setApiParams: ({ apiPath, apiUrl }) => ({ type: constants.SET_API_PARAMS, apiPath, apiUrl }),
  setLogin: login => ({ type: constants.SET_LOGIN, login }),
  setPassword: password => ({ type: constants.SET_PASSWORD, password }),
  startAuth: () => ({ type: constants.START_AUTH }),
  authorizeSuccess: token => ({ type: constants.SIGN_IN, token }),
  authorizeFailure: error => ({ type: constants.SIGN_OUT, error }),
  signOut: () => ({ type: constants.SIGN_OUT, error: 'Sign out' }),
};
