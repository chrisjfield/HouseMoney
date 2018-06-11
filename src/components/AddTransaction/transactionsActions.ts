import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import { ITransaction } from './transactionsInterfaces';

export enum transactionActionTypes {
    ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST',
    ADD_TRANSACTION_RESPONSE = 'ADD_TRANSACTION_RESPONSE',
    GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY',
}

// export function insertTransactions(token: string, userId: string, transactionArray: ITransaction[]) {
//     const request = apiHelper.apiCall<number>(
//         HTTPMethod.POST, endpoints.transactions, token, userId, transactionArray,
//     );
//     return (dispatch: Function) => {
//         dispatch(LoadingActions.loadingStarted());
//         return request
//             .then((response: number) => {
//                 dispatch(receiveTransaction(response));
//                 dispatch(LoadingActions.loadingComplete());
//             })
//             .catch((error: Error) => {
//                 dispatch(addError(error.message));
//                 dispatch(LoadingActions.loadingComplete());
//                 throw error;
//             });
//     };
// }

const addTransaction = (token: string, userId: string, transactionArray: ITransaction[]) =>
    createAction(transactionActionTypes.ADD_TRANSACTION_REQUEST, { token, userId, transactionArray });

const receiveTransaction = (rowsAffected: number) => createAction(transactionActionTypes.ADD_TRANSACTION_RESPONSE, rowsAffected > 0);

export const TransactionActions = {
    addTransaction,
    receiveTransaction,
};

export type TransactionActions = ActionsUnion<typeof TransactionActions>;
