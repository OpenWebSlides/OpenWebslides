import _ from 'lodash';
import { connect } from 'react-redux';

import { contentItemTypesById } from 'constants/contentItemTypes';

import { getActiveSlideId } from 'selectors/app/slide-editor';
import { getSlideById } from 'selectors/entities/slides';

import { addContentItem } from 'actions/entities/content-items';

import { generateContentItemId } from 'lib/convert-to-state/generateIds';

import Toolbar from 'presentationals/components/shared/Toolbar';

function mapStateToProps(state) {
  const activeSlideId = getActiveSlideId(state);
  const activeSlide = getSlideById(state, activeSlideId);
  const buttons = _.values(contentItemTypesById)
    .filter(contentItemType => contentItemType.inToolbar)
    .map(contentItemType => {
      return {
        id: contentItemType.id,
        text: contentItemType.name,
        actionCode: `add-${contentItemType.id.toLowerCase().replace('_', '-')}`,
        parameters: {
          contentItemType: contentItemType.id,
          slide: activeSlide,
        },
      };
    }
  );

  return {
    buttons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: (button) => {
      const contentItemId = generateContentItemId(button.parameters.slide.id, button.parameters.slide.contentItemSequence);
      dispatch(addContentItem(contentItemId, button.parameters.slide.id, button.parameters.contentItemType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);