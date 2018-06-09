import * as queryString from 'query-string';
import { persistStore } from 'redux-persist';
import { myHouseUrl } from '../../appConfig';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import apiHelper from '../../helpers/apiHelper';
import { AuthorizationResponse } from '../../interfaces/apiInterfaces';
import { store } from '../../main/configureStore';
import { ErrorMessageActions } from '../ErrorMessage/errorMessageActions';
import { LoadingActions } from '../Loading/loadingActions';
import { ILogoutDetails, IOccupant, LogoutReason } from './occupantsInterfaces';
import actionCreatorFactory from 'typescript-fsa';

export enum occupantActionsTypes {
    LOGGED_OUT = 'LOGGED_OUT',
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

export function getHouseholdOccupants(token: string, userId: string, occupantId: number) {
    const request = apiHelper.apiCall<IOccupant[]>(
        HTTPMethod.GET, endpoints.occupants, token, userId + ',' + occupantId.toString(),
    );
    return (dispatch: Function) => {
        dispatch(LoadingActions.loadingStarted());
        return request
            .then((response: IOccupant[]) => {
                dispatch(receiveHouseholdOccupants(response));
                dispatch(LoadingActions.loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(ErrorMessageActions.addError(error.message));
                dispatch(LoadingActions.loadingComplete());
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

const occupantsActionsCreator = actionCreatorFactory();

export const receiveOccupant =
    occupantsActionsCreator<{occupant: IOccupant, isLoggedIn: boolean}>(occupantActionsTypes.RECEIVE_OCCUPANT);

export const receiveHouseholdOccupants =
    occupantsActionsCreator<{householdOccupantsArray: IOccupant[]}>(occupantActionsTypes.RECEIVE_OCCUPANTS_OF_HOUSEHOLD);
