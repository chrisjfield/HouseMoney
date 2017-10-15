import auth from '../../helpers/firebase';
import { RECEIVE_USER } from '../Nav/navActions';
import { ADD_ERROR } from '../ErrorMessage/errorMessageActions';
import { IUserAuthenticationObject, IUserResponseObject } from '../../interfaces/userInterfaces';
import { IUserRegistrationObject } from './interfaces';

export const REGISTER_STARTED = 'REGISTER_STARTED';
export const REGISTER_COMPLETED = 'REGISTER_COMPLETED';

export function registerUser(user: IUserAuthenticationObject) {
    const request = auth.createUserWithEmailAndPassword(
        user.email,
        user.password,
    );

    return (dispatch: Function) => {
        dispatch(registerStarted());
        return request.then((response: IUserRegistrationObject) => {
            return response
              .updateProfile({ displayName: user.displayName })
              .then((reponse: IUserAuthenticationObject) => {
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

function registerSuccessful(response: IUserResponseObject) {
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
