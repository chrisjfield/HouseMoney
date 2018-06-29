import { IComponentProps, IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IBalanceStyles } from './balanceStyles';

export interface IBalance {
    creditorOccupantId: number;
    debtorOccupantId: number;
    creditorDisplayName: string;
    debtorDisplayName: string;
    gross: number;
}

export interface IBalanceOccupant {
    displayName: string;
}

export interface IBalanceProps extends IComponentProps, IBalanceStore, IBalanceStyles { }

export interface IBalanceStore extends IConnectedComponentProps {
    balanceArray: IBalance[];
}

export interface IBalanceReducer {
    balanceArray: IBalance[];
}

export interface IBalanceItemProps extends IBalanceStyles {
    balance: IBalance;
}
