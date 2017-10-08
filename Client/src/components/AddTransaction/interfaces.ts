import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';

export interface IAddTransationProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
}

export interface IAddTransationState {
    userListReturned: boolean;
    userList: AddTransactionUser[];
    addTransaction: AddTransactionDetails;
    transactionAdded: boolean;
    transactionAdding: boolean;
    allChecked: boolean;
    error: string;
    currentDate: Date;
}

export interface IAddTransactionDetails { // ED! bring this into generic ones file
    GROSS: number|string;
    DATE: Date;
    REFERENCE: string;
}

export interface IAddTransactionUser extends UserObject {
    checked: boolean;
}
