import { Observable } from 'rxjs';
import { AjaxRequest, AjaxResponse, ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import baseURL from '../appConfig';
// import { ErrorMessageActions } from '../components/ErrorMessage/errorMessageActions';
import { logout } from '../components/Occupants/occupantsActions';

abstract class AjaxService {
    public static apiCall<T>(method: string, endpoint: string, token: string, urlParams?: string, body?: object): Observable<T> {
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        let calledUrl: string = baseURL + endpoint;

        if (urlParams) {
            calledUrl = calledUrl + urlParams;
        }

        const request: AjaxRequest = {
            method,
            headers,
            url: calledUrl,
            body: body ? JSON.stringify(body) : undefined,
            async: true,
            timeout: 30000,
            crossDomain: true,
            responseType: 'json',
            // progressSubscriber?: Subscriber<any>; Do we need this??
        };

        const ajaxEpic = ajax(request).pipe(
            map((ajaxResponse: AjaxResponse) => {
                this.checkResponseStatus(ajaxResponse.response);
                return ajaxResponse.response as T;
            }),
            // catchError((error: Error) => ErrorMessageActions.addError(error.message)),
        );

        // const ajaxEpic = (action$: Observable<T>) =>
        //     action$.pipe(

        //     );

        return ajaxEpic;
    }

    private static checkResponseStatus(response: Response): boolean {
        let ret;
        if (response.ok && response.status === 204 || response.ok) {
            ret = response.ok;
        } else if (response.status === 401) {
            logout();
        } else {
            const error: Error = new Error(response.statusText);
            throw error;
        }
        return ret;
    }
}

export default AjaxService;
