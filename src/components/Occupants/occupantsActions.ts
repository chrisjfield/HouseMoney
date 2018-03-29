import apiHelper from '../../helpers/apiHelper';
import { IOccupant, IReceiveOccupantAction } from './occupantsInterfaces';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { AuthorizationResponse } from '../../interfaces/apiInterfaces';

export enum occupantActions {
    RECEIVE_OCCUPANT = 'RECEIVE_OCCUPANT',
}

export function checkAuthorization(occupant: IOccupant) {
    const request = apiHelper.apiCall<AuthorizationResponse>(HTTPMethod.GET, endpoints.authorization, occupant.token, occupant.userId);
    return (dispatch: Function) => {
        if (occupant && occupant.token && occupant.occupantId) {
            request.then((authorizationResponse) => {
                receiveOccupant(occupant, authorizationResponse.isAuthorized);
            });
        } else {
            dispatch(logout());
        }
    };
}

export function logout() {
    return (dispatch: Function) => {
        return dispatch(receiveOccupant(undefined, false));
    };
}

export function receiveOccupant(occupant: IOccupant, isLoggedIn: boolean): IReceiveOccupantAction {
    const response: IReceiveOccupantAction = {
        isLoggedIn,
        type: occupantActions.RECEIVE_OCCUPANT,
        loggedInOccupant: occupant,
    };
    return response;
}
