import { ICustomApiHeaders } from '../interfaces/apiInterfaces';
import baseURL from '../appConfig';

class APIHelper {
    static apiCall(method: string, endpoint: string, body?: object, urlParams?: string) {
        const customheaders: ICustomApiHeaders = {
            'Content-Type': 'application/json;charset=UTF-8',
        };
        const headers: Headers = new Headers(customheaders);
        let calledUrl: string = baseURL + endpoint;
  
        if (urlParams) {
            calledUrl = calledUrl + urlParams;
        }
  
        return fetch(calledUrl, {
            method,
            headers,
            mode: 'cors',
            body: body ? JSON.stringify(body) : undefined,
        })
        .then((response: any) => {
            return APIHelper.checkStatus(response);
        })
        .catch((error: any) => {
            throw(error);
        });
    }
  
    static checkStatus(response: any) {
        if (response.ok && response.status === 204) {
            return true;
        } else if (response.ok) {
            return response.json();
        } else {
            const error: Error = new Error(response.statusText);
            throw error;
        }
    }
}
  
export default APIHelper;
