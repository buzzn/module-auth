import 'whatwg-fetch';
const queryString = require('query-string');

let localApiUrl = '';
let localClientId = '';

function parseResponse(response) {
  const json = response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else {
    return json.then(error => Promise.reject(error));
  }
}

function openPopup(url) {
  const windowParams = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no,width=500,height=500';

  return window.open(url, 'buzzn oAuth', windowParams);
}

function getAllParams(location) {
  return queryString.parse(location.hash);
}

function normalizeToken(tokenObj) {
  const { access_token, refresh_token, expires_in } = tokenObj;
  const token = { token: access_token, refreshToken: refresh_token };
  token.expiresIn = expires_in * 1000;
  return token;
}

function prepareHeaders() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}

function listenPopup(popup, resolve, reject) {
  if (!resolve) {
    return new Promise((_resolve, _reject) => {
      listenPopup(popup, _resolve, _reject);
    });
  } else {
    let credentials = null;
    try {
      credentials = getAllParams(popup.location);
    } catch (error) {
      // console.log(error);
    }

    if (credentials && credentials.access_token) {
      popup.close();
      resolve(normalizeToken(credentials));
    } else if (popup.closed) {
      reject({ errors: 'Auth canceled' });
    } else {
      setTimeout(() => {
        listenPopup(popup, resolve, reject);
      }, 20);
    }
  }
}

function getToken({ username, password }) {
  return new Promise((resolve, reject) => {
    fetch(`${localApiUrl}oauth/token`, {
      method: 'POST',
      headers: prepareHeaders(),
      body: JSON.stringify({ grant_type: 'password', scope: 'full', username, password }),
    })
    .then(parseResponse)
    .then(data => resolve(normalizeToken(data)))
    .catch(errors => reject(errors));
  });
}

function refresh(refreshToken) {
  return new Promise((resolve, reject) => {
    fetch(`${localApiUrl}oauth/token`, {
      method: 'POST',
      headers: prepareHeaders(),
      body: JSON.stringify({ grant_type: 'refresh_token', refresh_token: refreshToken }),
    })
    .then(parseResponse)
    .then(data => resolve(normalizeToken(data)))
    .catch(errors => reject(errors));
  });
}

export default {
  getAuthTokens: () => JSON.parse(localStorage.getItem('buzznAuthTokens')) || {},
  setAuthTokens: token => localStorage.setItem('buzznAuthTokens', JSON.stringify(token || {})),
  removeAuthTokens: () => localStorage.removeItem('buzznAuthTokens'),
  passwordAuthorize({ refreshToken = null, username, password, apiUrl, clientId }) {
    localApiUrl = apiUrl;
    localClientId = clientId;
    if (!refreshToken) {
      return getToken({ username, password });
    } else {
      return refresh(refreshToken);
    }
  },
  implicitAuthorize: ({ apiUrl, clientId, scope, callBackURL }) => {
    localApiUrl = apiUrl;
    localClientId = clientId;
    const popup = openPopup(`${localApiUrl}/oauth/authorize?client_id=${localClientId}&redirect_uri=${callBackURL}&scope=${scope}&response_type=token`);
    return listenPopup(popup);
  },
};
