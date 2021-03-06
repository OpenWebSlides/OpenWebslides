import { takeLatest, call, put, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import uploadAssetApi from 'api/uploadAssetApi';
import { getActiveDeckId, getActiveSlideId } from 'selectors/app/slide-editor';

import { addContentItemToSlide } from 'actions/entities/slides';
import { SIGNOUT } from 'actions/signoutActions';

import { contentItemTypes } from 'constants/contentItemTypes';


import {
  UPLOAD_ASSET,
} from 'actions/other/assetActions';

export function* doUploadAsset(action) {
  const { resolve, reject } = action.meta;

  try {
    const activeDeckId = yield select(getActiveDeckId);
    const activeSlideId = yield select(getActiveSlideId);

    const { assetType, values: { imageFile, imageCaption, altText } } = yield action.meta;

    const response = yield call(uploadAssetApi, activeDeckId, imageFile[0]);

    const assetUri = yield response.links.raw;
    const { filename } = yield response.attributes;

    yield put(addContentItemToSlide(
      activeSlideId,
      assetType,
      { src: assetUri, alt: altText, filename, caption: imageCaption, dataId: response.id },
    ));

    yield call(resolve);
  }
  catch (error) {
    let errorMessage;

    switch (error.statusCode) {
      case 401:
        yield put({ type: SIGNOUT });
        break;
      case 422:
        // TODO: Handle the case where the file already exists
        yield (errorMessage = { _error: 'This file already exists.' });
        break;
      default:
        yield (errorMessage = { _error: 'Something wrong on our end.' });
    }

    yield call(reject, new SubmissionError(errorMessage));
  }
}

function* uploadAssetWatcher() {
  yield takeLatest(UPLOAD_ASSET, doUploadAsset);
}

export default uploadAssetWatcher;
