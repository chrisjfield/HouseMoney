import apiHelper from '../../helpers/apiHelper';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { addError } from '../ErrorMessage/errorMessageActions';
import { ITransactionResponse, IReceiveTransactionAction, ITransaction } from './transactionsInterfaces';
import { loadingStarted, loadingComplete } from '../Loading/loadingActions';

export enum transactionActions {
    ADD_TRANSACTION = 'ADD_TRANSACTION',
}

export function insertTransactions(token: string, userId: string, transactionArray: ITransaction[]) {
    const request = apiHelper.apiCall<ITransactionResponse[]>(
        HTTPMethod.POST, endpoints.transactions, token, userId + ',' + transactionArray[0].enteredBy.toString(),
    );
    return (dispatch: Function) => {
        dispatch(loadingStarted());
        return request
            .then((response: ITransactionResponse[]) => {
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

export function receiveTransaction(transactionArray: ITransactionResponse[]): IReceiveTransactionAction {
    return {
        transactionArray,
        type: transactionActions.ADD_TRANSACTION,
    };
}
