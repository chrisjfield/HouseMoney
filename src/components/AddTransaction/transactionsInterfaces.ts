import { Action } from 'redux';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ILoadingProps } from '../Loading/loadingInterfaces';
import { ILoggedInOccupant, IOccupant } from '../Occupants/occupantsInterfaces';

export interface IAddTransationState {
    occupantsArray: IAddTransactionOccupant[];
    transactionDetails: ITransactionDetails;
    allChecked: boolean;
    transactionAdding: boolean;
    transactionAdded: boolean;
}

export interface IAddTransactionOccupant extends IOccupant {
    checked: boolean;
}

export interface ITransaction extends ITransactionDetails {
    creditorOccupantId: number;
    debtorOccupantId: number;
    enteredByOccupantId: number;
}

export interface ITransactionDetails {
    gross: number;
    reference: string;
    date: Date;
}

export interface ITransactionResponse extends ITransaction {
    transactionId: number;
}

export interface ITransactionReducer {
    transactionsAdded: boolean;
}

export interface IReceiveTransactionAction extends Action, ITransactionReducer { }

export interface IAddTransactionProps extends IConnectedComponentProps, IAddTransactionStore { }

export interface IAddTransactionStore extends ITransactionReducer, ILoggedInOccupant, ILoadingProps {
    householdOccupantsArray: IAddTransactionOccupant[];
}
