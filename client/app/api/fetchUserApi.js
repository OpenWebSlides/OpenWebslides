import ApiRequest from './helpers/apiHelper';

async function fetchUser(userId) {
  const request = new ApiRequest();
  request.setMethod('GET').setEndpoint(`users/${userId}`);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default fetchUser;
