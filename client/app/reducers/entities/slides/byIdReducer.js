import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_SLIDE, UPDATE_SLIDE,
  DELETE_SLIDE, INCREASE_SLIDE_LEVEL, DECREASE_SLIDE_LEVEL } from 'actions/entities/slides';
import {
  ADD_CONTENT_ITEM,
  DELETE_CONTENT_ITEM,
  MOVE_CONTENT_ITEM,
} from 'actions/entities/content-items';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';

const initialState = Immutable({});

function addSlide(state, action) {
  const slideId = action.payload.slideId;
  const previousSlideId = action.payload.previousSlideId;
  const previousSlideLevel = state[previousSlideId].level;
  return state.merge({
    [slideId]: {
      id: slideId,
      level: previousSlideLevel,
      contentItemIds: [],
      contentItemSequence: 0,
    },
  });
}

function updateSlide(state, action) {
  const slide = state[action.payload.slideId];

  return state.merge({
    [slide.id]: action.payload.props,
  }, { deep: true });
}

function increaseLevel(state, action) {
  const selectedSlide = state[action.payload.selectedSlideId];
  const previousSlide = action.payload.previousSlideId !== null ? state[action.payload.previousSlideId] : null;
  if (previousSlide !== null && selectedSlide.level <= previousSlide.level) {
    return state.merge({
      [action.payload.selectedSlideId]: { level: selectedSlide.level + 1 } }, { deep: true });
  }
  else {
    return state;
  }
}

function decreaseLevel(state, action) {
  const selectedSlide = state[action.payload.selectedSlideId];
  const nextSlide = action.payload.nextSlideId !== null ? state[action.payload.nextSlideId] : null;
  if (selectedSlide.level > 0 && (nextSlide === null || selectedSlide.level >= nextSlide.level)) {
    return state.merge({
      [action.payload.selectedSlideId]: { level: selectedSlide.level - 1 } }, { deep: true });
  }
  else {
    return state;
  }
}

function deleteSlide(state, action) {
  return state.without(action.payload.slideId);
}

function addContentItem(state, action) {
  const slide = state[action.payload.slideId];
  let newState = state;

  // Only add the new contentItem to the slide's contentItemIds array if there
  // is no parent item.
  if (action.payload.parentItemId === null) {
    const contentItemIds = slide.contentItemIds.asMutable();
    const previousItemId = action.payload.previousItemId;
    const addAtIndex = (previousItemId !== null)
      ? _.indexOf(contentItemIds, previousItemId) + 1
      : 0;

    contentItemIds.splice(addAtIndex, 0, action.payload.contentItemId);

    newState = newState.merge({
      [slide.id]: {
        contentItemIds,
      },
    }, { deep: true });
  }

  return newState.merge({
    [slide.id]: {
      contentItemSequence: slide.contentItemSequence + 1,
    },
  }, { deep: true });
}

function deleteContentItem(state, action) {
  const slide = state[action.payload.slideId];

  // The deleted contentItem might not be a direct descendant of a slide,
  // in which case the slide requires no change.
  if (
    Array.indexOf(
      slide.contentItemIds,
      action.payload.contentItemId,
    ) === -1
  ) {
    return state;
  }
  else {
    return state.merge({
      [slide.id]: {
        contentItemIds: _.without(
          slide.contentItemIds,
          action.payload.contentItemId,
        ),
      },
    }, { deep: true });
  }
}

function moveContentItem(state, action) {
  let contentItemIds = state[action.payload.slideId].contentItemIds;

  // If the contentItem previously was a direct child of the slide.
  if (action.payload.oldParentItemId === null) {
    // Remove its id from its previous location in the contentItemIds array.
    contentItemIds = _.without(contentItemIds, action.payload.contentItemId);
  }

  // If the contentItem is moved directly onto the slide.
  if (action.payload.newParentItemId === null) {
    // Get the index to which to move the contentItemId.
    const moveToIndex = (action.payload.newPreviousItemId !== null)
      ? _.indexOf(contentItemIds, action.payload.newPreviousItemId) + 1
      : 0;
    // Insert the contentItemId into the contentItemIds array at that index.
    contentItemIds = [
      ...contentItemIds.slice(0, moveToIndex),
      action.payload.contentItemId,
      ...contentItemIds.slice(moveToIndex),
    ];
  }

  return state.merge({
    [action.payload.slideId]: {
      contentItemIds,
    },
  }, { deep: true });
}

function fetchDeckSuccess(state, action) {
  return state.merge({
    ...action.payload.slidesById,
  });
}

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_SLIDE: return addSlide(state, action);
    case UPDATE_SLIDE: return updateSlide(state, action);
    case DELETE_SLIDE: return deleteSlide(state, action);
    case ADD_CONTENT_ITEM: return addContentItem(state, action);
    case INCREASE_SLIDE_LEVEL: return increaseLevel(state, action);
    case DECREASE_SLIDE_LEVEL: return decreaseLevel(state, action);
    case DELETE_CONTENT_ITEM: return deleteContentItem(state, action);
    case MOVE_CONTENT_ITEM: return moveContentItem(state, action);
    case FETCH_DECK_SUCCESS: return fetchDeckSuccess(state, action);
    default: return state;
  }
}

export default byId;
