import { IConnectedComponentProps, IComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant, ILoggedInOccupant } from '../Occupants/occupantsInterfaces';
import { Action } from 'redux';
import { ILoadingProps } from '../Loading/loadingInterfaces';

export interface IAddTransationProps extends IConnectedComponentProps { }

export interface IAddTransationState {
    occupantArray: IAddTransactionOccupant[];
    transactionDetails: ITransactionDetails;
    allChecked: boolean;
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
    transaction: ITransaction[];
}

export interface IReceiveTransactionAction extends Action, ITransactionReducer { }

export interface ITransactionProps extends IComponentProps, ITransactionStore { }

export interface ITransactionStore extends ITransactionReducer, ILoggedInOccupant, ILoadingProps { }
