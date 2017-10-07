import auth from '../../helpers/firebase';
import { ADD_ERROR } from '../ErrorMessage/errorMessageActions';

// Export Actions
export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_COMPLETED = 'LOGOUT_COMPLETED';

export function logout() {
  const request = auth.signOut();

  return dispatch => {
    dispatch(logoutStarted());
    return request
      .then(response => {
        dispatch(logoutSuccessful(response));
        dispatch(logoutAttemptComplete());
      })
      .catch(error => {
        dispatch(logoutFailure(error));
        dispatch(logoutAttemptComplete());
        throw error;
      });
  };
}

function logoutStarted() {
  return {
    type: LOGOUT_STARTED
  };
}

function logoutSuccessful(response) {
  return {
    type: RECEIVE_USER,
    payload: {
      email: '',
      displayName: '',
      userId: ''
    },
    isLoggedIn: false
  };
}

function logoutFailure(error) {
  return {
    type: ADD_ERROR,
    payload: error.message
  };
}

function logoutAttemptComplete() {
  return {
    type: LOGOUT_COMPLETED
  };
}

function receiveUser(user, isLoggedIn) {
  return {
    type: RECEIVE_USER,
    user,
    isLoggedIn,
    receivedAt: Date.now()
  };
}

export default receiveUser;
