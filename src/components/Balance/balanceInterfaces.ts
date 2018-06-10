import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';

export interface IBalance {
    creditorOccupantId: number;
    debtorOccupantId: number;
    creditorDisplayName: string;
    debtorDisplayName: string;
    gross: number;
}

export interface IBalanceOccupant { // TODO: Remove
    displayName: string;
}

export interface IBalanceProps extends IConnectedComponentProps, IBalanceStore { }

export interface IBalanceStore {
    balanceArray: IBalance[];
}
