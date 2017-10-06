import 'whatwg-fetch';

function parseResponse(response) {
  if (response.status === 200) {
    return { token: response.headers.get('authorization') };
  } else {
    return Promise.reject(response.status);
  }
}

function prepareHeaders(token) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export default {
  getAuthTokens: () => JSON.parse(localStorage.getItem('buzznAuthTokens')) || {},
  setAuthTokens: token => localStorage.setItem('buzznAuthTokens', JSON.stringify(token || {})),
  removeAuthTokens: () => localStorage.removeItem('buzznAuthTokens'),
  passwordAuthorize({ login, password, apiUrl, apiPath }) {
    return fetch(`${apiUrl}${apiPath}/login`, {
      method: 'POST',
      headers: prepareHeaders(),
      body: JSON.stringify({ login, password }),
    })
      .then(parseResponse)
  },
  ping({ apiUrl, apiPath, token }) {
    return fetch(`${apiUrl}${apiPath}/ping`, {
      headers: prepareHeaders(token),
    })
      .then(parseResponse);
  },
};
