import { reduxForm } from 'redux-form';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import isEmail from 'sane-email-validation';

import EmailSigninForm from 'presentationals/components/email-signin/EmailSigninForm';

import { emailSigninUser } from 'actions/signinActions';

export function validate(values) {
  const { email, password } = values;

  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = i18n.t('formErrors:emailRequired');
  }
  else if (!isEmail(email.trim())) {
    errors.email = i18n.t('formErrors:emailInvalid');
  }

  if (!password || password.trim() === '') {
    errors.password = i18n.t('formErrors:passwordRequired');
  }

  return errors;
}

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(emailSigninUser({ values, resolve, reject }));
  });
}

const connectedForm = reduxForm({
  form: 'emailSignin',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
})(translate()(EmailSigninForm));

function mapStateToProps(state) {
  return {
    isAuthenticated: state.app.authentication.isAuthenticated,
  };
}

export default connect(mapStateToProps)(connectedForm);
