export const OWN_DECKS_REQUESTS_START = 'OWN_DECKS_REQUESTS_START';
export const OWN_DECKS_REQUESTS_FAILURE = 'OWN_DECKS_REQUESTS_FAILURE';
export const OWN_DECKS_REQUESTS_SUCCESS = 'OWN_DECKS_REQUESTS_SUCCESS';

export const OWN_DECK_DELETION_REQUEST_START = 'OWN_DECK_DELETION_REQUEST_START';
export const OWN_DECK_DELETION_REQUEST_SUCCESS = 'OWN_DECK_DELETION_REQUEST_SUCCESS';
export const OWN_DECK_DELETION_REQUEST_FAILURE = 'OWN_DECK_DELETION_REQUEST_FAILURE';


export function ownDecksRequestsStart(userId) {
  return {
    type: OWN_DECKS_REQUESTS_START,
    payload: userId,
  };
}
export function ownDecksRequestsSuccess() {
  return {
    type: OWN_DECKS_REQUESTS_SUCCESS,
  };
}
export function ownDecksRequestsFailure(message) {
  return {
    type: OWN_DECKS_REQUESTS_FAILURE,
    payload: message,
  };
}

export function ownDeckDeletionRequestStart(deckId) {
  return {
    type: OWN_DECK_DELETION_REQUEST_START,
    meta: deckId,
  };
}

export function ownDeckDeletionRequestSuccess(deckId) {
  return {
    type: OWN_DECK_DELETION_REQUEST_SUCCESS,
    payload: deckId,
  };
}

export function ownDeckDeletionRequestFailure(deckId, errorMessage) {
  return {
    type: OWN_DECK_DELETION_REQUEST_FAILURE,
    payload: { deckId, errorMessage },
  };
}

