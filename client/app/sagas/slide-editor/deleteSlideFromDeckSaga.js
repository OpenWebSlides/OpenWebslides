import { takeLatest, put, select } from 'redux-saga/effects';

import { DELETE_SLIDE_FROM_DECK } from 'actions/entities/decks';
import { deleteSlide } from 'actions/entities/slides';

import { getActiveSlideId } from 'selectors/app/slide-editor';
import { getSlidesById, getSlideById } from 'selectors/entities/slides';
import { getContentItemsById } from 'selectors/entities/content-items';

import {
  getAllContentItemDescendantItemIds
} from 'lib/state-traversal/contentItems';

function getContentItemIdsToDelete(contentItemIds, contentItemsById) {
  let result = [];
  let descendantItemIds;
  let i;

  for (i = 0; i < contentItemIds.length; i++) {
    descendantItemIds = getAllContentItemDescendantItemIds(
      contentItemIds[i],
      contentItemsById
    );
    result = result.concat(contentItemIds[i]).concat(descendantItemIds);
  }

  return result;
}

function* doDeleteSlideFromDeck(action) {
  try {
    const { deckId, slideId } = action.meta;
    const slide = yield select(getSlideById, slideId);
    const contentItemsById = yield select(getContentItemsById);

    // If a slide is deleted, all contentItems that are on the slide should be
    // deleted as well.
    const contentItemIdsToDelete = getContentItemIdsToDelete(
      slide.contentItemIds,
      contentItemsById,
    );

    // After deleting the slide, set the previous slide as the active slide;
    // if there is no previous slide, set the next one as active instead.
    const activeSlideId = yield select(getActiveSlideId);
    let newActiveSlideId;
    if (activeSlideId === slideId) {
      const slides = yield select(getSlidesById);
      const slideIds = Object.keys(slides);
      const currentSlideIndex = slideIds.indexOf(slideId);
      newActiveSlideId = currentSlideIndex === 0
        ? slideIds[currentSlideIndex + 1]
        : slideIds[currentSlideIndex - 1];
    }
    else {
      newActiveSlideId = null;
    }

    yield put(deleteSlide(
      slideId,
      deckId,
      contentItemIdsToDelete,
      newActiveSlideId
    ));

  } catch (e) {
    console.error(e);
  }
}

function* deleteSlideFromDeckWatcher() {
  yield takeLatest(DELETE_SLIDE_FROM_DECK, doDeleteSlideFromDeck);
}

export default deleteSlideFromDeckWatcher;
