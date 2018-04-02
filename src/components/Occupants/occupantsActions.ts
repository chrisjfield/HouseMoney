import apiHelper from '../../helpers/apiHelper';
import { IOccupant, IReceiveOccupantAction } from './occupantsInterfaces';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { AuthorizationResponse } from '../../interfaces/apiInterfaces';

export enum occupantActions {
    RECEIVE_OCCUPANT = 'RECEIVE_OCCUPANT',
}

export async function checkHouseholdAuthorization(occupant: IOccupant): Promise<boolean> {
    let isLoggedIn = false;
    if (occupant && occupant.token && occupant.userId && occupant.occupantId) {
        await apiHelper.apiCall<AuthorizationResponse>(
            HTTPMethod.GET, endpoints.authorization, occupant.token, occupant.userId + occupant.occupantId,
        )
            .then((authorizationResponse: AuthorizationResponse) => {
                isLoggedIn = authorizationResponse.isAuthorized;
            });
    }
    return isLoggedIn;
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
