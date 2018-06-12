import * as queryString from 'query-string';
import { persistStore } from 'redux-persist';
import { myHouseUrl } from '../../appConfig';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { createAction } from '../../helpers/actionCreator';
import apiHelper from '../../helpers/apiHelper';
import { AuthorizationResponse } from '../../interfaces/apiInterfaces';
import { store } from '../../main/configureStore';
import { addError } from '../ErrorMessage/errorMessageActions';
import { loadingComplete, loadingStarted } from '../Loading/loadingActions';
import { ILogoutDetails, IOccupant, LogoutReason } from './occupantsInterfaces';

export enum occupantActionsTypes {
    LOGGED_OUT = 'LOGGED_OUT',
    RECEIVE_OCCUPANT = 'RECEIVE_OCCUPANT',
    RECEIVE_OCCUPANTS_OF_HOUSEHOLD = 'RECEIVE_OCCUPANTS_OF_HOUSEHOLD',
}

// ED! Think we should probably leave this as a promise - as actually really do want to await this - means refactor helpers!
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
        persistStore(store).purge(); // TODO: think: Do we really want to purge on logout? Maybe?
        return dispatch(receiveOccupant(undefined, false));
    };
}

// TODO: Make observable
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

export function getLogoutUrlWithDetails(logoutReason: LogoutReason) {
    const logoutDetails: ILogoutDetails = {
        logoutReason,
    };
    return myHouseUrl + 'Logout?' + queryString.stringify(logoutDetails);
}

export const receiveOccupant = (occupant: IOccupant, isLoggedIn: boolean) =>
    createAction(occupantActionsTypes.RECEIVE_OCCUPANT, { occupant, isLoggedIn });

export const receiveHouseholdOccupants = (householdOccupantsArray: IOccupant[]) =>
    createAction(occupantActionsTypes.RECEIVE_OCCUPANTS_OF_HOUSEHOLD, householdOccupantsArray);
