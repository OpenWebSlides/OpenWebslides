import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getConversationById } from 'selectors/entities/conversations';
import { getActiveConversationId } from 'selectors/app/annotations';
import { addConversationComment } from 'actions/entities/conversation-comments';

import ConversationCommentList from './ConversationCommentList';

import ConversationCommentForm from './ConversationCommentForm';
import ConversationHeader from './ConversationHeader';


function ConversationPanel(props) {
  const { activeConversation, editingConversation, closeConversationPanel } = props;

  return (
    <div>
      <button className="back-btn" onClick={closeConversationPanel}>
        <i className="fa fa-chevron-left fa-6" aria-hidden="true" />
      </button>

      <ConversationHeader {...activeConversation} editingConversation={editingConversation} />

      <ConversationCommentList activeConversationId={activeConversation.id} />

      { !activeConversation.deleted &&
        <div
          ref={(conversationCommentForm) => {
            this.conversationCommentForm = conversationCommentForm;
          }}
        >
          <ConversationCommentForm
            label="Text"
            onSubmit={(values, dispatch) => {
              return new Promise((resolve, reject) => {
                dispatch(addConversationComment({ values, resolve, reject }));
              });
            }}
          />
        </div>
      }
    </div>
  );
}

export default compose(
  connect(
    (state) => {
      const activeConversationId = getActiveConversationId(state);

      return ({
        activeConversation: getConversationById(state, activeConversationId),
        editingConversation: state.app.annotations.editingConversation,
      });
    },
  ),
)(ConversationPanel);

ConversationPanel.propTypes = {
  editingConversation: PropTypes.bool.isRequired,
  closeConversationPanel: PropTypes.func.isRequired,
  activeConversation: PropTypes.shape({
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    byCurrentUser: PropTypes.bool.isRequired,
    deleted: PropTypes.bool.isRequired,
    conversationType: PropTypes.string.isRequired,
  }).isRequired,
};

