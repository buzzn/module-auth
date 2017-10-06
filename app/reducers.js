import constants from './constants';

function authReducer(state = { login: '', password: '' }, action) {
  switch (action.type) {
    case constants.SET_LOGIN:
      return { ...state, login: action.login };
    case constants.SET_PASSWORD:
      return { ...state, password: action.password };
    case constants.SIGN_IN:
      return { ...state, token: action.token, error: null, login: '', password: '' };
    case constants.SIGN_OUT:
      return { ...state, error: action.error, token: null };
    case constants.START_AUTH:
    default:
      return state;
  }
}

export default authReducer;
