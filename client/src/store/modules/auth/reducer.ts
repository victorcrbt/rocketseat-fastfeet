import produce from 'immer';
import { AuthState, AuthTypes, ActionTypes } from './types';

const INITIAL_STATE: AuthState = {
  isSigned: false,
  token: null,
  loading: false,
};

export default function auth(
  state = INITIAL_STATE,
  action: ActionTypes
): AuthState {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case AuthTypes.SIGNIN_REQUEST: {
        draft.loading = true;
        break;
      }

      case AuthTypes.SIGNIN_SUCCESS: {
        draft.token = payload.token;
        draft.loading = false;
        draft.isSigned = true;
        break;
      }

      case AuthTypes.SIGNIN_FAILURE: {
        draft.token = null;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
