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
        await apiHelper.apiCall<AuthorizationResponse>(HTTPMethod.GET, endpoints.authorization, occupant.token, occupant.userId)
            .then((authorizationResponse) => {
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

function logoutStarted(): Action {
    return { type: occupantActions.LOGOUT_STARTED };
}

function logoutAttemptComplete(): Action {
    return { type: occupantActions.LOGOUT_COMPLETED };
}

export function receiveOccupant(occupant: IOccupant, isLoggedIn: boolean): IReceiveOccupantAction {
    const response: IReceiveOccupantAction = {
        isLoggedIn,
        type: occupantActions.RECEIVE_OCCUPANT,
        loggedInOccupant: occupant,
    };
    return response;
}
