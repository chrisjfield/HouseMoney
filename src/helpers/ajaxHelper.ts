import { Observable } from 'rxjs';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import baseURL from '../appConfig';
import { ErrorMessageActions } from '../components/ErrorMessage/errorMessageActions';
import { LoadingActions } from '../components/Loading/loadingActions';
import { logout } from '../components/Occupants/occupantsHelper';
import { AjaxCallParams } from '../interfaces/apiInterfaces';
import { store } from '../main/configureStore';

// TODO: Refactor these two if keeping both! Need to decide!
export default function ajaxObservable<R>(ajaxCallParams: AjaxCallParams): Observable<R> {
    const headers = {
        Authorization: 'Bearer ' + ajaxCallParams.token,
        'Content-Type': 'application/json;charset=UTF-8',
    };

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
                map((error: Error) => {
                    ErrorMessageActions.addError(error.message),
                    LoadingActions.loadingComplete();
                }),
            )),
                checkStatus(ajaxResponse.status);
            return ajaxResponse.response as R;
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
        const returnedPromise = response.ok ? response.json().then(
            (response: T) => response,
        ) : null;
        return returnedPromise;
    }).catch((error: Error) => {
        store.dispatch(ErrorMessageActions.addError(error.message));
        throw error;
    });
}

export function checkStatus(ajaxResponseStatusCode: number) {
    if (ajaxResponseStatusCode === 401) {
        logout();
    }
}
