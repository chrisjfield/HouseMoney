import baseURL from '../appConfig';
import { handleLogOut } from './loginHelper';

class APIHelper {
    static apiCall(method: string, endpoint: string, token: string, urlParams?: string, body?: object) {
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        let calledUrl: string = baseURL + endpoint;

        if (urlParams) {
            calledUrl = calledUrl + urlParams;
        }

        return fetch(calledUrl, {
            method,
            headers,
            mode: 'cors',
            body: body ? JSON.stringify(body) : undefined,
        }).then((response: any) => {
            return APIHelper.checkStatus(response);
        }).catch((error: any) => {
            throw (error);
        });
    }

    static checkStatus(response: any) {
        let ret: any = false;
        if (response.ok && response.status === 204) {
            ret = true;
        } else if (response.ok) {
            ret = response.json();
        } else if (response.status === 401) {
            handleLogOut(); 
        } else {
            const error: Error = new Error(response.statusText);
            throw error;
        }
        return ret;
    }
}

export default APIHelper;
