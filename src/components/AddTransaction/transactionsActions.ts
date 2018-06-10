import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import apiHelper from '../../helpers/apiHelper';
import { addError } from '../ErrorMessage/errorMessageActions';
import { LoadingActions } from '../Loading/loadingActions';
import { ITransaction } from './transactionsInterfaces';

export enum transactionActionTypes {
    ADD_TRANSACTION = 'ADD_TRANSACTION',
    GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY',
}

export function insertTransactions(token: string, userId: string, transactionArray: ITransaction[]) {
    const request = apiHelper.apiCall<number>(
        HTTPMethod.POST, endpoints.transactions, token, userId, transactionArray,
    );
    return (dispatch: Function) => {
        dispatch(LoadingActions.loadingStarted());
        return request
            .then((response: number) => {
                dispatch(receiveTransaction(response));
                dispatch(LoadingActions.loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(addError(error.message));
                dispatch(LoadingActions.loadingComplete());
                throw error;
            });
    };
}

const receiveTransaction = (rowsAffected: number) => createAction(transactionActionTypes.ADD_TRANSACTION, rowsAffected > 0);

export const TransactionActions = {
    insertTransactions,
    receiveTransaction,
};

export type TransactionActions = ActionsUnion<typeof TransactionActions>;
