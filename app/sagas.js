import { call, put, take, select, fork, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import constants from './constants';
import actions from './actions';
import api from './api';

export const getAuth = state => state.auth;

export function* ping({ apiUrl, apiPath, token }) {
  while (true) {
    try {
      yield delay(1000 * 60);
      yield call(api.ping, { apiUrl, apiPath, token });
    } catch (error) {
      yield put(actions.signOut());
    }
  }
}

export default function* authentication() {
  const { apiUrl, apiPath } = yield take(constants.SET_API_PARAMS);
  let { token } = yield call(api.getAuthTokens);

  while (true) {
    if (!token) {
      yield take(constants.START_AUTH);
      const { login, password } = yield select(getAuth);

      try {
        const res = yield call(api.passwordAuthorize, { login, password, apiUrl, apiPath });
        token = res.token;
        yield call(api.setAuthTokens, { token });
        yield put(actions.authorizeSuccess(token));
        const pingSaga = yield fork(ping, { apiUrl, apiPath, token });

        yield take(constants.SIGN_OUT);
        yield cancel(pingSaga);
        token = null;
        yield call(api.removeAuthTokens);
      } catch (error) {
        yield call(api.removeAuthTokens);
        yield put(actions.authorizeFailure(error));
      }
    } else {
      yield put(actions.authorizeSuccess(token));
      const pingSaga = yield fork(ping, { apiUrl, apiPath, token });

      yield take(constants.SIGN_OUT);
      yield cancel(pingSaga);
      token = null;
      yield call(api.removeAuthTokens);
    }
  }
}
