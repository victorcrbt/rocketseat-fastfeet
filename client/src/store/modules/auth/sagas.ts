import { call, put, takeLatest, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

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

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (error) {
    yield put(signInFailure());
  }
}

export function signOut() {
  history.push('/');
}

export function setToken({ payload }: any) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest<SignInProps>(AuthTypes.SIGNIN_REQUEST, signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
