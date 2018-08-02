import * as queryString from 'query-string';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionWithPayload } from '../../helpers/actionCreator';
import ajaxObservable from '../../helpers/ajaxHelper';
import { AjaxCallParams } from '../../interfaces/apiInterfaces';
import { LoadingActions } from '../Loading/loadingActions';
import { TransactionActions, transactionActionTypes } from './transactionsActions';
import { IAddTransactionRequest } from './transactionsInterfaces';

const addTransactionRequestEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType<ActionWithPayload<transactionActionTypes.ADD_TRANSACTION_REQUEST, IAddTransactionRequest>>(
            transactionActionTypes.ADD_TRANSACTION_REQUEST),
        switchMap((params) => {
            const urlParams = queryString.stringify({ userId: params.payload.userId });
            const addTransactionAjaxParams: AjaxCallParams = {
                urlParams,
                token: params.payload.token,
                method: HTTPMethod.POST,
                endpoint: endpoints.transactionAdd,
                body: params.payload.transactionArray,
            };
            return ajaxObservable<number>(addTransactionAjaxParams).pipe(
                mergeMap((response: number) => of(
                    TransactionActions.receiveTransaction(response),
                    LoadingActions.loadingComplete(),
                )),
            );
        },
        ),
    );
};

export default addTransactionRequestEpic;
