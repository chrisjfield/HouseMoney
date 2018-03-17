import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import { Action } from 'redux';

export interface IBalanceProps extends IComponentProps {
    history: any;
    loggedInOccupant: IOccupant;
    balance: IBalance[];
    loading: boolean;
}

export interface IBalanceReducer {
    balance: IBalance[];
}

export interface IBalance { // TODO: Fix these shitty names!
    USER: string;
    OTHERS: string;
    TOTAL: number;
}

export interface IBalanceOccupant {
    email: string;
    displayName: string;
}

export interface IReceiveBalanceAction extends Action {
    balance: IBalance[];
}
