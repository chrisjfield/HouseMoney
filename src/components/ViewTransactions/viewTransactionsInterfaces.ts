import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant, ILoggedInOccupant } from '../Occupants/occupantsInterfaces';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { Action } from 'redux';
import { ILoadingProps } from '../Loading/loadingInterfaces';

export interface IViewTransactionsProps extends IConnectedComponentProps, IViewTransactionsStore { }

export interface IViewTransactionsState {
    pageNumber: number;
}

export interface IViewTransactionReducer {
    transactionHistoryArray: ITransactionHistory[];
}

export interface IViewTransactionsStore extends IViewTransactionReducer, ILoggedInOccupant, ILoadingProps {
    pageSize: number;
}

export interface ITransactionHistory extends ITransactionResponse {
    creditorDisplayName: string;
    debtorDisplayName: string;
    enteredByDisplayName: string;
}

export interface IAddTransactionOccupant extends IOccupant {
    checked: boolean;
}

export interface IReceiveTransactionHistoryAction extends Action, IViewTransactionReducer { }

export interface IViewTransactionGridProps extends IViewTransactionReducer { }

export interface IViewTransactionGridRowProps extends ITransactionHistory { }
