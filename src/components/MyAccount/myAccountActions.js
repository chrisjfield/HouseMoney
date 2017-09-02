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
        dispatch(editUserSuccessful(response, USER));
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

function editUserSuccessful(response, USER) {
  return {
    type: RECEIVE_USER,
    payload: {
      // This is currently a workaround - need this to be a response from the API - fix in V3!
      EMAILADDRESS: USER.EMAILADDRESS,
      FIRSTNAME: USER.FIRSTNAME,
      SURNAME: USER.SURNAME
    },
    isLoggedIn: true
  };
}

function editUserFailure(error) {
  return {
    type: ADD_ERROR,
    payload: error.message
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
      EMAILADDRESS: null,
      FIRSTNAME: null,
      SURNAME: null
    },
    isLoggedIn: false
  };
}

function deleteUserFailure(error) {
  return {
    type: ADD_ERROR,
    payload: error.message
  };
}

function deleteUserAttemptComplete() {
  return {
    type: DELETE_USER_COMPLETED
  };
}
