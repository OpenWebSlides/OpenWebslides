export const getActiveDeckId = (state) => {
  return state.app.presentationView.activeDeckId;
};

export const getActiveConversationId = (state) => {
  return state.app.annotations.activeConversationId;
};

export const getActiveConversation = (state) => {
  return state.app.annotations.activeConversationId;
};

export const getEditableConversationCommentId = (state) => {
  return state.app.annotations.editableConversationCommentId;
};

export const getIsEditingConversation = (state) => {
  return state.app.annotations.isEditingConversation;
};

export const getAnnotationMode = (state) => {
  return state.app.annotations.annotationMode;
};
