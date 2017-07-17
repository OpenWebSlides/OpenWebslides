import React, { Component } from 'react';
import PropTypes from 'prop-types';

import convertToPrint from 'lib/convert-to-print/index';

import { flamesState } from 'constants/exampleState';

export default class PrintView extends Component {
  componentDidMount() {
    const id = this.props.id;
    if (
      !(
        this.props.entities.decks.byId.id &&
        this.props.entities.decks.byId.id.slides
      )
    ) {
      this.props.fetchDeckContent(id);
    }
  }

  render() {
    const state = flamesState; // TODO: only until rein parser works
    let elements;
    // if (state.entities.decks.byId.id && state.entities.decks.byId.id.slides) {
    //   elements = convertToPrint(state, this.props.id);
    // }

    elements = convertToPrint(state, this.props.id);
    debugger;
    return (
      <div>
        {elements}
      </div>
    );
  }
}

PrintView.propTypes = {
  fetchDeckContent: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};