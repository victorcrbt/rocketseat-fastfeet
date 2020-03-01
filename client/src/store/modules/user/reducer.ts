import produce from 'immer';
import { UserState } from './types';
import { AuthTypes, ActionTypes } from '../auth/types';

const INITIAL_STATE: UserState = {
  profile: null,
};

export default function auth(
  state = INITIAL_STATE,
  action: ActionTypes
): UserState {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case AuthTypes.SIGNIN_SUCCESS: {
        draft.profile = payload.user;
        break;
      }

      case AuthTypes.SIGNIN_FAILURE: {
        draft.profile = null;
        break;
      }

      default:
    }
  });
}
