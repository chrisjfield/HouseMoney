import apiHelper from '../../helpers/apiHelper';
import { IOccupant } from './occupantsInterfaces';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { AuthorizationResponse } from '../../interfaces/apiInterfaces';

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
