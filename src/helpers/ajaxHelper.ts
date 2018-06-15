import { Observable } from 'rxjs';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import baseURL from '../appConfig';
import { addError } from '../components/ErrorMessage/errorMessageActions';
import { logout } from '../components/Occupants/occupantsActions';
import { AjaxCallParams } from '../interfaces/apiInterfaces';
import { store } from '../main/configureStore';

export default function ajaxObservable<R>(ajaxCallParams: AjaxCallParams): Observable<R> {
    const headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + ajaxCallParams.token);
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    let calledUrl: string = baseURL + ajaxCallParams.endpoint;

    if (ajaxCallParams.urlParams) {
        calledUrl = calledUrl + ajaxCallParams.urlParams;
    }

    const ajaxRequest: AjaxRequest = {
        headers,
        url: calledUrl,
        method: ajaxCallParams.method,
        body: ajaxCallParams.body,
        timeout: 30000,
        responseType: 'json',
        crossDomain: true,
        async: true,
        // progressSubscriber?: Subscriber<any>; TODO: look into using this!
    };

    return ajax(ajaxRequest).pipe(
        map((ajaxResponse: AjaxResponse) => {
            catchError((error: Error, errorObservable) => errorObservable.pipe(
                map((error: Error) => addError(error.message)),
            )),
                checkStatus(ajaxResponse.status);
            return ajaxResponse.response.body as R;
        }),
    );
}

export function ajaxPromise<T>(ajaxCallParams: AjaxCallParams): Promise<T> {
    const headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + ajaxCallParams.token);
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    let calledUrl: string = baseURL + ajaxCallParams.endpoint;

    if (ajaxCallParams.urlParams) {
        calledUrl = calledUrl + ajaxCallParams.urlParams;
    }

    return fetch(calledUrl, {
        headers,
        method: ajaxCallParams.method,
        mode: 'cors',
        body: ajaxCallParams.body ? JSON.stringify(ajaxCallParams.body) : undefined,
    }).then((response: Response) => {
        checkStatus(response.status);
        return response.json().then(
            (response: T) => response,
        );
    }).catch((error: Error) => {
        store.dispatch(addError(error.message));
        throw error;
    });
}

export function checkStatus(ajaxResponseStatusCode: number) {
    if (ajaxResponseStatusCode === 401) {
        logout();
    }
}
