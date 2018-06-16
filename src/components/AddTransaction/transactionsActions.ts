import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import { IAddTransactionRequest } from './transactionsInterfaces';

export enum transactionActionTypes {
    ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST',
    ADD_TRANSACTION_RESPONSE = 'ADD_TRANSACTION_RESPONSE',
    GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY',
}

const addTransaction = (addTransactionRequest: IAddTransactionRequest) =>
    createAction(transactionActionTypes.ADD_TRANSACTION_REQUEST, addTransactionRequest);

const receiveTransaction = (rowsAffected: number) => createAction(transactionActionTypes.ADD_TRANSACTION_RESPONSE, rowsAffected > 0);

export const TransactionActions = {
    addTransaction,
    receiveTransaction,
};

export type TransactionActions = ActionsUnion<typeof TransactionActions>;
