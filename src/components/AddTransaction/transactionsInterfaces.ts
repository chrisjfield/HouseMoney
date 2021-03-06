import { IComponentProps, IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant, IUserDetails } from '../Occupants/occupantsInterfaces';
import { IAddTransactionStyles } from './addTransactionStyles';

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
    gross: string | number;
    reference: string;
    date: Date;
}

export interface ITransactionResponse extends ITransaction {
    transactionId: number;
}

export interface IAddTransactionRequest extends IUserDetails {
    transactionArray: ITransaction[];
}

export interface IAddTransactionProps extends IAddTransactionStore, IComponentProps, IAddTransactionStyles { }

export interface IAddTransactionStore extends IAddTransactionReducer, IConnectedComponentProps {
    transactionOccupantsArray: IAddTransactionOccupant[];
}

export interface IAddTransactionReducer {
    transactionsAdded: boolean;
}
