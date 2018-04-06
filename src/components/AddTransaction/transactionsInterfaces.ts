import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant, ILoggedInOccupant } from '../Occupants/occupantsInterfaces';
import { Action } from 'redux';
import { ILoadingProps } from '../Loading/loadingInterfaces';

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
    creditor: number;
    debtor: number;
    enteredBy: number;
}

export interface ITransactionDetails {
    gross: number;
    reference: string;
    date: Date;
}

export interface ITransactionResponse extends ITransaction {
    TransactionId: number;
}

export interface ITransactionReducer {
    transactionsAdded: boolean;
}

export interface IReceiveTransactionAction extends Action, ITransactionReducer { }

export interface IAddTransactionProps extends IConnectedComponentProps, IAddTransactionStore { }

export interface IAddTransactionStore extends ITransactionReducer, ILoggedInOccupant, ILoadingProps {
    householdOccupantsArray: IAddTransactionOccupant[];
}
