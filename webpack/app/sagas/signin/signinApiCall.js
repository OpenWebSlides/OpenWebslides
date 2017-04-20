import asyncFetch from 'helpers/api/asyncFetch';
import getBaseRequestConfig from 'helpers/api/baseRequestConfig';

async function signin(email, password) {
  const SIGNIN_API_URL = 'http://localhost:5000/auth/token';

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({ auth: { email, password } }),
  });

  const response = await asyncFetch(SIGNIN_API_URL, requestConfig);

  return response.json();
}

export default signin;
