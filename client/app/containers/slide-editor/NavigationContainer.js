import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addSlide, setActiveSlide, deleteSlide } from 'actions/slideActions';

import NavigationPane from 'presentationals/components/editor/NavigationPane';

function mapStateToProps(state) {
  return {
    slides: state.entities.slides.byId,
    slideSequence: state.app.editor.slides.sequence,
    activeSlide: state.app.editor.slides.active,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addSlide, deleteSlide, setActiveSlide },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationPane);
