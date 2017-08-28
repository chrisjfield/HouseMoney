import apiCall from "../../helpers/apiHelper";
import { RECEIVE_USER } from "../Nav/navActions";
import { ADD_ERROR } from "../ErrorMessage/errorMessageActions";

export const REGISTER_STARTED = "REGISTER_STARTED";

export function registerUser(USER) {
  const request = apiCall("POST", "Users/PostUser", USER);

  return dispatch => {
    dispatch(registerStarted());
    return request
      .then(response => dispatch(registerSuccessful(response)))
      .catch(error => {
        dispatch(registerFailure(error));
        throw error;
      });
  };
}

function registerStarted() {
  return {
    type: REGISTER_STARTED
  };
}

function registerSuccessful(response) {
  return {
    type: RECEIVE_USER,
    payload: {
      EMAILADDRESS: response.EMAILADDRESS,
      FIRSTNAME: response.FIRSTNAME,
      SURNAME: response.SURNAME
    },
    isLoggedIn: true
  };
}

function registerFailure(error) {
  return {
    type: ADD_ERROR,
    error: error,
    isLoggedIn: false
  };
}
