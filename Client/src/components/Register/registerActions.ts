import auth from '../../helpers/firebase';
import { RECEIVE_USER } from '../Nav/navActions';
import { ADD_ERROR } from '../ErrorMessage/errorMessageActions';
import { UserAuthenticationObject, UserResponseObject } from '../../interfaces/userInterfaces';
import { UserRegistrationObject } from './interfaces';

export const REGISTER_STARTED = 'REGISTER_STARTED';
export const REGISTER_COMPLETED = 'REGISTER_COMPLETED';

export function registerUser(user: UserAuthenticationObject) {
    const request = auth.createUserWithEmailAndPassword(
        user.email,
        user.password,
    );

    return (dispatch: Function) => {
        dispatch(registerStarted());
        return request.then((response: UserRegistrationObject) => {
            return response
              .updateProfile({ displayName: user.displayName })
              .then((reponse: UserAuthenticationObject) => {
                  dispatch(registerSuccessful(response)); // ED! Look at these types more carefully
                  dispatch(registerAttemptComplete());
              })
              .catch((error: Error) => {
                  dispatch(registerFailure(error));
                  dispatch(registerAttemptComplete());
                  throw error;
              });
        });
    };
}

function registerStarted() {
    return {
        type: REGISTER_STARTED,
    };
}

function registerSuccessful(response: UserResponseObject) {
    return {
        type: RECEIVE_USER,
        payload: {
            email: response.email,
            displayName: response.displayName,
            userId: response.uid,
        },
        isLoggedIn: true,
    };
}

function registerFailure(error: Error) {
    return {
        type: ADD_ERROR,
        payload: error.message,
        isLoggedIn: false,
    };
}

function registerAttemptComplete() {
    return {
        type: REGISTER_COMPLETED,
    };
}
