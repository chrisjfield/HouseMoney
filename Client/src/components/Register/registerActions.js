import auth from "../../helpers/firebase";
import { RECEIVE_USER } from "../Nav/navActions";
import { ADD_ERROR } from "../ErrorMessage/errorMessageActions";

export const REGISTER_STARTED = "REGISTER_STARTED";
export const REGISTER_COMPLETED = "REGISTER_COMPLETED";

export function registerUser(user) {
  const request = auth.createUserWithEmailAndPassword(
    user.email,
    user.password
  );

  return dispatch => {
    dispatch(registerStarted());
    return request.then(response => {
      return response
        .updateProfile({ displayName: user.displayName })
        .then(reponse => {
          dispatch(registerSuccessful(response));
          dispatch(registerAttemptComplete());
        })
        .catch(error => {
          dispatch(registerFailure(error));
          dispatch(registerAttemptComplete());
          throw error;
        });
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
      email: response.email,
      displayName: response.displayName,
      userId: response.uid
    },
    isLoggedIn: true
  };
}

function registerFailure(error) {
  return {
    type: ADD_ERROR,
    payload: error.message,
    isLoggedIn: false
  };
}

function registerAttemptComplete() {
  return {
    type: REGISTER_COMPLETED
  };
}
