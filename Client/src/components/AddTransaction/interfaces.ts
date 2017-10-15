import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/userInterfaces';

export interface IAddTransationProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: IUserObject;
}

export interface IAddTransationState {
    userListReturned: boolean;
    userList: IAddTransactionUser[];
    addTransaction: IAddTransactionDetails;
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

export interface IAddTransactionUser extends IUserObject {
    checked: boolean;
}
