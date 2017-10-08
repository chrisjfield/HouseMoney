import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';

export interface IBalanceProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
}

export interface IBalanceState {
    balance: BalanceObject[];
    balanceReturned: false;
}

export interface IBalanceObject {
    USER: string;
    OTHERS: string;
    TOTAL: number;
}
