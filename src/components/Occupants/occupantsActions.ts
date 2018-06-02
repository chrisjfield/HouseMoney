import * as queryString from 'query-string';
import { persistStore } from 'redux-persist';
import { myHouseUrl } from '../../appConfig';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import apiHelper from '../../helpers/apiHelper';
import { AuthorizationResponse } from '../../interfaces/apiInterfaces';
import store from '../../main/store';
import { addError } from '../ErrorMessage/errorMessageActions';
import { loadingComplete, loadingStarted } from '../Loading/loadingActions';
import { ILogoutDetails, IOccupant, IReceiveHouseholdOccupantsAction, IReceiveOccupantAction, LogoutReason } from './occupantsInterfaces';

export enum occupantActions {
    RECEIVE_OCCUPANT = 'RECEIVE_OCCUPANT',
    RECEIVE_OCCUPANTS_OF_HOUSEHOLD = 'RECEIVE_OCCUPANTS_OF_HOUSEHOLD',
}

export async function checkHouseholdAuthorization(occupant: IOccupant): Promise<boolean> {
    let isLoggedIn = false;
    if (occupant && occupant.token && occupant.userId && occupant.occupantId) {
        await apiHelper.apiCall<AuthorizationResponse>(
            HTTPMethod.GET, endpoints.authorization, occupant.token, occupant.userId + ',' + occupant.occupantId,
        )
            .then((authorizationResponse: AuthorizationResponse) => {
                isLoggedIn = authorizationResponse ? authorizationResponse.isAuthorized : false;
            });
    }
    return isLoggedIn;
}

export function logout() {
    return (dispatch: Function) => {
        persistStore(store).purge();
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

export function getHouseholdOccupants(token: string, userId: string, occupantId: number) {
    const request = apiHelper.apiCall<IOccupant[]>(
        HTTPMethod.GET, endpoints.occupants, token, userId + ',' + occupantId.toString(),
    );
    return (dispatch: Function) => {
        dispatch(loadingStarted());
        return request
            .then((response: IOccupant[]) => {
                dispatch(receiveHouseholdOccupants(response));
                dispatch(loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(addError(error.message));
                dispatch(loadingComplete());
                throw error;
            });
    };
}

export function receiveHouseholdOccupants(householdOccupantsArray: IOccupant[]): IReceiveHouseholdOccupantsAction {
    const response: IReceiveHouseholdOccupantsAction = {
        householdOccupantsArray,
        type: occupantActions.RECEIVE_OCCUPANTS_OF_HOUSEHOLD,
    };
    return response;
}


export function getLogoutUrlWithDetails(logoutReason: LogoutReason) {
    const logoutDetails : ILogoutDetails = {
        logoutReason,
    }; 
    return myHouseUrl + 'Logout?' + queryString.stringify(logoutDetails);
}
