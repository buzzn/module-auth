import constants from './constants';

function authReducer(state = { username: '', password: '' }, action) {
  switch (action.type) {
    case constants.SET_USERNAME:
      return { ...state, username: action.username };
    case constants.SET_PASSWORD:
      return { ...state, password: action.password };
    case constants.START_AUTH:
      return { ...state, authType: action.authType };
    case constants.REFRESH_TOKEN:
      return state;
    case constants.SIGN_IN:
      return { ...state, token: action.token, error: null, username: '', password: '' };
    case constants.SIGN_OUT:
      return { ...state, error: action.error, token: null };
    default:
      return state;
  }
}

export default authReducer;
