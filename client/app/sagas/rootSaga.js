import signupSaga from 'sagas/signupSaga';
import confirmEmailSaga from 'sagas/confirmEmailSaga';
import requestFeedNorificationsSaga from 'sagas/feed/requestFeedNotificationsSaga';
import requestResetPasswordSaga from 'sagas/forgotPasswordSaga';
import resetPasswordSaga from 'sagas/resetPasswordSaga';

import fetchDeckSaga from 'sagas/slide-editor/fetchDeckSaga';
import addSlideToDeckSaga from 'sagas/slide-editor/addSlideToDeckSaga';
import deleteSlideFromDeckSaga from 'sagas/slide-editor/deleteSlideFromDeckSaga';
import addContentItemToSlideSaga from 'sagas/slide-editor/addContentItemToSlideSaga';
import deleteContentItemFromSlideSaga from 'sagas/slide-editor/deleteContentItemFromSlideSaga';
import moveContentItemOnSlideSaga from 'sagas/slide-editor/moveContentItemOnSlideSaga';

import oauthSigninSaga from 'sagas/signin/oauthSigninSaga';
import emailSigninSaga from 'sagas/signin/emailSigninSaga';

import requestDeckListSaga from 'sagas/deck-management/requestDeckListSaga';
import requestImportsListSaga from 'sagas/deckManagement/requestImportsListSaga';
import createDeckSaga from 'sagas/deck-management/createDeckSaga';
import deleteDeckSaga from 'sagas/deck-management/deleteDeckSaga';

import updateDeckSaga from 'sagas/updateDeckSaga';
import uploadAssetSaga from 'sagas/uploadAssetSaga';
import addUriSaga from 'sagas/slide-editor/addUriSaga';

import fetchConversationsSaga from 'sagas/annotations/fetchConversationsSaga';
import fetchConversationCommentsSaga from 'sagas/annotations/fetchConversationCommentsSaga';
import addConversationSaga from 'sagas/annotations/addConversationSaga';
import updateConversationSaga from 'sagas/annotations/updateConversationSaga';
import rateConversationSaga from 'sagas/annotations/rateConversationSaga';
import rateConversationCommentSaga from 'sagas/annotations/rateConversationCommentSaga';
import addConversationCommentSaga from 'sagas/annotations/addConversationCommentSaga';
import deleteConversationSaga from 'sagas/annotations/deleteConversationSaga';
import deleteConversationCommentSaga from 'sagas/annotations/deleteConversationCommentSaga';
import updateConversationCommentSaga from 'sagas/annotations/updateConversationCommentSaga';


export default function* rootSaga() {
  yield [
    addConversationSaga(),
    emailSigninSaga(),
    signupSaga(),
    updateConversationSaga(),
    rateConversationCommentSaga(),
    rateConversationSaga(),
    updateConversationCommentSaga(),
    deleteConversationCommentSaga(),
    deleteConversationSaga(),
    addConversationCommentSaga(),
    fetchConversationCommentsSaga(),
    fetchConversationsSaga(),
    confirmEmailSaga(),
    requestFeedNorificationsSaga(),
    requestDeckListSaga(),
    requestResetPasswordSaga(),
    resetPasswordSaga(),
    oauthSigninSaga(),
    addSlideToDeckSaga(),
    deleteSlideFromDeckSaga(),
    addContentItemToSlideSaga(),
    deleteContentItemFromSlideSaga(),
    moveContentItemOnSlideSaga(),
    fetchDeckSaga(),
    createDeckSaga(),
    deleteDeckSaga(),
    requestImportsListSaga(),
    updateDeckSaga(),
    uploadAssetSaga(),
    addUriSaga(),
  ];
}
