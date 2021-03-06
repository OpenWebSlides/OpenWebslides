import Immutable from 'seamless-immutable';

import {
  FETCH_CONVERSATION_COMMENTS_SUCCESS,
  UPDATE_CONVERSATION_COMMENT_SUCCESS,
  RATE_CONVERSATION_COMMENT_SUCCESS,
} from 'actions/entities/conversation-comments';

const initialState = Immutable({});

function byIdReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_CONVERSATION_COMMENTS_SUCCESS:
      return state.merge(action.payload);

    case RATE_CONVERSATION_COMMENT_SUCCESS: {
      const { id, attributes } = action.payload;
      return state.merge({ [id]: { ...attributes } }, { deep: true });
    }

    case UPDATE_CONVERSATION_COMMENT_SUCCESS: {
      const { id, attributes } = action.payload;

      return state.merge({ [id]: { ...attributes } }, { deep: true });
    }

    default:
      return state;
  }
}


export default byIdReducer;
