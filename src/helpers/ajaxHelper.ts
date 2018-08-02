import { of } from 'rxjs';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import baseURL from '../appConfig';
import { ErrorMessageActions } from '../components/ErrorMessage/errorMessageActions';
import { logout } from '../components/Occupants/occupantsCommon';
import { LogoutReason } from '../components/Occupants/occupantsInterfaces';
import { AjaxCallParams } from '../interfaces/apiInterfaces';
import { store } from '../main/configureStore';

// TODO: Refactor these two if keeping both! Need to decide!
export default function ajaxObservable<R>(ajaxCallParams: AjaxCallParams) {
    const headers = {
        Authorization: 'Bearer ' + ajaxCallParams.token,
        'Content-Type': 'application/json;charset=UTF-8',
    };
    const calledUrl = getCalledUrl(ajaxCallParams);
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
            checkStatus(ajaxResponse.status);
            return ajaxResponse.response as R;
        }),
        catchError((error: Error) => of(
            alertUserOfError(error),
        )),
    );
}

export function ajaxPromise<T>(ajaxCallParams: AjaxCallParams): Promise<T> {
    const headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + ajaxCallParams.token);
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    const calledUrl = getCalledUrl(ajaxCallParams);

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
        alertUserOfError(error);
        throw error;
    });
}

export function checkStatus(ajaxResponseStatusCode: number) {
    if (ajaxResponseStatusCode === 401) {
        logout(LogoutReason.Timeout);
    }
}

function getCalledUrl(ajaxCallParams: AjaxCallParams) {
    let calledUrl: string = baseURL + ajaxCallParams.endpoint;

    if (ajaxCallParams.urlParams) {
        calledUrl = calledUrl + ajaxCallParams.urlParams;
    }
    return calledUrl;
}

function alertUserOfError(error: Error) {
    store.dispatch(ErrorMessageActions.addError(error.message));
}
