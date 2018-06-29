import { IComponentProps, IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IFormStyles } from '../../styles/styles';

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

export interface IBalanceProps extends IComponentProps, IBalanceStore, IFormStyles { }

export interface IBalanceStore extends IConnectedComponentProps {
    balanceArray: IBalance[];
}

export interface IBalanceReducer {
    balanceArray: IBalance[];
}
