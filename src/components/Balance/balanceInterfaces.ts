import { IComponentProps } from '../../interfaces/componentInterfaces';
import { ILoggedInOccupant } from '../Occupants/occupantsInterfaces';
import { Action } from 'redux';
import { ILoadingProps } from '../Loading/loadingInterfaces';

export interface IBalanceProps extends IComponentProps, IBalanceStore { }

export interface IBalanceStore extends IBalanceReducer, ILoggedInOccupant, ILoadingProps { }

export interface IBalanceReducer {
    balanceArray: IBalance[];
}

export interface IBalance { // TODO: Fix these shitty names!
    creditorOccupantId: number;
    debtorOccupantId: number;
    creditorDisplayName: string;
    debtorDisplayName: string;
    gross: number;
}

export interface IBalanceOccupant {
    displayName: string;
}

export interface IReceiveBalanceAction extends Action, IBalanceReducer { }
