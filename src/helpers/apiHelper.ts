import baseURL from '../appConfig';
import { handleLogOut } from './loginHelper';

class APIHelper {
    static apiCall<T>(method: string, endpoint: string, token: string, urlParams?: string, body?: object): Promise<T> {
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
        }).then((response: Response) => {
            return APIHelper.checkStatus(response);
        }).catch((error: Error) => {
            throw (error);
        });
    }

    static checkStatus(response: Response) {
        let ret;
        if (response.ok && response.status === 204) {
            ret = response.ok;
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
