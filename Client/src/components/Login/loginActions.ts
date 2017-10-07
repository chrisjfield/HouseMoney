import auth from '../../helpers/firebase';
import { RECEIVE_USER } from '../Nav/navActions';
import { ADD_ERROR } from '../ErrorMessage/errorMessageActions';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';

export function loginUser(login) {
  const request = auth.signInWithEmailAndPassword(login.email, login.password);

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
      email: response.email,
      displayName: response.displayName,
      userId: response.uid
    },
    isLoggedIn: true
  };
}

function loginFailure(error) {
  return {
    type: ADD_ERROR,
    payload: error.message
  };
}

function loginAttemptComplete() {
  return {
    type: LOGIN_COMPLETED
  };
}
