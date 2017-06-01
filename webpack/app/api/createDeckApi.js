import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

export const DECK_CREATION_URL = 'http://localhost:5000/api/decks';

async function createDeck(title, description, authorID, token) {
  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      data: {
        type: 'decks',
        attributes: {
          name: title,
          description,
        },
        relationships: {
          owner: {
            data: {
              id: authorID,
              type: 'users',
            },
          },
        },
      },
    }),
  });
  return asyncFetch(DECK_CREATION_URL, requestConfig);
}

export default createDeck;
