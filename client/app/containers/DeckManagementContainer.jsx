import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions:
import {
  requestOwnDecks,
  requestDeckDeletion,
} from 'actions/deckManagementActions';

import DeckManagement from 'presentationals/components/deckManagement/DeckManagement';

function mapStateToProps(state) {
  const ownDecksState = state.app.deckManagement;
  const authState = state.app.authentication;
  return {
    ownDecksState,
    authState,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestOwnDecks, requestDeckDeletion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckManagement);