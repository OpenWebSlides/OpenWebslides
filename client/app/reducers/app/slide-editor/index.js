import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { slideViewTypes } from 'constants/slideViewTypes';

import {
  SET_ACTIVE_DECK_ID,
  SET_ACTIVE_SLIDE_ID,
  SET_ACTIVE_CONTENT_ITEM_ID,
  SET_FOCUSED_CONTENT_ITEM_ID,
  SET_SELECTION_OFFSETS,
  SET_FOCUSED_SLIDE_VIEW_TYPE,
  TOGGLE_SLIDE_VIEW,
} from 'actions/app/slide-editor';
import { FETCH_DECK_SUCCESS, UPDATE_DECK_SUCCESS } from 'actions/entities/decks';
import { ADD_SLIDE, DELETE_SLIDE } from 'actions/entities/slides';
import {
  ADD_CONTENT_ITEM,
  UPDATE_CONTENT_ITEM,
  DELETE_CONTENT_ITEM,
} from 'actions/entities/content-items';

const initialState = Immutable({
  activeDeckId: null,
  activeSlideId: null,
  activeContentItemId: null,
  focusedContentItemId: null,
  // #TODO merge all focusedContentItem related properties into a single nested object
  focusedTextPropName: null,
  selectionOffsets: {
    start: 0,
    end: 0,
  },
  activeSlideViewTypes: [
    slideViewTypes.LIVE,
    slideViewTypes.CONTENT,
  ],
  // #TODO add default for focusedSlideViewType
  hasChanged: false,
});

function setActiveDeckId(state, action) {
  return state.merge({
    activeDeckId: action.payload.deckId,
  });
}

function setActiveSlideId(state, action) {
  return state.merge({
    activeSlideId: action.payload.slideId,
    activeContentItemId: null,
  });
}

function setActiveContentItemId(state, action) {
  return state.merge({
    activeContentItemId: action.payload.contentItemId,
  });
}

function setFocusedContentItemId(state, action) {
  let newState = state;
  const {
    contentItemId,
    selectionOffsets,
    focusedSlideViewType,
    focusedTextPropName,
  } = action.payload;

  if (selectionOffsets !== null) {
    newState = newState.merge({
      selectionOffsets,
    });
  }

  if (focusedSlideViewType !== null) {
    newState = newState.merge({
      focusedSlideViewType,
    });
  }

  // If we're focusing on a new contentItem, set the activeContentItem as well.
  // (If we're blurring the focused contentItem by setting it to null, keep the active contentItem
  // for reference.)
  if (contentItemId !== null) {
    newState = newState.merge({
      activeContentItemId: contentItemId,
    });
  }

  return newState.merge({
    focusedContentItemId: contentItemId,
    focusedTextPropName,
  });
}

function setSelectionOffsets(state, action) {
  return state.merge({
    selectionOffsets: action.payload.selectionOffsets,
  });
}

function setFocusedSlideViewType(state, action) {
  return state.merge({
    focusedSlideViewType: action.payload.slideViewType,
  });
}

function toggleSlideView(state, action) {
  const slideViewType = action.payload.slideViewType;
  const currentActiveSlideViewTypes = state.activeSlideViewTypes;
  let activeSlideViewTypes;

  if (Array.indexOf(currentActiveSlideViewTypes, slideViewType) !== -1) {
    // Cannot remove the last active slide view type.
    if (currentActiveSlideViewTypes.length <= 1) {
      activeSlideViewTypes = currentActiveSlideViewTypes;
    }
    else {
      activeSlideViewTypes = _.without(currentActiveSlideViewTypes, slideViewType);
    }
  }
  else {
    activeSlideViewTypes = [...currentActiveSlideViewTypes, slideViewType];
  }

  return state.merge({
    activeSlideViewTypes,
  });
}

function fetchDeckSuccess(state, action) {
  const slides = _.values(action.payload.slidesById);

  return state.merge({
    activeDeckId: action.payload.deckId,
    activeSlideId: slides.length > 0 ? slides[0].id : null,
    activeContentItemId: null,
  });
}

function updateDeckSuccess(state) {
  return state.merge({
    hasChanged: false,
  });
}

function addSlide(state, action) {
  return state.merge({
    activeSlideId: action.payload.slideId,
    activeContentItemId: null,
    hasChanged: true,
  });
}

function deleteSlide(state, action) {
  let newState = state;

  newState = newState.merge({
    hasChanged: true,
  });

  if (action.payload.newActiveSlideId !== null) {
    return newState.merge({
      activeSlideId: action.payload.newActiveSlideId,
      activeContentItemId: null,
    });
  }
  else if (action.payload.slideId === state.activeSlideId) {
    return newState.merge({
      activeSlideId: null,
      activeContentItemId: null,
    });
  }
  else {
    return newState;
  }
}

function addContentItem(state, action) {
  return state.merge({
    activeContentItemId: action.payload.contentItemId,
    focusedContentItemId: action.payload.contentItemId,
    focusedTextPropName: null,
    selectionOffsets: {
      start: 0,
      end: 0,
    },
    hasChanged: true,
  });
}

function updateContentItem(state, action) {
  let newState = state;
  const selectionOffsets = action.payload.selectionOffsets;

  newState = newState.merge({
    hasChanged: true,
  });

  if (selectionOffsets !== null) {
    return newState.merge({
      selectionOffsets,
    });
  }
  else {
    return newState;
  }
}

function deleteContentItem(state, action) {
  let newState = state;
  const {
    contentItemId,
    descendantItemIds,
    newFocusedContentItemId,
    newSelectionOffsets,
  } = action.payload;

  newState = newState.merge({
    hasChanged: true,
  });

  if (newFocusedContentItemId !== null) {
    return newState.merge({
      activeContentItemId: newFocusedContentItemId,
      focusedContentItemId: newFocusedContentItemId,
      focusedTextPropName: null,
      selectionOffsets: newSelectionOffsets,
    });
  }
  else if (
    (contentItemId === state.focusedContentItemId) ||
    (descendantItemIds.length > 0 && _.includes(descendantItemIds, state.activeContentItemId))
  ) {
    return newState.merge({
      activeContentItemId: null,
      focusedContentItemId: null,
      focusedTextPropName: null,
      selectionOffsets: {
        start: 0,
        end: 0,
      },
    });
  }
  else {
    return newState;
  }
}

export default function slideEditorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_DECK_ID: return setActiveDeckId(state, action);
    case SET_ACTIVE_SLIDE_ID: return setActiveSlideId(state, action);
    case SET_ACTIVE_CONTENT_ITEM_ID: return setActiveContentItemId(state, action);
    case SET_FOCUSED_CONTENT_ITEM_ID: return setFocusedContentItemId(state, action);
    case SET_SELECTION_OFFSETS: return setSelectionOffsets(state, action);
    case SET_FOCUSED_SLIDE_VIEW_TYPE: return setFocusedSlideViewType(state, action);
    case TOGGLE_SLIDE_VIEW: return toggleSlideView(state, action);
    case FETCH_DECK_SUCCESS: return fetchDeckSuccess(state, action);
    case UPDATE_DECK_SUCCESS: return updateDeckSuccess(state, action);
    case ADD_SLIDE: return addSlide(state, action);
    case DELETE_SLIDE: return deleteSlide(state, action);
    case ADD_CONTENT_ITEM: return addContentItem(state, action);
    case UPDATE_CONTENT_ITEM: return updateContentItem(state, action);
    case DELETE_CONTENT_ITEM: return deleteContentItem(state, action);
    default: return state;
  }
}
