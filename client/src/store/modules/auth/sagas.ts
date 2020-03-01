import { call, put, takeLatest, all } from 'redux-saga/effects';

import api from '~/services/api';

import { AuthTypes } from './types';
import { signInSuccess, signInFailure } from './actions';

interface SignInProps {
  type: AuthTypes;
  payload: {
    email: string;
    password: string;
  };
}

export function* signIn({ payload }: SignInProps) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', { email, password });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));
  } catch (error) {
    yield put(signInFailure());
  }
}

export default all([takeLatest<SignInProps>(AuthTypes.SIGNIN_REQUEST, signIn)]);
