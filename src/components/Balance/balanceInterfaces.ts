import { IComponentProps } from '../../interfaces/componentInterfaces';
import { ILoadingProps } from '../Loading/loadingInterfaces';
import { ILoggedInOccupantDetails } from '../Occupants/occupantsInterfaces';

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

export interface IBalanceProps extends IComponentProps, IBalanceStore { }

export interface IBalanceStore extends ILoggedInOccupantDetails, ILoadingProps {
    balanceArray: IBalance[];
}
