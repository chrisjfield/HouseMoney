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
    redirectToMyHouse(LogoutReason.UserTriggered);
    // TODO: Route to Occupants and build logout path
    // This will avoid 404 page flash
}

export function getLogoutUrlWithDetails(logoutReason: LogoutReason) {
    const logoutDetails: ILogoutDetails = {
        logoutReason,
    };
    return myHouseUrl + 'Logout?' + queryString.stringify(logoutDetails);
}

export function redirectToMyHouse(reason: LogoutReason) {
    window.location.replace(getLogoutUrlWithDetails(reason));
}

export function occupantIsValid(occupantToLogin: ILoggedInOccupant) {
    let loggedIn: boolean = false;
    if (occupantToLogin
        && occupantToLogin.isLoggedIn
        && occupantToLogin.loggedInOccupant.token
        && occupantToLogin.loggedInOccupant.occupantId
        && occupantToLogin.loggedInOccupant.displayName
        && occupantToLogin.loggedInOccupant.email
        && occupantToLogin.loggedInOccupant.userId) {
        loggedIn = true;
    }
    return loggedIn;
}

export function parseOccupant(occupantString: string) {
    const occupant: IOccupant = queryString.parse(occupantString);
    occupant.occupantId = parseInt(occupant.occupantId.toString(), 2);

    return occupant;
}
