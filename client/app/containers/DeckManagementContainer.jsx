import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions:
import {
  requestOwnDecks,
  requestDeckDeletion,
} from 'actions/deckManagementActions';

import DeckManagementSection from 'presentationals/deckManagement/DeckManagementSection';

function mapStateToProps(state) {
  debugger;
  const ownDecksState = state.local.ownDecks;
  const authState = state.local.auth;
  return {
    ownDecksState,
    authState,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestOwnDecks, requestDeckDeletion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DeckManagementSection,
);
