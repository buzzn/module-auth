import constants from './constants';
import actions from './actions';
import api from './api';
import { call, put, take, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export const getConfig = state => state.config;
export const getAuth = state => state.auth;

export function* passwordAuthorize({ oldRefreshToken, username, password }) {
  try {
    const { apiUrl, clientId } = yield select(getConfig);
    const { token, refreshToken, expiresIn } = yield call(api.passwordAuthorize, { refreshToken: oldRefreshToken, username, password, apiUrl, clientId });
    yield call(api.setAuthTokens, { token, refreshToken });
    yield put(actions.authorizeSuccess(token));
    return { token, refreshToken, expiresIn };
  } catch (error) {
    // console.log(error);
    yield call(api.removeAuthTokens);
    yield put(actions.authorizeFailure(error));
    return null;
  }
}

export function* implicitAuthorize() {
  try {
    const { apiUrl, clientId } = yield select(getConfig);
    const { token } = yield call(api.implicitAuthorize, { apiUrl, clientId });
    yield call(api.setAuthTokens, { token });
    yield put(actions.authorizeSuccess(token));
    return null;
  } catch (error) {
    yield call(api.removeAuthTokens);
    yield put(actions.authorizeFailure(error));
    return null;
  }
}

export function* authorizeLoop({ refreshToken, authType }) {
  let { username, password } = yield select(getAuth);

  if (refreshToken || authType === constants.PASSWORD_FLOW) {
    while (true) {
      const newToken = yield call(passwordAuthorize, { oldRefreshToken: refreshToken, username, password });
      if (newToken == null) return;

      refreshToken = newToken.refreshToken;
      // removing username/password from memory
      username = null;
      password = null;

      yield race({
        delay: call(delay, newToken.expiresIn - 600 * 1000),
        refresh: take(constants.REFRESH_TOKEN),
      });
    }
  } else {
    yield call(implicitAuthorize);
  }
}

export default function* authentication() {
  while (true) {
    const { refreshToken } = yield call(api.getAuthTokens);
    let authType = constants.IMPLICIT_FLOW;

    if (!refreshToken) {
      const payload = yield take(constants.START_AUTH);
      authType = payload.authType;
    }

    const { signOutAction } = yield race({
      signOutAction: take(constants.SIGN_OUT),
      authLoop: call(authorizeLoop, { refreshToken, authType }),
    });

    if (signOutAction) {
      yield call(api.removeAuthTokens);
    }
  }
}
