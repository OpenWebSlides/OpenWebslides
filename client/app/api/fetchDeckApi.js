import ApiRequest from './helpers/apiHelper';

async function fetchDeck(deckId) {
  const request = new ApiRequest();

  request
    .setMethod('GET')
    .setEndpoint(`api/decks/${deckId}`)
    .addHeader('Accept', 'text/html');

  return request.executeRequest();
}

export default fetchDeck;
