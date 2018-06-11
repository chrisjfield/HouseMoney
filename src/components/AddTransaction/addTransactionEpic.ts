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
        ofType(transactionActionTypes.ADD_TRANSACTION),
        mergeMap((params: ActionWithPayload<transactionActionTypes.ADD_TRANSACTION,
                { token: string, userId: string, transactionArray: ITransaction[] }>) => {
            const balanceAjaxParams: ajaxCallParams = {
                token: params.payload.token,
                method: HTTPMethod.GET,
                endpoint: endpoints.balance,
                urlParams: params.payload.userId,
            };
            return ajaxCall<number>(balanceAjaxParams).pipe(
                map(response => of(
                    TransactionActions.receiveTransaction(response),
                )),
            );
        },
        ),
    );
};

export default addTransactionRequestEpic;
