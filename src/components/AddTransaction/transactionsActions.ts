import apiHelper from '../../helpers/apiHelper';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { addError } from '../ErrorMessage/errorMessageActions';
import { IReceiveTransactionAction, ITransaction } from './transactionsInterfaces';
import { loadingStarted, loadingComplete } from '../Loading/loadingActions';

export enum transactionActions {
    ADD_TRANSACTION = 'ADD_TRANSACTION',
    GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY',
}

export function insertTransactions(token: string, userId: string, transactionArray: ITransaction[]) {
    const request = apiHelper.apiCall<number>(
        HTTPMethod.POST, endpoints.transactions, token, userId, transactionArray,
    );
    return (dispatch: Function) => {
        dispatch(loadingStarted());
        return request
            .then((response: number) => {
                dispatch(receiveTransaction(response));
                dispatch(loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(addError(error.message));
                dispatch(loadingComplete());
                throw error;
            });
    };
}

export function receiveTransaction(rowsAffected: number): IReceiveTransactionAction {
    return {
        transactionsAdded: rowsAffected > 0,
        type: transactionActions.ADD_TRANSACTION,
    };
}
