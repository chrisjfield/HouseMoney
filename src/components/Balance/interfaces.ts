import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export interface IBalanceProps extends IComponentProps {
    history: any;
    loggedInOccupant: IOccupant;
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

export interface IBalanceOccupant {
    email: string;
    displayName: string;
}
