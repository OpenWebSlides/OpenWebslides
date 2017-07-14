import { connect } from 'react-redux';

import ContentItem from './ContentItem';

function mapStateToProps(state, props) {
  return {
    contentItem: state.entities.contentItems.byId[props.id],
  };
}

export default connect(mapStateToProps)(ContentItem);