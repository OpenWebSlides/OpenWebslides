import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';
import UserDeckThumbnail from 'presentationals/components/profile-page/UserDeckThumbnail';

// Helpers:
import IfAuthHOC from 'lib/IfAuthHOC';

function renderDeckThumbnail(el) {
  return (
    <UserDeckThumbnail
      key={el.id}
      deckId={el.id}
      deckTitle={el.meta.title}
    />
  );
}

function UserDecks({ entities, ids, authState }) {
  const listOfDecks = ids.map(id => entities.decks.byId[id]);
  const listOfDeckThumbnails = listOfDecks.map(el =>
      renderDeckThumbnail(el),
    );

  let tableOrNothing;

  if (listOfDecks.length > 0) {
    tableOrNothing = (
      <table className="c_user-decks--owned-decks-table">
        <tbody>
          {listOfDeckThumbnails}
        </tbody>
      </table>
    );
  }
  else {
    tableOrNothing = (<p> No decks yet! </p>);
  }
  return (
    <IfAuthHOC
      isAuthenticated={authState.isAuthenticated}
      fallback={() =>
        <NeedSigninWarning requestedAction="display this user's decks" />}
    >
      <div className="c_user-decks--container">
        <h2 className="c_user-decks--title"> Decks: </h2>
        <div className="c_user-decks--owned-decks-container">
          {tableOrNothing}
        </div>
      </div>
    </IfAuthHOC>
  );
}


UserDecks.propTypes = {
  authState: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  }),
};

export default UserDecks;
