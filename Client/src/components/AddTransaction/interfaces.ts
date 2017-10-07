import { Dispatch } from 'redux';

export interface AddTransationProps {
    dispatch: Dispatch<{}>;
    history: any;
}

export interface AddTransationState {
    userListReturned: boolean;
    userList: object;
    addTransaction: addTransactionDetails;
    transactionAdded: boolean;
    transactionAdding: boolean;
    allChecked: boolean;
    error: string;
}

export interface addTransactionDetails {
    GROSS: number|string;
    DATE: Date;
    REFERENCE: string;
}
