import APIHelper from '../../helpers/apiHelper';
import { RECEIVE_USER } from '../Nav/navActions';
import { ADD_ERROR } from '../ErrorMessage/errorMessageActions';
import { IUserObject } from '../../interfaces/userInterfaces';

export const EDIT_USER_STARTED = 'EDIT_USER_STARTED';
export const EDIT_USER_COMPLETED = 'EDIT_USER_COMPLETED';
export const DELETE_USER_STARTED = 'EDIT_USER_STARTED';
export const DELETE_USER_COMPLETED = 'EDIT_USER_COMPLETED';

export function editUser(user: IUserObject) {
    const request = APIHelper.apiCall('PUT', 'Users/UpdateUserDetails', user);

    return (dispatch: Function)  => {
        dispatch(editUserStarted());
        return request
          .then((response: Response) => {
              dispatch(editUserSuccessful(response, user));
              dispatch(editUserAttemptComplete());
          })
          .catch((error: Error) => {
              dispatch(editUserFailure(error));
              dispatch(editUserAttemptComplete());
              throw error;
          });
    };
}

export function deleteUser(emailAddress: string) {
    const request = APIHelper.apiCall(
      'DELETE',
      'Users/DeleteUser',
      null,
      'emailAddress=' + emailAddress,
    );

    return (dispatch: Function) => {
        dispatch(deleteUserStarted());
        return request
          .then((response: Response) => {
              dispatch(deleteUserSuccessful(response));
              dispatch(deleteUserAttemptComplete());
          })
          .catch((error: Error) => {
              dispatch(deleteUserFailure(error));
              dispatch(deleteUserAttemptComplete());
              throw error;
          });
    };
}

function editUserStarted() {
    return {
        type: EDIT_USER_STARTED,
    };
}

function editUserSuccessful(response: Response, user: IUserObject) {
    return {
        type: RECEIVE_USER,
        payload: {
            email: user.email,
            displayName: user.displayName,
        },
    };
}

function editUserFailure(error: Error) {
    return {
        type: ADD_ERROR,
        payload: error.message,
    };
}

function editUserAttemptComplete() {
    return {
        type: EDIT_USER_COMPLETED,
    };
}

function deleteUserStarted() {
    return {
        type: DELETE_USER_STARTED,
    };
}

function deleteUserSuccessful(response: Response) {
    const deleteUser: IUserObject = {
        userId: null,
        email: null,
        displayName: null,
    };

    return {
        type: RECEIVE_USER,
        payload: {
            deleteUser,
        },
        isLoggedIn: false,
    };
}

function deleteUserFailure(error: Error) {
    return {
        type: ADD_ERROR,
        payload: error.message,
    };
}

function deleteUserAttemptComplete() {
    return {
        type: DELETE_USER_COMPLETED,
    };
}
