import { RECEIVE_USER } from "../Nav/navActions";

const navReducer = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        USER: action.USER,
        isLoggedIn: action.isLoggedIn
      });
    default:
      return state;
  }
};

// Export Reducer
export default navReducer;
