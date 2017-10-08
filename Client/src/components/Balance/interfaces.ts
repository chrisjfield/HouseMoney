import { Dispatch } from 'redux';
import { UserObject } from '../../interfaces/userInterfaces';

export interface BalanceProps {
    dispatch: Dispatch<{}>;
    history: any;
    loggedInUser: UserObject;
}

export interface BalanceState {
    balance: BalanceObject[];
    balanceReturned: false;
}

export interface BalanceObject {
    USER: string;
    OTHERS: string;
    TOTAL: number;
}
