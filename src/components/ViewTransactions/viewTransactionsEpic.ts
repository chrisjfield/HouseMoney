import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionWithPayload } from '../../helpers/actionCreator';
import ajaxObservable from '../../helpers/ajaxHelper';
import { AjaxCallParams } from '../../interfaces/apiInterfaces';
import { ViewTransactionsActions, viewTransactionsActionTypes } from './viewTransactionsActions';
import { ITransactionHistory, IViewTransactionsRequest } from './viewTransactionsInterfaces';

const getTransactionHistoryEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType<ActionWithPayload<viewTransactionsActionTypes.GET_TRANSACTION_HISTORY_REQUEST, IViewTransactionsRequest>>(
            viewTransactionsActionTypes.GET_TRANSACTION_HISTORY_REQUEST),
        switchMap((params) => {
            const ajaxCallParams: AjaxCallParams = {
                token: params.payload.token,
                endpoint: endpoints.transactionHistory,
                method: HTTPMethod.GET,
                urlParams: params.payload.userId + ',' + params.payload.occupantId
                    + ',' + params.payload.pageSize + ',' + params.payload.pageNumber,
            };
            return ajaxObservable<ITransactionHistory[]>(ajaxCallParams).pipe(
                mergeMap(response => of(
                    ViewTransactionsActions.receiveTransactionHistory(response),
                )),
            );
        },
        ),
    );
};

export default getTransactionHistoryEpic;
