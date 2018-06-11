import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionWithPayload } from '../../helpers/actionCreator';
import ajaxCall from '../../helpers/ajaxHelper';
import { ajaxCallParams } from '../../interfaces/apiInterfaces';
import { TransactionActions, transactionActionTypes } from './transactionsActions';
import { ITransaction } from './transactionsInterfaces';

const addTransactionRequestEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(transactionActionTypes.ADD_TRANSACTION_REQUEST),
        mergeMap((params: ActionWithPayload<transactionActionTypes.ADD_TRANSACTION_REQUEST,
                { token: string, userId: string, transactionArray: ITransaction[] }>) => {
            const addTransactionAjaxParams: ajaxCallParams = {
                token: params.payload.token,
                method: HTTPMethod.POST,
                endpoint: endpoints.transactions,
                urlParams: params.payload.userId,
                body: params.payload.transactionArray,
            };
            return ajaxCall<number>(addTransactionAjaxParams).pipe(
                map(response => of(
                    TransactionActions.receiveTransaction(response),
                )),
            );
        },
        ),
    );
};

export default addTransactionRequestEpic;
