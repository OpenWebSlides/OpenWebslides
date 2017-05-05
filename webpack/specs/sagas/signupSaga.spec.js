import faker from 'faker';
import { call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import * as signupSaga from 'sagas/signupSaga';
import signupApi from 'api/signup';

describe('Signup Saga', () => {
  describe('Signup Flow', () => {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();
    const fakeFirstName = faker.name.firstName();
    const fakeLastName = faker.name.lastName();
    const resolve = jest.fn();
    const reject = jest.fn();

    it('has a happy path', () => {
      const generator = signupSaga.doSignup({
        meta: {
          values: {
            email: fakeEmail,
            password: fakePassword,
            firstName: fakeFirstName,
            lastName: fakeLastName,
          },
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signupApi, fakeEmail, fakePassword, fakeFirstName, fakeLastName));

      expect(
        generator.next().value)
        .toEqual(
        call(resolve),
      );

      expect(
        generator.next().done)
        .toBeTruthy();
    });

    it('throws an error when field validation fails', () => {
      const fakeErrorMessage = faker.lorem.sentence();
      const fakeStatusCode = 422;
      const fakeValidationError = { email: 'Email has already been taken' };

      const generator = signupSaga.doSignup({
        meta: {
          values: {
            email: fakeEmail,
            password: fakePassword,
            firstName: fakeFirstName,
            lastName: fakeLastName,
          },
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signupApi, fakeEmail, fakePassword, fakeFirstName, fakeLastName));

      expect(
        generator.throw({
          message: fakeErrorMessage,
          statusCode: fakeStatusCode,
          validationErrors: fakeValidationError,
        }).value)
        .toEqual({ email: 'Email has already been taken' });

      expect(
        generator.next().value)
        .toEqual(
        call(reject, new SubmissionError()));

      expect(
        generator.next().done)
        .toBeTruthy();
    });

    it('throws an error when server connection fails', () => {
      const fakeErrorMessage = faker.lorem.sentence();
      const fakeStatusCode = 500;

      const generator = signupSaga.doSignup({
        meta: {
          values: {
            email: fakeEmail,
            password: fakePassword,
            firstName: fakeFirstName,
            lastName: fakeLastName,
          },
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signupApi, fakeEmail, fakePassword, fakeFirstName, fakeLastName));

      expect(
        generator.throw({
          message: fakeErrorMessage,
          statusCode: fakeStatusCode,
        }).value)
        .toEqual({ _error: 'Something went wrong on our end.' });

      expect(
        generator.next().value)
        .toEqual(
        call(reject, new SubmissionError()));

      expect(
        generator.next().done)
        .toBeTruthy();
    });
  });
});
