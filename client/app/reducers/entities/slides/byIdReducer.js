import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_SLIDE, UPDATE_SLIDE, DELETE_SLIDE } from 'actions/entities/slides';
import { ADD_CONTENT_ITEM, DELETE_CONTENT_ITEM } from 'actions/entities/content-items';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';

const initialState = Immutable({});

function addSlide(state, action) {
  const slideId = action.payload.slideId;

  return Immutable.merge(
    state,
    {
      [slideId]: {
        id: slideId,
        level: 0,
        contentItemIds: [],
        contentItemSequence: 0,
      },
    },
  );
}

function updateSlide(state, action) {
  const slide = state[action.payload.slideId];

  return Immutable.merge(
    state,
    {
      [slide.id]: action.payload.props,
    },
    { deep: true },
  );
}

function deleteSlide(state, action) {
  return _.omit(state, action.payload.slideId);
}

function addContentItem(state, action) {
  const slide = state[action.payload.slideId];

  // Only add the new contentItem to the slide's contentItemIds array if there is no parent item.
  if (action.payload.parentItemId === null) {
    const contentItemIds = Immutable.asMutable(slide.contentItemIds);
    const afterItemId = action.payload.afterItemId;
    const addAtIndex = (afterItemId !== null)
      ? Array.indexOf(contentItemIds, afterItemId) + 1
      : contentItemIds.length;

    contentItemIds.splice(addAtIndex, 0, action.payload.contentItemId);

    state = Immutable.merge(
      state,
      {
        [slide.id]: {
          contentItemIds,
        },
      },
      { deep: true },
    );
  }

  return Immutable.merge(
    state,
    {
      [slide.id]: {
        contentItemSequence: slide.contentItemSequence + 1,
      },
    },
    { deep: true },
  );
}

function deleteContentItem(state, action) {
  const slide = state[action.payload.slideId];

  // The deleted contentItem might not be a direct descendant of a slide,
  // in which case the slide requires no change.
  if (Array.indexOf(slide.contentItemIds, action.payload.contentItemId) === -1) {
    return state;
  } else {
    return Immutable.merge(
      state,
      {
        [slide.id]: {
          contentItemIds: _.without(slide.contentItemIds, action.payload.contentItemId),
        },
      },
      { deep: true },
    );
  }
}

function fetchDeckSuccess(state, action) {
  return Immutable.merge(
    state,
    {
      ...action.payload.slidesById,
    },
  );
}

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_SLIDE: return addSlide(state, action);
    case UPDATE_SLIDE: return updateSlide(state, action);
    case DELETE_SLIDE: return deleteSlide(state, action);
    case ADD_CONTENT_ITEM: return addContentItem(state, action);
    case DELETE_CONTENT_ITEM: return deleteContentItem(state, action);
    case FETCH_DECK_SUCCESS: return fetchDeckSuccess(state, action);
    default: return state;
  }
}

export default byId;
