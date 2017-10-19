import { LOGIN_STARTED, LOGIN_COMPLETED } from './loginActions';
import { ILoginState, ILoginAction } from './interfaces';

function loginReducer(
  state: ILoginState = {
      user: null,
      error: null,
      loading: false,
  },
  action: ILoginAction,
) {
    switch (action.type) {
    case LOGIN_STARTED:
        return {
            ...state,
            loading: true,
        };
    case LOGIN_COMPLETED:
        return {
            ...state,
            loading: false,
        };
    default:
        return state;
    }
}

export default loginReducer;
