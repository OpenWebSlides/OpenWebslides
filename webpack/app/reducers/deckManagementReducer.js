import Immutable from 'seamless-immutable';
import {
  DECK_DELETION_REQUEST,
  DECK_DELETION_REQUEST_FAILURE,
  DECK_DELETION_REQUEST_SUCCESS,
  REQUEST_DECK_LIST,
  REQUEST_DECK_LIST_FAILURE,
  REQUEST_DECK_LIST_SUCCESS,
} from 'actions/deckManagementActions';

const initialState = Immutable({
  listOfDecks: [],
  sentRequestForDecksList: false,
  receivedList: false,
  listErrorMessage: '',
  sentDeletionRequestFor: null,
  deletionErrorMessage: '',
});

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DECK_LIST:
      return Immutable.merge(state, {
        sentRequestForDecksList: true,
        receivedList: false,
        sendDeletionRequest: false,
      });
    case REQUEST_DECK_LIST_SUCCESS:
      return Immutable.merge(state, {
        sentRequestForDeckList: false,
        receivedList: true,
        listErrorMessage: '',
        listOfDecks: state.listOfDecks.concat(action.payload.listOfDecks),
      });
    case REQUEST_DECK_LIST_FAILURE:
      return Immutable.merge(state, {
        sentRequestForDecksList: false,
        receivedList: false,
        listErrorMessage: action.payload,
      });
    case DECK_DELETION_REQUEST:
      return Immutable.merge(state, {
        sentDeletionRequestFor: action.payload,
      });
    case DECK_DELETION_REQUEST_FAILURE:
      return Immutable.merge(state, {
        sentDeletionRequestFor: null,
        deletionErrorMessage: action.payload,
      });
    case DECK_DELETION_REQUEST_SUCCESS:
      return Immutable.merge(state, {
        listOfDecks: state.listOfDecks
          .concat()
          .filter(deck => deck.deckId !== state.sentDeletionRequestFor),
        sentDeletionRequestFor: null,
        deletionErrorMessage: '',
      });
    default:
      return state;
  }
}

export default feedReducer;
