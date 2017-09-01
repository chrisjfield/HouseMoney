import apiCall from "../../helpers/apiHelper";
import { RECEIVE_USER } from "../Nav/navActions";
import { ADD_ERROR } from "../ErrorMessage/errorMessageActions";

export const EDIT_USER_STARTED = "EDIT_USER_STARTED";
export const EDIT_USER_COMPLETED = "EDIT_USER_COMPLETED";
export const DELETE_USER_STARTED = "EDIT_USER_STARTED";
export const DELETE_USER_COMPLETED = "EDIT_USER_COMPLETED";

export function editUser(USER) {
  const request = apiCall("PUT", "Users/UpdateUserDetails", USER);

  return dispatch => {
    dispatch(editUserStarted());
    return request
      .then(response => {
        dispatch(editUserSuccessful(response));
        dispatch(editUserAttemptComplete());
      })
      .catch(error => {
        dispatch(editUserFailure(error));
        dispatch(editUserAttemptComplete());
        throw error;
      });
  };
}

export function deleteUser(emailAddress) {
  const request = apiCall(
    "DELETE",
    "Users/DeleteUser",
    null,
    "emailAddress=" + emailAddress
  );

  return dispatch => {
    dispatch(deleteUserStarted());
    return request
      .then(response => {
        dispatch(deleteUserSuccessful(response));
        dispatch(deleteUserAttemptComplete());
      })
      .catch(error => {
        dispatch(deleteUserFailure(error));
        dispatch(deleteUserAttemptComplete());
        throw error;
      });
  };
}

function editUserStarted() {
  return {
    type: EDIT_USER_STARTED
  };
}

function editUserSuccessful(response) {
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

function editUserFailure(error) {
  return {
    type: ADD_ERROR,
    error: error
  };
}

function editUserAttemptComplete() {
  return {
    type: EDIT_USER_COMPLETED
  };
}

function deleteUserStarted() {
  return {
    type: DELETE_USER_STARTED
  };
}

function deleteUserSuccessful(response) {
  return {
    type: RECEIVE_USER,
    payload: {
      EMAILADDRESS: response.EMAILADDRESS,
      FIRSTNAME: response.FIRSTNAME,
      SURNAME: response.SURNAME
    },
    isLoggedIn: false
  };
}

function deleteUserFailure(error) {
  return {
    type: ADD_ERROR,
    errorMessageText: error.response.statusText
  };
}

function deleteUserAttemptComplete() {
  return {
    type: DELETE_USER_COMPLETED
  };
}
