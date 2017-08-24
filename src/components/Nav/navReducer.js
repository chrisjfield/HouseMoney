import { RECEIVE_USER } from "../Nav/navActions";

const navReducer = (
  state = { isLoggedIn: false, loggedInUser: { EMAILADDRESS: "" } },
  action
) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        loggedInUser: action.USER,
        isLoggedIn: action.isLoggedIn
      });
    default:
      return state;
  }
};

// Export Reducer
export default navReducer;
