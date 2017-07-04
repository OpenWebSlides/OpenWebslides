import ApiRequest from './helpers/apiHelper';

async function signup(email, password, firstName, lastName) {
  const request = new ApiRequest();

  request.setEndpoint('users').setMethod('POST').setBody({
    data: {
      type: 'users',
      attributes: {
        email,
        password,
        firstName,
        lastName,
      },
    },
  });

  return request.executeRequest();
}

export default signup;
