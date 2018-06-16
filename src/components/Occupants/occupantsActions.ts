import * as queryString from 'query-string';
import { persistStore } from 'redux-persist';
import { myHouseUrl } from '../../appConfig';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import { ajaxPromise } from '../../helpers/ajaxHelper';
import { AjaxCallParams, AuthorizationResponse } from '../../interfaces/apiInterfaces';
import { store } from '../../main/configureStore';
import { ILoggedInOccupant, ILogoutDetails, IOccupant, IOccupantDetails, LogoutReason } from './occupantsInterfaces';

export enum occupantActionsTypes {
    LOGGED_OUT = 'LOGGED_OUT',
    RECEIVE_OCCUPANT = 'RECEIVE_OCCUPANT',
    GET_OCCUPANTS_OF_HOUSEHOLD_REQUEST = 'GET_OCCUPANTS_OF_HOUSEHOLD_REQUEST',
    GET_OCCUPANTS_OF_HOUSEHOLD_RESPONSE = 'GET_OCCUPANTS_OF_HOUSEHOLD_RESPONSE',
}

// ED! Think we should probably leave this as a promise - as actually really do want to await this - means refactor helpers!
export async function checkHouseholdAuthorization(occupant: IOccupant): Promise<boolean> {
    let isLoggedIn = false;
    const ajaxCallParams: AjaxCallParams = {
        token: occupant.token,
        endpoint: endpoints.authorization,
        method: HTTPMethod.GET,
        urlParams: occupant.userId + ',' + occupant.occupantId.toString(),
    };
    if (occupant && occupant.token && occupant.userId && occupant.occupantId) {
        await ajaxPromise<AuthorizationResponse>(ajaxCallParams)
            .then((authorizationResponse: AuthorizationResponse) => {
                isLoggedIn = authorizationResponse ? authorizationResponse.isAuthorized : false;
            });
    }
    return isLoggedIn;
}

// TODO: Fix LOGOUT! Currently not working - think this needs a cleaner solution
export function logout() {
    return (dispatch: Function) => {
        persistStore(store).purge(); // TODO: think: Do we really want to purge on logout? Maybe?
        const removedOccupant: ILoggedInOccupant = {
            isLoggedIn: false,
            loggedInOccupant: undefined,
        };
        return dispatch(receiveOccupant(removedOccupant));
    };
}

export function getLogoutUrlWithDetails(logoutReason: LogoutReason) {
    const logoutDetails: ILogoutDetails = {
        logoutReason,
    };
    return myHouseUrl + 'Logout?' + queryString.stringify(logoutDetails);
}

const receiveOccupant = (loggedInOccupant: ILoggedInOccupant) =>
    createAction(occupantActionsTypes.RECEIVE_OCCUPANT, loggedInOccupant);

const getHouseholdOccupants = (occupantDetails: IOccupantDetails) =>
    createAction(occupantActionsTypes.GET_OCCUPANTS_OF_HOUSEHOLD_REQUEST, occupantDetails);

const receiveHouseholdOccupants = (householdOccupantsArray: IOccupant[]) =>
    createAction(occupantActionsTypes.GET_OCCUPANTS_OF_HOUSEHOLD_RESPONSE, householdOccupantsArray);

export const OccupantsActions = {
    receiveOccupant,
    getHouseholdOccupants,
    receiveHouseholdOccupants,
};
export type OccupantsActions = ActionsUnion<typeof OccupantsActions>;
