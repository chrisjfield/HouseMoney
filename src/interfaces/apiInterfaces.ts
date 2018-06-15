import { endpoints } from '../enums/endpointsEnum';
import { HTTPMethod } from '../enums/httpEnum';

export interface AuthorizationResponse {
    isAuthorized: boolean;
}

export interface AjaxCallParams {
    endpoint: endpoints;
    method: HTTPMethod;
    token: string;
    urlParams: string;
    body?: Object;
}
