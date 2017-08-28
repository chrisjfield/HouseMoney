import { LOGIN_STARTED, LOGIN_COMPLETED } from "./loginActions";

function loginReducer(
  state = {
    loading: false,
  },
  action
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
