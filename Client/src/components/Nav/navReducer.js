import { RECEIVE_USER } from "../Nav/navActions";

const navReducer = (
  state = { isLoggedIn: false, loggedInUser: { email: "" } },
  action
) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        loggedInUser: action.payload,
        isLoggedIn: action.isLoggedIn
      });
    default:
      return state;
  }
};

// Export Reducer
export default navReducer;
