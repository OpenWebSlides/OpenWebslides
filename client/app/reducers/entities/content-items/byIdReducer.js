import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { FETCH_DECK_SUCCESS } from 'actions/deckActions';
import { ADD_CONTENT_BLOCK, DELETE_CONTENT_BLOCKS, UPDATE_CONTENT_BLOCK } from 'actions/contentBlockActions';

const initialState = Immutable({});

function byId(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECK_SUCCESS:
      return action.payload.contentItems;

    case ADD_CONTENT_BLOCK:
      return Immutable.merge(state, {
        [action.payload.contentItemId]: {
          text: '',
          contentItemType: action.payload.contentItemType,
          id: action.payload.contentItemId,
          inlineProperties: [],
        },
      });

    case DELETE_CONTENT_BLOCKS:
      return _.omit(state, action.payload.contentBlocksToDelete);

    case UPDATE_CONTENT_BLOCK:
      return Immutable.merge(
        state,
        {
          [action.payload.contentBlockId]: {
            text: action.payload.text,
            inlineProperties: action.payload.inlineProperties,
          },
        },
        { deep: true },
      );
    default:
      return state;
  }
}

export default byId;
