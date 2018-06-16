import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionWithPayload } from '../../helpers/actionCreator';
import ajaxObservable from '../../helpers/ajaxHelper';
import { AjaxCallParams } from '../../interfaces/apiInterfaces';
import { TransactionActions, transactionActionTypes } from './transactionsActions';
import { IAddTransactionRequest } from './transactionsInterfaces';

const addTransactionRequestEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType<ActionWithPayload<transactionActionTypes.ADD_TRANSACTION_REQUEST, IAddTransactionRequest>>(
            transactionActionTypes.ADD_TRANSACTION_REQUEST),
        switchMap((params) => {
            const addTransactionAjaxParams: AjaxCallParams = {
                token: params.payload.token,
                method: HTTPMethod.POST,
                endpoint: endpoints.transactions,
                urlParams: params.payload.userId,
                body: params.payload.transactionArray,
            };
            return ajaxObservable<number>(addTransactionAjaxParams).pipe(
                mergeMap(response => of(
                    TransactionActions.receiveTransaction(response),
                )),
            );
        },
        ),
    );
};

export default addTransactionRequestEpic;

// TODO: Implement show error on error and loading on start then done on complete
