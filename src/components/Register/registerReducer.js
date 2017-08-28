import { REGISTER_STARTED } from "./registerActions";

function registerReducer(
  state = {
    loggedInUser: undefined,
    loading: false,
    updating: false,
    error: false
  },
  action
) {
  switch (action.type) {
    case REGISTER_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
}

export default registerReducer;
