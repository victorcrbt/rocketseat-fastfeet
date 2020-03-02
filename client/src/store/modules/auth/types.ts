import { User } from '../user/types';

export enum AuthTypes {
  SIGNIN_REQUEST = '@auth/SIGNIN_REQUEST',
  SIGNIN_SUCCESS = '@auth/SIGNIN_SUCESS',
  SIGNIN_FAILURE = '@auth/SIGNIN_FAILURE',
  SIGNOUT = '@auth/SIGNOUT',
}

export interface Auth {
  user: User;
  token: string;
}

export interface AuthState {
  isSigned: boolean;
  token: string | null;
  loading: boolean;
}

export interface ActionTypes {
  readonly type: AuthTypes;
  readonly payload: Auth;
}
