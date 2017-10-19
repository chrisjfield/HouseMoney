import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/userInterfaces';

export interface IViewTransactionsProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: IUserObject;
}

export interface IViewTransactionsState {
    transactionsReturned: boolean;
    transactionsData: IViewTransactionDetails[];
    pageNumber: number;
    pageSize: number;
    transactionCount: number;
}

export interface IViewTransactionDetails { // ED! bring this into generic ones file
    OTHERS: string;
    AMOUNT: number;
    DATE: Date;
    REFERENCE: string;
    PRIMARYKEY: string;
}

export interface IIAddTransactionUser extends IUserObject {
    checked: boolean;
}
