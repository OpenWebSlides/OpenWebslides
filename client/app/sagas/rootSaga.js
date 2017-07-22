import signupSaga from 'sagas/signupSaga';
import confirmEmailSaga from 'sagas/confirmEmailSaga';
import requestFeedNorificationsSaga from 'sagas/feed/requestFeedNotificationsSaga';
import requestResetPasswordSaga from 'sagas/forgotPasswordSaga';
import resetPasswordSaga from 'sagas/resetPasswordSaga';

import fetchDeckSaga from 'sagas/slide-editor/fetchDeckSaga';
import deleteSlideSaga from 'sagas/slide-editor/deleteSlideSaga';

import oauthSigninSaga from 'sagas/signin/oauthSigninSaga';
import emailSigninSaga from 'sagas/signin/emailSigninSaga';

import requestDeckListSaga from 'sagas/deck-management/requestDeckListSaga';
import createDeckSaga from 'sagas/deck-management/createDeckSaga';
import deleteDeckSaga from 'sagas/deck-management/deleteDeckSaga';

import updateDeckSaga from 'sagas/updateDeckSaga';

export default function* rootSaga() {
  yield [
    emailSigninSaga(),
    signupSaga(),
    confirmEmailSaga(),
    requestFeedNorificationsSaga(),
    requestDeckListSaga(),
    requestResetPasswordSaga(),
    resetPasswordSaga(),
    oauthSigninSaga(),
    deleteSlideSaga(),
    fetchDeckSaga(),
    createDeckSaga(),
    deleteDeckSaga(),
    updateDeckSaga(),
  ];
}
