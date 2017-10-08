import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';

export interface AddTransationProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
}

export interface AddTransationState {
    userListReturned: boolean;
    userList: AddTransactionUser[];
    addTransaction: AddTransactionDetails;
    transactionAdded: boolean;
    transactionAdding: boolean;
    allChecked: boolean;
    error: string;
    currentDate: Date;
}

export interface AddTransactionDetails {
    GROSS: number|string;
    DATE: Date;
    REFERENCE: string;
}

export interface AddTransactionUser extends UserObject {
    checked: boolean;
}
