import * as queryString from 'query-string';
import { myHouseUrl } from '../../appConfig';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ajaxPromise } from '../../helpers/ajaxHelper';
import { AjaxCallParams, AuthorizationResponse } from '../../interfaces/apiInterfaces';
import { store } from '../../main/configureStore';
import { OccupantsActions } from './occupantsActions';
import { ILoggedInOccupant, ILogoutDetails, IOccupant, LogoutReason } from './occupantsInterfaces';

// ED! Think we should probably leave this as a promise? - as actually really do want to await this - means refactor helpers!
export async function checkHouseholdAuthorization(occupant: IOccupant): Promise<boolean> {
    let isLoggedIn = false;
    if (occupant && occupant.token && occupant.userId && occupant.occupantId) {
        const ajaxCallParams: AjaxCallParams = {
            token: occupant.token,
            endpoint: endpoints.authorization,
            method: HTTPMethod.GET,
            urlParams: occupant.userId + ',' + occupant.occupantId.toString(),
        };
        await ajaxPromise<AuthorizationResponse>(ajaxCallParams)
            .then((authorizationResponse: AuthorizationResponse) => {
                isLoggedIn = authorizationResponse ? authorizationResponse.isAuthorized : false;
            });
    }
    return isLoggedIn;
}

export function logout() {
    const removedOccupant: ILoggedInOccupant = {
        isLoggedIn: false,
        loggedInOccupant: undefined,
    };
    store.dispatch(OccupantsActions.receiveOccupant(removedOccupant));
}

export function getLogoutUrlWithDetails(logoutReason: LogoutReason) {
    const logoutDetails: ILogoutDetails = {
        logoutReason,
    };
    return myHouseUrl + 'Logout?' + queryString.stringify(logoutDetails);
}