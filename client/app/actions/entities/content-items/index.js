
export const ADD_CONTENT_ITEM = 'ADD_CONTENT_ITEM';
export const UPDATE_CONTENT_ITEM = 'UPDATE_CONTENT_ITEM';
export const DELETE_CONTENT_ITEM = 'DELETE_CONTENT_ITEM';
export const MOVE_CONTENT_ITEM = 'MOVE_CONTENT_ITEM';

export function addContentItem(
  contentItemId,
  contentItemType,
  viewType,
  props,
  slideId,
  parentItemId = null,
  previousItemId = null,
) {
  return {
    type: ADD_CONTENT_ITEM,
    payload: {
      contentItemId,
      contentItemType,
      viewType,
      props,
      slideId,
      parentItemId,
      previousItemId,
    },
  };
}

export function updateContentItem(
  contentItemId,
  props,
  selectionOffsets = null,
) {
  return {
    type: UPDATE_CONTENT_ITEM,
    payload: { contentItemId, props, selectionOffsets },
  };
}

export function moveContentItem(
  contentItemId,
  slideId,
  oldParentItemId,
  newParentItemId,
  newPreviousItemId = null,
) {
  return {
    type: MOVE_CONTENT_ITEM,
    payload: { contentItemId, slideId, oldParentItemId, newParentItemId, newPreviousItemId },
  };
}


export function deleteContentItem(
  contentItemId,
  slideId,
  parentItemId,
  descendantItemIds = [],
  newFocusedContentItemId = null,
  newSelectionOffsets = null,
) {
  return {
    type: DELETE_CONTENT_ITEM,
    payload: {
      contentItemId,
      slideId,
      parentItemId,
      descendantItemIds,
      newFocusedContentItemId,
      newSelectionOffsets,
    },
  };
}
