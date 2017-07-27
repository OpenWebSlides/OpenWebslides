import _ from 'lodash';

import { containerContentItemTypes } from 'constants/contentItemTypes';
import { directions } from 'constants/directions';

// Helper functions ------------------------------------------------------------

function findNearestValidContentItemId(
  direction,
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
  checkContainerChildren = false,
) {
  const debug = false;
  let siblingItemIds;

  let newContentItemId;
  let newAncestorItemIds;
  let newCheckContainerChildren;

  const parentItemId = _.last(ancestorItemIds);
  if (parentItemId !== undefined) {
      siblingItemIds = contentItemsById[parentItemId].childItemIds;
  } else {
    siblingItemIds = slideContentItemIds;
  }

  const indexInSiblingItemIds = Array.indexOf(siblingItemIds, contentItemId);
  const contentItem = contentItemsById[contentItemId];

  // First check if the contentItem is a container element.
  // (Note: we don't do this on the initial call (original contentItem for which
  // we're looking for a previous contentItem) because then the section children
  // are not actual previous elements.)
  if (checkContainerChildren && containerItemValidator(contentItem) === true){
    if (debug) console.log(`${contentItemId} isSection`);
    // If it is a container, check its first/last child.
    newContentItemId = direction === directions.UP
      ? _.last(contentItem.childItemIds)
      : _.first(contentItem.childItemIds);
    if (newContentItemId !== undefined) {
      newAncestorItemIds = ancestorItemIds.concat(contentItemId);
    }
    newCheckContainerChildren = true;
  }
  // If the contentItem is the first/last in its list of siblings.
  else if (
    (direction === directions.UP && indexInSiblingItemIds === 0) ||
    (direction === directions.DOWN && indexInSiblingItemIds === siblingItemIds.length - 1)
  ) {
    if (debug) console.log(`${contentItemId} isFirst/Last`);
    // Go up a level.
    newContentItemId = _.last(ancestorItemIds);
    if (newContentItemId !== undefined) {
      newAncestorItemIds = _.dropRight(ancestorItemIds, 1);
    } else {
      newContentItemId = null;
    }
    // Don't go back down this section.
    newCheckContainerChildren = false;
  }
  // If the contentItem is not the first/last in its list of siblings.
  else {
    if (debug) console.log(`${contentItemId} isNotFirst/Last`);
    // Check the previous/next sibling.
    newContentItemId = direction === directions.UP
      ? siblingItemIds[indexInSiblingItemIds - 1]
      : siblingItemIds[indexInSiblingItemIds + 1];
    newAncestorItemIds = ancestorItemIds;
    newCheckContainerChildren = true;
  }

  if (debug) {
    console.log(`newContentItemId: ${newContentItemId}`);
    console.log(`newAncestorItemIds: ${newAncestorItemIds}`);
  }

  // If no previous contentItemId could be found.
  if (newContentItemId === null) {
    return null;
  }
  // If a previous contentItemId was found.
  else {
    // If the contentItem is valid, this is the contentItemId we were looking for.
    if (contentItemValidator(contentItemsById[newContentItemId]) === true) {
      return newContentItemId;
    }
    // If the contentItem is not valid, we need to search further.
    else {
      return findNearestValidContentItemId(
        direction,
        newContentItemId,
        newAncestorItemIds,
        slideContentItemIds,
        contentItemsById,
        contentItemValidator,
        containerItemValidator,
        newCheckContainerChildren,
      );
    }
  }
}

function findNearestAncestorIdWithAtLeastAmountOfChildren(
  ancestorItemIds,
  contentItemsById,
  amount,
) {
  // If there are no ancestors left.
  if (ancestorItemIds.length === 0) {
    return null;
  }
  // If there are ancestors left.
  else {
    let newAncestorItemIds;

    // Get the parentItem.
    const parentItemId = _.last(ancestorItemIds);
    const parentItem = contentItemsById[parentItemId];
    // Remove the parent from the ancestorItemIds.
    newAncestorItemIds = _.dropRight(ancestorItemIds, 1);

    // Test if the parent is a valid ancestor.
    if (parentItem.childItemIds.length >= amount) {
      return parentItem.id;
    }
    // If the parent was not a valid ancestor.
    else {
      // Go further up the ancestors list.
      return findNearestAncestorIdWithAtLeastAmountOfChildren(
        newAncestorItemIds,
        contentItemsById,
        amount,
      );
    }
  }
}

function findAllContentItemDescendantItemIds(contentItemId, contentItemsById) {
  const contentItem = contentItemsById[contentItemId];
  let descendantItemIds = [];

  // If this contentItem is a container.
  if (Array.indexOf(containerContentItemTypes, contentItem.contentItemType) !== -1) {
    // Add all of its children and their descendants to the array.
    contentItem.childItemIds.forEach(childItemId => {
      descendantItemIds = descendantItemIds.concat(childItemId);
      descendantItemIds = descendantItemIds.concat(
        findAllContentItemDescendantItemIds(childItemId, contentItemsById),
      );
    });
  }

  return descendantItemIds;
}

// Exported functions ----------------------------------------------------------

/**
 * Finds the previous valid contentItem (in terms of tree leaves) as compared
 * to the contentItem with id $contentItemId. Validity is determined by a
 * validator function.
 *
 * @param contentItemId
 *        The id of the contentItem where we start searching.
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem where we
 *        start searching.
 * @param slideContentItemIds
 *        The list of ids of contentItems that are direct children of the
 *        containing slide of the contentItem where we start searching. (We need
 *        this because the slide is the highest possible ancestor of a
 *        contentItem and it can't be included in the ancestorItemIds array.)
 * @param contentItemsById
 *        The contentItemsById object.
 * @param contentItemValidator
 *        The function that decides if a contentItem is considered 'valid'. It
 *        is passed a contentItem as an argument and should return TRUE if this
 *        contentItem is valid, FALSE if it is not.
 * @param containerItemValidator
 *        The function that decides if a contentItem is considered a container.
 *        It is passed a contentItem as an argument and should return TRUE if
 *        this contentItem is a container, FALSE if it is not.
 *        (The reason we use a validator function instead of just using the
 *        containerContentItemTypes constant is that for some applications lists
 *        should be considered containers, while for others they should not. By
 *        doing it this way, the caller of this function has full control over
 *        which contentItems are considered containers and which are not.
 */
export function getPreviousValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
) {
  return findNearestValidContentItemId(
    directions.UP,
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    contentItemValidator,
    containerItemValidator,
  );
}

/**
 * Finds the next valid contentItem (in terms of tree leaves) as compared
 * to the contentItem with id $contentItemId. Validity is determined by a
 * validator function.
 *
 * @param contentItemId
 *        The id of the contentItem where we start searching.
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem where we
 *        start searching.
 * @param slideContentItemIds
 *        The list of ids of contentItems that are direct children of the
 *        containing slide of the contentItem where we start searching. (We need
 *        this because the slide is the highest possible ancestor of a
 *        contentItem and it can't be included in the ancestorItemIds array.)
 * @param contentItemsById
 *        The contentItemsById object.
 * @param contentItemValidator
 *        The function that decides if a contentItem is considered 'valid'. It
 *        is passed a contentItem as an argument and should return TRUE if this
 *        contentItem is valid, FALSE if it is not.
 * @param containerItemValidator
 *        The function that decides if a contentItem is considered a container.
 *        It is passed a contentItem as an argument and should return TRUE if
 *        this contentItem is a container, FALSE if it is not.
 *        (The reason we use a validator function instead of just using the
 *        containerContentItemTypes constant is that for some applications lists
 *        should be considered containers, while for others they should not. By
 *        doing it this way, the caller of this function has full control over
 *        which contentItems are considered containers and which are not.
 */
export function getNextValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
) {
  return findNearestValidContentItemId(
    directions.DOWN,
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    contentItemValidator,
    containerItemValidator,
  );
}

/**
 * Finds the ancestor contentItem that has at least $amount of children.
 *
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem where we
 *        start searching.
 * @param contentItemsById
 *        The contentItemsById object.
 * @param amount
 *        The amount of children that the ancestor we're looking for should
 *        at least have.
 */
export function getNearestAncestorIdWithAtLeastAmountOfChildren(
  ancestorItemIds,
  contentItemsById,
  amount = 1,
) {
  return findNearestAncestorIdWithAtLeastAmountOfChildren(
    ancestorItemIds,
    contentItemsById,
    amount,
  );
}

/**
 * Finds all descendants of a the contentItem with id $contentItemId.
 *
 * @param contentItemId
 *        The id of the contentItem wher ewe start searching.
 * @param contentItemsById
 *        The contentItemsById object.
 */
export function getAllContentItemDescendantItemIds(
  contentItemId,
  contentItemsById,
) {
  return findAllContentItemDescendantItemIds(contentItemId, contentItemsById);
}
