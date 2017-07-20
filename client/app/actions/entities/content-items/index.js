// Action types
export const ADD_CONTENT_ITEM = 'ADD_CONTENT_ITEM';
export const DELETE_CONTENT_BLOCKS = 'DELETE_CONTENT_BLOCKS';
export const UPDATE_CONTENT_BLOCK = 'UPDATE_CONTENT_BLOCK';

// Action Creators

export function updateContentBlock(contentBlockId, text, inlineProperties) {
  return {
    type: UPDATE_CONTENT_BLOCK,
    payload: { contentBlockId, text, inlineProperties },
  };
}

export function deleteContentBlocks(contentBlocksIds) {
  return {
    type: DELETE_CONTENT_BLOCKS,
    payload: { contentBlocksIds },
  };
}

export function addContentItem(contentItemId, contentItemType, slideId) {
  return {
    type: ADD_CONTENT_ITEM,
    payload: { contentItemId, contentItemType, slideId },
  };
}
