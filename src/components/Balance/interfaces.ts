import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IUserObject } from '../../interfaces/userInterfaces';

export interface IBalanceProps extends IComponentProps {
    history: any;
    loggedInUser: IUserObject;
}

export interface IBalanceState {
    balance: IBalanceObject[];
    balanceReturned: boolean;
}

export interface IBalanceObject {
    USER: string;
    OTHERS: string;
    TOTAL: number;
}
