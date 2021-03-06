import React from 'react';
import PropTypes from 'prop-types';

import { contentItemShape } from 'constants/propTypeShapes';

import generateAttributesObject from '../helpers/generateAttributesObject';
import displayWrappersIndex from '../display-wrappers';

function DisplayRenderContentItem(props) {
  const { contentItem } = props;
  const DisplayWrapper = displayWrappersIndex[contentItem.contentItemType];
  const attributes = generateAttributesObject(contentItem);

  return (
    <DisplayWrapper
      {...props}
      attributes={attributes}
    />
  );
}

DisplayRenderContentItem.propTypes = {
  contentItem: PropTypes.shape(contentItemShape).isRequired,
  renderOptions: PropTypes.shape({
    useMediaPlaceholders: PropTypes.bool.isRequired,
    isEditable: PropTypes.bool.isRequired,
  }).isRequired,
};

export default DisplayRenderContentItem;
