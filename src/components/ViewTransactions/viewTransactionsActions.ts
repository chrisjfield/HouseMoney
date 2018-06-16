import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import { ITransactionHistory, IViewTransactionsRequest } from './viewTransactionsInterfaces';

export enum viewTransactionsActionTypes {
    GET_TRANSACTION_HISTORY_REQUEST = 'GET_TRANSACTION_HISTORY_REQUEST',
    GET_TRANSACTION_HISTORY_RESPONSE = 'GET_TRANSACTION_HISTORY_RESPONSE',
}

const getTransactionHistory = (transactionHistoryRequest: IViewTransactionsRequest) =>
    createAction(viewTransactionsActionTypes.GET_TRANSACTION_HISTORY_REQUEST, transactionHistoryRequest);

const receiveTransactionHistory = (transactionHistoryArray: ITransactionHistory[]) =>
    createAction(viewTransactionsActionTypes.GET_TRANSACTION_HISTORY_RESPONSE, transactionHistoryArray);

export const ViewTransactionsActions = {
    getTransactionHistory,
    receiveTransactionHistory,
};

export type ViewTransactionsActions = ActionsUnion<typeof ViewTransactionsActions>;
