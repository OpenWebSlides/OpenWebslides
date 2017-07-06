import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

// Components:
import { DeckImportInfo } from 'presentationals/components/deckManagement/DeckImportInfo';

function renderDeckImportInfo(el) {
  return (
    <DeckImportInfo
      key={el.id}
      timestamp={el.timestamp}
      format={el.format}
      status={el.status}
      title={el.title}
    />
  );
}

class UserImports extends React.Component {
  componentWillMount() {
    this.props.requestUserImports();
  }

  render() {
    const listOfUserImports = this.props.deckImportState.listOfImports;
    const listOfImportElements = listOfUserImports.map(el =>
      renderDeckImportInfo(el),
    );

    return (
      <div className="c_user-imports-container">
        <h1> Your imports :</h1>

        <div className="c_user-imports">
          <ol>
            {listOfImportElements}
          </ol>
        </div>
      </div>
    );
  }
}

UserImports.propTypes = {
  requestUserImports: PropTypes.func.isRequired,
  deckImportState: PropTypes.shape().isRequired,
  listOfImports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
      format: PropTypes.oneOf(['ppt', 'pdf']).isRequired,
      status: PropTypes.oneOf(['queued', 'processing', 'success', 'error'])
        .isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

UserImports.defaultProps = {
  listOfImports: [],
};

export default UserImports;