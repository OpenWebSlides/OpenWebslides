import { connect } from 'react-redux';

import SlideDebugView from 'presentationals/components/slide-editor/SlideDebugView';
import { getActiveSlideId } from 'selectors/app/editor/slides';
import { getSlideById } from 'selectors/entities/slides';
import { getNestedContentItemObjectById } from 'selectors/entities/content-items';

function mapStateToProps(state) {
  const activeSlideId = getActiveSlideId(state);
  const activeSlide = getSlideById(state, { slideId: activeSlideId });
  let nestedContentItems = [];

  if ( activeSlide && activeSlide.contentItemIds instanceof Array && activeSlide.contentItemIds.length > 0) {
    nestedContentItems = activeSlide.contentItemIds.map(
      contentItemId => getNestedContentItemObjectById(state, {contentItemId})
    );
  }

  return {
    activeSlide,
    nestedContentItems,
  };
}

export default connect(mapStateToProps)(SlideDebugView);
