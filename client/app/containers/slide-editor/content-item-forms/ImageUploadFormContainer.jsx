import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uploadAsset } from 'actions/other/assetActions';
import { updateDeck } from 'actions/entities/decks';

import ImageUploadForm from 'presentationals/components/slide-editor/content-item-forms/ImageUploadForm';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDeck }, dispatch);
}

export function validate(values) {
  const { altText, imageFile, imageType } = values;

  const errors = {};

  if (!altText || altText.trim() === '') {
    errors.altText = 'Alt text is required';
  }

  if (!imageFile) {
    errors.imageFile = 'Please select an image file to upload';
  }

  if (!imageType) {
    errors.imageType = 'Please select an image type';
  }

  return errors;
}

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(uploadAsset({ assetType: 'IMAGE', values, resolve, reject }));
  });
}

const connectedForm = reduxForm({
  form: 'imageUpload',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
  initialValues: { imageType: 'ILLUSTRATIVE' },
})(ImageUploadForm);


export default connect(null, mapDispatchToProps)(connectedForm);