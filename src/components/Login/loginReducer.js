import { LOGIN_STARTED } from "./loginActions";

function loginReducer(
  state = {
    loggedInUser: undefined,
    loading: false,
    updating: false,
    error: false
  },
  action
) {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
}

export default loginReducer;
