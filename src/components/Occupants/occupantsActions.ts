import apiHelper from '../../helpers/apiHelper';
import { IOccupant, IReceiveOccupantAction } from './occupantsInterfaces';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { AuthorizationResponse } from '../../interfaces/apiInterfaces';
import { Action } from 'redux';
import { addError } from '../ErrorMessage/errorMessageActions';

export enum occupantActions {
    RECEIVE_OCCUPANT = 'RECEIVE_OCCUPANT',
    LOGOUT_STARTED = 'LOGOUT_STARTED',
    LOGOUT_COMPLETED = 'LOGOUT_COMPLETED',
}

export async function checkAuthorization(occupant: IOccupant): Promise<boolean> {
    let isLoggedIn = false;
    if (occupant && occupant.token && occupant.occupantId) {
        await apiHelper.apiCall(HTTPMethod.GET, endpoints.authorization, occupant.token, occupant.occupantId.toString())
            .then((authorizationResponse: AuthorizationResponse) => {
                isLoggedIn = authorizationResponse.isAuthorized;
            });
    }
    return isLoggedIn;
}

export function logout() {
    return (dispatch: Function) => {
        return dispatch(logoutStarted())
            .then(() => {
                dispatch(receiveOccupant(undefined, false));
                dispatch(logoutAttemptComplete());
            })
            .catch((error: Error) => {
                dispatch(addError(error.message));
                dispatch(logoutAttemptComplete());
                throw error;
            });
    };
}

function logoutStarted() {
    const response: Action = {
        type: occupantActions.LOGOUT_STARTED,
    };
    return response;
}

function logoutAttemptComplete() {
    const response: Action = {
        type: occupantActions.LOGOUT_COMPLETED,
    };
    return response;
}

export function receiveOccupant(occupant: IOccupant, isLoggedIn: boolean) {
    const response: IReceiveOccupantAction = {
        isLoggedIn,
        type: occupantActions.RECEIVE_OCCUPANT,
        loggedInOccupant: occupant,
    };
    return response;
}
