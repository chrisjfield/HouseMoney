import apiCall from "../../helpers/apiHelper";
import { RECEIVE_USER } from "../Nav/navActions";
import { ADD_ERROR } from "../ErrorMessage/errorMessageActions";

export const LOGIN_STARTED = "LOGIN_STARTED";
export const LOGIN_COMPLETED = "LOGIN_COMPLETED";

export function loginUser(LOGIN) {
  const request = apiCall(
    "GET",
    "Users/GetSingleUser",
    null,
    `emailAddress=${LOGIN.EMAILADDRESS}&password=${LOGIN.PASSWORD}`
  );

  return dispatch => {
    dispatch(loginStarted());
    return request
      .then(response => {
        dispatch(loginSuccessful(response));
        dispatch(loginAttemptComplete());
      })
      .catch(error => {
        dispatch(loginFailure(error));
        dispatch(loginAttemptComplete());
        throw error;
      });
  };
}

function loginStarted() {
  return {
    type: LOGIN_STARTED
  };
}

function loginSuccessful(response) {
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

function loginFailure(error) {
  return {
    type: ADD_ERROR,
    payload: error.message,
    isLoggedIn: false
  };
}

function loginAttemptComplete() {
  return {
    type: LOGIN_COMPLETED
  };
}