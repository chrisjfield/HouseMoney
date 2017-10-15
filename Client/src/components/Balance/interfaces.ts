import { Dispatch } from 'redux';
import { IUserObject } from '../../interfaces/userInterfaces';

export interface IBalanceProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: IUserObject;
}

export interface IBalanceState {
    balance: IBalanceObject[];
    balanceReturned: false;
}

export interface IBalanceObject {
    USER: string;
    OTHERS: string;
    TOTAL: number;
}
