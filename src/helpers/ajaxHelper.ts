import { Observable } from 'rxjs';
import { AjaxRequest, AjaxResponse, ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import baseURL from '../appConfig';
import { logout } from '../components/Occupants/occupantsActions';
import { ajaxCallParams } from '../interfaces/apiInterfaces';

function ajaxCall<R>(ajaxCallParams: ajaxCallParams): Observable<R> {
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
            checkStatus(ajaxResponse);
            return ajaxResponse.response.body as R;
        }),
    );
}

function checkStatus(ajaxResponse: AjaxResponse) {
    if (ajaxResponse.status === 401) {
        logout();
    }
}

export default ajaxCall;
