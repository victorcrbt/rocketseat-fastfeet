import { AuthTypes } from './types';
import { User } from '../user/types';

export function signInRequest(email: string, password: string) {
  return {
    type: AuthTypes.SIGNIN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token: string, user: User) {
  return {
    type: AuthTypes.SIGNIN_SUCCESS,
    payload: { token, user },
  };
}

export function signInFailure() {
  return {
    type: AuthTypes.SIGNIN_FAILURE,
  };
}

export function signOut() {
  return {
    type: AuthTypes.SIGNOUT,
  };
}
