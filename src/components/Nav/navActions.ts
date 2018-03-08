import auth from '../../helpers/firebase';
import { ADD_ERROR } from '../ErrorMessage/errorMessageActions';
import { IOccupant } from '../Occupants/occupantsInterfaces';

// Export Actions
export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_COMPLETED = 'LOGOUT_COMPLETED';

export function logout() {
    const request = auth.signOut();

    return (dispatch: Function) => {
        dispatch(logoutStarted());
        return request
            .then((response: void) => {
                dispatch(logoutSuccessful(response));
                dispatch(logoutAttemptComplete());
            })
          .catch((error: Error) => {
              dispatch(logoutFailure(error));
              dispatch(logoutAttemptComplete());
              throw error;
          });
    };
}

function logoutStarted() {
    return {
        type: LOGOUT_STARTED,
    };
}

function logoutSuccessful(response: void) {
    return {
        type: RECEIVE_USER,
        payload: {
            email: '',
            displayName: '',
            occupantId: '',
        },
        isLoggedIn: false,
    };
}

function logoutFailure(error: Error) {
    return {
        type: ADD_ERROR,
        payload: error.message,
    };
}

function logoutAttemptComplete() {
    return {
        type: LOGOUT_COMPLETED,
    };
}

function receiveUser(occupant: IOccupant, isLoggedIn: boolean) {
    return {
        occupant,
        isLoggedIn,
        type: RECEIVE_USER,
        receivedAt: Date.now(),
    };
}

export default receiveUser;
